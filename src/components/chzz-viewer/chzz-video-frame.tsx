"use client";

import { StreamerId } from "@/lib/chzzk-streamer-id";

type ChzzVideoFrameProps = {
  channelId: string;
  channelTitle: string;
};

export default function ChzzVideoFrame({
  channelId,
  channelTitle,
}: ChzzVideoFrameProps) {
  const playerUrl = StreamerId(channelId);

  return (
    <div className="flex flex-col rounded-xl overflow-hidden bg-chzzkPanel border border-chzzkBorder">
      <div className="relative aspect-video bg-black">
        <iframe
          src={playerUrl}
          title={channelTitle}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
