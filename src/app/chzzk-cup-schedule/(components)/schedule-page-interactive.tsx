"use client";

import {
  CHZZK_CUP_PLACEHOLDER_TEAM_LABEL,
  CHZZK_CUP_TEAM_COLOR,
  CHZZK_CUP_TEAM_DISPLAY_NAME,
} from "@/constants/chzzk-cup/chzzk-cup-common";
import {
  CHZZK_CUP_MATCHES,
  CHZZK_CUP_STAGE_DETAIL,
  CHZZK_CUP_STAGES,
  type ChzzkCupMatch,
  type ChzzkCupStageId,
} from "@/constants/chzzk-cup/chzzk-cup-schedule-detail-data";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type TeamFilterId = keyof typeof CHZZK_CUP_TEAM_DISPLAY_NAME;
type StageFilterId = "ALL" | ChzzkCupStageId;

const TEAM_FILTER_ORDER: TeamFilterId[] = [
  "WOLF",
  "SOURF",
  "GANGMOM",
  "BANG",
  "CUVEE",
];

const TEAM_SUB_LABEL: Record<TeamFilterId, string> = {
  WOLF: "울프 팀",
  SOURF: "소우릎 팀",
  GANGMOM: "갱맘 팀",
  BANG: "뱅 팀",
  CUVEE: "큐베 팀",
};

const STAGE_BADGE_STYLE: Record<ChzzkCupStageId, string> = {
  UNOFFICIAL_SCRIM: "border-amber-500/30 bg-amber-400/10 text-amber-200",
  OFFICIAL_SCRIM: "border-emerald-500/30 bg-emerald-400/10 text-emerald-200",
  GROUP_LEAGUE: "border-sky-500/30 bg-sky-400/10 text-sky-200",
  WILDCARD: "border-indigo-500/30 bg-indigo-400/10 text-indigo-200",
  PLAYOFF: "border-fuchsia-500/30 bg-fuchsia-400/10 text-fuchsia-200",
  FINAL: "border-rose-500/30 bg-rose-400/10 text-rose-200",
};

const STAGE_ACCENT_STYLE: Record<ChzzkCupStageId, string> = {
  UNOFFICIAL_SCRIM: "from-amber-400/85 via-amber-300/35 to-transparent",
  OFFICIAL_SCRIM: "from-emerald-400/85 via-emerald-300/35 to-transparent",
  GROUP_LEAGUE: "from-sky-400/85 via-sky-300/35 to-transparent",
  WILDCARD: "from-indigo-400/85 via-indigo-300/35 to-transparent",
  PLAYOFF: "from-fuchsia-400/85 via-fuchsia-300/35 to-transparent",
  FINAL: "from-rose-400/85 via-rose-300/35 to-transparent",
};

const getTimeRank = (timeKey: string) => {
  const [hRaw, mRaw] = timeKey.split(":");
  const h = Number(hRaw);
  const m = Number(mRaw);
  const hour = h < 6 ? h + 24 : h;
  return hour * 60 + m;
};

const getStageLabel = (stageId: ChzzkCupStageId) =>
  CHZZK_CUP_STAGE_DETAIL.find((s) => s.id === stageId)?.label ?? stageId;

const getTeamText = (teamId: string) => {
  if (teamId in CHZZK_CUP_TEAM_DISPLAY_NAME) {
    const id = teamId as TeamFilterId;
    return {
      primary: CHZZK_CUP_TEAM_DISPLAY_NAME[id],
      secondary: TEAM_SUB_LABEL[id],
      colorClass: CHZZK_CUP_TEAM_COLOR[id],
      known: true,
    };
  }

  return {
    primary: CHZZK_CUP_PLACEHOLDER_TEAM_LABEL[teamId] ?? teamId,
    secondary: "",
    colorClass: "bg-slate-400",
    known: false,
  };
};

function StageBadge({ stageId }: { stageId: ChzzkCupStageId }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-tight",
        STAGE_BADGE_STYLE[stageId]
      )}
    >
      {getStageLabel(stageId)}
    </span>
  );
}

