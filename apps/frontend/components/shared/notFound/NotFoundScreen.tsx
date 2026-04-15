"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isValidLocale } from "@/lib/localization/i18n-config";
import styles from "./NotFoundScreen.module.css";

const NOT_FOUND_CONTENT: Record<
  string,
  { title: string; description: string; message: string; buttonText: string }
> = {
  en: {
    title: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    message: "Uh oh! Looks like you got lost. Go back to the homepage if you dare!",
    buttonText: "I dare!",
  },
  ar: {
    title: "الصفحة غير موجودة",
    description: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    message: "يبدو أنك تاهت! عد إلى الصفحة الرئيسية إن جرأت!",
    buttonText: "أنا أجرؤ!",
  },
};

const PARALLAX_FACTOR = 0.03;

export function NotFoundScreen() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const locale = segment && isValidLocale(segment) ? segment : "en";
  const content = NOT_FOUND_CONTENT[locale] ?? NOT_FOUND_CONTENT.en;
  const homeHref = `/${locale}`;

  const sceneRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!sceneRef.current) return;
      const rect = sceneRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setOffset({
        x: (e.clientX - centerX) * PARALLAX_FACTOR,
        y: (e.clientY - centerY) * PARALLAX_FACTOR,
      });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  const layerStyle = (depth: number) => ({
    transform: `translate(calc(-50% + ${offset.x * depth}px), calc(-50% + ${offset.y * depth}px))`,
  });

  return (
    <section
      className={styles.wrapper}
      dir={locale === "ar" ? "rtl" : "ltr"}
      role="main"
      aria-label={content.title}
    >
      <div className={styles.container}>
        <div
          ref={sceneRef}
          className={styles.scene}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          aria-hidden
        >
          <div className={styles.circle} style={layerStyle(1.2)} />

          <div className={styles.one} style={layerStyle(0.9)}>
            <div className={styles.content}>
              <span className={styles.piece} />
              <span className={styles.piece} />
              <span className={styles.piece} />
            </div>
          </div>

          <div className={styles.two} style={layerStyle(0.6)}>
            <div className={styles.content}>
              <span className={styles.piece} />
              <span className={styles.piece} />
              <span className={styles.piece} />
            </div>
          </div>

          <div className={styles.three} style={layerStyle(0.4)}>
            <div className={styles.content}>
              <span className={styles.piece} />
              <span className={styles.piece} />
              <span className={styles.piece} />
            </div>
          </div>

          <p className={styles.p404} style={layerStyle(0.5)} aria-hidden>
            404
          </p>
          <p className={`${styles.p404} ${styles.p404Back}`} style={layerStyle(0.1)} aria-hidden>
            404
          </p>
        </div>

        <div className={styles.text}>
          <article className={styles.textArticle}>
            <p>{content.message}</p>
            <Link href={homeHref} className={styles.textButton}>
              {content.buttonText}
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
