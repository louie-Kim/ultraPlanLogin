"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FormErrors {
  email?: string;
  password?: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const shakeVariants = {
  shake: {
    x: [-8, 8, -6, 6, -4, 4, 0],
    transition: { duration: 0.5 },
  },
  idle: { x: 0 },
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!email) e.email = "이메일을 입력해주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "올바른 이메일 형식이 아닙니다.";
    if (!password) e.password = "비밀번호를 입력해주세요.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    setErrors({});
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    console.log("로그인 시도:", { email, password });
    setIsLoading(false);
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      variants={shakeVariants}
      animate={shake ? "shake" : "idle"}
      className="space-y-4"
    >
      {/* 이메일 */}
      <motion.div variants={itemVariants}>
        <label className="block text-xs font-medium text-white/60 mb-1.5">
          이메일
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          className={`
            w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30
            bg-white/5 border outline-none transition-all duration-200
            focus:bg-white/10 focus:ring-2 focus:ring-violet-500/60 focus:border-transparent
            ${errors.email ? "border-red-500/70" : "border-white/10"}
          `}
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-red-400"
          >
            {errors.email}
          </motion.p>
        )}
      </motion.div>

      {/* 비밀번호 */}
      <motion.div variants={itemVariants}>
        <label className="block text-xs font-medium text-white/60 mb-1.5">
          비밀번호
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className={`
            w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30
            bg-white/5 border outline-none transition-all duration-200
            focus:bg-white/10 focus:ring-2 focus:ring-violet-500/60 focus:border-transparent
            ${errors.password ? "border-red-500/70" : "border-white/10"}
          `}
        />
        {errors.password && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-red-400"
          >
            {errors.password}
          </motion.p>
        )}
      </motion.div>

      {/* 제출 버튼 */}
      <motion.div variants={itemVariants}>
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="
            w-full py-3 px-4 rounded-xl text-sm font-semibold text-white
            bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50
            shadow-lg shadow-violet-500/30 transition-colors duration-200
            flex items-center justify-center gap-2
          "
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              로그인 중...
            </>
          ) : (
            "로그인"
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  );
}
