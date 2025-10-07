import "./globals.css";
import type { Metadata } from "next";
import { ReactQueryProvider } from "@/components/react-query/react-query-provider";
import { pretendard } from "@/fonts";
import { cn } from "@/lib/utils";
import { getSiteSettings } from "@server/service/site-setting/site-setting.service";
import { DialogService } from "@/components/dialog-service/dialog-service";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();

  const siteName = siteSettings.get("site_name") ?? "Site Name";
  const siteDescription =
    siteSettings.get("site_description") ?? "Site Description";
  const siteFaviconUrl = siteSettings.get("site_favicon_url") ?? "/favicon.ico";

  return {
    title: {
      template: `%s | ${siteName}`,
      default: siteName,
    },
    description: siteDescription,
    icons: {
      icon: siteFaviconUrl,
    },
  } satisfies Metadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className="scroll-smooth scroll-pt-(--document-scroll-pt)"
      data-scroll-behavior="smooth"
    >
      <body className={cn(pretendard.className, pretendard.variable)}>
        <ReactQueryProvider>{children}</ReactQueryProvider>

        <DialogService />
      </body>
    </html>
  );
}
