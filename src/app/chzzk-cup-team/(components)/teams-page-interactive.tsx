"use client";

import {
  CHZZK_CUP_TEAMS,
  type ChzzkCupRole,
  type ChzzkCupTeam,
} from "@/constants/chzzk-cup/chzzk-cup-team";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const ROLE_LABEL: Record<ChzzkCupRole, string> = {
  TOP: "TOP",
  JUNGLE: "JGL",
  MID: "MID",
  ADC: "ADC",
  SUP: "SUP",
};

const ACCENT: Record<
  ChzzkCupTeam["accent"],
  { text: string; ring: string; glow: string; chip: string }
> = {
  emerald: {
    text: "text-emerald-200",
    ring: "ring-emerald-400/30",
    glow: "bg-emerald-500/10",
    chip: "border-emerald-400/35 bg-emerald-400/10 text-emerald-200",
  },
  sky: {
    text: "text-sky-200",
    ring: "ring-sky-400/30",
    glow: "bg-sky-500/10",
    chip: "border-sky-400/35 bg-sky-400/10 text-sky-200",
  },
  amber: {
    text: "text-amber-200",
    ring: "ring-amber-400/30",
    glow: "bg-amber-500/10",
    chip: "border-amber-400/35 bg-amber-400/10 text-amber-200",
  },
  fuchsia: {
    text: "text-fuchsia-200",
    ring: "ring-fuchsia-400/30",
    glow: "bg-fuchsia-500/10",
    chip: "border-fuchsia-400/35 bg-fuchsia-400/10 text-fuchsia-200",
  },
  rose: {
    text: "text-rose-200",
    ring: "ring-rose-400/30",
    glow: "bg-rose-500/10",
    chip: "border-rose-400/35 bg-rose-400/10 text-rose-200",
  },
};

function useSpotlight() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "18%");

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return ref;
}

function useTilt() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const ry = (px - 0.5) * 10;
      const rx = (0.5 - py) * 8;
      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    };

    const onLeave = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return ref;
}

function PlayerAvatar({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);

  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      {ok ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="56px"
          className="object-cover"
          onError={() => setOk(false)}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-8 w-8 rounded-xl bg-white/8" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
    </div>
  );
}

