import { cn } from "@/lib/cn";

type ChzzkCupContainerProps = React.PropsWithChildren<{
  className?: string;
}>;

export function ChzzkCupContainer({
  children,
  className,
}: ChzzkCupContainerProps) {
  return (
    <div
      className={cn("w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </div>
  );
}
