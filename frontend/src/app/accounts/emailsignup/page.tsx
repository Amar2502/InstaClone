"use client";

import Image from "next/image";
import { Eye, EyeOff, Facebook } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Register {
  identifier: string;
  password: string;
  fullname: string;
  username: string;
  source: string;
}

export default function EmailSignup() {
  const [show, setShow] = useState(false);

  const [register, setRegister] = useState<Register>({
    identifier: "",
    password: "",
    fullname: "",
    username: "",
    source: "email",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Removed all backend validation or API interaction
    console.log("Form submitted with:", register);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
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
            <input
              type="text"
              name="identifier"
              placeholder="Mobile number or email address"
              value={register.identifier}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm rounded border border-zinc-700 bg-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-blue-500"
              required
            />

            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={register.password}
                onChange={handleChange}
                minLength={6}
                className="w-full px-3 py-2 text-sm rounded border border-zinc-700 bg-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-blue-500 pr-10"
                required
              />
              <div
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 cursor-pointer"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </div>
            </div>

            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={register.fullname}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm rounded border border-zinc-700 bg-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-blue-500"
              required
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={register.username}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm rounded border border-zinc-700 bg-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-blue-500"
              required
            />

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

        <div className="border border-zinc-800 rounded-sm text-center py-4 mt-3 text-sm">
          Have an account?{" "}
          <Link href="/" className="text-blue-400 font-medium">Log in</Link>
        </div>
      </div>

      <footer className="text-zinc-500 text-xs text-center mt-10 mb-4 px-2">
        <div className="flex flex-wrap justify-center gap-3 mb-2">
          {[
            "Meta", "About", "Blog", "Jobs", "Help", "API", "Privacy", "Terms",
            "Locations", "Instagram Lite", "Threads", "Contact uploading and non-users", "Meta Verified"
          ].map((item) => (
            <span key={item} className="hover:underline cursor-pointer">{item}</span>
          ))}
        </div>
        <p>English (UK) © 2025 Instagram from Meta</p>
      </footer>
    </div>
  );
}