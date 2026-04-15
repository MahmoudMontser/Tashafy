import { cn } from "@/lib/utils";
import type { BlogPostCard as BlogPostCardModel } from "@/types/blog";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type BlogPostCardProps = {
  post: BlogPostCardModel;
  isRtl: boolean;
};

export function BlogPostCard({ post, isRtl }: BlogPostCardProps) {
  return (
    <Link
      href={post.href}
      className={cn(
        "group flex min-h-[475px] w-full min-w-0 flex-col overflow-hidden rounded-3xl border border-[#e9ebf0] bg-white shadow-[0px_1.75px_4px_-1px_rgba(15,17,20,0.1)] transition-shadow hover:shadow-[0px_4px_16px_-2px_rgba(15,17,20,0.12)]",
      )}
    >
      <div className="relative h-[230px] w-full shrink-0 overflow-hidden rounded-t-2xl">
        <Image
          src={post.imageSrc}
          alt={post.imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span
          className={cn(
            "absolute top-4 z-10 inline-flex h-6 max-w-[calc(100%-1.5rem)] items-center rounded-lg border border-[#d1d5de] bg-white px-2 text-xs font-normal text-[#1f242e]",
            !isRtl ? "right-3" : "left-3",
          )}
        >
          {post.categoryLabel}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
        <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-center text-sm leading-5 text-[#4e5663]")}>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5 shrink-0 mb-1" aria-hidden />
            <span>{post.readingTimeLabel}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3.5 shrink-0 mb-1" aria-hidden />
            <span>{post.dateLabel}</span>
          </span>
        </div>

        <h3 className={cn("line-clamp-2 text-2xl font-semibold leading-7 tracking-[-0.24px] text-[#282464]", isRtl ? "text-right" : "text-left")}>{post.title}</h3>

        <p className={cn("line-clamp-3 min-h-18 flex-1 text-base leading-6 text-[#4e5663]", isRtl ? "text-right" : "text-left")}>{post.excerpt}</p>

        <span className={cn("mt-auto inline-flex items-center justify-center gap-1 rounded-md py-1 text-base font-medium text-[#363085]")}>
          <ArrowUpRight className="size-6 shrink-0" aria-hidden />
          <span>{post.readMoreLabel}</span>
        </span>
      </div>
    </Link>
  );
}
