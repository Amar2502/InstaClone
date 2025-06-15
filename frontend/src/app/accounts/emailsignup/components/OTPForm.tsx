"use client";

import { RootState } from '@/store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SuccessAnimation from '@/components/self/successanimation';

interface OTPFormProps {
    onSuccess: () => void;
  }

export default function OTPForm({onSuccess}: OTPFormProps) {
  const [otp, setOTP] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendmessage, setResendmessage] = useState<string | null>(null);

  const identifier = useSelector((state: RootState) => state.identifier.value);

  const handleVerification = () => {
    axios.post("http://localhost:5000/otp/verify-otp", { identifier, otp }, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleResend = () => {
    axios.post("http://localhost:5000/otp/send-otp", { identifier }, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setResendmessage("OTP sent successfully");
      })
      .catch((err) => {
        console.log(err); 
      })
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      {/* Main Form Card */}
      <div className="bg-black border border-gray-600 rounded-xs p-8 w-full max-w-sm mb-4">
        {/* Email Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Envelope */}
            <div className="w-16 h-12 border-2 border-white rounded-sm relative bg-black">
              {/* Envelope flap */}
              <div className="absolute top-0 left-0 right-0">
                <div className="w-full h-6 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
              </div>
            </div>
            
            {/* Heart icon */}
            <div className="absolute -bottom-1 -right-2 w-6 h-6 bg-pink-200 rounded-full border-2 border-black flex items-center justify-center">
              <div className="text-white text-xs">💖</div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-normal text-center mb-6 text-white">Enter Confirmation Code</h2>

        {/* Description */}
        <p className="text-gray-400 text-center text-sm mb-1">
          Enter the confirmation code we sent to
        </p>
        <p className="text-gray-400 text-center text-sm mb-1">
          {identifier} <span className="text-blue-400 cursor-pointer" onClick={handleResend}>Resend Code.</span>
        </p>

        {resendmessage && <p className="text-green-400 text-center text-sm mb-1">{resendmessage}</p>}

        {/* Code Input */}
        <div className="mb-6 mt-6">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-3 text-white text-center text-lg tracking-wider focus:outline-none focus:border-gray-500"
            placeholder="Enter code"
          />
        </div>

        {/* Next Button */}
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-full transition-colors mb-4 text-sm"
        onClick={handleVerification}>
          Verify
        </button>

        {/* Go Back Link */}
        <p className="text-blue-400 text-center text-sm cursor-pointer mb-6">
          Go back
        </p>

        {success && <SuccessAnimation message="OTP verified successfully" redirectUrl="/dashboard" />}
      </div>

      {/* Login Card */}
      <div className="bg-black border border-gray-600 rounded-xs p-6 w-full max-w-sm text-center">
        <span className="text-gray-300 text-sm">Have an account?</span>
        <br />
        <span className="text-blue-400 cursor-pointer text-sm">Log in</span>
      </div>
    </div>
  );
}