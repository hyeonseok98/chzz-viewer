"use client";

import Image from "next/image";

type PlayerCardSize = "sm" | "md" | "lg";

type Props = {
  imageSrc: string;
  nickname: string;
  lineLabel?: string;
  size?: PlayerCardSize; // 팀 구성: sm, 선수보드: md, 드래프트: lg
};

const CARD_SIZE_BY_VARIANT: Record<PlayerCardSize, number> = {
  sm: 46,
  md: 54,
  lg: 64,
};

export default function ChzzkCupPlayerCard({
  imageSrc,
  nickname,
  lineLabel,
  size = "md",
}: Props) {
  const profileSize = CARD_SIZE_BY_VARIANT[size];

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative overflow-hidden rounded-xl border border-chzzkAccent/80 bg-black/60"
        style={{ width: profileSize, height: profileSize }}
      >
        <Image
          src={imageSrc}
          alt={nickname}
          width={profileSize}
          height={profileSize}
          className="h-full w-full object-cover"
        />

        {lineLabel && (
          <div className="absolute bottom-0 left-0 right-0 flex h-[14px] items-center justify-center bg-black/50">
            <span className="px-1 text-[9px] font-medium leading-none text-chzzkTextPrimary">
              {lineLabel}
            </span>
          </div>
        )}
      </div>

      <div className="flex h-[18px] w-full items-center justify-center rounded-b-lg bg-black/35 px-1 mt-2 ">
        <span className="w-full h-full truncate text-center text-xs leading-none text-chzzkTextPrimary">
          {nickname}
        </span>
      </div>
    </div>
  );
}
