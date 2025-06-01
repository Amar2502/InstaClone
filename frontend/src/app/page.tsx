"use client";

import Image from "next/image";
import { Eye, EyeOff, FacebookIcon } from "lucide-react";
import { useState } from "react";
import { ReactFormState } from "react-dom/client";

interface login {
  email: string;
  password: string;
}

export default function Start() {
  const [show, setShow] = useState("password");
  const [error, setError] = useState<login>({
    email: "",
    password: "",
  });
  const [login, setLogin] = useState<login>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const strongAlphaNum = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    return strongAlphaNum.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailValid = validateEmail(login.email);
    const passwordValid = validatePassword(login.password);

    setError({
      email: emailValid ? "" : "Enter a valid email address",
      password: passwordValid
        ? ""
        : "Password must be alphanumeric (A–Z, a–z, 0–9 only)",
    });

    if (emailValid && passwordValid) {
      console.log("Form submitted:", login);
      // Proceed with API call or login logic
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex justify-center items-center">
      <div className="flex gap-0 justify-center -mt-14">
        {/* Image Header */}
        <div className="hidden lg:block">
          <Image src="/instaheader.png" alt="logo" width={600} height={600} />
        </div>
        <div className="ml-10 flex flex-col items-center">
          {/*Image Text*/}
          <div className="mb-6">
            <Image
              src="/instagram-wordmark.svg"
              alt="Instagram logo"
              width={200}
              height={200}
            />
          </div>

          {/*Login Form*/}
          <form className="flex flex-col gap-4 w-64" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={login.email}
              required
              className="text-white px-4 py-1.5 rounded border border-zinc-500"
              onChange={handleChange}
            />
            <div className="relative">
              <input
                type={show}
                placeholder="Password"
                value={login.password}
                name="password"
                required
                minLength={6}
                className="text-white px-4 py-1.5 pr-10 w-full rounded border border-zinc-500"
                onChange={handleChange}
              />
              {show === "password" ? (
                <Eye
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 cursor-pointer"
                  onClick={() => setShow("text")}
                />
              ) : (
                <EyeOff
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 cursor-pointer"
                  onClick={() => setShow("password")}
                />
              )}
            </div>
            {error.email && (
              <span className="text-red-500 text-sm">{error.email}</span>
            )}
            {error.password && (
              <span className="text-red-500 text-sm">{error.password}</span>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600 transition cursor-pointer"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <div className="flex-grow h-px bg-zinc-700" />
            <span className="text-sm text-zinc-400">OR</span>
            <div className="flex-grow h-px bg-zinc-700" />
          </div>

          {/* Facebook Login */}
          <button className="text-blue-400 text-sm font-medium mb-3 cursor-pointer flex gap-1">
            <FacebookIcon />
            Log in with Facebook
          </button>

          {/* Forgot Password */}
          <div className="text-sm text-blue-50 hover:underline cursor-pointer text-center">
            Forgotten your password?
          </div>

          {/* Don't have account */}
          <div className="text-sm text-blue-50 text-center mt-5">
            Don't have an account?
            <span className="text-blue-400 cursor-pointer text-sm font-medium">
              {" "}
              Sign up
            </span>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="absolute bottom-4 w-full flex flex-col items-center text-zinc-500 text-xs">
        {/* Top Link Row */}
        <div className="flex flex-wrap justify-center gap-4 mb-5">
          <span className="hover:underline cursor-pointer">Meta</span>
          <span className="hover:underline cursor-pointer">About</span>
          <span className="hover:underline cursor-pointer">Blog</span>
          <span className="hover:underline cursor-pointer">Jobs</span>
          <span className="hover:underline cursor-pointer">Help</span>
          <span className="hover:underline cursor-pointer">API</span>
          <span className="hover:underline cursor-pointer">Privacy</span>
          <span className="hover:underline cursor-pointer">Terms</span>
          <span className="hover:underline cursor-pointer">Locations</span>
          <span className="hover:underline cursor-pointer">Instagram Lite</span>
          <span className="hover:underline cursor-pointer">Threads</span>
          <span className="hover:underline cursor-pointer">
            Contact uploading and non-users
          </span>
          <span className="hover:underline cursor-pointer">Meta Verified</span>
        </div>

        {/* Language + Copyright */}
        <div className="flex gap-4">
          <span className="hover:underline cursor-pointer">English (UK)</span>
          <span>© 2025 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  );
}
