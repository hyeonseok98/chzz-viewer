"use client";

import ChzzkCupFooter from "../(components)/chzzk-cup-footer";
import ChzzkCupHeader from "../(components)/chzzk-cup-header";

import { ChzzkCupContainer } from "@/components/chzzk-cup-container";
import {
  PLAYOFF_MATCHES,
  SCHEDULE_PHASES,
  TOURNAMENT_RULES,
} from "@/constants/chzzk-cup/chzzk-cup-info-data";

import ChzzkCupInfoIntro from "./(components)/chzzk-cup-info-intro";
import ChzzkCupInfoPageInteractive from "./(components)/info-page-interactive";
import PrizeSummarySection from "./(components)/prise-summary-section";
import RulesSection from "./(components)/rules-section";
import SpecialRulesSection from "./(components)/special-rules-section";
import TicketInfoSection from "./(components)/ticket-info-section";

export default function ChzzkCupInfoPage() {
  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[#060B14] flex flex-col">
      <ChzzkCupHeader />

      <main className="relative flex-1 overflow-x-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-[-10%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.55),_transparent_65%)] opacity-60 blur-3xl" />
          <div className="absolute -right-[10%] top-[20%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.6),_transparent_65%)] opacity-70 blur-3xl" />
        </div>

        <ChzzkCupContainer className="relative py-10 lg:py-14">
          <section className="relative flex flex-col gap-6">
            <ChzzkCupInfoIntro />

            <ChzzkCupInfoPageInteractive
              phases={SCHEDULE_PHASES}
              playoffMatches={PLAYOFF_MATCHES}
            />

            <RulesSection rules={TOURNAMENT_RULES} />

            <SpecialRulesSection />

            <TicketInfoSection />
            <PrizeSummarySection />
          </section>
        </ChzzkCupContainer>
      </main>

      <ChzzkCupFooter />
    </div>
  );
}
