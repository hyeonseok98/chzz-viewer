import type { ChzzkCupStage } from "@/types/chzzk-cup";
import type { ChzzkTeam } from "@/types/chzzk-cup/chzzk-cup-draft";
import { CHZZK_CUP_TEAMS } from "./chzzk-cup-draft-data";

export type ChzzkTeamId = ChzzkTeam["id"];

export type ChzzkCupStageId =
  | "UNOFFICIAL_SCRIM"
  | "OFFICIAL_SCRIM"
  | "GROUP_LEAGUE"
  | "WILDCARD"
  | "PLAYOFF"
  | "FINAL";

export type ChzzkCupSeriesType = "BO1" | "BO3" | "BO4" | "BO5";

export type ChzzkCupMatchStatus = "SCHEDULED" | "FINISHED";

export type ChzzkCupMatch = {
  id: string;
  stageId: ChzzkCupStageId;
  /** 정렬용 키 (예: "2025-11-27") */
  dateKey: string;
  /** UI 표시용 (예: "11/27 (목)") */
  dateLabel: string;
  /** 시간 표시 (예: "18:00 ~ 20:30") */
  timeLabel: string;
  /** 정렬용 시작 시간 키 (예: "18:00") */
  timeKey: string;
  seriesType: ChzzkCupSeriesType;
  leftTeamId: string;
  rightTeamId: string;
  leftScore?: number;
  rightScore?: number;
  status: ChzzkCupMatchStatus;
  /** 결과 스크린샷 개수 (기본 1장) */
  screenshotCount?: number;
};

export const CHZZK_CUP_STAGES: ChzzkCupStage[] = [
  { id: "UNOFFICIAL_SCRIM", label: "비공식 스크림" },
  { id: "OFFICIAL_SCRIM", label: "공식 스크림" },
  { id: "GROUP_LEAGUE", label: "조별 풀리그" },
  { id: "WILDCARD", label: "와일드카드전" },
  { id: "PLAYOFF", label: "플레이오프" },
  { id: "FINAL", label: "결승" },
];

export const CHZZK_CUP_STAGE_DETAIL: {
  id: ChzzkCupStageId;
  label: string;
  description: string;
}[] = [
  {
    id: "UNOFFICIAL_SCRIM",
    label: "비공식 스크림",
    description: "팀끼리 자율적으로 잡는 연습 경기입니다.",
  },
  {
    id: "OFFICIAL_SCRIM",
    label: "공식 스크림",
    description: "대회 운영진이 잡아주는 공식 연습 매치입니다.",
  },
  {
    id: "GROUP_LEAGUE",
    label: "조별 풀리그",
    description: "예선 풀리그 단계의 공식 경기입니다.",
  },
  {
    id: "WILDCARD",
    label: "와일드카드전",
    description: "풀리그 4·5위가 플레이오프 진출을 두고 맞붙습니다.",
  },
  {
    id: "PLAYOFF",
    label: "플레이오프",
    description: "결승 진출을 향한 토너먼트 단계입니다.",
  },
  {
    id: "FINAL",
    label: "결승",
    description: "치지직컵 최종 우승팀이 가려집니다.",
  },
];

// 팀 맵: id -> 팀 객체
export const CHZZK_TEAM_BY_ID = CHZZK_CUP_TEAMS.reduce<
  Record<string, ChzzkTeam>
>((acc, team) => {
  acc[team.id] = team;
  return acc;
}, {});

// ================================
// 비공식 스크림 (11/26 수)
// ================================

