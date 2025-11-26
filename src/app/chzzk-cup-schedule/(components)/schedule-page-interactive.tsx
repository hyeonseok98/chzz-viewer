"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import {
  BracketMatchId,
  PhaseId,
  PlayoffMatch,
  SchedulePhase,
} from "@/constants/chzzk-cup/chzzk-cup-schedule-data";

import BottomSheet from "./bottom-sheet";
import MatchModeBadge from "./match-mode-badge";

type SchedulePageInteractiveProps = {
  phases: SchedulePhase[];
  playoffMatches: PlayoffMatch[];
};

type SheetType = "PHASE" | "PLAYOFF" | null;

export default function SchedulePageInteractive({
  phases,
  playoffMatches,
}: SchedulePageInteractiveProps) {
  const [selectedPhaseId, setSelectedPhaseId] = useState<PhaseId>(
    phases[0]?.id ?? "DRAFT"
  );
  const [selectedPlayoffMatchId, setSelectedPlayoffMatchId] =
    useState<BracketMatchId>(playoffMatches[0]?.id ?? "PO_R1");
  const [openedSheet, setOpenedSheet] = useState<SheetType>(null);

  const selectedPhase = useMemo(() => {
    return phases.find((phase) => phase.id === selectedPhaseId) ?? phases[0];
  }, [phases, selectedPhaseId]);

  const selectedPlayoffMatch = useMemo(() => {
    return (
      playoffMatches.find((match) => match.id === selectedPlayoffMatchId) ??
      playoffMatches[0]
    );
  }, [playoffMatches, selectedPlayoffMatchId]);

  const openPhaseSheet = (id: PhaseId) => {
    setSelectedPhaseId(id);
    setOpenedSheet("PHASE");
  };

  const openPlayoffSheet = (id: BracketMatchId) => {
    setSelectedPlayoffMatchId(id);
    setOpenedSheet("PLAYOFF");
  };

  return (
    <>
      <section className="grid w-full grid-cols-1 mt-10 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col w-full gap-3 rounded-2xl border border-chzzkBorder bg-chzzkPanel/40 p-5 backdrop-blur">
          <div className="flex justify-between items-end gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-chzzkTextPrimary">
                주요 일정
              </p>
              <p className="text-xs text-chzzkTextSecondary">
                항목을 선택하면 상세가 열립니다. (모바일은 바텀시트)
              </p>
            </div>

            <span className="inline-flex justify-center items-center h-7 px-3 rounded-full border border-chzzkAccent/25 bg-chzzkAccent/10 text-xs font-semibold whitespace-nowrap text-chzzkAccent">
              업데이트 예정
            </span>
          </div>

          <div className="flex flex-col mt-2 gap-3">
            {phases.map((phase) => (
              <div key={phase.id} className="block lg:hidden">
                <PhaseRowButton
                  phase={phase}
                  isSelected={selectedPhaseId === phase.id}
                  onSelect={openPhaseSheet}
                />
              </div>
            ))}

            {phases.map((phase) => (
              <div key={phase.id} className="hidden lg:block">
                <PhaseRowButton
                  phase={phase}
                  isSelected={selectedPhaseId === phase.id}
                  onSelect={setSelectedPhaseId}
                />
              </div>
            ))}
          </div>
        </div>

        <aside className="hidden w-full lg:block">
          {selectedPhase ? (
            <SelectedPanel
              title={selectedPhase.title}
              subtitle={selectedPhase.datetime}
              badge={<MatchModeBadge mode={selectedPhase.mode} />}
              items={selectedPhase.details}
            />
          ) : null}
        </aside>
      </section>

      <section className="flex flex-col items-center w-full mt-14 gap-8">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-2xl font-semibold leading-tight text-chzzkTextPrimary sm:text-3xl">
            플레이오프 한눈에
          </h2>
          <p className="text-sm leading-relaxed text-chzzkTextSecondary sm:text-base">
            선택한 경기 카드 기준으로 요점을 바로 보여드립니다. (하드 피어리스
            룰)
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 max-w-6xl lg:grid-cols-[1fr_0.9fr]">
          <div className="flex flex-col w-full gap-3">
            {playoffMatches.map((match) => (
              <div key={match.id} className="block lg:hidden">
                <PlayoffCardButton
                  match={match}
                  isSelected={selectedPlayoffMatchId === match.id}
                  onSelect={openPlayoffSheet}
                />
              </div>
            ))}

            {playoffMatches.map((match) => (
              <div key={match.id} className="hidden lg:block">
                <PlayoffCardButton
                  match={match}
                  isSelected={selectedPlayoffMatchId === match.id}
                  onSelect={setSelectedPlayoffMatchId}
                />
              </div>
            ))}
          </div>

          <aside className="hidden w-full lg:block">
            {selectedPlayoffMatch ? (
              <>
                <SelectedPanel
                  title={`${selectedPlayoffMatch.title} (${selectedPlayoffMatch.bestOf})`}
                  subtitle={`${selectedPlayoffMatch.datetime} · ${selectedPlayoffMatch.left} vs ${selectedPlayoffMatch.right}`}
                  badge={
                    <div className="flex items-center gap-2">
                      <span className="inline-flex justify-center items-center h-7 px-3 rounded-full border border-chzzkAccent/25 bg-chzzkAccent/10 text-xs font-semibold whitespace-nowrap text-chzzkAccent">
                        하드 피어리스
                      </span>
                      {selectedPlayoffMatch.note ? (
                        <span className="text-xs text-chzzkTextSecondary">
                          {selectedPlayoffMatch.note}
                        </span>
                      ) : null}
                    </div>
                  }
                  items={selectedPlayoffMatch.details}
                />

                <div className="flex flex-col w-full mt-4 gap-3 rounded-2xl border border-chzzkBorder bg-chzzkPanel/60 p-5 backdrop-blur">
                  <p className="text-sm font-semibold text-chzzkTextPrimary">
                    이해를 돕는 용어
                  </p>
                  <div className="flex flex-col mt-1 gap-2 text-sm text-chzzkTextSecondary">
                    <p>• 풀리그 1~5위: 예선 풀리그 성적 순위</p>
                    <p>
                      • 와일드카드전: 4·5위 팀이 플레이오프 진출을 두고 진행
                    </p>
                    <p>• 결승 진출전: 결승에 올라갈 마지막 한 자리를 결정</p>
                  </div>
                </div>
              </>
            ) : null}
          </aside>
        </div>
      </section>

      <BottomSheet
        open={openedSheet === "PHASE"}
        title={selectedPhase?.title ?? ""}
        subtitle={selectedPhase ? selectedPhase.datetime : undefined}
        onClose={() => setOpenedSheet(null)}
      >
        {selectedPhase ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center">
              <MatchModeBadge mode={selectedPhase.mode} />
            </div>
            <ClientBulletList items={selectedPhase.details} />
          </div>
        ) : null}
      </BottomSheet>

      <BottomSheet
        open={openedSheet === "PLAYOFF"}
        title={
          selectedPlayoffMatch
            ? `${selectedPlayoffMatch.title} (${selectedPlayoffMatch.bestOf})`
            : ""
        }
        subtitle={
          selectedPlayoffMatch
            ? `${selectedPlayoffMatch.datetime} · ${selectedPlayoffMatch.left} vs ${selectedPlayoffMatch.right}`
            : undefined
        }
        onClose={() => setOpenedSheet(null)}
      >
        {selectedPlayoffMatch ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex justify-center items-center h-7 px-3 rounded-full border border-chzzkAccent/25 bg-chzzkAccent/10 text-xs font-semibold whitespace-nowrap text-chzzkAccent">
                하드 피어리스
              </span>
              {selectedPlayoffMatch.note ? (
                <span className="text-xs text-chzzkTextSecondary">
                  {selectedPlayoffMatch.note}
                </span>
              ) : null}
            </div>

            <ClientBulletList items={selectedPlayoffMatch.details} />

            <div className="rounded-xl border border-chzzkBorder bg-white/5 p-4 mt-2">
              <p className="text-sm font-semibold text-chzzkTextPrimary">
                이해를 돕는 용어
              </p>
              <p className="text-sm leading-relaxed mt-2 text-chzzkTextSecondary">
                풀리그 1~5위는 예선 풀리그 성적 순위이며, 와일드카드전은 4·5위
                결정전입니다.
              </p>
            </div>
          </div>
        ) : null}
      </BottomSheet>
    </>
  );
}

