"use client";

import {
  ChzzkCupPlayer,
  ChzzkJungler,
  ChzzkTeam,
  Line,
} from "@/types/chzzk-cup";
import ChzzkCupPlayerCard from "./chzzk-cup-player-card";
import type { DraftPicksState, DraftSlot } from "./chzzk-cup-snake-grid";

type Props = {
  junglerOrder: string[];
  junglersById: Record<string, ChzzkJungler>;
  teamsById: Record<string, ChzzkTeam>;
  playersById: Record<string, ChzzkCupPlayer>;
  slots: DraftSlot[];
  picks: DraftPicksState;
};

const TEAM_ROLES: Array<Line | "JG"> = ["TOP", "JG", "MID", "AD", "SUP"];

export default function ChzzkCupTeamList({
  junglerOrder,
  junglersById,
  teamsById,
  playersById,
  slots,
  picks,
}: Props) {
  const slotsByTeamIndex: Record<number, DraftSlot[]> = {};
  slots.forEach((slot) => {
    if (!slotsByTeamIndex[slot.teamIndex]) {
      slotsByTeamIndex[slot.teamIndex] = [];
    }
    slotsByTeamIndex[slot.teamIndex].push(slot);
  });

  return (
    <section className="flex h-full flex-col gap-3 rounded-xl border border-chzzkBorder bg-chzzkPanel px-4 pt-4 py-2">
      <header className="mb-1">
        <h2 className="font-semibold text-chzzkTextPrimary">팀 구성</h2>
      </header>

      <div className="flex flex-1 flex-col gap-3">
        {junglerOrder.map((junglerId, teamIndex) => {
          const jungler = junglersById[junglerId];
          if (!jungler) return null;

          const team = teamsById[jungler.teamId];
          const teamSlots = slotsByTeamIndex[teamIndex] ?? [];

          const pickedPlayersByLine: Partial<Record<Line, ChzzkCupPlayer>> = {};
          teamSlots.forEach((slot) => {
            const playerId = picks[slot.id];
            if (!playerId) return;

            const pickedPlayer = playersById[playerId];
            if (!pickedPlayer) return;

            pickedPlayersByLine[pickedPlayer.line] = pickedPlayer;
          });

          return (
            <div
              key={jungler.id}
              className="rounded-lg border border-chzzkBorder/80 bg-chzzkBackground/70 px-3 pt-3 pb-2"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-chzzkTextPrimary">
                  {team ? team.name : `${teamIndex + 1}팀`}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-[6px]">
                {TEAM_ROLES.map((roleKey) => {
                  const isJungle = roleKey === "JG";
                  const roleLabel = isJungle ? "JG" : roleKey;
                  const player =
                    isJungle && jungler
                      ? jungler
                      : !isJungle
                      ? pickedPlayersByLine[roleKey as Line]
                      : undefined;

                  return (
                    <div
                      key={roleLabel}
                      className="flex min-h-[88px] min-w-[60px] flex-col items-center overflow-hidden rounded-lg bg-chzzkBackground/60 px-1 py-1"
                    >
                      <span className="my-[2px] text-[10px] text-chzzkTextSecondary">
                        {roleLabel}
                      </span>
                      {player && (
                        <ChzzkCupPlayerCard
                          imageSrc={player.profileImage.src}
                          nickname={player.nickname}
                          size="sm"
                          lineLabel={
                            isJungle
                              ? "JG"
                              : (roleKey as Line) === "AD"
                              ? "AD"
                              : (roleKey as Line)
                          }
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
