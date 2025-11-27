import type { PropsWithChildren } from "react";

export default function ChzzkCupScheduleLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="w-full flex-1">
      <div className="w-full overflow-x-hidden">{children}</div>
    </div>
  );
}
