"use client";

import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "경기 일정", href: "/chzz-cup-schedule" },
  // { label: "팀 & 선수", href: "#teams" },
  { label: "모의 드래프트", href: "/chzzk-draft" },
  // { label: "클립 다시보기", href: "#clips" },
];

export default function ChzzkCupHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-chzzkBorder bg-chzzkBackground/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/icons/chzzviewer-logo2.png"
            alt="치즈뷰어 로고"
            width={406}
            height={122}
            className="w-[96px] h-[28px] md:w-[112px] md:h-[32px] lg:w-[124px] lg:h-[36px]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 text-xs font-medium text-chzzkTextSecondary md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition hover:text-chzzkAccent hover:font-semibold"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
