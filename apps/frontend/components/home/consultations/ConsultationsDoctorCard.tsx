import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { consultationsDoctorItem } from "@/types/global";
import { Star } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

type ConsultationsDoctorCardProps = {
  doctor: consultationsDoctorItem;
  isRtl: boolean;
};

export const ConsultationsDoctorCard = memo(function ConsultationsDoctorCard({ doctor, isRtl }: ConsultationsDoctorCardProps) {
  return (
    <div className="w-full max-w-[384px] shrink-0 inline-flex flex-col items-center gap-2.5">
      <div className="relative w-full aspect-square rounded-[20px] overflow-hidden bg-muted">
        <Image
          src={doctor.image}
          alt={doctor.name}
          className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
          width={384}
          height={384}
          loading="lazy"
          unoptimized
        />
        {/* Experience badge - start corner (left in LTR, right in RTL) */}
        <div className={cn("absolute top-3 h-6 px-2 rounded-full bg-(--color-accent-rose) inline-flex items-center justify-center z-10", isRtl ? "right-3" : "left-3")}>
          <span className="text-xs font-normal text-white">{doctor.experience}</span>
        </div>
        {/* Bottom gradient overlay */}
        <div
          className={cn("absolute inset-x-0 bottom-0 p-5  rounded-b-[20px] flex flex-col gap-5", isRtl ? "items-end text-right" : "items-start text-left")}
          style={{ backdropFilter: "blur(8px)", background: "linear-gradient(360deg, #363085 0%, rgba(54, 48, 133, 0) 100%)" }}
        >
          <div className="flex flex-col gap-2 w-full min-h-[130px]">
            <h3 className="text-2xl font-semibold text-white ">{doctor.name}</h3>
            <p className="text-base font-bold text-white/80 ">{doctor.specialization}</p>
            {doctor.recommendationText && (
              <div className={cn("flex flex-col gap-1")}>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" aria-hidden />
                  ))}
                </div>
                <span className="text-xs font-normal text-amber-400/90 ">{doctor.recommendationText}</span>
              </div>
            )}
          </div>
          <Button variant="default" size="lg" className="w-full h-11 rounded-lg px-5 text-base font-medium text-white" asChild>
            <a href="#book">{doctor.bookButtonLabel}</a>
          </Button>
        </div>
      </div>
    </div>
  );
});
