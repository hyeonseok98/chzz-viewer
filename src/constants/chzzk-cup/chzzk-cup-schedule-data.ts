export type PhaseId = "DRAFT" | "LEAGUE" | "WILDCARD" | "PLAYOFF";
export type MatchMode = "ONLINE" | "OFFLINE";

export type SchedulePhase = {
  id: PhaseId;
  title: string;
  datetime: string;
  mode: MatchMode;
  summary: string;
  details: string[];
};

export type BracketMatchId = "PO_R1" | "PO_R2" | "PO_QF" | "PO_FINAL";
export type BestOf = "BO3" | "BO5";

export type PlayoffMatch = {
  id: BracketMatchId;
  title: string;
  datetime: string;
  bestOf: BestOf;
  left: string;
  right: string;
  note?: string;
  details: string[];
};

export type PrizeTone = "gold" | "silver" | "bronze" | "neutral";

export const OFFICIAL_CHZZK_CUP_URL =
  "https://chzzk.naver.com/event/chzzkcup2025";
export const OFFLINE_BOOKING_URL =
  "https://booking.naver.com/booking/12/bizes/1537001";

export const MATCH_MODE_LABEL: Record<MatchMode, string> = {
  ONLINE: "온라인",
  OFFLINE: "오프라인",
};

export const MATCH_MODE_BADGE_CLASS: Record<MatchMode, string> = {
  ONLINE:
    "inline-flex justify-center items-center h-7 px-3 rounded-full border border-chzzkBorder bg-white/10 text-xs font-semibold whitespace-nowrap text-chzzkTextSecondary",
  OFFLINE:
    "inline-flex justify-center items-center h-7 px-3 rounded-full border border-chzzkAccent/60 bg-chzzkAccent text-xs font-semibold whitespace-nowrap text-chzzkBackground shadow-[0_0_18px_rgba(0,255,163,0.35)]",
};

export const PRIZE_TONE_BORDER_CLASS: Record<PrizeTone, string> = {
  gold: "border-chzzkAccent/30",
  silver: "border-white/15",
  bronze: "border-white/10",
  neutral: "border-chzzkBorder",
};

export const SCHEDULE_PHASES: SchedulePhase[] = [
  {
    id: "DRAFT",
    title: "팀원 선발 드래프트",
    datetime: "11/26 (수) 18:00",
    mode: "ONLINE",
    summary: "스네이크 방식으로 팀을 구성합니다.",
    details: [
      "진행 방식: 스네이크 드래프트",
      "선발 순서: 사전 평가된 팀장 순위 기준(낮은 순위부터 시작)",
      "온라인 진행",
    ],
  },
  {
    id: "LEAGUE",
    title: "예선 풀리그",
    datetime: "11/29 (토) ~ 12/2 (화) 매일 18:00",
    mode: "ONLINE",
    summary: "단판 더블 라운드 로빈, 총 20경기 진행.",
    details: [
      "포맷: 단판 더블 라운드 로빈",
      "더블 라운드 로빈: 모든 팀이 서로를 두 번씩 단판으로 상대",
      "총 경기: 20경기",
      "온라인 진행",
    ],
  },
  {
    id: "WILDCARD",
    title: "와일드카드전 (4·5위 결정전)",
    datetime: "12/3 (수) 18:00",
    mode: "ONLINE",
    summary: "플레이오프 진출 팀을 확정합니다.",
    details: ["대상: 4위 vs 5위", "온라인 진행"],
  },
  {
    id: "PLAYOFF",
    title: "플레이오프",
    datetime: "12/6 (토) ~ 12/7 (일) 13:00",
    mode: "OFFLINE",
    summary: "하드 피어리스 룰로 진행됩니다.",
    details: [
      "룰: 하드 피어리스",
      "오프라인 진행",
      "브라켓은 ‘플레이오프 한눈에’에서 확인",
    ],
  },
];

export const OFFLINE_TICKET_INFO = {
  title: "플레이오프 오프라인 예매",
  venue: "부산 e스포츠 경기장 아레나",
  dates: "12/6 (토) ~ 12/7 (일) 매일 13:00",
  open: "11/28 (금) 16:00",
  note: "※ 상세 내용은 예매 페이지에서 확인하실 수 있으며, 해당 내용은 공식 안내 기준으로 변동될 수 있습니다.",
};

export const TOURNAMENT_RULES: string[] = [
  "팀원 선발은 스네이크 드래프트로 진행",
  "사전 팀원 평가 기반 팀장 순위에 따라 낮은 순위 팀장부터 순차 선발",
  "예선 풀리그는 단판 더블 라운드 로빈으로 총 20경기 진행",
  "성적에 따라 와일드카드전 및 플레이오프 진출 팀 결정",
];

export const PLAYOFF_MATCHES: PlayoffMatch[] = [
  {
    id: "PO_R1",
    title: "플레이오프 1R",
    datetime: "12/6 (토)",
    bestOf: "BO3",
    left: "풀리그 1위 팀",
    right: "풀리그 2위 팀",
    note: "승리팀: 결승 직행",
    details: [
      "포맷: BO3",
      "승리팀은 결승전으로 직행합니다.",
      "패배팀은 ‘결승 진출전’으로 이동합니다.",
    ],
  },
  {
    id: "PO_R2",
    title: "플레이오프 2R",
    datetime: "12/6 (토)",
    bestOf: "BO5",
    left: "풀리그 3위 팀",
    right: "와일드카드전 승리팀",
    note: "승리팀: 결승 진출전 진출",
    details: ["포맷: BO5", "승리팀은 ‘결승 진출전’으로 이동합니다."],
  },
  {
    id: "PO_QF",
    title: "결승 진출전",
    datetime: "12/7 (일)",
    bestOf: "BO3",
    left: "플레이오프 1R 패배팀",
    right: "플레이오프 2R 승리팀",
    note: "승리팀: 결승 진출",
    details: ["포맷: BO3", "승리팀이 결승전에 진출합니다."],
  },
  {
    id: "PO_FINAL",
    title: "결승전",
    datetime: "12/7 (일)",
    bestOf: "BO5",
    left: "플레이오프 1R 승리팀",
    right: "결승 진출전 승리팀",
    details: ["포맷: BO5", "치지직컵 최종 우승팀이 결정됩니다."],
  },
];

export const PRIZE_POOL = {
  title: "우승 상금",
  desc: "2025 CHZZK CUP 상금 규모",
  subDesc: "상금/세부 내용은 공식 안내 기준으로 변동될 수 있습니다.",
  totalLabel: "총 상금",
  totalValue: "30,000,000원",
  items: [
    { label: "우승", value: "1,500만원", tone: "gold" as PrizeTone },
    { label: "준우승", value: "750만원", tone: "silver" as PrizeTone },
    { label: "3등", value: "500만원", tone: "bronze" as PrizeTone },
    { label: "4등", value: "250만원", tone: "neutral" as PrizeTone },
  ],
} as const;
