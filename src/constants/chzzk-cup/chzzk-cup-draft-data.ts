import { ChzzkCupPlayer, ChzzkJungler, ChzzkTeam } from "@/types/chzzk-cup";

// TOP
import topKimbbong from "@/assets/chzzk-cup/player-profile/top/top-김뿡-default.webp";
import topLooksam from "@/assets/chzzk-cup/player-profile/top/top-룩삼-default.webp";
import topYoondera from "@/assets/chzzk-cup/player-profile/top/top-운타라-default.webp";
import topYoonganom from "@/assets/chzzk-cup/player-profile/top/top-윤가놈-default.webp";
import topHandongsuk from "@/assets/chzzk-cup/player-profile/top/top-한동숙-default.webp";

// JG
import jgGangmom from "@/assets/chzzk-cup/player-profile/jg/jg-갱맘-default.webp";
import jgBang from "@/assets/chzzk-cup/player-profile/jg/jg-뱅-default.webp";
import jgSourf from "@/assets/chzzk-cup/player-profile/jg/jg-소우릎-default.webp";
import jgWolf from "@/assets/chzzk-cup/player-profile/jg/jg-울프-default.webp";
import jgQuvee from "@/assets/chzzk-cup/player-profile/jg/jg-큐베-default.webp";

// MID
import midLalo from "@/assets/chzzk-cup/player-profile/mid/mid-랄로-default.webp";
import midAmbition from "@/assets/chzzk-cup/player-profile/mid/mid-앰비션-default.webp";
import midInsek from "@/assets/chzzk-cup/player-profile/mid/mid-인섹-default.webp";
import midTrollya from "@/assets/chzzk-cup/player-profile/mid/mid-트롤야-default.webp";
import midPhoenixpark from "@/assets/chzzk-cup/player-profile/mid/mid-피닉스박-default.webp";

// AD
import adMonsterRat from "@/assets/chzzk-cup/player-profile/ad/ad-괴물쥐-default.webp";
import adDdahyoni from "@/assets/chzzk-cup/player-profile/ad/ad-따효니-default.webp";
import adRunner from "@/assets/chzzk-cup/player-profile/ad/ad-러너-default.webp";
import adMyunghoon from "@/assets/chzzk-cup/player-profile/ad/ad-명예훈장-default.webp";
import adSamsik from "@/assets/chzzk-cup/player-profile/ad/ad-삼식-default.webp";

// SUPPORT
import supDawn from "@/assets/chzzk-cup/player-profile/sup/sup-던-default.webp";
import supSopungwanni from "@/assets/chzzk-cup/player-profile/sup/sup-소풍왔니-default.webp";
import supSondangmu from "@/assets/chzzk-cup/player-profile/sup/sup-순당무-default.webp";
import supHumanjelly from "@/assets/chzzk-cup/player-profile/sup/sup-인간젤리-default.webp";
import supPurin from "@/assets/chzzk-cup/player-profile/sup/sup-푸린-default.webp";

export const CHZZK_CUP_TEAMS: ChzzkTeam[] = [
  { id: "GANGMOM", name: "갱맘 팀", captainNickname: "갱맘" },
  { id: "BANG", name: "뱅 팀", captainNickname: "뱅" },
  { id: "WOLF", name: "울프 팀", captainNickname: "울프" },
  { id: "SOURF", name: "소우릎 팀", captainNickname: "인섹" },
  { id: "QUVEE", name: "큐베 팀", captainNickname: "큐베" },
];

export const CHZZK_CUP_PLAYERS: ChzzkCupPlayer[] = [
  { id: "KIMBBONG", nickname: "김뿡", line: "TOP", profileImage: topKimbbong },
  { id: "LOOKSAM", nickname: "룩삼", line: "TOP", profileImage: topLooksam },
  {
    id: "YOONDERA",
    nickname: "운타라",
    line: "TOP",
    profileImage: topYoondera,
  },
  {
    id: "Yoonganom",
    nickname: "윤가놈",
    line: "TOP",
    profileImage: topYoonganom,
  },
  {
    id: "HANDONGSUK",
    nickname: "한동숙",
    line: "TOP",
    profileImage: topHandongsuk,
  },

  { id: "LALO", nickname: "랄로", line: "MID", profileImage: midLalo },
  {
    id: "AMBITION",
    nickname: "앰비션",
    line: "MID",
    profileImage: midAmbition,
  },
  { id: "INSEK", nickname: "인섹", line: "MID", profileImage: midInsek },
  { id: "TROLLYA", nickname: "트롤야", line: "MID", profileImage: midTrollya },
  {
    id: "PHOENIXPARK",
    nickname: "피닉스박",
    line: "MID",
    profileImage: midPhoenixpark,
  },

  {
    id: "MONSTERRAT",
    nickname: "괴물쥐",
    line: "AD",
    profileImage: adMonsterRat,
  },
  {
    id: "DDAHYONI",
    nickname: "따효니",
    line: "AD",
    profileImage: adDdahyoni,
  },
  { id: "RUNNER", nickname: "러너", line: "AD", profileImage: adRunner },
  {
    id: "MYUNGHOON",
    nickname: "명예훈장",
    line: "AD",
    profileImage: adMyunghoon,
  },
  { id: "SAMSIK", nickname: "삼식", line: "AD", profileImage: adSamsik },

  { id: "DAWN", nickname: "던", line: "SUP", profileImage: supDawn },
  {
    id: "SOPUNGWANNI",
    nickname: "소풍왔니",
    line: "SUP",
    profileImage: supSopungwanni,
  },
  {
    id: "SONDANGMU",
    nickname: "순당무",
    line: "SUP",
    profileImage: supSondangmu,
  },
  {
    id: "HUMANJELLY",
    nickname: "인간젤리",
    line: "SUP",
    profileImage: supHumanjelly,
  },
  { id: "PURIN", nickname: "푸린", line: "SUP", profileImage: supPurin },
];

export const CHZZK_CUP_JUNGLERS: ChzzkJungler[] = [
  {
    id: "GANGMOM_JG",
    nickname: "갱맘",
    teamId: "GANGMOM",
    profileImage: jgGangmom,
  },
  {
    id: "BANG_JG",
    nickname: "뱅",
    teamId: "BANG",
    profileImage: jgBang,
  },
  {
    id: "WOLF_JG",
    nickname: "울프",
    teamId: "WOLF",
    profileImage: jgWolf,
  },
  {
    id: "SOURF_JG",
    nickname: "소우릎",
    teamId: "SOURF",
    profileImage: jgSourf,
  },
  {
    id: "QUVEE_JG",
    nickname: "큐베",
    teamId: "QUVEE",
    profileImage: jgQuvee,
  },
];

export const CHZZK_SNAKE_ROWS: number[][] = [
  [1, 10, 11, 20],
  [2, 9, 12, 19],
  [3, 8, 13, 18],
  [4, 7, 14, 17],
  [5, 6, 15, 16],
];

export const CHZZK_TEAM_LABELS = ["1팀", "2팀", "3팀", "4팀", "5팀"];
