"use client";

import Link from "next/link";
import { useState } from "react";
import { MainOrbit } from "./main-orbit";

const TEAM_DRAFT_INFO = {
  label: "팀원 선발 드래프트",
  datetime: "11월 26일 (수) 18:00",
};

const CAPTAIN_PHRASE: Record<string, string> = {
  갱맘: "이 설계하는",
  뱅: "마토와 함께하는",
  울프: "의 거석신앙과 함께하는",
  소우릎: "의 날카로움이 이끄는",
  큐베: "의 무력으로 뒤흔드는",
};

export default function ChzzkCupMainSection() {
  const [activeCaptain, setActiveCaptain] = useState<string | null>(null);

  const activePhrase =
    activeCaptain != null
      ? CAPTAIN_PHRASE[activeCaptain] ?? "이(가) 직접 만드는"
      : null;

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 pb-8 pt-4 lg:px-0">
      {/* 배경 그라디언트 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-[-10%] w-[40rem] h-[40rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.55),_transparent_65%)] opacity-60 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] w-[32rem] h-[32rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.6),_transparent_65%)] opacity-70 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center w-full max-w-6xl">
        <MainOrbit onCaptainHover={setActiveCaptain} />

        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/80">
            STREAMER LEAGUE EVENT
          </p>

          <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-snug text-chzzkTextPrimary sm:text-4xl lg:text-5xl">
            {activeCaptain ? (
              <>
                <span className="text-chzzkAccent">{activeCaptain}</span>
                {activePhrase}
                <span className="mt-3 block">2025 치지직컵</span>
              </>
            ) : (
              <>
                <span className="block">새롭게 펼쳐지는</span>
                <span className="mt-3 block">2025 치지직컵</span>
              </>
            )}
          </h1>

          <p className="max-w-xl text-sm text-chzzkTextSecondary sm:text-base">
            스네이크 드래프트, 예상 못 한 팀 조합, 그리고 오프라인 무대까지
            <br />첫 번째 치지직컵에서만 볼 수 있는 이야기를 만나보세요.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/chzz-draft"
            className="group inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-chzzkBackground bg-chzzkAccent shadow-[0_0_40px_rgba(0,255,163,0.8)] transition hover:bg-chzzkAccentSoft"
          >
            모의 드래프트 하러 가기
            <span className="transition group-hover:translate-x-1">➜</span>
          </Link>

          <button className="inline-flex items-center gap-2 rounded-full border border-chzzkBorder px-8 py-3 text-sm font-semibold text-chzzkTextSecondary bg-chzzkPanel/80 backdrop-blur transition hover:border-chzzkAccent hover:text-chzzkTextPrimary">
            팀 &amp; 선수 라인업
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-chzzkTextSecondary">
          <span className="inline-flex items-center gap-1">
            <span className="inline-flex w-1.5 h-1.5 rounded-full bg-chzzkAccent animate-pulse-soft" />
            {TEAM_DRAFT_INFO.label}&nbsp;:&nbsp;{TEAM_DRAFT_INFO.datetime}
          </span>
          <span className="w-px h-3 bg-chzzkBorder" />
          <span>치지직컵 일정에 맞춰 순차 업데이트 예정</span>
        </div>
      </div>
    </section>
  );
}
