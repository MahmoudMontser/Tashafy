import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/types/home";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

type ServiceCardProps = {
  service: ServiceItem;
  learnMoreLabel: string;
  isRtl: boolean;
};

export const ServiceCard = memo(function ServiceCard({ service, learnMoreLabel, isRtl }: ServiceCardProps) {
  return (
    <Card className="group relative border-0 shadow-lg rounded-2xl bg-white p-8 transition-all duration-300 hover:shadow-xl hover:bg-primary">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-t-2xl bg-muted">
        <Image
          src={service.image}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute cursor-pointer inset-0 bg-linear-to-t from-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-80" aria-hidden />
        <CardContent
          className={cn(
            "absolute -bottom-15 min-h-[280px] w-full bg-white p-6 transition-all duration-300 ease-out group-hover:-bottom-9 group-hover:bg-primary group-hover:text-white",
            isRtl ? "right-[35%] rounded-tr-2xl group-hover:right-[30%]" : "left-[35%] rounded-tl-2xl group-hover:left-[30%]",
          )}
        >
          <div className="flex flex-col gap-2 w-full">
            <h3 className="text-xl font-bold transition-colors duration-300">{service.title}</h3>
            <p className="text-sm w-[68%] line-clamp-4 md:text-base text-wrap text-(--color-text-muted) transition-colors duration-300 group-hover:text-white/90">
              {service.description}
            </p>
            <Link
              href={service.href}
              className="inline-flex items-center gap-1 text-sm md:text-base font-medium text-primary transition-colors duration-300 hover:underline group-hover:text-white"
            >
              {learnMoreLabel}
              {isRtl ? <ChevronLeft className="size-4 shrink-0" aria-hidden /> : <ChevronRight className="size-4 shrink-0" aria-hidden />}
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
});
