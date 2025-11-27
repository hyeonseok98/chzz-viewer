"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/cn";
import { useMemo, useState } from "react";

import {
  CHZZK_CUP_PLACEHOLDER_TEAM_LABEL,
  CHZZK_CUP_TEAM_COLOR,
  CHZZK_CUP_TEAM_DISPLAY_NAME,
} from "@/constants/chzzk-cup/chzzk-cup-common";
import { CHZZK_CUP_TEAMS } from "@/constants/chzzk-cup/chzzk-cup-draft-data";
import {
  CHZZK_CUP_MATCHES,
  CHZZK_CUP_STAGE_DETAIL,
  CHZZK_TEAM_BY_ID,
  type ChzzkCupMatch,
  type ChzzkCupStageId,
} from "@/constants/chzzk-cup/chzzk-cup-schedule-detail-data";
import { ChzzkTeamId } from "@/types/chzzk-cup/chzzk-cup-common";
import Link from "next/link";

type StageTab = {
  id: ChzzkCupStageId | "ALL";
  label: string;
};

const ALL_STAGE_ID = "ALL" as const;
const ALL_TEAM_ID = "ALL_TEAM" as const;

const STAGE_THEMES: Record<
  ChzzkCupStageId,
  {
    tag: string;
    cardBorder: string;
  }
> = {
  UNOFFICIAL_SCRIM: {
    tag: "bg-lime-400/12 text-lime-200 border border-lime-400/45",
    cardBorder: "border-lime-400/45",
  },
  OFFICIAL_SCRIM: {
    tag: "bg-sky-500/15 text-sky-200 border border-sky-500/40",
    cardBorder: "border-sky-500/40",
  },
  GROUP_LEAGUE: {
    tag: "bg-violet-500/15 text-violet-200 border border-violet-500/40",
    cardBorder: "border-violet-500/40",
  },
  WILDCARD: {
    tag: "bg-amber-500/15 text-amber-200 border border-amber-500/40",
    cardBorder: "border-amber-500/40",
  },
  PLAYOFF: {
    tag: "bg-pink-500/15 text-pink-200 border border-pink-500/40",
    cardBorder: "border-pink-500/40",
  },
  FINAL: {
    tag: "bg-rose-500/15 text-rose-200 border border-rose-500/40",
    cardBorder: "border-rose-500/40",
  },
};

const stageTabs: StageTab[] = [
  { id: ALL_STAGE_ID, label: "전체" },
  ...CHZZK_CUP_STAGE_DETAIL.map((stage) => ({
    id: stage.id,
    label: stage.label,
  })),
];

