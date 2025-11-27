import BulletList from "./bullet-list";
import SectionTitle from "./section-title";

type RulesSectionProps = {
  rules: string[];
};

export default function RulesSection({ rules }: RulesSectionProps) {
  return (
    <section className="flex flex-col items-center w-full mt-14 gap-8">
      <SectionTitle
        title="대회 규정"
        desc="이번 2025 치지직컵 운영 일정입니다."
        kicker="TOURNAMENT RULES"
      />

      <div className="w-full max-w-4xl rounded-2xl border border-chzzkBorder bg-chzzkPanel/60 p-6 backdrop-blur">
        <BulletList items={rules} />
      </div>
    </section>
  );
}
