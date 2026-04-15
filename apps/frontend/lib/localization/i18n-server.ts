import path from "path";
import fs from "fs";

const NS = "common";

export function getTranslations(locale: string): { t: (key: string) => string } {
  const filePath = path.join(process.cwd(), "public", "locales", locale, `${NS}.json`);
  let resources: Record<string, string> = {};
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    resources = JSON.parse(raw) as Record<string, string>;
  } catch {
    // fallback if file missing
  }
  return {
    t: (key: string) => resources[key] ?? key,
  };
}
