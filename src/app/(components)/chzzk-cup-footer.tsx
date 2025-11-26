export default function ChzzkCupFooter() {
  return (
    <footer className="border-t border-chzzkBorder bg-chzzkPanel">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-chzzkTextSecondary lg:flex-row lg:px-6">
        <span className="font-medium">© 2025 chzz-viewer</span>

        <p className="text-center leading-relaxed lg:text-right">
          본 사이트는 팬 제작 페이지이며, 치지직 및 관련 공식 단체와는
          무관합니다.
        </p>
      </div>
    </footer>
  );
}
