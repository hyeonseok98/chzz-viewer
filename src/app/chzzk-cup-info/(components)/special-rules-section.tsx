"use client";

import ZoomableImage from "@/components/zoomable-image";
import SectionTitle from "./section-title";

function RuleImageCard({ title, src }: { title: string; src: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <p className="text-sm font-semibold text-white/85">{title}</p>
        <span className="text-xs font-semibold text-white/45">
          SPECIAL RULE
        </span>
      </div>

      <div className="p-4 pt-4">
        <ZoomableImage
          src={src}
          alt={title}
          className="w-full"
          aspectClassName="aspect-[16/9]"
          priority
          emptyText="이미지를 준비 중입니다"
        />
      </div>
    </div>
  );
}

export default function SpecialRulesSection() {
  return (
    <section className="space-y-4 mt-14">
      <SectionTitle
        title="특별 룰"
        desc="2025 치지직컵에 적용되는 치즈볼 및 밴/픽 특수 아이템 규칙입니다."
        kicker="Special Rule"
      />

      <div className="mt-8 md:mt-16">
        <div className="grid gap-4 md:grid-cols-2">
          <RuleImageCard
            title="치즈볼 시스템"
            src="/chzzk-cup/info/cheeseball-rules.png"
          />
          <RuleImageCard
            title="SPECIAL BAN/PICK ITEMS"
            src="/chzzk-cup/info/special-rules.png"
          />
        </div>
      </div>
    </section>
  );
}