const UNOFFICIAL_SCRIMS: ChzzkCupMatch[] = [
  {
    id: "UNOFFICIAL_2025-11-26_WOLF_BANG_BO5",
    stageId: "UNOFFICIAL_SCRIM",
    dateKey: "2025-11-26",
    dateLabel: "11/26 (수)",
    timeLabel: "21:00 ~ 00:00",
    timeKey: "21:00_1",
    seriesType: "BO4",
    leftTeamId: "WOLF",
    rightTeamId: "BANG",
    status: "FINISHED",
    leftScore: 3,
    rightScore: 1,
  },
  {
    id: "UNOFFICIAL_2025-11-26_SOURF_CUVEE_BO3",
    stageId: "UNOFFICIAL_SCRIM",
    dateKey: "2025-11-26",
    dateLabel: "11/26 (수)",
    timeLabel: "21:00 ~ 22:30",
    timeKey: "21:00_2",
    seriesType: "BO3",
    leftTeamId: "SOURF",
    rightTeamId: "CUVEE",
    status: "FINISHED",
    leftScore: 2,
    rightScore: 1,
  },
  {
    id: "UNOFFICIAL_2025-11-26_GANGMOM_CUVEE_BO3",
    stageId: "UNOFFICIAL_SCRIM",
    dateKey: "2025-11-26",
    dateLabel: "11/26 (수)",
    timeLabel: "23:00 ~ 01:00",
    timeKey: "23:00_3",
    seriesType: "BO3",
    leftTeamId: "GANGMOM",
    rightTeamId: "CUVEE",
    status: "FINISHED",
    leftScore: 3,
    rightScore: 0,
  },
  {
    id: "UNOFFICIAL_2025-11-26_WOLF_SOURF_BO3",
    stageId: "UNOFFICIAL_SCRIM",
    dateKey: "2025-11-26",
    dateLabel: "11/26 (수)",
    timeLabel: "00:00 ~ 02:00",
    timeKey: "24:00_4",
    seriesType: "BO3",
    leftTeamId: "WOLF",
    rightTeamId: "SOURF",
    status: "FINISHED",
    leftScore: 3,
    rightScore: 0,
  },
  {
    id: "UNOFFICIAL_2025-11-26_GANGMOM_BANG_BO3",
    stageId: "UNOFFICIAL_SCRIM",
    dateKey: "2025-11-26",
    dateLabel: "11/26 (수)",
    timeLabel: "01:00 ~ 03:00",
    timeKey: "25:00_5",
    seriesType: "BO3",
    leftTeamId: "GANGMOM",
    rightTeamId: "BANG",
    status: "FINISHED",
    leftScore: 3,
    rightScore: 0,
  },
];

// ================================
// 공식 스크림 (11/27 목, 11/28 금)
// ================================

