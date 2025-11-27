import ChzzkCupFooter from "@/app/(components)/chzzk-cup-footer";
import ChzzkCupHeader from "@/app/(components)/chzzk-cup-header";
import { ChzzkCupContainer } from "@/components/chzzk-cup-container";
import TeamsPageInteractive from "./(components)/teams-page-interactive";

export default function ChzzkCupTeamsPage() {
  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[#060B14] flex flex-col">
      <ChzzkCupHeader />

      <main className="relative flex-1 overflow-x-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-44 -left-64 h-[720px] w-[720px] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute top-28 -right-48 h-[640px] w-[640px] rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -bottom-64 left-1/3 h-[720px] w-[720px] rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>

        <ChzzkCupContainer className="relative py-10">
          <TeamsPageInteractive />
        </ChzzkCupContainer>
      </main>

      <ChzzkCupFooter />
    </div>
  );
}
