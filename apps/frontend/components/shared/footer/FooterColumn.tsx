import type { FooterColumnProps } from "@/types/global";
import Link from "next/link";

export function FooterColumn({ title, links, locale, labels }: FooterColumnProps) {
  const prefix = `/${locale}`;
  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-4 text-start">
      <h3 className="w-full text-base font-semibold text-(--color-text-secondary)">{title}</h3>
      <ul className="flex w-full flex-col items-start gap-3">
        {links.map(({ key, path }) => (
          <li key={key} className="w-full text-start">
            <Link
              href={`${prefix}${path}`}
              className="inline-block text-base text-(--color-text-secondary) transition-colors hover:text-(--color-text-brand)"
            >
              {labels[key]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
