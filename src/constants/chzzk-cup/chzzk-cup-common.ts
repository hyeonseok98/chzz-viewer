import type { ChzzkTeamId } from "./chzzk-cup-schedule-detail-data";

export const CHZZK_CUP_TEAM_DISPLAY_NAME: Record<ChzzkTeamId, string> = {
  WOLF: "도개걸운모",
  SOURF: "5%",
  GANGMOM: "부산행",
  BANG: "구도는 에휴",
  CUVEE: "엠큐베이턱",
};

// 팀 로고 동그라미에 쓸 색상
export const CHZZK_CUP_TEAM_COLOR: Record<ChzzkTeamId, string> = {
  WOLF: "bg-emerald-400",
  SOURF: "bg-sky-400",
  GANGMOM: "bg-orange-400",
  BANG: "bg-blue-400",
  CUVEE: "bg-violet-400",
};

// 플레이오프용 플레이스홀더 팀 라벨
export const CHZZK_CUP_PLACEHOLDER_TEAM_LABEL: Record<string, string> = {
  LEAGUE_1: "플리그 1위 팀",
  LEAGUE_2: "플리그 2위 팀",
  LEAGUE_3: "플리그 3위 팀",
  LEAGUE_4: "플리그 4위 팀",
  LEAGUE_5: "플리그 5위 팀",
  WILDCARD_WINNER: "와일드카드전 승리팀",
  PLAYOFF_R1_LOSER: "플레이오프 1R 패배팀",
  PLAYOFF_R1_WINNER: "플레이오프 1R 승리팀",
  PLAYOFF_R2_WINNER: "플레이오프 2R 승리팀",
  FINAL_QUALIFIER_WINNER: "결승 진출전 승리팀",
};
