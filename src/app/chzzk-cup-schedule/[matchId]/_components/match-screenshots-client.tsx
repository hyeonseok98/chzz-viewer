"use client";

import ZoomableImage from "@/components/zoomable-image";
import Image from "next/image";
import { useState } from "react";

export default function MatchScreenshotsClient({
  screenshots,
}: {
  screenshots: Array<{ index: number; src: string; alt: string }>;
}) {
  const [open, setOpen] = useState<{ src: string; index: number } | null>(null);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {screenshots.map((shot) => (
          <ZoomableImage
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            label={`GAME ${shot.index}`}
            emptyText="아직 경기 전입니다"
            className="w-full"
          />
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div
            className="absolute left-1/2 top-1/2 w-[min(1100px,92vw)] -translate-x-1/2 -translate-y-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/40 shadow-2xl">
              <div className="absolute left-3 top-3 z-10 rounded-full border border-white/15 bg-black/50 px-3 py-2 text-sm font-semibold text-white/85">
                GAME {open.index}
              </div>

              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={open.src}
                  alt={`GAME ${open.index} 확대 스크린샷`}
                  fill
                  sizes="92vw"
                  className="object-contain"
                  priority
                />
              </div>

              <button
                type="button"
                onClick={() => setOpen(null)}
                className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/50 px-3 py-2 text-sm font-semibold text-white/85 hover:bg-black/65"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