export function MatchRecordSection() {
  const [selectedStageId, setSelectedStageId] =
    useState<StageTab["id"]>(ALL_STAGE_ID);
  const [selectedTeamId, setSelectedTeamId] = useState<
    string | typeof ALL_TEAM_ID
  >(ALL_TEAM_ID);

  const filteredMatches = useMemo(() => {
    const byStage = CHZZK_CUP_MATCHES.filter((match) => {
      if (selectedStageId === ALL_STAGE_ID) return true;
      return match.stageId === selectedStageId;
    });

    const byTeam = byStage.filter((match) => {
      if (selectedTeamId === ALL_TEAM_ID) return true;
      return (
        match.leftTeamId === selectedTeamId ||
        match.rightTeamId === selectedTeamId
      );
    });

    return byTeam.sort((a, b) => {
      if (a.dateKey === b.dateKey) {
        return a.timeKey.localeCompare(b.timeKey);
      }
      return a.dateKey.localeCompare(b.dateKey);
    });
  }, [selectedStageId, selectedTeamId]);

  const matchesGroupedByDate = useMemo(() => {
    return filteredMatches.reduce<Record<string, ChzzkCupMatch[]>>(
      (grouped, match) => {
        if (!grouped[match.dateKey]) grouped[match.dateKey] = [];
        grouped[match.dateKey].push(match);
        return grouped;
      },
      {}
    );
  }, [filteredMatches]);

  const dateEntries = Object.entries(matchesGroupedByDate).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return (
    <section className="mt-10 space-y-6">
      {/* 상단 설명 + 필터 */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-[0.2em] text-chzzkTextSecondary uppercase">
            Match Record
          </p>
          <h1 className="text-2xl font-semibold text-chzzkTextPrimary md:text-3xl">
            경기 전적 상세
          </h1>
          <p className="text-sm text-chzzkTextSecondary">
            비공식/공식 스크림부터 조별 풀리그, 와일드카드, 플레이오프, 결승까지
            한 화면에서 확인할 수 있습니다.
          </p>
        </div>

        {/* 팀별 보기 Select */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-chzzkTextSecondary">팀별로 보기</span>
          <Select
            value={selectedTeamId}
            onValueChange={(value) =>
              setSelectedTeamId(value as string | typeof ALL_TEAM_ID)
            }
          >
            <SelectTrigger className="w-56 h-9 border-chzzkBorder bg-chzzkPanel/70 text-xs text-chzzkTextPrimary">
              <SelectValue placeholder="전체 팀" />
            </SelectTrigger>
            <SelectContent className="border-chzzkBorder bg-chzzkPanel">
              <SelectItem value={ALL_TEAM_ID} className="text-xs">
                전체 팀
              </SelectItem>
              {CHZZK_CUP_TEAMS.map((team) => (
                <SelectItem key={team.id} value={team.id} className="text-xs">
                  {CHZZK_CUP_TEAM_DISPLAY_NAME[team.id]} ({team.captainNickname}{" "}
                  팀)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 스테이지 탭 */}
      <div className="flex flex-wrap gap-2">
        {stageTabs.map((tab) => {
          const isActive = selectedStageId === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedStageId(tab.id)}
              className={cn(
                "inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold transition",
                "bg-black/30 border-white/10 text-chzzkTextSecondary hover:border-chzzkAccent/60",
                isActive &&
                  "bg-chzzkAccent text-black border-chzzkAccent shadow-[0_0_24px_rgba(0,255,163,0.35)]"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 날짜별 카드 리스트 */}
      <div className="mt-4 space-y-10">
        {dateEntries.length === 0 ? (
          <p className="text-sm text-chzzkTextSecondary">
            표시할 경기가 없습니다.
          </p>
        ) : (
          dateEntries.map(([dateKey, matches], index) => (
            <div
              key={dateKey}
              className={cn(index > 0 && "pt-6 border-t border-white/5")}
            >
              <p className="mb-4 text-xs font-semibold text-chzzkTextSecondary">
                {matches[0]?.dateLabel}
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {matches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    selectedTeamId={selectedTeamId}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

type MatchCardProps = {
  match: ChzzkCupMatch;
  selectedTeamId: string | typeof ALL_TEAM_ID;
};

function MatchCard({ match, selectedTeamId }: MatchCardProps) {
  const stageTheme = STAGE_THEMES[match.stageId];
  const stageMeta = CHZZK_CUP_STAGE_DETAIL.find((s) => s.id === match.stageId);

  const isCompleted = match.status === "FINISHED";
  const hasScore =
    typeof match.leftScore === "number" && typeof match.rightScore === "number";

  const winnerSide =
    isCompleted && hasScore
      ? match.leftScore! > match.rightScore!
        ? "LEFT"
        : match.leftScore! < match.rightScore!
        ? "RIGHT"
        : "DRAW"
      : null;

  const focusTeamId =
    selectedTeamId === ALL_TEAM_ID ? null : (selectedTeamId as string);

  return (
    <Link
      href={`/chzzk-cup-schedule/${match.id}`}
      className={cn(
        "group flex flex-col gap-3 rounded-2xl border bg-chzzkPanel/70 p-4 backdrop-blur transition",
        "hover:-translate-y-0.5 hover:border-chzzkAccent/70 hover:shadow-[0_0_28px_rgba(0,255,163,0.18)]",
        stageTheme.cardBorder
      )}
    >
      {/* 상단 라벨 */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold",
              stageTheme.tag
            )}
          >
            {stageMeta?.label ?? match.stageId}
          </span>
          <span className="text-[11px] text-chzzkTextSecondary">
            {match.timeLabel}
          </span>
        </div>

        <span className="text-[11px] rounded-full border border-white/10 px-2 py-0.5 text-chzzkTextSecondary">
          {match.seriesType}
        </span>
      </div>

      {/* 팀 vs 팀 */}
      <div className="space-y-2">
        <TeamRow
          side="LEFT"
          match={match}
          isWinner={winnerSide === "LEFT"}
          isLoser={winnerSide === "RIGHT"}
          focusTeamId={focusTeamId}
        />
        <TeamRow
          side="RIGHT"
          match={match}
          isWinner={winnerSide === "RIGHT"}
          isLoser={winnerSide === "LEFT"}
          focusTeamId={focusTeamId}
        />
      </div>

      {/* 하단 상태/스코어 */}
      <div className="mt-2 flex items-center justify-between text-[11px] text-chzzkTextSecondary">
        <span>{isCompleted ? "경기 종료" : "진행 예정"}</span>
        {hasScore ? (
          <span>
            {match.leftScore} : {match.rightScore}
          </span>
        ) : match.seriesType === "BO1" ? (
          <span>단판</span>
        ) : (
          <span>{match.seriesType}</span>
        )}
      </div>
    </Link>
  );
}

type TeamRowProps = {
  side: "LEFT" | "RIGHT";
  match: ChzzkCupMatch;
  isWinner: boolean;
  isLoser: boolean;
  focusTeamId: string | null;
};

function TeamRow({
  side,
  match,
  isWinner,
  isLoser,
  focusTeamId,
}: TeamRowProps) {
  const teamId = side === "LEFT" ? match.leftTeamId : match.rightTeamId;
  const team = CHZZK_TEAM_BY_ID[teamId];
  const displayName = CHZZK_CUP_TEAM_DISPLAY_NAME[teamId as ChzzkTeamId];
  const placeholderLabel = CHZZK_CUP_PLACEHOLDER_TEAM_LABEL[teamId];

  // 플레이오프 플레이스홀더 팀이면 이쪽 라벨 사용
  const primaryLabel = displayName ?? placeholderLabel ?? teamId;
  const secondaryLabel = team ? `${team.captainNickname} 팀` : "추후 확정";

  const baseColorClass = team ? CHZZK_CUP_TEAM_COLOR[team.id] : "bg-white/20";

  const isFocus = focusTeamId ? focusTeamId === teamId : false;

  const pillLabel = isWinner ? "승" : isLoser ? "패" : null;

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition",
        "border-white/10 bg-black/25",
        isWinner &&
          "border-emerald-400/70 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)]",
        isLoser && "border-rose-500/70 bg-rose-500/5",
        isFocus && !isWinner && !isLoser && "border-chzzkAccent/60"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[10px] font-semibold text-black/80",
            baseColorClass
          )}
        >
          {/* 나중에 로고 들어갈자리 */}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-chzzkTextPrimary">
            {primaryLabel}
          </span>
          <span className="text-[11px] text-chzzkTextSecondary">
            {secondaryLabel}
          </span>
        </div>
      </div>

      {pillLabel && (
        <span
          className={cn(
            "inline-flex h-6 min-w-[2rem] items-center justify-center rounded-full px-2 text-[11px] font-semibold",
            isWinner
              ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40"
              : "bg-rose-500/15 text-rose-200 border border-rose-500/40"
          )}
        >
          {pillLabel}
        </span>
      )}
    </div>
  );
}
