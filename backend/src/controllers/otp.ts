import { Request, Response } from 'express';
import { pool } from '../config/db';
import nodemailer from 'nodemailer';
import { randomInt } from 'crypto';
import config from '../config/config';

export const sendOTP = async (req: Request, res: Response) => {
  const { identifier } = req.body; // email or phone

  console.log(identifier);

  const otp = randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  console.log(otp);
  console.log(expiresAt);

  try {
    await pool.query(
      'INSERT INTO otps (identifier, otp, expires_at) VALUES (?, ?, ?)',
      [identifier, otp, expiresAt]
    );

    // Replace this with your nodemailer setup
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'amarpandey2502@gmail.com',
          pass: config.APP_PASSWORD // Use the generated App Password here
        }
      });

    await transporter.sendMail({
      to: identifier,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};


export const verifyOTP = async (req: Request, res: Response) => {
  const { identifier, otp } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM otps WHERE identifier = ? AND otp = ? ORDER BY created_at DESC LIMIT 1',
      [identifier, otp]
    );

    console.log(rows);

    const record = (rows as any[])[0];

    if (!record) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const now = new Date();
    if (now > new Date(record.expires_at)) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // ✅ Success — delete OTP
    await pool.query('DELETE FROM otps WHERE id = ?', [record.id]);

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error('Error verifying OTP:', err);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
};
