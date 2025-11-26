import {
  PRIZE_POOL,
  PRIZE_TONE_BORDER_CLASS,
} from "@/constants/chzzk-cup/chzzk-cup-schedule-data";
import SectionTitle from "./section-title";

export default function PrizeSummarySection() {
  return (
    <section className="flex flex-col items-center w-full max-w-4xl mx-auto mt-16 gap-6">
      <SectionTitle
        title={PRIZE_POOL.title}
        desc={PRIZE_POOL.desc}
        kicker="PRIZE POOL"
      />

      <div className="flex flex-col w-full gap-4 rounded-2xl border border-chzzkBorder bg-chzzkPanel/40 p-6 backdrop-blur">
        <div className="relative overflow-hidden rounded-2xl border border-chzzkBorder bg-black/20 px-6 py-7">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,255,163,0.18),_transparent_60%)] blur-2xl" />
            <div className="absolute -right-16 -bottom-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,201,125,0.14),_transparent_60%)] blur-2xl" />
          </div>

          <div className="relative flex flex-col justify-center items-center gap-2">
            <p className="text-sm font-semibold text-chzzkTextSecondary">
              {PRIZE_POOL.totalLabel}
            </p>
            <p className="text-4xl font-semibold leading-none text-chzzkTextPrimary sm:text-5xl">
              {PRIZE_POOL.totalValue}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PRIZE_POOL.items.map((item) => (
            <div
              key={item.label}
              className={[
                "relative overflow-hidden rounded-2xl border bg-chzzkPanel/60 px-4 py-4 transition",
                "hover:-translate-y-0.5 hover:border-chzzkAccent/70 hover:bg-chzzkPanel/80",
                PRIZE_TONE_BORDER_CLASS[item.tone],
              ].join(" ")}
            >
              <div className="flex flex-col justify-center items-center gap-1">
                <p className="text-xs font-semibold text-chzzkTextSecondary">
                  {item.label}
                </p>
                <p className="text-base font-semibold whitespace-nowrap text-chzzkTextPrimary">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-chzzkTextSecondary text-center">
          * {PRIZE_POOL.subDesc}
        </p>
      </div>
    </section>
  );
}