function PhaseRowButton({
  phase,
  isSelected,
  onSelect,
}: {
  phase: SchedulePhase;
  isSelected: boolean;
  onSelect: (id: PhaseId) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(phase.id)}
      whileHover={{ y: -2 }}
      className={clsx(
        "flex justify-between items-center w-full gap-4 rounded-xl border px-4 py-4 text-left transition",
        "bg-black/20 backdrop-blur",
        isSelected
          ? "border-chzzkAccent/70 shadow-[0_0_28px_rgba(0,255,163,0.18)]"
          : "border-white/10 hover:border-chzzkAccent/40"
      )}
    >
      <div className="flex flex-col flex-1 min-w-0 gap-1">
        <p className="truncate text-base font-semibold text-chzzkTextPrimary">
          {phase.title}
        </p>
        <p className="truncate text-sm text-chzzkTextSecondary">
          {phase.summary}
        </p>
      </div>

      <div className="flex items-center shrink-0 gap-3">
        <p className="text-sm font-semibold whitespace-nowrap text-chzzkTextPrimary">
          {phase.datetime}
        </p>
        <MatchModeBadge mode={phase.mode} />
      </div>
    </motion.button>
  );
}

function PlayoffCardButton({
  match,
  isSelected,
  onSelect,
}: {
  match: PlayoffMatch;
  isSelected: boolean;
  onSelect: (id: BracketMatchId) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(match.id)}
      whileHover={{ y: -2 }}
      className={clsx(
        "flex flex-col w-full gap-3 rounded-2xl border px-5 py-5 text-left transition",
        "bg-chzzkPanel/60 backdrop-blur",
        isSelected
          ? "border-chzzkAccent/70 shadow-[0_0_34px_rgba(0,255,163,0.16)]"
          : "border-chzzkBorder hover:border-chzzkAccent/40"
      )}
    >
      <div className="flex justify-between items-center gap-3">
        <div className="flex flex-col min-w-0 gap-1">
          <p className="truncate text-sm font-semibold text-chzzkTextPrimary">
            {match.title}{" "}
            <span className="text-chzzkTextSecondary">({match.bestOf})</span>
          </p>
          <p className="text-xs text-chzzkTextSecondary">{match.datetime}</p>
        </div>

        {match.note ? (
          <span className="inline-flex justify-center items-center h-7 px-3 rounded-full border border-chzzkAccent/25 bg-chzzkAccent/10 text-xs font-semibold whitespace-nowrap text-chzzkAccent">
            {match.note}
          </span>
        ) : (
          <span className="inline-flex justify-center items-center h-7 px-3 rounded-full border border-chzzkBorder bg-white/5 text-xs font-semibold whitespace-nowrap text-chzzkTextSecondary">
            {match.bestOf}
          </span>
        )}
      </div>

      <div className="flex justify-between items-center gap-3">
        <p className="text-sm font-semibold text-chzzkTextPrimary">
          {match.left}
        </p>
        <span className="text-sm font-semibold text-chzzkTextSecondary">
          VS
        </span>
        <p className="text-sm font-semibold text-chzzkTextPrimary">
          {match.right}
        </p>
      </div>
    </motion.button>
  );
}

function SelectedPanel({
  title,
  subtitle,
  badge,
  items,
}: {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  items: string[];
}) {
  return (
    <div className="flex flex-col w-full gap-3 rounded-2xl border border-chzzkBorder bg-chzzkPanel/70 p-5 backdrop-blur">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-chzzkTextPrimary">{title}</p>
        {subtitle ? (
          <p className="text-xs text-chzzkTextSecondary">{subtitle}</p>
        ) : null}
      </div>

      {badge ? <div className="flex items-center">{badge}</div> : null}

      <ClientBulletList items={items} />
    </div>
  );
}

function ClientBulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-sm leading-relaxed text-chzzkTextSecondary"
        >
          <span className="mt-2 h-1 w-1 rounded-full bg-chzzkAccent shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
