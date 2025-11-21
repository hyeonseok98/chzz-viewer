"use client";

import ChzzVideoFrame from "./chzz-video-frame";

export default function ChzzMultiViewer() {
  const firstChannelId = "089185efc29a8fbe14ea294dc85f9661";
  const secondChannelId = "dc740d5bb5680666b6bf2ebc58a8203f";

  return (
    <div className="min-h-screen bg-chzzkBackground text-chzzkTextPrimary flex flex-col">
      <header className="h-14 px-4 flex items-center border-b border-chzzkBorder">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-chzzkAccent" />
          <span className="font-semibold text-sm md:text-base tracking-tight">
            CHZZK Multi Viewer (Two Streams)
          </span>
        </div>
      </header>

      <main className="flex-1 p-3 md:p-6">
        <div className="grid gap-3 md:gap-4 md:grid-cols-2">
          <ChzzVideoFrame
            channelId={firstChannelId}
            channelTitle="Main Match View"
          />
          <ChzzVideoFrame
            channelId={secondChannelId}
            channelTitle="Player POV View"
          />
        </div>
      </main>
    </div>
  );
}
