import type { ChzzkCupMatch, ChzzkCupStageId } from "@/types/chzzk-cup";
import type { ChzzkTeamId } from "@/types/chzzk-cup/chzzk-cup-common";

export type StageFilterId = "ALL" | ChzzkCupStageId;

export type TeamOutcome = "WIN" | "LOSE" | "DRAW" | "NONE";

const getTimeRank = (hhmm: string) => {
  const [hRaw, mRaw] = hhmm.split(":");
  const h = Number(hRaw);
  const m = Number(mRaw);
  const hour = h < 6 ? h + 24 : h;
  return hour * 60 + m;
};

export function filterMatchesByStageId(
  matches: ChzzkCupMatch[],
  stageFilterId: StageFilterId
) {
  if (stageFilterId === "ALL") return matches;
  return matches.filter((match) => match.stageId === stageFilterId);
}

export function groupMatchesByDayId(matches: ChzzkCupMatch[]) {
  return matches.reduce<Record<string, ChzzkCupMatch[]>>((grouped, match) => {
    const key = match.dateKey;
    grouped[key] ??= [];
    grouped[key].push(match);
    return grouped;
  }, {});
}

export function sortMatchesForDisplay(matches: ChzzkCupMatch[]) {
  return [...matches].sort((a, b) => {
    if (a.dateKey !== b.dateKey) return a.dateKey.localeCompare(b.dateKey);
    return getTimeRank(a.startTime) - getTimeRank(b.startTime);
  });
}

export function getMatchesForTeamId(
  matches: ChzzkCupMatch[],
  teamId: ChzzkTeamId
) {
  return matches.filter(
    (match) => match.leftTeamId === teamId || match.rightTeamId === teamId
  );
}

export function getOutcomeForTeamId(match: ChzzkCupMatch, teamId: ChzzkTeamId) {
  const { leftScore, rightScore } = match;
  const hasScore =
    typeof leftScore === "number" && typeof rightScore === "number";

  if (match.status !== "FINISHED" || !hasScore) {
    return { outcome: "NONE" as const };
  }

  const isLeft = match.leftTeamId === teamId;
  const myScore = isLeft ? leftScore : rightScore;
  const opponentScore = isLeft ? rightScore : leftScore;

  if (myScore === opponentScore) {
    return {
      outcome: "DRAW" as const,
      myScore,
      opponentScore,
    };
  }

  const outcome: TeamOutcome = myScore > opponentScore ? "WIN" : "LOSE";

  return {
    outcome,
    myScore,
    opponentScore,
  };
}

export function getScoreText(match: ChzzkCupMatch) {
  const hasScore =
    typeof match.leftScore === "number" && typeof match.rightScore === "number";
  if (!hasScore) return null;
  return `${match.leftScore} : ${match.rightScore}`;
}

export function getTeamScoreText(match: ChzzkCupMatch, teamId: ChzzkTeamId) {
  const hasScore =
    typeof match.leftScore === "number" && typeof match.rightScore === "number";
  if (!hasScore) return null;

  const isLeft = match.leftTeamId === teamId;
  const myScore = isLeft ? match.leftScore : match.rightScore;
  const opponentScore = isLeft ? match.rightScore : match.leftScore;
  return `${myScore} : ${opponentScore}`;
}

export function getOutcomeBadgeText(outcome: TeamOutcome) {
  if (outcome === "WIN") return "승";
  if (outcome === "LOSE") return "패";
  if (outcome === "DRAW") return "무";
  return "예정";
}

export function getOutcomeColorClass(outcome: TeamOutcome) {
  if (outcome === "WIN")
    return "border-emerald-400/40 bg-emerald-500/10 text-emerald-200";
  if (outcome === "LOSE")
    return "border-rose-400/40 bg-rose-500/10 text-rose-200";
  if (outcome === "DRAW")
    return "border-slate-300/25 bg-white/5 text-slate-200";
  return "border-chzzkBorder bg-chzzkPanel/60 text-chzzkTextSecondary";
}
