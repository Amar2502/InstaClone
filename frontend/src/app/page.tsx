"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Login from "./login"; // ✅ Capitalized
import Homepage from "./homepage";
import LoadingHomepage from "@/components/self/loadinghomepage";

export default function Start() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await axios.post("http://localhost:5000/users/isauth", {}, {
          withCredentials: true, // ✅ correct placement
        });
        setLoggedIn(true);
        setIsLoading(false);
      } catch (error) {
        setLoggedIn(false);
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <div>
      {isLoading ? <LoadingHomepage/> : loggedIn ? <Homepage/> : <Login />}
    </div>
  );
}
