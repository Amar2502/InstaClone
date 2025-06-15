"use client";

import { useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import DOBForm from "./components/DOBForm";
import OTPForm from "./components/OTPForm";
import { useRouter } from "next/navigation";

export default function EmailSignup() {

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      {step === 1 && <RegistrationForm onSuccess={() => setStep(2)}/>}
      {step === 2 && <DOBForm onSuccess={() => setStep(3)}/>}
      {step === 3 && <OTPForm onSuccess={() => router.push("/")}/>}
    </div>
  );
} 