function TeamCircle({ colorClass }: { colorClass: string }) {
  return (
    <div className="relative h-12 w-12 shrink-0">
      <div
        className={clsx(
          "absolute -inset-2 rounded-full blur-xl opacity-30",
          colorClass
        )}
      />
      <div className="relative h-12 w-12 rounded-full bg-white/5 ring-1 ring-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
        <div
          className={clsx(
            "absolute inset-[3px] rounded-full opacity-20",
            colorClass
          )}
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent" />
      </div>
    </div>
  );
}

function TeamRow({
  teamId,
  score,
  isWinner,
  isLoser,
  showResultBadge,
}: {
  teamId: string;
  score?: number;
  isWinner: boolean;
  isLoser: boolean;
  showResultBadge: boolean;
}) {
  const team = getTeamText(teamId);

  return (
    <div
      className={clsx(
        "flex items-center justify-between gap-3 rounded-2xl border px-4 py-4",
        isWinner && "border-emerald-500/25 bg-emerald-500/10",
        isLoser && "border-rose-500/25 bg-rose-500/10",
        !isWinner && !isLoser && "border-white/10 bg-white/5"
      )}
    >
      <div className="flex items-center gap-4">
        <TeamCircle colorClass={team.colorClass} />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-white">
              {team.primary}
            </p>
            {showResultBadge && (
              <span
                className={clsx(
                  "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold",
                  isWinner &&
                    "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
                  isLoser && "border-rose-400/30 bg-rose-400/10 text-rose-200",
                  !isWinner &&
                    !isLoser &&
                    "border-white/15 bg-white/5 text-white/70"
                )}
              >
                {isWinner ? "승" : isLoser ? "패" : "-"}
              </span>
            )}
          </div>
          {team.secondary ? (
            <p className="truncate text-xs text-white/45">{team.secondary}</p>
          ) : (
            <p className="truncate text-xs text-white/35">
              {team.known ? "" : "진행 후 확정"}
            </p>
          )}
        </div>
      </div>

      <p className="text-sm font-semibold text-white/90">
        {typeof score === "number" ? score : ""}
      </p>
    </div>
  );
}

