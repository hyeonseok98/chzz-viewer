"use client";

import {
  CHZZK_CUP_JUNGLERS,
  CHZZK_CUP_PLAYERS,
  CHZZK_CUP_TEAMS,
} from "@/constants/chzzk-cup/chzzk-cup-draft-data";
import {
  ChzzkCupPlayer,
  ChzzkJungler,
  ChzzkTeam,
  Line,
} from "@/types/chzzk-cup";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useMemo, useState } from "react";

import ChzzkCupJungleStrip from "./chzzk-cup-jungle-strip";
import ChzzkCupLineBoard from "./chzzk-cup-line-board";
import ChzzkCupSnakeGrid, {
  DraftPicksState,
  DraftSlot,
  DraftSlotId,
  buildSnakeOrder,
} from "./chzzk-cup-snake-grid";
import ChzzkCupTeamList from "./chzzk-cup-team-list";

const LINES: Line[] = ["TOP", "MID", "AD", "SUP"];

type PlayerPoolByLine = Record<Line, string[]>;

function buildInitialPlayerPool(): PlayerPoolByLine {
  const initialPool: PlayerPoolByLine = {
    TOP: [],
    MID: [],
    AD: [],
    SUP: [],
  };

  CHZZK_CUP_PLAYERS.forEach((player) => {
    initialPool[player.line].push(player.id);
  });

  return initialPool;
}

function buildEmptyPicks(slots: DraftSlot[]): DraftPicksState {
  const pickMap: DraftPicksState = {};
  slots.forEach((slot) => {
    pickMap[slot.id] = null;
  });
  return pickMap;
}

