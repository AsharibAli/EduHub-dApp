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
  title: "➡️ Eid Mubarak - 100k Yuzu Giveaway 🍊",
  description:
    "We're giving away 100k Yuzu to our community! Wishing you a wonderful day full of delicious food and amazing vibes.",
  buttons: {
    primary: {
      text: "Participate Here",
      href: "https://x.com/eduhub__/status/1906367899301990565",
    },
    secondary: {
      text: "Visit Docs",
      href: "https://docs.eduhub.dev/",
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
        "fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4",
        "animate-in fade-in duration-300",
        "backdrop-blur-sm"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="banner-title"
    >
      <Card className="w-full max-w-xl relative animate-in slide-in-from-bottom-4 duration-500">
        <button
          onClick={hideBanner}
          className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close banner"
        >
          <X className="h-5 w-5" />
        </button>

        <CardHeader>
          <CardTitle id="banner-title" className="text-2xl font-bold">
            {BANNER_CONFIG.title}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {BANNER_CONFIG.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1 hover:scale-105 transition-transform"
              variant="default"
              onClick={() =>
                handleNavigation(BANNER_CONFIG.buttons.primary.href)
              }
            >
              {BANNER_CONFIG.buttons.primary.text}
            </Button>
            <Button
              className="flex-1 hover:scale-105 transition-transform"
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
