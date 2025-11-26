"use client";

import { AnimatePresence, motion } from "framer-motion";

type BottomSheetProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function BottomSheet({ open, title, subtitle, onClose, children }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
          />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 w-full max-w-2xl mx-auto rounded-t-3xl border border-chzzkBorder bg-chzzkPanel/95 p-5 backdrop-blur z-50"
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex flex-col flex-1 min-w-0 gap-1">
                <p className="truncate text-sm font-semibold text-chzzkTextPrimary">{title}</p>
                {subtitle ? (
                  <p className="truncate text-xs text-chzzkTextSecondary">{subtitle}</p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex justify-center items-center h-9 w-9 rounded-full border border-chzzkBorder bg-white/5 text-chzzkTextSecondary hover:border-chzzkAccent/50 hover:text-chzzkTextPrimary"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">{children}</div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
