"use client";

import { ChzzkCupPlayer, Line } from "@/types/chzzk-cup";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import ChzzkCupPlayerCard from "./chzzk-cup-player-card";

type PlayerPoolByLine = Record<Line, string[]>;

type Props = {
  lines: Line[];
  playerPool: PlayerPoolByLine;
  playersById: Record<string, ChzzkCupPlayer>;
};

const LINE_LABEL: Record<Line, string> = {
  TOP: "TOP",
  MID: "MID",
  AD: "AD",
  SUP: "SUP",
};

export default function ChzzkCupLineBoard({
  lines,
  playerPool,
  playersById,
}: Props) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-chzzkBorder bg-chzzkPanel px-4 pt-4 py-6">
      <header className="mb-1 flex items-center justify-between">
        <h2 className="font-semibold text-chzzkTextPrimary">
          라인별 선수 리스트
        </h2>
      </header>

      <div className="flex flex-col gap-4">
        {lines.map((line) => {
          const playerIds = playerPool[line];
          const lineLabel = LINE_LABEL[line];

          return (
            <div
              key={line}
              className="rounded-lg border border-chzzkBorder/80 bg-chzzkBackground/60 px-3 py-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-chzzkTextPrimary">
                  {lineLabel}
                </span>
                <span className="text-[11px] text-chzzkTextSecondary">
                  남은 선수: {playerIds.length}명
                </span>
              </div>

              <Droppable
                droppableId={`pool-${line}`}
                direction="horizontal"
                type="PLAYER"
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="grid grid-cols-5 gap-3"
                  >
                    {playerIds.map((playerId, index) => {
                      const player = playersById[playerId];
                      if (!player) return null;

                      return (
                        <Draggable
                          key={player.id}
                          draggableId={player.id}
                          index={index}
                        >
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
                                lineLabel={LINE_LABEL[player.line]}
                                size="md"
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </section>
  );
}
