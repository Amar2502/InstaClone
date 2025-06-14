"use client";

import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessAnimation() {
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md flex flex-col items-center justify-center">
      <Confetti
        numberOfPieces={200}
        recycle={false}
        gravity={0.3}
        wind={0.05}
        colors={['#22c55e', '#16a34a', '#15803d', '#166534']}
      />

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          duration: 0.8 
        }}
        className="text-green-500 relative"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <CheckCircle size={120} strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mt-6"
      >
        <motion.h1 
          className="text-3xl font-bold text-green-600"
          animate={{ 
            scale: [1, 1.05, 1],
            textShadow: [
              "0 0 0px rgba(34, 197, 94, 0)",
              "0 0 10px rgba(34, 197, 94, 0.5)",
              "0 0 0px rgba(34, 197, 94, 0)"
            ]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          Registration Successful
        </motion.h1>
        <motion.p 
          className="text-gray-600 mt-3 text-lg"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          Redirecting to login in {countdown}...
        </motion.p>
      </motion.div>
    </div>
  );
}
