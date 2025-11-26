import ChzzkCupFooter from "./(components)/chzzk-cup-footer";
import ChzzkCupHeader from "./(components)/chzzk-cup-header";
import ChzzkCupMainSection from "./(components)/chzzk-cup-main-section";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-chzzkBackground text-chzzkTextPrimary">
      <ChzzkCupHeader />
      <main className="flex-1">
        <ChzzkCupMainSection />
      </main>
      <ChzzkCupFooter />
    </div>
  );
}