function Modal({
  open,
  onClose,
  title,
  subtitle,
  content,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="absolute left-1/2 top-1/2 w-[min(980px,92vw)] -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-[#0B1220]/90 shadow-2xl">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-white">
                {title}
              </p>
              {subtitle ? (
                <p className="mt-1 truncate text-sm text-white/55">
                  {subtitle}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full border border-white/12 bg-white/5 px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/8"
            >
              닫기
            </button>
          </div>

          <div className="p-6">{content}</div>
        </div>
      </div>
    </div>
  );
}

export default function TeamsPageInteractive() {
  const teams = useMemo(() => CHZZK_CUP_TEAMS, []);
  const [activeId, setActiveId] = useState(teams[0]?.id);
  const active = useMemo(
    () => teams.find((t) => t.id === activeId) ?? teams[0],
    [teams, activeId]
  );

  const spotlightRef = useSpotlight();
  const [modal, setModal] = useState<{
    team: ChzzkCupTeam;
    role: ChzzkCupRole;
    name: string;
    imageSrc: string;
    isCaptain?: boolean;
  } | null>(null);

  if (!active) return null;

  const a = ACCENT[active.accent];

  return (
    <div className="space-y-10">
      <div className="space-y-3 text-center">
        <p className="text-xs font-semibold tracking-[0.28em] text-white/45 uppercase">
          Teams
        </p>
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          팀 & 팀원 소개
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-white/55">
          팀을 선택하면 로스터와 선수 카드를 확인할 수 있습니다.
          (모바일/데스크톱 모두 최적화)
        </p>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex max-w-full gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          {teams.map((t) => {
            const isActive = t.id === active.id;
            const ta = ACCENT[t.accent];
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveId(t.id)}
                className={clsx(
                  "relative whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition",
                  isActive
                    ? clsx("border-white/15 bg-white/7 text-white", ta.ring)
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/7"
                )}
              >
                <span
                  className={clsx(
                    "mr-2 inline-block h-2 w-2 rounded-full",
                    ta.glow
                  )}
                />
                {t.displayName}
                <span className="ml-2 text-xs text-white/45">
                  ({t.teamLabel})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={spotlightRef}
        className={clsx(
          "relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
          "[background:radial-gradient(900px_circle_at_var(--mx)_var(--my),rgba(255,255,255,0.10),transparent_60%)]"
        )}
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className={clsx(
              "absolute -left-20 -top-24 h-[420px] w-[420px] rounded-full blur-3xl",
              a.glow
            )}
          />
          <div className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-5">
              <div className="relative h-16 w-16 shrink-0">
                <div
                  className={clsx(
                    "absolute -inset-6 rounded-full blur-2xl opacity-60",
                    a.glow
                  )}
                />
                <div
                  className={clsx(
                    "absolute inset-0 rounded-2xl bg-white/6 ring-1 ring-white/12"
                  )}
                />
                <div
                  className={clsx(
                    "absolute inset-0 rounded-2xl ring-1",
                    a.ring,
                    "animate-spin [animation-duration:18s]"
                  )}
                  style={{
                    maskImage:
                      "radial-gradient(circle at 40% 35%, transparent 0 35%, black 55%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at 40% 35%, transparent 0 35%, black 55%)",
                  }}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/12 to-transparent" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-[0.28em] text-white/45 uppercase">
                  Roster
                </p>
                <p className="mt-1 truncate text-2xl font-semibold text-white md:text-3xl">
                  {active.displayName}
                  <span className="ml-3 text-sm font-semibold text-white/55">
                    ({active.teamLabel})
                  </span>
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span
                    className={clsx(
                      "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                      a.chip
                    )}
                  >
                    {active.id}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
                    5 Players
                  </span>
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
                    Click to view
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {active.roster.map((p) => (
                <button
                  key={`${active.id}-${p.role}-${p.name}`}
                  type="button"
                  onClick={() => setModal({ team: active, ...p })}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-4 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition hover:border-white/15 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-4">
                    <PlayerAvatar src={p.imageSrc} alt={p.name} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={clsx(
                            "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold",
                            a.chip
                          )}
                        >
                          {ROLE_LABEL[p.role]}
                        </span>
                        {p.isCaptain ? (
                          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-semibold text-white/75">
                            CAPTAIN
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 truncate text-base font-semibold text-white">
                        {p.name}
                      </p>
                      <p className="mt-1 truncate text-xs text-white/45">
                        클릭해서 프로필을 확대하고 정보를 확인하세요
                      </p>
                    </div>
                    <span className="text-white/35 transition group-hover:text-white/60">
                      ↗
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold text-white/85">
                팀 하이라이트
              </p>
              <p className="mt-2 text-sm text-white/55">
                카드에 마우스를 올리면 은은한 글로우와 스포트라이트가
                반응합니다. 모바일에서는 터치로 프로필 모달을 확인할 수
                있습니다.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {active.roster.map((p) => (
                  <div
                    key={`chip-${p.role}`}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
                  >
                    <p className="text-xs font-semibold text-white/45">
                      {ROLE_LABEL[p.role]}
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-white/85">
                      {p.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <TiltShowcase accent={a} />
          </div>
        </div>
      </div>

      <Modal
        open={Boolean(modal)}
        onClose={() => setModal(null)}
        title={modal ? `${modal.name}` : ""}
        subtitle={
          modal
            ? `${modal.team.displayName} (${modal.team.teamLabel}) · ${
                ROLE_LABEL[modal.role]
              }${modal.isCaptain ? " · CAPTAIN" : ""}`
            : ""
        }
        content={
          modal ? (
            <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                <div
                  className={clsx(
                    "absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full blur-3xl",
                    ACCENT[modal.team.accent].glow
                  )}
                />
                <div className="relative p-6">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <Image
                      src={modal.imageSrc}
                      alt={modal.name}
                      fill
                      sizes="(min-width: 768px) 420px, 80vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={clsx(
                            "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                            ACCENT[modal.team.accent].chip
                          )}
                        >
                          {ROLE_LABEL[modal.role]}
                        </span>
                        {modal.isCaptain ? (
                          <span className="inline-flex items-center rounded-full border border-white/12 bg-black/25 px-3 py-1 text-xs font-semibold text-white/85">
                            CAPTAIN
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 truncate text-lg font-semibold text-white">
                        {modal.name}
                      </p>
                      <p className="mt-1 truncate text-sm text-white/55">
                        {modal.team.displayName} · {modal.team.teamLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-sm font-semibold text-white/85">
                    선수 정보
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <InfoRow
                      label="팀"
                      value={`${modal.team.displayName} (${modal.team.teamLabel})`}
                    />
                    <InfoRow label="포지션" value={ROLE_LABEL[modal.role]} />
                    <InfoRow label="팀 코드" value={modal.team.id} />
                    <InfoRow
                      label="특이사항"
                      value={modal.isCaptain ? "팀장" : "-"}
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-sm font-semibold text-white/85">
                    프로필 사진 준비
                  </p>
                  <p className="mt-2 text-sm text-white/55">이미지 반영 예정</p>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                    {modal.imageSrc}
                  </div>
                </div>
              </div>
            </div>
          ) : null
        }
      />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-xs font-semibold text-white/45">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-white/85">
        {value}
      </p>
    </div>
  );
}

function TiltShowcase({
  accent,
}: {
  accent: { glow: string; ring: string; text: string };
}) {
  const tiltRef = useTilt();

  return (
    <div
      ref={tiltRef}
      className={clsx(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
        "transition-transform duration-200",
        "[transform:perspective(900px)_rotateX(var(--rx))_rotateY(var(--ry))]"
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className={clsx(
            "absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full blur-3xl",
            accent.glow
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent" />
      </div>

      <div className="relative space-y-2">
        <p className="text-xs font-semibold tracking-[0.28em] text-white/45 uppercase">
          Interactive
        </p>
        <p className="text-base font-semibold text-white">
          고급스러운 3D 틸트 카드
          <span className={clsx("ml-2 text-sm font-semibold", accent.text)}>
            · Premium
          </span>
        </p>
        <p className="text-sm text-white/55">
          마우스를 움직이면 카드가 미세하게 기울어지고, 글로우가 자연스럽게
          살아납니다.
        </p>
      </div>

      <div className="relative mt-5 flex flex-wrap gap-2">
        <span
          className={clsx(
            "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
            accent.ring,
            "bg-white/5 text-white/75"
          )}
        >
          Spotlight
        </span>
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75">
          Hover Tilt
        </span>
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75">
          Modal Detail
        </span>
      </div>
    </div>
  );
}
