import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { JourneyStep } from "@/types/programs";
import { Briefcase, PhoneCall, Search, Tag } from "lucide-react";
import { memo } from "react";

const stepIconMap = {
  search: Search,
  phone: PhoneCall,
  briefcase: Briefcase,
  tag: Tag,
};

type StepCardProps = {
  step: JourneyStep;
  isRtl: boolean;
};

export const StepCard = memo(function StepCard({ step, isRtl }: StepCardProps) {
  const Icon = stepIconMap[step.icon];

  return (
    <Card className="relative border-0 bg-white rounded-2xl shadow-[0_10px_40px_rgba(34,0,86,0.06)] px-4 py-5 md:px-6">
      <div className={cn("flex items-center gap-4")}>
        <div className={cn("shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-(--color-surface-brand) text-(--color-text-brand) ")}>
          <Icon className="h-8 w-8" aria-hidden />
        </div>
        <div className={cn("space-y-1 min-w-0 flex-1", isRtl ? "text-right" : "text-left")}>
          <p className="text-2xl font-bold text-(--color-text-brand)">{step.label}</p>
          <p className="text-sm md:text-base text-slate-600 dark:text-muted-foreground">{step.description}</p>
        </div>
      </div>
    </Card>
  );
});
