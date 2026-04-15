import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function DetailCard({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-[20px] border border-black/6 bg-white p-6 shadow-[0_4px_24px_rgba(15,17,20,0.06)] md:p-8", className)}>{children}</div>;
}
