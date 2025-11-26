"use client";

import { MATCH_MODE_BADGE_CLASS, MATCH_MODE_LABEL, MatchMode } from "@/constants/chzzk-cup/chzzk-cup-schedule-data";

type MatchModeBadgeProps = {
  mode: MatchMode;
};

export default function MatchModeBadge({ mode }: MatchModeBadgeProps) {
  return <span className={MATCH_MODE_BADGE_CLASS[mode]}>{MATCH_MODE_LABEL[mode]}</span>;
}
