import { cn } from "@/lib/utils";
import Image from "next/image";

export type MainDetailsCardProps = {
  imageSrc: string;
  imageAlt: string;
  badgeLabel: string;
  title: string;
  subtitle: string;
  isRtl: boolean;
};

export default function MainDetailsCard({ imageSrc, imageAlt, badgeLabel, title, subtitle, isRtl }: MainDetailsCardProps) {
  return (
    <article
      className="relative aspect-2/1 w-full min-h-[220px] overflow-hidden rounded-2xl bg-muted shadow-[0px_1.75px_4px_-1px_rgba(15,17,20,0.1)] md:min-h-[280px]"
      aria-labelledby="program-hero-title"
    >
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, min(896px, 100vw)" priority />
      <div className="absolute top-0 left-0 w-full h-full object-cover bg-black/10" />

      <div
        className="absolute inset-x-0 bottom-0 flex min-h-[100px] items-center gap-2 bg-black/60 px-4 py-3 backdrop-blur-[9.45px] md:gap-2"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className={cn("flex min-w-0 flex-1 flex-col gap-1")}>
          <h1 id="program-hero-title" className="text-2xl font-semibold leading-9 tracking-[-0.64px] text-white md:text-[32px] md:leading-[36px]">
            {title}
          </h1>
          <p className="max-w-2xl text-lg leading-7 text-(--color-text-inactive-subtle)">{subtitle}</p>
        </div>

        <span className="inline-flex h-7 shrink-0 items-center rounded-full bg-[#433ca6] px-3 text-sm font-medium text-[#f2f1fa]">{badgeLabel}</span>
      </div>
    </article>
  );
}
