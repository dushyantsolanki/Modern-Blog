import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SplashController from "@/components/splash-controller";
import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import Script from "next/script";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  title: "Xenon — A Modern Blog for Curious Minds",
  description: "Xenon is a modern blog exploring ideas in technology, design, productivity and creativity. Join 12,000+ readers.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Xenon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>

      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SplashController>
            {children}
          </SplashController>
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          <CookieConsent />
        </ThemeProvider>

        {/* <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        /> */}
      </body>
    </html>
  );
}
