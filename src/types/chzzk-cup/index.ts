import type { StaticImageData } from "next/image";

export type Line = "TOP" | "MID" | "AD" | "SUP";

export interface ChzzkCupPlayer {
  id: string;
  nickname: string;
  line: Line;
  profileImage: StaticImageData;
}

export interface ChzzkTeam {
  id: string;
  name: string;
  captainNickname: string;
}

export interface ChzzkJungler {
  id: string;
  nickname: string;
  teamId: string;
  profileImage: StaticImageData;
}
