import { cn } from "@/lib/utils";
import Image from "next/image";

type ProgramsHeroVisualProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ProgramsHeroVisual({ src, alt, className }: ProgramsHeroVisualProps) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[560px]", className)}>
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[min(88vw,490px)] -translate-x-1/2 -translate-y-1/2 rounded-full" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-[calc(50%+30px)] -z-10 size-[min(82vw,470px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        aria-hidden
      />
      <Image
        src={src}
        alt={alt}
        width={560}
        height={535}
        priority
        sizes="(max-width: 1024px) 90vw, 560px"
        className="relative z-10 h-auto w-full object-contain drop-shadow-[0_20px_50px_rgba(15,17,20,0.15)]"
      />
    </div>
  );
}
