import { Request, Response } from "express";
import { pool } from "../config/db";
import { comparePassword, hashPassword } from "../utils/hash";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken"
import config from "../config/config";

interface RegisterUserRequest {
  identifier: string;
  password: string;
  fullName: string;
  username: string;
  auth_source: string;
  date_of_birth: string;
}

interface LoginUserRequest {
  identifier: string;
  password: string;
}

interface User extends RowDataPacket {
  id: number;
  username: string;
  fullname: string;
  identifier: string;
  password: string;
  bio: string | null;
  created_at: Date;
  auth_source: string;
}

export const registerUser = async (req: Request, res: Response) => {
  const { identifier, password, fullName, username, auth_source, date_of_birth } = req.body as RegisterUserRequest;
  console.log(req.body);

  try {
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE identifier = ?",
      [identifier]
    );

    console.log("existingUser", existingUser);

    if ((existingUser as any[]).length > 0) {
      return res.status(400).json({ message: "Email already exists", problem: "email" });
    }

    console.log("email does not exixts");
    

    const [usernameExists] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    console.log(usernameExists);
    
    
    if((usernameExists as any[]).length > 0) {
      return res.status(400).json({ message: "Username already exists", problem: "username" });
    }

    console.log("username doesnt exists");
    

    const hashedPassword = await hashPassword(password);

    console.log("hashedPassword", hashedPassword);

    const newUser = await pool.query(
      "INSERT INTO users (identifier, password, fullName, username, auth_source, date_of_birth) VALUES (?, ?, ?, ?, ?, ?)",
      [identifier, hashedPassword, fullName, username, auth_source, date_of_birth]
    );

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const {identifier, password} = req.body as LoginUserRequest;
  console.log(req.body);

  try {
    
    const [rows, fields] = await pool.query<User[]>(
      "SELECT * FROM users WHERE identifier = ?",
      [identifier]
    );

    if(rows.length==0) {
      return res.status(400).json({ message: "User does not exist", problem: "identifier" });
    } 

    const isMatch = await comparePassword(password, rows[0].password)

    if(!isMatch) {
      return res.status(400).json({ message: "Password is not correct", problem: "password" });
    }

    const token = jwt.sign(
      {username: rows[0].username, identifier: rows[0].identifier},
      config.JWT_SECRET,
      {expiresIn: "30d"}
    )

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
    })

    res.status(201).json({ message: "User logined successfully", user: rows, token: token});
    

  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error" });
  } 
}