"use client";

import Link from "next/link";

const NAV_ITEMS = [
  { label: "경기 일정", href: "#schedule" },
  { label: "팀 & 선수", href: "#teams" },
  { label: "드래프트", href: "#draft" },
  { label: "클립 다시보기", href: "#clips" },
];

export default function ChzzkCupHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-chzzkBorder bg-chzzkBackground/90 backdrop-blur">
      <div className="mx-auto flex items-center justify-between max-w-6xl px-4 py-3 lg:px-6">
        <Link href="/" className="flex items-center gap-3 ">
          <div className="flex flex-col gap-[2px]">
            <p className="text-xs font-semibold text-chzzkAccent">
              2025 CHZZK CUP
            </p>
            <p className="text-sm font-semibold text-chzzViewPrimary">
              치즈뷰어
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-xs font-medium text-chzzkTextSecondary md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition hover:text-chzzkTextPrimary"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