const OFFICIAL_SCRIMS: ChzzkCupMatch[] = [
  // 11/27 (목) TIME1 18:00 ~ 20:30
  {
    id: "OFFICIAL_2025-11-27_TIME1_WOLF_SOURF",
    stageId: "OFFICIAL_SCRIM",
    dateKey: "2025-11-27",
    dateLabel: "11/27 (목)",
    timeLabel: "18:00 ~ 20:30",
    timeKey: "18:00",
    seriesType: "BO3",
    leftTeamId: "WOLF",
    rightTeamId: "SOURF",
    status: "FINISHED",
    leftScore: 2,
    rightScore: 1,
  },
  {
    id: "OFFICIAL_2025-11-27_TIME1_GANGMOM_BANG",
    stageId: "OFFICIAL_SCRIM",
    dateKey: "2025-11-27",
    dateLabel: "11/27 (목)",
    timeLabel: "18:00 ~ 20:30",
    timeKey: "18:00",
    seriesType: "BO3",
    leftTeamId: "GANGMOM",
    rightTeamId: "BANG",
    status: "FINISHED",
    leftScore: 2,
    rightScore: 1,
  },

  // 11/27 (목) TIME2 20:30 ~ 23:00
  {
    id: "OFFICIAL_2025-11-27_TIME2_WOLF_GANGMOM",
    stageId: "OFFICIAL_SCRIM",
    dateKey: "2025-11-27",
    dateLabel: "11/27 (목)",
    timeLabel: "20:30 ~ 23:00",
    timeKey: "20:30",
    seriesType: "BO3",
    leftTeamId: "WOLF",
    rightTeamId: "GANGMOM",
    status: "FINISHED",
    leftScore: 1,
    rightScore: 2,
  },
  {
    id: "OFFICIAL_2025-11-27_TIME2_BANG_CUVEE",
    stageId: "OFFICIAL_SCRIM",
    dateKey: "2025-11-27",
    dateLabel: "11/27 (목)",
    timeLabel: "20:30 ~ 23:00",
    timeKey: "20:30",
    seriesType: "BO3",
    leftTeamId: "BANG",
    rightTeamId: "CUVEE",
    status: "FINISHED",
    leftScore: 1,
    rightScore: 2,
  },

  // 11/27 (목) TIME3 23:00 ~ 01:30
  {
    id: "OFFICIAL_2025-11-27_TIME3_WOLF_BANG",
    stageId: "OFFICIAL_SCRIM",
    dateKey: "2025-11-27",
    dateLabel: "11/27 (목)",
    timeLabel: "23:00 ~ 01:30",
    timeKey: "23:00",
    seriesType: "BO3",
    leftTeamId: "WOLF",
    rightTeamId: "BANG",
    status: "SCHEDULED",
  },
  {
    id: "OFFICIAL_2025-11-27_TIME3_SOURF_CUVEE",
    stageId: "OFFICIAL_SCRIM",
    dateKey: "2025-11-27",
    dateLabel: "11/27 (목)",
    timeLabel: "23:00 ~ 01:30",
    timeKey: "23:00",
    seriesType: "BO3",
    leftTeamId: "SOURF",
    rightTeamId: "CUVEE",
    status: "SCHEDULED",
  },

  // 11/28 (금) TIME1 18:00 ~ 20:30
  {
    id: "OFFICIAL_2025-11-28_TIME1_WOLF_CUVEE",
    stageId: "OFFICIAL_SCRIM",
    dateKey: "2025-11-28",
    dateLabel: "11/28 (금)",
    timeLabel: "18:00 ~ 20:30",
    timeKey: "18:00",
    seriesType: "BO3",
    leftTeamId: "WOLF",
    rightTeamId: "CUVEE",
    status: "SCHEDULED",
  },
  {
    id: "OFFICIAL_2025-11-28_TIME1_GANGMOM_SOURF",
    stageId: "OFFICIAL_SCRIM",
    dateKey: "2025-11-28",
    dateLabel: "11/28 (금)",
    timeLabel: "18:00 ~ 20:30",
    timeKey: "18:00",
    seriesType: "BO3",
    leftTeamId: "GANGMOM",
    rightTeamId: "SOURF",
    status: "SCHEDULED",
  },

  // 11/28 (금) TIME2 20:30 ~ 23:00
  {
    id: "OFFICIAL_2025-11-28_TIME2_CUVEE_GANGMOM",
    stageId: "OFFICIAL_SCRIM",
    dateKey: "2025-11-28",
    dateLabel: "11/28 (금)",
    timeLabel: "20:30 ~ 23:00",
    timeKey: "20:30",
    seriesType: "BO3",
    leftTeamId: "CUVEE",
    rightTeamId: "GANGMOM",
    status: "SCHEDULED",
  },
  {
    id: "OFFICIAL_2025-11-28_TIME2_BANG_SOURF",
    stageId: "OFFICIAL_SCRIM",
    dateKey: "2025-11-28",
    dateLabel: "11/28 (금)",
    timeLabel: "20:30 ~ 23:00",
    timeKey: "20:30",
    seriesType: "BO3",
    leftTeamId: "BANG",
    rightTeamId: "SOURF",
    status: "SCHEDULED",
  },
];

// ================================
// 조별 풀리그 (11/29 토 ~ 12/2 화)
// 이미지 기준: 18시부터 1시간 간격
// ================================

