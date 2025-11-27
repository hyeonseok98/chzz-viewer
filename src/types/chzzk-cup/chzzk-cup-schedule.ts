import { ChzzkTeamId } from "./chzzk-cup-common";

export type ChzzkCupStageId =
  | "UNOFFICIAL_SCRIM" // 비공식 스크림
  | "OFFICIAL_SCRIM" // 공식 스크림
  | "GROUP_LEAGUE" // 조별 풀리그
  | "WILDCARD" // 와일드카드전
  | "PLAYOFF" // 플레이오프
  | "FINAL"; // 결승

export type ChzzkCupStage = {
  id: ChzzkCupStageId;
  label: string;
  description?: string;
};

export type ChzzkCupMatchStatus = "SCHEDULED" | "FINISHED";

export type ChzzkCupBestOf = "SCRIM" | "BO1" | "BO3" | "BO5";

export type ChzzkCupMatch = {
  id: string;

  // 카테고리
  stageId: ChzzkCupStageId;

  // 날짜/시간
  dateKey: string; // 정렬용 "2025-11-26"
  dateLabel: string; // UI용 "11/26 (수)"
  startTime: string;
  endTime?: string;

  // 팀/룰 정보
  leftTeamId: ChzzkTeamId;
  rightTeamId: ChzzkTeamId;
  bestOf: ChzzkCupBestOf;

  // 결과
  status: ChzzkCupMatchStatus;
  leftScore?: number;
  rightScore?: number;
};
