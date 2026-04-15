import { cn } from "@/lib/utils";

export function StepConnector({ isRtl }: { isRtl: boolean }) {
  return (
    <div className={cn("flex pb-5 relative justify-start", isRtl ? "pr-13" : "pl-13")} aria-hidden>
      <div className="relative flex flex-col items-center">
        <div className="w-1 h-14 bg-[#cfcde9] rounded-xl" />
        <svg
          className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 w-5 h-3"
          viewBox="0 0 20 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path d="M0 0H20L10 12L0 0Z" fill="#3d3a8c" />
        </svg>
      </div>
    </div>
  );
}
