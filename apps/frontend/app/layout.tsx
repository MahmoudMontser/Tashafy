import type { Metadata } from "next";
import { headers } from "next/headers";
import { getFrontendAppSettings } from "@/lib/app-settings";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { mahoorFont } from "@/lib/fonts/fonts";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getFrontendAppSettings();
  return {
    title: settings.defaultTitle || settings.siteName,
    description: settings.defaultDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get("x-next-locale") ?? "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className={`${mahoorFont.className} antialiased`} suppressHydrationWarning cz-shortcut-listen="true">
        <main className="">{children}</main>
        <Toaster position={dir === "rtl" ? "top-left" : "top-right"} richColors closeButton />
      </body>
    </html>
  );
}
