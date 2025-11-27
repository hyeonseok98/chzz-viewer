import { ChzzkTeamId } from "@/types/chzzk-cup";

export type ChzzkCupRole = "TOP" | "JUNGLE" | "MID" | "ADC" | "SUP";

export type ChzzkCupPlayer = {
  role: ChzzkCupRole;
  name: string;
  imageSrc: string;
  isCaptain?: boolean;
};

export type ChzzkCupTeam = {
  id: ChzzkTeamId;
  displayName: string;
  teamLabel: string;
  accent: "emerald" | "sky" | "amber" | "fuchsia" | "rose";
  roster: ChzzkCupPlayer[];
};

export const CHZZK_CUP_TEAMS: ChzzkCupTeam[] = [
  {
    id: "WOLF",
    displayName: "도개걸운모",
    teamLabel: "울프 팀",
    accent: "emerald",
    roster: [
      {
        role: "TOP",
        name: "운타라",
        imageSrc: "/chzzk-cup/teams/players/운타라.png",
      },
      {
        role: "JUNGLE",
        name: "울프",
        imageSrc: "/chzzk-cup/teams/players/울프.png",
        isCaptain: true,
      },
      {
        role: "MID",
        name: "트롤야",
        imageSrc: "/chzzk-cup/teams/players/트롤야.png",
      },
      {
        role: "ADC",
        name: "삼식",
        imageSrc: "/chzzk-cup/teams/players/삼식.png",
      },
      {
        role: "SUP",
        name: "인간젤리",
        imageSrc: "/chzzk-cup/teams/players/인간젤리.png",
      },
    ],
  },
  {
    id: "SOURF",
    displayName: "5%",
    teamLabel: "소우릎 팀",
    accent: "sky",
    roster: [
      {
        role: "TOP",
        name: "룩삼",
        imageSrc: "/chzzk-cup/teams/players/룩삼.png",
      },
      {
        role: "JUNGLE",
        name: "소우릎",
        imageSrc: "/chzzk-cup/teams/players/소우릎.png",
        isCaptain: true,
      },
      {
        role: "MID",
        name: "인섹",
        imageSrc: "/chzzk-cup/teams/players/인섹.png",
      },
      {
        role: "ADC",
        name: "러너",
        imageSrc: "/chzzk-cup/teams/players/러너.png",
      },
      {
        role: "SUP",
        name: "순당무",
        imageSrc: "/chzzk-cup/teams/players/순당무.png",
      },
    ],
  },
  {
    id: "GANGMOM",
    displayName: "부산행",
    teamLabel: "갱맘 팀",
    accent: "amber",
    roster: [
      {
        role: "TOP",
        name: "윤가놈",
        imageSrc: "/chzzk-cup/teams/players/윤가놈.png",
      },
      {
        role: "JUNGLE",
        name: "갱맘",
        imageSrc: "/chzzk-cup/teams/players/갱맘.png",
        isCaptain: true,
      },
      {
        role: "MID",
        name: "랄로",
        imageSrc: "/chzzk-cup/teams/players/랄로.png",
      },
      {
        role: "ADC",
        name: "괴물쥐",
        imageSrc: "/chzzk-cup/teams/players/괴물쥐.png",
      },
      {
        role: "SUP",
        name: "푸린",
        imageSrc: "/chzzk-cup/teams/players/푸린.png",
      },
    ],
  },
  {
    id: "BANG",
    displayName: "구도는 에휴",
    teamLabel: "뱅 팀",
    accent: "fuchsia",
    roster: [
      {
        role: "TOP",
        name: "김뿡",
        imageSrc: "/chzzk-cup/teams/players/김뿡.png",
      },
      {
        role: "JUNGLE",
        name: "뱅",
        imageSrc: "/chzzk-cup/teams/players/뱅.png",
        isCaptain: true,
      },
      {
        role: "MID",
        name: "피닉스박",
        imageSrc: "/chzzk-cup/teams/players/피닉스박.png",
      },
      {
        role: "ADC",
        name: "따효니",
        imageSrc: "/chzzk-cup/teams/players/따효니.png",
      },
      { role: "SUP", name: "던", imageSrc: "/chzzk-cup/teams/players/던.png" },
    ],
  },
  {
    id: "CUVEE",
    displayName: "엠큐베이턱",
    teamLabel: "큐베 팀",
    accent: "rose",
    roster: [
      {
        role: "TOP",
        name: "한동숙",
        imageSrc: "/chzzk-cup/teams/players/한동숙.png",
      },
      {
        role: "JUNGLE",
        name: "큐베",
        imageSrc: "/chzzk-cup/teams/players/큐베.png",
        isCaptain: true,
      },
      {
        role: "MID",
        name: "앰비션",
        imageSrc: "/chzzk-cup/teams/players/앰비션.png",
      },
      {
        role: "ADC",
        name: "명예훈장",
        imageSrc: "/chzzk-cup/teams/players/명예훈장.png",
      },
      {
        role: "SUP",
        name: "소풍왔니",
        imageSrc: "/chzzk-cup/teams/players/소풍왔니.png",
      },
    ],
  },
];

export const CHZZK_CUP_TEAM_BY_ID = Object.fromEntries(
  CHZZK_CUP_TEAMS.map((t) => [t.id, t])
) as Record<ChzzkTeamId, ChzzkCupTeam>;