const GROUP_LEAGUE_MATCHES: ChzzkCupMatch[] = [
  // DAY1 11/29 (토) - 18:00, 19:00, 20:00
  {
    id: "GROUP_2025-11-29_GAME1",
    stageId: "GROUP_LEAGUE",
    dateKey: "2025-11-29",
    dateLabel: "11/29 (토)",
    timeLabel: "18:00",
    timeKey: "18:00",
    seriesType: "BO1",
    leftTeamId: "SOURF",
    rightTeamId: "WOLF",
    status: "SCHEDULED",
  },
  {
    id: "GROUP_2025-11-29_GAME2",
    stageId: "GROUP_LEAGUE",
    dateKey: "2025-11-29",
    dateLabel: "11/29 (토)",
    timeLabel: "19:00",
    timeKey: "19:00",
    seriesType: "BO1",
    leftTeamId: "BANG",
    rightTeamId: "GANGMOM",
    status: "SCHEDULED",
  },
  {
    id: "GROUP_2025-11-29_GAME3",
    stageId: "GROUP_LEAGUE",
    dateKey: "2025-11-29",
    dateLabel: "11/29 (토)",
    timeLabel: "20:00",
    timeKey: "20:00",
    seriesType: "BO1",
    leftTeamId: "CUVEE",
    rightTeamId: "WOLF",
    status: "SCHEDULED",
  },

  // DAY2 11/30 (일)
  {
    id: "GROUP_2025-11-30_GAME1",
    stageId: "GROUP_LEAGUE",
    dateKey: "2025-11-30",
    dateLabel: "11/30 (일)",
    timeLabel: "18:00",
    timeKey: "18:00",
    seriesType: "BO1",
    leftTeamId: "CUVEE",
    rightTeamId: "SOURF",
    status: "SCHEDULED",
  },
  {
    id: "GROUP_2025-11-30_GAME2",
    stageId: "GROUP_LEAGUE",
    dateKey: "2025-11-30",
    dateLabel: "11/30 (일)",
    timeLabel: "19:00",
    timeKey: "19:00",
    seriesType: "BO1",
    leftTeamId: "GANGMOM",
    rightTeamId: "WOLF",
    status: "SCHEDULED",
  },
  {
    id: "GROUP_2025-11-30_GAME3",
    stageId: "GROUP_LEAGUE",
    dateKey: "2025-11-30",
    dateLabel: "11/30 (일)",
    timeLabel: "20:00",
    timeKey: "20:00",
    seriesType: "BO1",
    leftTeamId: "BANG",
    rightTeamId: "CUVEE",
    status: "SCHEDULED",
  },

  // DAY3 12/1 (월)
  {
    id: "GROUP_2025-12-01_GAME1",
    stageId: "GROUP_LEAGUE",
    dateKey: "2025-12-01",
    dateLabel: "12/1 (월)",
    timeLabel: "18:00",
    timeKey: "18:00",
    seriesType: "BO1",
    leftTeamId: "SOURF",
    rightTeamId: "GANGMOM",
    status: "SCHEDULED",
  },
  {
    id: "GROUP_2025-12-01_GAME2",
    stageId: "GROUP_LEAGUE",
    dateKey: "2025-12-01",
    dateLabel: "12/1 (월)",
    timeLabel: "19:00",
    timeKey: "19:00",
    seriesType: "BO1",
    leftTeamId: "BANG",
    rightTeamId: "WOLF",
    status: "SCHEDULED",
  },
  {
    id: "GROUP_2025-12-01_GAME3",
    stageId: "GROUP_LEAGUE",
    dateKey: "2025-12-01",
    dateLabel: "12/1 (월)",
    timeLabel: "20:00",
    timeKey: "20:00",
    seriesType: "BO1",
    leftTeamId: "CUVEE",
    rightTeamId: "GANGMOM",
    status: "SCHEDULED",
  },

  // DAY4 12/2 (화)
  {
    id: "GROUP_2025-12-02_GAME1",
    stageId: "GROUP_LEAGUE",
    dateKey: "2025-12-02",
    dateLabel: "12/2 (화)",
    timeLabel: "18:00",
    timeKey: "18:00",
    seriesType: "BO1",
    leftTeamId: "SOURF",
    rightTeamId: "BANG",
    status: "SCHEDULED",
  },
  {
    id: "GROUP_2025-12-02_GAME2",
    stageId: "GROUP_LEAGUE",
    dateKey: "2025-12-02",
    dateLabel: "12/2 (화)",
    timeLabel: "19:00",
    timeKey: "19:00",
    seriesType: "BO1",
    leftTeamId: "CUVEE",
    rightTeamId: "BANG",
    status: "SCHEDULED",
  },
  {
    id: "GROUP_2025-12-02_GAME3",
    stageId: "GROUP_LEAGUE",
    dateKey: "2025-12-02",
    dateLabel: "12/2 (화)",
    timeLabel: "20:00",
    timeKey: "20:00",
    seriesType: "BO1",
    leftTeamId: "WOLF",
    rightTeamId: "GANGMOM",
    status: "SCHEDULED",
  },
];

