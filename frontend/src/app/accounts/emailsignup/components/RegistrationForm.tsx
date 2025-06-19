"use client";

import Image from "next/image";
import { Eye, EyeOff, Facebook } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import FloatingInput from "@/components/self/floatinginput";
import { z } from "zod";
import { setFormData, setIdentifier } from "@/features/registrationSlice";
import { useDispatch } from "react-redux";

interface Register {
  identifier: string;
  password: string;
  fullName: string;
  username: string;
  auth_source: string;
}

interface Error {
  message: string;
  problem: string;
}

interface RegisterProps {
  onSuccess: () => void;
}


const registerSchema = z.object({
  identifier: z
    .string()
    .min(5, "Identifier is too short")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
        /^[0-9]{10}$/.test(val),
      {
        message: "Must be a valid email or phone number",
      }
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be no more than 12 characters"),
  fullName: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "Username is required"),
  auth_source: z.string(),
});

export default function RegistrationForm({ onSuccess }: RegisterProps) {
  const [show, setShow] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  const [register, setRegister] = useState<Register>({
    identifier: "",
    password: "",
    fullName: "",
    username: "",
    auth_source: "email",
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof Register, string>>>({});

  const dispatch = useDispatch();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("handleSubmit");
    e.preventDefault();
    setFormErrors({}); // reset

    const result = registerSchema.safeParse(register);
    console.log(result);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof Register, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof Register;
        fieldErrors[field] = err.message;
      });
      setFormErrors(fieldErrors);
      return; // don't submit if validation fails
    }

    console.log(register);

    try {
      console.log("try");
      dispatch(setIdentifier(register.identifier));
      dispatch(setFormData(register));
      onSuccess();
    } catch (error) {
      console.log(error);
    }

  };


  return (
    <div className="w-full max-w-sm">
      <div className="border border-zinc-800 rounded-sm p-8 flex flex-col items-center gap-4 mt-5">
        <Image
          src="/instagram-wordmark.svg"
          alt="Instagram"
          width={180}
          height={40}
          className="mb-2"
        />
        <p className="text-sm text-zinc-400 text-center">
          Sign up to see photos and videos from your friends.
        </p>

        <button className="bg-blue-500 cursor-pointer hover:bg-blue-600 w-full py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium text-white">
          <Facebook className="h-4 w-4" />
          Log in with Facebook
        </button>

        <div className="relative w-full my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-zinc-900 px-2 text-zinc-400">OR</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
          <FloatingInput
            name="identifier"
            label="Mobile number or email address"
            value={register.identifier}
            onChange={handleChange}
            required
          />
          {formErrors.identifier && (
            <p className="text-red-500 text-sm pl-1">{formErrors.identifier}</p>
          )}

          {error && error.problem === "email" && (
            <p className="text-red-500 text-sm pl-1">{error.message}</p>
          )}

          <FloatingInput
            name="password"
            label="Password"
            type={show ? "text" : "password"}
            value={register.password}
            onChange={handleChange}
            required
            minLength={6}
          >
            <div onClick={() => setShow(!show)}>
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </div>
          </FloatingInput>
          {formErrors.password && <p className="text-red-500 text-sm pl-1">{formErrors.password}</p>}

          <FloatingInput
            name="fullName"
            label="Full Name"
            value={register.fullName}
            onChange={handleChange}
            required
          />
          {formErrors.fullName && <p className="text-red-500 text-sm pl-1">{formErrors.fullName}</p>}

          <FloatingInput
            name="username"
            label="Username"
            value={register.username}
            onChange={handleChange}
            required
          />
          {formErrors.username && <p className="text-red-500 text-sm pl-1">{formErrors.username}</p>}
          {error && error.problem === "username" && (
            <p className="text-red-500 text-sm pl-1">{error.message}</p>
          )}

          <p className="text-[11px] text-zinc-400 text-center mt-2">
            People who use our service may have uploaded your contact information to Instagram.{" "}
            <Link href="/" className="text-blue-400">Learn more</Link>
          </p>

          <p className="text-[11px] text-zinc-400 text-center">
            By signing up, you agree to our{" "}
            <Link href="/" className="text-blue-400">Terms</Link>,{" "}
            <Link href="/" className="text-blue-400">Privacy Policy</Link>, and{" "}
            <Link href="/" className="text-blue-400">Cookies Policy</Link>.
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md mt-2 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className=" border border-zinc-800 rounded-sm text-center py-4 mt-3 text-sm">
        Have an account?{" "}
        <Link href="/" className="text-blue-400 font-medium">Log in</Link>
      </div>
    </div>
  );
}