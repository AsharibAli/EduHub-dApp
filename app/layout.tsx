import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import OCIDProvider from "../components/OCIDProvider";
import Banner from "@/components/banner/Banner";
import { BannerProvider } from "@/components/banner/BannerContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduHub | Learn Anything and Prove It",
  description:
    "Building Vibe Tooling for EduChain | Vibe Tooling? simple tools for community to learn and engage, and developers to build dApps on EduChain.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#0f766e",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EduHub | Learn Anything and Prove It",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="#0f766e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-0D5VHKEZ6B"
      ></Script>
      <Script id="google-analytics">
        {`
   window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-0D5VHKEZ6B');
  `}
      </Script>
      <body className={`${inter.className} text-mobile-optimized`}>
        <OCIDProvider>
          <BannerProvider>
            <Banner />
            {children}
          </BannerProvider>
        </OCIDProvider>
      </body>
    </html>
  );
}
