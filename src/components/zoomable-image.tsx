"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

type ZoomableImageProps = {
  src?: string;
  alt: string;
  label?: string;
  sizes?: string;
  className?: string;
  aspectClassName?: string;
  imageClassName?: string;
  emptyText?: string;
  priority?: boolean;
};

export default function ZoomableImage({
  src,
  alt,
  label,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className,
  aspectClassName = "aspect-[16/9]",
  imageClassName = "object-contain",
  emptyText = "아직 경기 전입니다",
  priority,
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  const [errored, setErrored] = useState(false);

  const canShow = Boolean(src) && !errored;

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => canShow && setOpen(true)}
        disabled={!canShow}
        className={clsx(
          "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] text-left transition",
          canShow ? "hover:border-white/15" : "cursor-not-allowed",
          className
        )}
      >
        {label && (
          <div className="absolute left-3 top-3 z-10 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-white/85">
            {label}
          </div>
        )}

        <div className={clsx("relative w-full bg-black/40", aspectClassName)}>
          {canShow ? (
            <Image
              src={src!}
              alt={alt}
              fill
              sizes={sizes}
              className={imageClassName}
              priority={priority}
              onError={() => setErrored(true)}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-center">
                <p className="text-sm font-semibold text-white/85">
                  {emptyText}
                </p>
                <p className="mt-1 text-xs text-white/45">{alt}</p>
              </div>
            </div>
          )}
        </div>
      </button>

      {open && canShow && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute left-1/2 top-1/2 w-[min(1200px,92vw)] -translate-x-1/2 -translate-y-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/40 shadow-2xl">
              {label && (
                <div className="absolute left-3 top-3 z-10 rounded-full border border-white/15 bg-black/50 px-3 py-2 text-sm font-semibold text-white/90">
                  {label}
                </div>
              )}

              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={src!}
                  alt={alt}
                  fill
                  sizes="92vw"
                  className="object-contain"
                  priority
                />
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/50 px-3 py-2 text-sm font-semibold text-white/85 hover:bg-black/65"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
