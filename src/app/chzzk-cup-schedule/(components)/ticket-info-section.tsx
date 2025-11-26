import {
  OFFLINE_BOOKING_URL,
  OFFLINE_TICKET_INFO,
} from "@/constants/chzzk-cup/chzzk-cup-schedule-data";
import SectionTitle from "./section-title";

export default function TicketInfoSection() {
  return (
    <section className="flex flex-col items-center w-full max-w-4xl mx-auto mt-16 gap-6">
      <SectionTitle title={OFFLINE_TICKET_INFO.title} kicker="OFFLINE TICKET" />

      <div className="flex flex-col w-full gap-4 rounded-2xl border border-chzzkBorder bg-chzzkPanel/60 p-6 backdrop-blur">
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-chzzkTextPrimary">
            장소: {OFFLINE_TICKET_INFO.venue}
          </p>
          <div className="text-sm text-chzzkTextSecondary">
            <p>• 일정: {OFFLINE_TICKET_INFO.dates}</p>
            <p className="mt-1">• 예매 오픈: {OFFLINE_TICKET_INFO.open}</p>
          </div>
        </div>

        <div className="flex justify-center items-center mt-3">
          <a
            href={OFFLINE_BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex justify-center items-center h-11 px-5 rounded-full bg-chzzkAccent text-sm font-semibold whitespace-nowrap text-chzzkBackground shadow-[0_0_40px_rgba(0,255,163,0.22)] transition hover:bg-chzzkAccentSoft"
          >
            오프라인 예매하러가기
          </a>
        </div>
      </div>
    </section>
  );
}
