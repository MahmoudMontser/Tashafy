import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type SectionContainerProps<TAs extends ElementType> = {
  as?: TAs;
} & Omit<ComponentPropsWithoutRef<TAs>, "as">;

export function SectionContainer<TAs extends ElementType = "div">({ as, className, ...props }: SectionContainerProps<TAs>) {
  const Comp = (as ?? "div") as ElementType;

  return <Comp className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)} {...props} />;
}
