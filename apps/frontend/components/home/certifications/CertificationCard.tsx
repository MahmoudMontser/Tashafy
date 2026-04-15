import { Card, CardContent } from "@/components/ui/card";
import type { CertificationItem } from "@/types/home";
import Image from "next/image";

type CertificationCardProps = {
  certification: CertificationItem;
};

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <Card className="h-full border border-[#e5e7eb] rounded-xl bg-transparent shadow-sm overflow-hidden">
      <CardContent className="flex flex-col items-center justify-center p-6 min-h-[160px] text-center gap-3">
        <div className="relative w-full max-w-[100px] h-12 flex items-center justify-center shrink-0">
          <Image src={certification.logo} alt="" width={100} height={48} className="w-full h-auto max-h-12 object-contain object-center" sizes="100px" aria-hidden />
        </div>
        <h3 className="text-base md:text-lg font-bold text-(--color-text-brand)">{certification.name}</h3>
        <p className="text-sm text-muted-foreground ">{certification.description}</p>
      </CardContent>
    </Card>
  );
}
