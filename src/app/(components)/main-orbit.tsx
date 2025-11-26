"use client";

import { CHZZK_CUP_TEAMS } from "@/constants/chzzk-cup/chzzk-cup-draft-data";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type MainOrbitProps = {
  onCaptainHover?: (nickname: string | null) => void;
};

type JungleCaptain = {
  id: string;
  initial: string;
  nickname: string;
  glowColor: string;
};

const MINI_CIRCLE_COLORS: Record<string, string> = {
  GANGMOM: "#38bdf8",
  BANG: "#f97316",
  WOLF: "#22c55e",
  SOURF: "#e879f9",
  QUVEE: "#facc15",
};

export function MainOrbit({ onCaptainHover }: MainOrbitProps) {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [radius, setRadius] = useState(150);
  const [isCenterHovered, setIsCenterHovered] = useState(false);

  const captains: JungleCaptain[] = useMemo(
    () =>
      CHZZK_CUP_TEAMS.map((team) => ({
        id: team.id,
        initial: team.id[0],
        nickname: team.captainNickname,
        glowColor: MINI_CIRCLE_COLORS[team.id] ?? "#00FFA3",
      })),
    []
  );

  useEffect(() => {
    const updateRadius = () => {
      if (!ringRef.current) return;
      const { width } = ringRef.current.getBoundingClientRect();
      setRadius(width / 2);
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <div className="relative items-center justify-center w-[20rem] h-[20rem] mb-10 hidden md:flex lg:w-[24rem] lg:h-[24rem]">
      {/* 외부 링 */}
      <div className="absolute inset-0 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl" />

      {/* 실선 링 + 회전하고 있는 작은 원들 */}
      <div
        ref={ringRef}
        className="absolute inset-6 rounded-full border border-cyan-300/40 animate-spin-slow"
      >
        {captains.map((captain, index) => {
          const angle = (index / captains.length) * 2 * Math.PI;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <button
              key={captain.id}
              type="button"
              aria-label={captain.nickname}
              style={{ transform: `translate(${x - 30}px, ${y - 30}px)` }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:text-white/20"
              onMouseEnter={() => onCaptainHover?.(captain.nickname)}
              onMouseLeave={() => onCaptainHover?.(null)}
            >
              <div
                className="flex items-center justify-center w-14 h-14 rounded-full border border-white/30 bg-black/60 text-xs font-semibold uppercase tracking-wide text-zinc-100 shadow-lg backdrop-blur transition-transform hover:scale-110"
                style={{ boxShadow: `0 0 18px ${captain.glowColor}55` }}
              >
                {captain.initial}
              </div>
            </button>
          );
        })}
      </div>

      {/* 중앙 원 */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.08 }}
        onHoverStart={() => setIsCenterHovered(true)}
        onHoverEnd={() => setIsCenterHovered(false)}
        className="relative flex items-center justify-center w-32 h-32 rounded-full bg-black/70 ring-2 ring-[#00FFA3]/70 shadow-[0_0_32px_rgba(0,255,163,0.3)] backdrop-blur-xl lg:w-40 lg:h-40 z-10"
      >
        {isCenterHovered ? (
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#00FFA3]/70">
              2025
            </span>
            <span className="text-sm font-semibold">당신과 함께하는</span>
            <span className="text-xs font-semibold text-[#00FFA3]/70">
              CHZZK CUP
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-green-300/80">
              2025
            </span>
            <span className="text-lg font-semibold leading-snug">
              CHZZK
              <br />
              CUP
            </span>
            <span className="mt-1 w-8 h-px bg-green-300/70 hidden lg:flex" />
            <span className="text-[10px] text-zinc-300/80 hidden lg:flex">
              첫 번째 스페셜 리그
            </span>
          </div>
        )}
      </motion.button>

      {/* 중앙 그라데이션 */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,255,163,0.22),_transparent_72%)] blur-2xl z-0" />
    </div>
  );
}
