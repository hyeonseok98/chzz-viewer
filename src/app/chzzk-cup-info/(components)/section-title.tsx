type SectionTitleProps = {
  title: string;
  desc?: string;
  kicker?: string;
};

export default function SectionTitle({ title, desc, kicker }: SectionTitleProps) {
  return (
    <div className="flex flex-col gap-2 text-center">
      {kicker ? (
        <p className="text-xs uppercase tracking-[0.4em] text-chzzkTextSecondary">
          {kicker}
        </p>
      ) : null}

      <h2 className="text-2xl font-semibold leading-tight text-chzzkTextPrimary sm:text-3xl">
        {title}
      </h2>

      {desc ? (
        <p className="text-sm leading-relaxed text-chzzkTextSecondary sm:text-base">
          {desc}
        </p>
      ) : null}
    </div>
  );
}
