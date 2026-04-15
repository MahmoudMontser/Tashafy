import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export function PlusDecoration() {
  const rows = 6;
  const cols = 2;
  const rose = new Set(["1-0"]);
  const mutedPurple = new Set(["3-1"]);

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-3" aria-hidden>
      {Array.from({ length: rows * cols }, (_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const key = `${r}-${c}`;
        const colorClass = rose.has(key) ? "text-(--color-accent-rose)" : mutedPurple.has(key) ? "text-[#4f4799]/50" : "text-white/80";
        return <Plus key={key} className={cn("size-4 shrink-0", colorClass)} strokeWidth={2} />;
      })}
    </div>
  );
}
export default PlusDecoration;
