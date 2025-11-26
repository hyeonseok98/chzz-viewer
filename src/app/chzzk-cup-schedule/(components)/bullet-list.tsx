type BulletListProps = {
  items: string[];
};

export default function BulletList({ items }: BulletListProps) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-chzzkTextSecondary">
          <span className="mt-2 h-1 w-1 rounded-full bg-chzzkAccent shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
