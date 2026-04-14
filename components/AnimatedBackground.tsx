"use client";

import { motion } from "framer-motion";

const blobs = [
  {
    color: "bg-violet-600",
    size: "w-96 h-96",
    initial: { x: -100, y: -100 },
    animate: { x: [-100, 60, -100], y: [-100, 80, -100] },
    duration: 10,
  },
  {
    color: "bg-blue-600",
    size: "w-80 h-80",
    initial: { x: 200, y: 200 },
    animate: { x: [200, 60, 200], y: [200, 50, 200] },
    duration: 12,
  },
  {
    color: "bg-fuchsia-600",
    size: "w-72 h-72",
    initial: { x: 100, y: -50 },
    animate: { x: [100, -60, 100], y: [-50, 150, -50] },
    duration: 9,
  },
  {
    color: "bg-indigo-500",
    size: "w-64 h-64",
    initial: { x: -80, y: 150 },
    animate: { x: [-80, 120, -80], y: [150, -30, 150] },
    duration: 14,
  },
];

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute ${blob.size} ${blob.color} rounded-full opacity-20 blur-3xl`}
          style={{
            left: `${20 + i * 20}%`,
            top: `${15 + i * 15}%`,
          }}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
