"use client";

import { CHZZK_SNAKE_ROWS } from "@/constants/chzzk-cup/chzzk-cup-draft-data";
import { ChzzkCupPlayer, ChzzkJungler, ChzzkTeam } from "@/types/chzzk-cup";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import ChzzkCupPlayerCard from "./chzzk-cup-player-card";

export type DraftSlotId = `slot-${number}-${number}`;

export type DraftSlot = {
  id: DraftSlotId;
  teamIndex: number;
  pickNumber: number;
};

export type DraftPicksState = Record<DraftSlotId, string | null>;

export function buildSnakeOrder(junglerCount: number): DraftSlot[] {
  const slots: DraftSlot[] = [];

  for (let teamIndex = 0; teamIndex < junglerCount; teamIndex += 1) {
    for (let columnIndex = 0; columnIndex < 4; columnIndex += 1) {
      slots.push({
        id: `slot-${teamIndex}-${columnIndex}`,
        teamIndex,
        pickNumber: CHZZK_SNAKE_ROWS[teamIndex][columnIndex],
      });
    }
  }

  return slots;
}

type Props = {
  junglerOrder: string[];
  junglersById: Record<string, ChzzkJungler>;
  teamsById: Record<string, ChzzkTeam>;
  playersById: Record<string, ChzzkCupPlayer>;
  slots: DraftSlot[];
  picks: DraftPicksState;
  onReset(): void;
};

export default function ChzzkCupSnakeGrid({
  junglerOrder,
  junglersById,
  teamsById,
  playersById,
  slots,
  picks,
  onReset,
}: Props) {
  const slotsByTeamIndex: Record<number, DraftSlot[]> = {};
  slots.forEach((slot) => {
    if (!slotsByTeamIndex[slot.teamIndex]) {
      slotsByTeamIndex[slot.teamIndex] = [];
    }
    slotsByTeamIndex[slot.teamIndex].push(slot);
  });

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-chzzkBorder bg-chzzkPanel px-4 pt-4">
      <header className="mb-1 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-chzzkTextPrimary">
            스네이크 드래프트 순서
          </h2>
          <p className="mt-[3px] text-[11px] text-chzzkTextSecondary">
            1. 왼쪽의 정글 순서 탭을 통해 드래프트 순서를 정해주세요.
            <br />
            2. 선수 리스트의 스트리머 프로필을 번호 칸에 드래그 앤 드롭하면
            자동으로 팀이 구성됩니다.
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-chzzkAccent bg-chzzkAccent/10 px-3 py-1 text-[11px] font-semibold text-chzzkAccent whitespace-nowrap"
        >
          초기화
        </button>
      </header>

      <div className="flex flex-col gap-3">
        {junglerOrder.map((junglerId, teamIndex) => {
          const jungler = junglersById[junglerId];
          if (!jungler) return null;

          const team = teamsById[jungler.teamId];
          const teamSlots = slotsByTeamIndex[teamIndex] ?? [];

          return (
            <div
              key={jungler.id}
              className="flex items-center gap-3 rounded-lg border border-chzzkBorder/80 bg-chzzkBackground/70 px-3 py-2"
            >
              {/* 왼쪽 : 팀장 + 팀 이름 */}
              <div className="flex w-[160px] items-center gap-2">
                <ChzzkCupPlayerCard
                  imageSrc={jungler.profileImage.src}
                  nickname={jungler.nickname}
                  lineLabel="JG"
                  size="lg"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-chzzkTextPrimary">
                    {team ? team.name : `${teamIndex + 1}팀`}
                  </span>
                  <span className="text-[11px] text-chzzkTextSecondary">
                    {teamIndex + 1}팀
                  </span>
                </div>
              </div>

              {/* 오른쪽 : 드래프트 슬롯 4개 */}
              <div className="flex flex-1 items-center gap-3">
                {teamSlots.map((slot) => {
                  const playerId = picks[slot.id];
                  const player = playerId ? playersById[playerId] : null;

                  return (
                    <Droppable
                      droppableId={slot.id}
                      key={slot.id}
                      type="PLAYER"
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="flex h-[92px] w-[82px] items-center justify-center rounded-lg border border-dashed border-chzzkBorder/80 bg-chzzkBackground/60"
                        >
                          {!player && (
                            <span className="text-[11px] text-chzzkTextSecondary">
                              {slot.pickNumber}
                            </span>
                          )}

                          {player && (
                            <Draggable draggableId={slot.id} index={0}>
                              {(dragProvided, dragSnapshot) => (
                                <div
                                  ref={dragProvided.innerRef}
                                  {...dragProvided.draggableProps}
                                  {...dragProvided.dragHandleProps}
                                  className={
                                    dragSnapshot.isDragging ? "opacity-80" : ""
                                  }
                                >
                                  <ChzzkCupPlayerCard
                                    imageSrc={player.profileImage.src}
                                    nickname={player.nickname}
                                    lineLabel={
                                      player.line === "AD" ? "AD" : player.line
                                    }
                                    size="lg"
                                  />
                                </div>
                              )}
                            </Draggable>
                          )}
                        </div>
                      )}
                    </Droppable>
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