// ================================
// 와일드카드 / 플레이오프 / 결승
// ================================

const WILDCARD_AND_PLAYOFF: ChzzkCupMatch[] = [
  // 와일드카드 (12/3 수)
  {
    id: "WILDCARD_2025-12-03",
    stageId: "WILDCARD",
    dateKey: "2025-12-03",
    dateLabel: "12/3 (수)",
    timeLabel: "18:00",
    timeKey: "18:00",
    seriesType: "BO5",
    leftTeamId: "LEAGUE_4" as string, // 플레이스홀더 (플리그 4위 팀)
    rightTeamId: "LEAGUE_5" as string, // 플레이스홀더 (플리그 5위 팀)
    status: "SCHEDULED",
  },

  // 플레이오프 1R (12/6 토, BO3) - 플리그 1위 vs 2위
  {
    id: "PLAYOFF_2025-12-06_R1",
    stageId: "PLAYOFF",
    dateKey: "2025-12-06",
    dateLabel: "12/6 (토)",
    timeLabel: "13:00",
    timeKey: "13:00",
    seriesType: "BO3",
    leftTeamId: "LEAGUE_1" as string,
    rightTeamId: "LEAGUE_2" as string,
    status: "SCHEDULED",
  },

  // 플레이오프 2R (12/6 토, BO5) - 플리그 3위 vs 와일드카드 승리팀
  {
    id: "PLAYOFF_2025-12-06_R2",
    stageId: "PLAYOFF",
    dateKey: "2025-12-06",
    dateLabel: "12/6 (토)",
    timeLabel: "17:00",
    timeKey: "17:00",
    seriesType: "BO5",
    leftTeamId: "LEAGUE_3" as string,
    rightTeamId: "WILDCARD_WINNER" as string,
    status: "SCHEDULED",
  },

  // 결승 진출전 (12/7 일, BO3) - 플레이오프 1R 패배팀 vs 2R 승리팀
  {
    id: "PLAYOFF_2025-12-07_FINAL_QUALIFIER",
    stageId: "PLAYOFF",
    dateKey: "2025-12-07",
    dateLabel: "12/7 (일)",
    timeLabel: "11:00",
    timeKey: "11:00",
    seriesType: "BO3",
    leftTeamId: "PLAYOFF_R1_LOSER" as string,
    rightTeamId: "PLAYOFF_R2_WINNER" as string,
    status: "SCHEDULED",
  },

  // 결승 (12/7 일, BO5) - 플레이오프 1R 승리팀 vs 결승 진출전 승리팀
  {
    id: "FINAL_2025-12-07",
    stageId: "FINAL",
    dateKey: "2025-12-07",
    dateLabel: "12/7 (일)",
    timeLabel: "15:00",
    timeKey: "15:00",
    seriesType: "BO5",
    leftTeamId: "PLAYOFF_R1_WINNER" as string,
    rightTeamId: "FINAL_QUALIFIER_WINNER" as string,
    status: "SCHEDULED",
  },
];

// ================================
// 최종 리스트
// ================================

export const CHZZK_CUP_MATCHES: ChzzkCupMatch[] = [
  ...UNOFFICIAL_SCRIMS,
  ...OFFICIAL_SCRIMS,
  ...GROUP_LEAGUE_MATCHES,
  ...WILDCARD_AND_PLAYOFF,
].sort((a, b) => {
  if (a.dateKey === b.dateKey) {
    return a.timeKey.localeCompare(b.timeKey);
  }
  return a.dateKey.localeCompare(b.dateKey);
});
