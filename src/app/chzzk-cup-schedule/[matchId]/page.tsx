import ChzzkCupFooter from "@/app/(components)/chzzk-cup-footer";
import ChzzkCupHeader from "@/app/(components)/chzzk-cup-header";
import { ChzzkCupContainer } from "@/components/chzzk-cup-container";
import {
  CHZZK_CUP_PLACEHOLDER_TEAM_LABEL,
  CHZZK_CUP_TEAM_DISPLAY_NAME,
} from "@/constants/chzzk-cup/chzzk-cup-common";
import {
  CHZZK_CUP_MATCHES,
  CHZZK_CUP_STAGE_DETAIL,
} from "@/constants/chzzk-cup/chzzk-cup-schedule-detail-data";
import { access } from "fs/promises";
import { notFound } from "next/navigation";
import path from "path";
import MatchScreenshotsClient from "./_components/match-screenshots-client";

type TeamId = keyof typeof CHZZK_CUP_TEAM_DISPLAY_NAME;

const TEAM_SUB_LABEL: Record<TeamId, string> = {
  WOLF: "울프 팀",
  SOURF: "소우릎 팀",
  GANGMOM: "갱맘 팀",
  BANG: "뱅 팀",
  CUVEE: "큐베 팀",
};

const getDefaultScreenshotCount = (seriesType: string) => {
  if (seriesType === "BO5") return 5;
  if (seriesType === "BO4") return 4;
  if (seriesType === "BO3") return 3;
  return 1;
};

const getTeamLabel = (teamId: string) => {
  if (teamId in CHZZK_CUP_TEAM_DISPLAY_NAME) {
    const id = teamId as TeamId;
    return {
      primary: CHZZK_CUP_TEAM_DISPLAY_NAME[id],
      secondary: TEAM_SUB_LABEL[id],
    };
  }
  return {
    primary: CHZZK_CUP_PLACEHOLDER_TEAM_LABEL[teamId] ?? teamId,
    secondary: "진행 후 확정",
  };
};

async function fileExistsInPublic(publicRelativePath: string) {
  try {
    const fullPath = path.join(process.cwd(), "public", publicRelativePath);
    await access(fullPath);
    return true;
  } catch {
    return false;
  }
}

export default async function MatchDetailPage({
  params,
}: {
  params: { matchId: string };
}) {
  const match = CHZZK_CUP_MATCHES.find((m) => m.id === params.matchId);
  if (!match) notFound();

  const stageMeta = CHZZK_CUP_STAGE_DETAIL.find((s) => s.id === match.stageId);

  const left = getTeamLabel(match.leftTeamId);
  const right = getTeamLabel(match.rightTeamId);

  const defaultCount = getDefaultScreenshotCount(match.seriesType);
  const expectedCount = Math.min(match.screenshotCount ?? defaultCount, 5);

  const candidates = await Promise.all(
    Array.from({ length: expectedCount }, async (_, i) => {
      const index = i + 1;
      const publicPath = `chzzk-cup/match-screenshots/${match.id}/game${index}.png`;
      const ok = await fileExistsInPublic(publicPath);
      return ok
        ? {
            index,
            src: `/${publicPath}`,
            alt: `GAME ${index} 결과`,
          }
        : null;
    })
  );

  const screenshots = candidates.filter(Boolean) as Array<{
    index: number;
    src: string;
    alt: string;
  }>;

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
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.28em] text-white/45 uppercase">
                Match Record
              </p>

              <h2 className="text-2xl font-semibold text-white md:text-3xl">
                {stageMeta?.label ?? match.stageId} 상세
              </h2>

              <p className="text-sm font-semibold text-white/80">
                {`${left.primary}${
                  left.secondary ? ` (${left.secondary})` : ""
                }`}
                <span className="px-2 text-white/35">vs</span>
                {`${right.primary}${
                  right.secondary ? ` (${right.secondary})` : ""
                }`}
              </p>

              <p className="text-sm text-white/55">
                {match.dateLabel} · {match.timeLabel} · {match.seriesType}
                {screenshots.length > 0
                  ? ` · 총 ${screenshots.length}경기`
                  : ""}
              </p>
            </div>

            {screenshots.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm font-semibold text-white">
                  아직 경기 전입니다.
                </p>
                <p className="mt-2 text-xs text-white/55">
                  경기 종료 후 결과 스크린샷이 업로드되면 자동으로 표시됩니다.
                </p>
              </div>
            ) : (
              <MatchScreenshotsClient screenshots={screenshots} />
            )}

            <p className="text-xs text-white/45">
              스크린샷이 제공되는 경기는 클릭하여 확대해서 볼 수 있으며, 해당
              페이지는 추후 페이지 업데이트 예정입니다.
            </p>
          </div>
        </ChzzkCupContainer>
      </main>

      <ChzzkCupFooter />
    </div>
  );
}