export default function ChzzkCupDraft() {
  // 정글 순서 (정글러 id 배열)
  const [junglerOrder, setJunglerOrder] = useState<string[]>(
    CHZZK_CUP_JUNGLERS.map((jungler) => jungler.id)
  );

  // 라인별 남은 선수 풀
  const [playerPool, setPlayerPool] = useState<PlayerPoolByLine>(
    buildInitialPlayerPool
  );

  // 스네이크 드래프트 슬롯 (정글러 수 기준 고정)
  const snakeSlots = useMemo(
    () => buildSnakeOrder(CHZZK_CUP_JUNGLERS.length),
    []
  );

  // 슬롯별 픽된 선수
  const [draftPicks, setDraftPicks] = useState<DraftPicksState>(() =>
    buildEmptyPicks(snakeSlots)
  );

  // id → 객체 매핑
  const playersById: Record<string, ChzzkCupPlayer> = useMemo(() => {
    const playerMap: Record<string, ChzzkCupPlayer> = {};
    CHZZK_CUP_PLAYERS.forEach((player) => {
      playerMap[player.id] = player;
    });
    return playerMap;
  }, []);

  const teamsById: Record<string, ChzzkTeam> = useMemo(() => {
    const teamMap: Record<string, ChzzkTeam> = {};
    CHZZK_CUP_TEAMS.forEach((team) => {
      teamMap[team.id] = team;
    });
    return teamMap;
  }, []);

  const junglersById: Record<string, ChzzkJungler> = useMemo(() => {
    const junglerMap: Record<string, ChzzkJungler> = {};
    CHZZK_CUP_JUNGLERS.forEach((jungler) => {
      junglerMap[jungler.id] = jungler;
    });
    return junglerMap;
  }, []);

  const slotsById: Record<DraftSlotId, DraftSlot> = useMemo(() => {
    const slotMap: Record<DraftSlotId, DraftSlot> = {} as Record<
      DraftSlotId,
      DraftSlot
    >;
    snakeSlots.forEach((slot) => {
      slotMap[slot.id] = slot;
    });
    return slotMap;
  }, [snakeSlots]);

  // 팀이 이미 해당 라인을 가지고 있는지 검사 (풀 → 슬롯 이동 시)
  const teamAlreadyHasLine = (
    teamIndex: number,
    line: Line,
    targetSlotId?: DraftSlotId
  ): boolean => {
    return snakeSlots.some((slot) => {
      if (slot.teamIndex !== teamIndex) return false;
      if (targetSlotId && slot.id === targetSlotId) return false;

      const playerId = draftPicks[slot.id];
      if (!playerId) return false;

      const player = playersById[playerId];
      return player.line === line;
    });
  };

  const handleReset = () => {
    setJunglerOrder(CHZZK_CUP_JUNGLERS.map((jungler) => jungler.id));
    setPlayerPool(buildInitialPlayerPool());
    setDraftPicks(buildEmptyPicks(snakeSlots));
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) return;

    // 정글 순서 재배치
    if (type === "JUNGLE") {
      if (source.index === destination.index) return;

      setJunglerOrder((previousOrder) => {
        const nextOrder = [...previousOrder];
        const [movedId] = nextOrder.splice(source.index, 1);
        nextOrder.splice(destination.index, 0, movedId);
        return nextOrder;
      });

      return;
    }

    // 선수 이동
    if (type !== "PLAYER") return;

    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    const sourceIsPool = sourceId.startsWith("pool-");
    const destinationIsPool = destinationId.startsWith("pool-");
    const sourceIsSlot = sourceId.startsWith("slot-");
    const destinationIsSlot = destinationId.startsWith("slot-");

    // 같은 풀 안에서 순서만 변경
    if (sourceIsPool && destinationIsPool && sourceId === destinationId) {
      const [, lineKey] = sourceId.split("pool-");
      const line = lineKey as Line;

      setPlayerPool((previousPool) => {
        const nextPool: PlayerPoolByLine = { ...previousPool };
        const copiedLinePool = [...nextPool[line]];

        const [movedPlayerId] = copiedLinePool.splice(source.index, 1);
        copiedLinePool.splice(destination.index, 0, movedPlayerId);

        nextPool[line] = copiedLinePool;
        return nextPool;
      });

      return;
    }

    // 풀 → 슬롯
    if (sourceIsPool && destinationIsSlot) {
      const [, lineKey] = sourceId.split("pool-");
      const playerLine = lineKey as Line;

      const targetSlotId = destinationId as DraftSlotId;
      const targetSlot = slotsById[targetSlotId];
      if (!targetSlot) return;

      const targetTeamIndex = targetSlot.teamIndex;

      // 이미 해당 팀에 그 라인이 있으면 무시
      if (teamAlreadyHasLine(targetTeamIndex, playerLine, targetSlotId)) {
        return;
      }

      const previousPlayerInSlotId = draftPicks[targetSlotId];

      setPlayerPool((previousPool) => {
        const nextPool: PlayerPoolByLine = { ...previousPool };

        // 풀에서 드래그한 선수 제거
        const currentLinePool = [...nextPool[playerLine]];
        nextPool[playerLine] = currentLinePool.filter(
          (playerId) => playerId !== draggableId
        );

        // 슬롯에 원래 있던 선수가 있었다면 다시 풀에 넣기
        if (previousPlayerInSlotId) {
          const previousPlayer = playersById[previousPlayerInSlotId];
          const updatedLinePool = [
            ...nextPool[previousPlayer.line],
            previousPlayerInSlotId,
          ];
          nextPool[previousPlayer.line] = updatedLinePool;
        }

        return nextPool;
      });

      setDraftPicks((previousPicks) => {
        const nextPicks: DraftPicksState = { ...previousPicks };
        nextPicks[targetSlotId] = draggableId;
        return nextPicks;
      });

      return;
    }

    // 슬롯 → 풀
    if (sourceIsSlot && destinationIsPool) {
      const sourceSlotId = sourceId as DraftSlotId;
      const playerIdInSlot = draftPicks[sourceSlotId];
      if (!playerIdInSlot) return;

      const targetLine = destinationId.replace("pool-", "") as Line;
      const player = playersById[playerIdInSlot];
      if (!player || player.line !== targetLine) return;

      setDraftPicks((previousPicks) => {
        const nextPicks: DraftPicksState = { ...previousPicks };
        nextPicks[sourceSlotId] = null;
        return nextPicks;
      });

      setPlayerPool((previousPool) => {
        const nextPool: PlayerPoolByLine = { ...previousPool };
        const updatedLinePool = [...nextPool[targetLine], playerIdInSlot];
        nextPool[targetLine] = updatedLinePool;
        return nextPool;
      });

      return;
    }

    // 슬롯 ↔ 슬롯 (스왑)
    if (sourceIsSlot && destinationIsSlot) {
      const fromSlotId = sourceId as DraftSlotId;
      const toSlotId = destinationId as DraftSlotId;
      if (fromSlotId === toSlotId) return;

      setDraftPicks((previousPicks) => {
        const nextPicks: DraftPicksState = { ...previousPicks };
        const fromPlayerId = nextPicks[fromSlotId];
        const toPlayerId = nextPicks[toSlotId];

        nextPicks[fromSlotId] = toPlayerId;
        nextPicks[toSlotId] = fromPlayerId;

        return nextPicks;
      });
    }
  };

  return (
    <main className="min-h-screen bg-chzzkBackground text-chzzkTextPrimary">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-6 pt-4 py-1">
        <header className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-chzzkAccent">
            CHZZK CUP
          </span>
          <h1 className="text-lg font-semibold">
            치지직컵 · 모의 스네이크 드래프트 팬사이트(Beta)
          </h1>
        </header>

        <DragDropContext onDragEnd={handleDragEnd}>
          <section className="grid grid-cols-[360px_minmax(380px,0.9fr)_minmax(460px,1.05fr)] items-stretch gap-4 pb-6">
            {/* 좌측 : 팀 구성 */}
            <div className="flex h-full">
              <ChzzkCupTeamList
                junglerOrder={junglerOrder}
                junglersById={junglersById}
                teamsById={teamsById}
                playersById={playersById}
                slots={snakeSlots}
                picks={draftPicks}
              />
            </div>

            {/* 중앙 : 정글 순서 + 라인별 선수 보드 */}
            <div className="flex h-full flex-col gap-4">
              <ChzzkCupJungleStrip junglerOrder={junglerOrder} />
              <ChzzkCupLineBoard
                lines={LINES}
                playerPool={playerPool}
                playersById={playersById}
              />
            </div>

            {/* 우측 : 스네이크 드래프트 */}
            <div className="flex h-full">
              <ChzzkCupSnakeGrid
                junglerOrder={junglerOrder}
                junglersById={junglersById}
                teamsById={teamsById}
                playersById={playersById}
                slots={snakeSlots}
                picks={draftPicks}
                onReset={handleReset}
              />
            </div>
          </section>
        </DragDropContext>
      </div>
    </main>
  );
}
