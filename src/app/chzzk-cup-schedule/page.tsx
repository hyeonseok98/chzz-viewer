import { ChzzkCupContainer } from "@/components/chzzk-cup-container";
import ChzzkCupFooter from "../(components)/chzzk-cup-footer";
import ChzzkCupHeader from "../(components)/chzzk-cup-header";
import SchedulePageInteractive from "./(components)/schedule-page-interactive";

export default function ChzzkCupSchedulePage() {
  return (
    <div className="min-h-[100dvh] overflow-x-clip bg-[#060B14] flex flex-col">
      <ChzzkCupHeader />

      <main className="relative flex-1 overflow-x-clip">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-44 -left-64 h-[720px] w-[720px] rounded-full bg-emerald-500/12 blur-3xl" />
          <div className="absolute top-20 -left-24 h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -top-28 right-[-220px] h-[620px] w-[620px] rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>

        <ChzzkCupContainer className="relative py-10">
          <SchedulePageInteractive />
        </ChzzkCupContainer>
      </main>

      <ChzzkCupFooter />
    </div>
  );
}
