"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import LoginForm from "@/components/LoginForm";
import SocialButton from "@/components/SocialButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function LoginPage() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  async function handleSocialLogin(provider: "google" | "facebook") {
    setLoadingProvider(provider);
    await signIn(provider, { callbackUrl: "/" });
    setLoadingProvider(null);
  }

  return (
    <>
      <AnimatedBackground />

      <main className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* 글래스모피즘 카드 */}
          <motion.div
            variants={itemVariants}
            className="
              rounded-3xl border border-white/10
              bg-white/5 backdrop-blur-xl
              shadow-2xl shadow-black/40
              p-8
            "
          >
            {/* 헤더 */}
            <motion.div variants={itemVariants} className="mb-8 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="
                  inline-flex items-center justify-center
                  w-14 h-14 rounded-2xl bg-violet-600/20
                  border border-violet-500/30 mb-4
                "
              >
                <svg
                  className="w-7 h-7 text-violet-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </motion.div>
              <h1 className="text-2xl font-bold text-white">환영합니다</h1>
              <p className="mt-1 text-sm text-white/50">
                계속하려면 로그인하세요
              </p>
            </motion.div>

            {/* 소셜 로그인 */}
            <motion.div variants={itemVariants} className="space-y-3 mb-6">
              <SocialButton
                provider="google"
                onClick={() => handleSocialLogin("google")}
                isLoading={loadingProvider === "google"}
              />
              <SocialButton
                provider="facebook"
                onClick={() => handleSocialLogin("facebook")}
                isLoading={loadingProvider === "facebook"}
              />
            </motion.div>

            {/* 구분선 */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-white/30 font-medium">또는</span>
              <div className="flex-1 h-px bg-white/10" />
            </motion.div>

            {/* 이메일 폼 */}
            <motion.div variants={containerVariants}>
              <LoginForm />
            </motion.div>

            {/* 푸터 */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-center text-xs text-white/30"
            >
              계정이 없으신가요?{" "}
              <a
                href="#"
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                회원가입
              </a>
            </motion.p>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
