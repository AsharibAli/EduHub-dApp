"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBanner } from "./BannerContext";

const BANNER_CONFIG = {
  title: "➡️ Agent NFT - AI x Blockchain 🤖",
  description:
    "Hold Agent NFT to get access to EduAgent (The First AI Agent for EduChain), Share a prize pool of 1-2 million Yuzu Points, and unlock future benefits.",
  buttons: {
    primary: {
      text: "Purchase Here",
      href: "https://ed3.xyz/discover/launchpad/0xADA256fB3Fc28f40692EF385c5890c4Ea242664e",
    },
    secondary: {
      text: "More Info",
      href: "https://x.com/eduhub__/status/1910693515509850434",
    },
  },
};

const Banner = () => {
  const { isVisible, hideBanner } = useBanner();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  if (!isVisible) return null;

  const handleNavigation = (path: string) => {
    hideBanner();
    router.push(path);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-3 sm:p-4",
        "animate-in fade-in duration-300",
        "backdrop-blur-sm"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="banner-title"
    >
      <Card className="w-full max-w-lg sm:max-w-xl relative animate-in slide-in-from-bottom-4 duration-500 mx-4">
        <button
          onClick={hideBanner}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 p-2 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
          aria-label="Close banner"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <CardHeader className="pb-4 pr-12">
          <CardTitle
            id="banner-title"
            className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight"
          >
            {BANNER_CONFIG.title}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base mt-2 leading-relaxed">
            {BANNER_CONFIG.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex flex-col gap-3">
            <Button
              className="w-full hover:scale-105 transition-transform touch-manipulation py-3"
              variant="default"
              onClick={() =>
                handleNavigation(BANNER_CONFIG.buttons.primary.href)
              }
            >
              {BANNER_CONFIG.buttons.primary.text}
            </Button>
            <Button
              className="w-full hover:scale-105 transition-transform touch-manipulation py-3"
              variant="outline"
              onClick={() =>
                handleNavigation(BANNER_CONFIG.buttons.secondary.href)
              }
            >
              {BANNER_CONFIG.buttons.secondary.text}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Banner;
