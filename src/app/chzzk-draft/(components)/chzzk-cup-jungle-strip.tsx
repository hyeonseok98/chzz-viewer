"use client";

import { CHZZK_CUP_JUNGLERS } from "@/constants/chzzk-cup/chzzk-cup-draft-data";
import { ChzzkJungler } from "@/types/chzzk-cup";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import Image from "next/image";

type Props = {
  junglerOrder: string[];
};

export default function ChzzkCupJungleStrip({ junglerOrder }: Props) {
  const junglersById: Record<string, ChzzkJungler> = {};
  CHZZK_CUP_JUNGLERS.forEach((jungler) => {
    junglersById[jungler.id] = jungler;
  });

  return (
    <section className="rounded-xl border border-chzzkBorder bg-chzzkPanel px-4 pt-5 pb-4">
      <header className="mb-2 flex items-center justify-between">
        <h2 className="font-semibold text-chzzkTextPrimary">
          정글 순서{" "}
          <span className="text-[11px] font-normal text-chzzkTextSecondary">
            (드래그해서 순서를 변경하세요)
          </span>
        </h2>
      </header>

      <Droppable droppableId="junglers" direction="horizontal" type="JUNGLE">
        {(droppableProvided) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className="flex gap-3"
          >
            {junglerOrder.map((junglerId, index) => {
              const jungler = junglersById[junglerId];
              if (!jungler) return null;

              return (
                <Draggable
                  key={jungler.id}
                  draggableId={jungler.id}
                  index={index}
                >
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      className={`flex cursor-grab flex-col items-center gap-1 ${
                        draggableSnapshot.isDragging ? "opacity-80" : ""
                      }`}
                    >
                      <div className="overflow-hidden rounded-xl border border-chzzkAccent/80 bg-black/60">
                        <Image
                          src={jungler.profileImage}
                          alt={jungler.nickname}
                          width={52}
                          height={52}
                          className="h-[52px] w-[52px] object-cover"
                        />
                      </div>
                      <span className="w-full truncate text-center text-[10px] text-chzzkTextPrimary">
                        {jungler.nickname}
                      </span>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
}