function MatchCard({ match }: { match: ChzzkCupMatch }) {
  const completed = match.status === "FINISHED";
  const hasScore =
    typeof match.leftScore === "number" && typeof match.rightScore === "number";
  const leftWinner =
    completed && hasScore && match.leftScore! > match.rightScore!;
  const rightWinner =
    completed && hasScore && match.rightScore! > match.leftScore!;

  return (
    <Link href={`/chzzk-cup-schedule/${match.id}`} className="block">
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition hover:border-white/15 hover:bg-white/[0.04]">
        <div
          className={clsx(
            "absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b",
            STAGE_ACCENT_STYLE[match.stageId]
          )}
        />

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <StageBadge stageId={match.stageId} />
            <p className="text-sm font-semibold text-white/85">
              {match.timeLabel}
            </p>
          </div>

          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75">
            {match.seriesType}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <TeamRow
            teamId={match.leftTeamId}
            score={match.leftScore}
            isWinner={leftWinner}
            isLoser={rightWinner}
            showResultBadge={completed && hasScore}
          />
          <TeamRow
            teamId={match.rightTeamId}
            score={match.rightScore}
            isWinner={rightWinner}
            isLoser={leftWinner}
            showResultBadge={completed && hasScore}
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-white/45">
          <span>{completed ? "경기 종료" : "진행 예정"}</span>
          {completed && hasScore ? (
            <span className="font-semibold text-white/70">
              {match.leftScore} : {match.rightScore}
            </span>
          ) : (
            <span className="font-semibold text-white/35">-</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function TeamFilterSelect({
  value,
  onChange,
}: {
  value: TeamFilterId | "ALL";
  onChange: (v: TeamFilterId | "ALL") => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onMouseDown = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const currentLabel =
    value === "ALL"
      ? "전체 팀"
      : `${CHZZK_CUP_TEAM_DISPLAY_NAME[value]} (${TEAM_SUB_LABEL[value]})`;

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={clsx(
          "flex w-full items-center justify-between gap-3 rounded-[18px] border px-4 py-3 text-left transition",
          open
            ? "border-white/15 bg-white/[0.06]"
            : "border-white/10 bg-white/5 hover:bg-white/[0.06]"
        )}
      >
        <p className="min-w-0 truncate whitespace-nowrap text-sm font-semibold text-white">
          {currentLabel}
        </p>

        <span
          className={clsx(
            "shrink-0 text-white/60 transition",
            open && "rotate-180"
          )}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]/95 backdrop-blur-xl shadow-2xl">
          <div className="max-h-[320px] overflow-y-auto p-1">
            <button
              type="button"
              onClick={() => {
                onChange("ALL");
                setOpen(false);
              }}
              className={clsx(
                "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition",
                value === "ALL" ? "bg-white/10" : "hover:bg-white/5"
              )}
            >
              <p className="min-w-0 truncate whitespace-nowrap text-sm font-semibold text-white">
                전체 팀
              </p>
              {value === "ALL" && (
                <span className="shrink-0 text-xs font-semibold text-white/70">
                  선택
                </span>
              )}
            </button>

            <div className="my-1 h-px bg-white/10" />

            {TEAM_FILTER_ORDER.map((id) => {
              const label = `${CHZZK_CUP_TEAM_DISPLAY_NAME[id]} (${TEAM_SUB_LABEL[id]})`;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onChange(id);
                    setOpen(false);
                  }}
                  className={clsx(
                    "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition",
                    value === id ? "bg-white/10" : "hover:bg-white/5"
                  )}
                >
                  <p className="min-w-0 truncate whitespace-nowrap text-sm font-semibold text-white">
                    {label}
                  </p>

                  {value === id && (
                    <span className="shrink-0 text-xs font-semibold text-white/70">
                      선택
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SchedulePageInteractive() {
  const [stageFilter, setStageFilter] = useState<StageFilterId>("ALL");
  const [teamFilter, setTeamFilter] = useState<TeamFilterId | "ALL">("ALL");

  const stages = useMemo(() => CHZZK_CUP_STAGES, []);

  const filtered = useMemo(() => {
    const base = [...CHZZK_CUP_MATCHES]
      .sort((a, b) => {
        if (a.dateKey !== b.dateKey) return a.dateKey.localeCompare(b.dateKey);
        return getTimeRank(a.timeKey) - getTimeRank(b.timeKey);
      })
      .filter((m) => (stageFilter === "ALL" ? true : m.stageId === stageFilter))
      .filter((m) => {
        if (teamFilter === "ALL") return true;
        return m.leftTeamId === teamFilter || m.rightTeamId === teamFilter;
      });

    return base;
  }, [stageFilter, teamFilter]);

  const grouped = useMemo(() => {
    const map = new Map<
      string,
      { dateLabel: string; matches: ChzzkCupMatch[] }
    >();
    for (const m of filtered) {
      const item = map.get(m.dateKey);
      if (!item) map.set(m.dateKey, { dateLabel: m.dateLabel, matches: [m] });
      else item.matches.push(m);
    }
    return Array.from(map.entries()).map(([dateKey, v]) => ({ dateKey, ...v }));
  }, [filtered]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.28em] text-white/45 uppercase">
            Match Record
          </p>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            경기 일정 & 기록
          </h2>
          <p className="text-xs text-white/50">
            비공식/공식 스크림부터 조별 풀리그, 와일드카드, 플레이오프, 결승까지
            한 화면에서 확인할 수 있습니다.
          </p>
          <p className="text-xs text-white/50">
            스크림 기간에는 경기 종료 이후, 조별 풀리그 기간부터는 실시간으로
            경기결과 업데이트 예정입니다.
          </p>
        </div>

        <div className="w-full max-w-[260px] space-y-2">
          <p className="text-xs font-semibold text-white/50">팀별로 보기</p>
          <TeamFilterSelect value={teamFilter} onChange={setTeamFilter} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStageFilter("ALL")}
          className={clsx(
            "rounded-full border px-4 py-1 text-sm font-semibold transition",
            stageFilter === "ALL"
              ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-200"
              : "border-white/10 bg-white/5 text-white/70 hover:bg-white/7"
          )}
        >
          전체
        </button>

        {stages.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStageFilter(s.id)}
            className={clsx(
              "rounded-full border px-4 py-1 text-sm font-semibold transition",
              stageFilter === s.id
                ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-200"
                : "border-white/10 bg-white/5 text-white/70 hover:bg-white/7"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {grouped.map((group) => (
          <section key={group.dateKey} className="space-y-6">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-semibold text-white/80">
                {group.dateLabel}
              </h3>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {group.matches.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
