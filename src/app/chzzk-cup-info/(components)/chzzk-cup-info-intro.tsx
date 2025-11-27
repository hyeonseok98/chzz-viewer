import { OFFICIAL_CHZZK_CUP_URL } from "@/constants/chzzk-cup/chzzk-cup-info-data";
import Link from "next/link";

export default function ChzzkCupInfoIntro() {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-chzzkTextSecondary">
        2025 CHZZK CUP
      </p>

      <h2 className="text-3xl font-semibold leading-tight text-chzzkTextPrimary sm:text-4xl">
        치지직컵 경기 일정
      </h2>

      <p className="max-w-2xl text-sm leading-relaxed text-chzzkTextSecondary sm:text-base">
        중요한 일정부터 빠르게 확인하고, 방식/브라켓은 아래에서 한눈에 정리해
        드립니다.
        <br />
        추가 소식이 공개되면 페이지가 순차 업데이트됩니다.
      </p>

      <div className="flex flex-wrap justify-center items-center mt-2 gap-3">
        <a
          href={OFFICIAL_CHZZK_CUP_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex justify-center items-center h-11 px-5 rounded-full bg-chzzkAccent text-sm font-semibold whitespace-nowrap text-chzzkBackground shadow-[0_0_40px_rgba(0,255,163,0.35)] transition hover:bg-chzzkAccentSoft"
        >
          공식 안내 보러가기
        </a>

        <Link
          href="/chzzk-draft"
          className="inline-flex justify-center items-center h-11 px-5 rounded-full border border-chzzkBorder bg-white/5 text-sm font-semibold whitespace-nowrap text-chzzkTextPrimary backdrop-blur transition hover:border-chzzkAccent/50"
        >
          모의 드래프트 하러가기
        </Link>
      </div>
      <p className="test-xs text-chzzkTextSecondary sm:text-sm">
        ※ 이해를 돕기 위한 페이지이며, 정확한 정보는 공식 홈페이지를
        참고해주세요.
      </p>
    </div>
  );
}
