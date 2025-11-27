import ChzzkCupFooter from "../(components)/chzzk-cup-footer";
import ChzzkCupHeader from "../(components)/chzzk-cup-header";

import {
  PLAYOFF_MATCHES,
  SCHEDULE_PHASES,
  TOURNAMENT_RULES,
} from "@/constants/chzzk-cup/chzzk-cup-info-data";

import ChzzkCupInfoIntro from "./(components)/chzzk-cup-info-intro";
import ChzzkCupInfoPageInteractive from "./(components)/info-page-interactive";
import PrizeSummarySection from "./(components)/prise-summary-section";
import RulesSection from "./(components)/rules-section";
import TicketInfoSection from "./(components)/ticket-info-section";

export default function ChzzkCupInfoPage() {
  return (
    <div className="min-h-screen bg-chzzkBackground text-chzzkTextPrimary">
      <ChzzkCupHeader />

      <main className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-40 top-[-10%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.55),_transparent_65%)] opacity-60 blur-3xl" />
          <div className="absolute -right-[10%] top-[20%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.6),_transparent_65%)] opacity-70 blur-3xl" />
        </div>

        <section className="relative flex flex-col w-full max-w-6xl mx-auto px-6 py-12 gap-3 lg:px-6 lg:py-16 z-10">
          <ChzzkCupInfoIntro />

          <ChzzkCupInfoPageInteractive
            phases={SCHEDULE_PHASES}
            playoffMatches={PLAYOFF_MATCHES}
          />

          <RulesSection rules={TOURNAMENT_RULES} />

          <TicketInfoSection />
          <PrizeSummarySection />
        </section>
      </main>

      <ChzzkCupFooter />
    </div>
  );
}
