"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/data/website/navigation";
import { cn } from "@/lib/utils";
import GoldButton from "../shared/GoldButton";
import BrandLogo from "./BrandLogo";

/** Floating glass navbar (Figma "Frame 2147235705"). */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 px-4 transition-[top] duration-300 sm:px-8 lg:px-[60px]",
        scrolled ? "top-3" : "top-5",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1320px] items-center justify-between rounded-lg py-2 pl-6 pr-2 backdrop-blur-md transition-all duration-300",
          scrolled
            ? "border border-pb-bronze/30 bg-black/75 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            : "border border-transparent bg-white/10",
        )}
      >
        <BrandLogo />

        <nav className="hidden items-center gap-6 xl:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "py-2 text-base transition-colors hover:text-pb-gold",
                  active ? "text-pb-bronze" : "text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <GoldButton href="/login" size="sm" className="py-3">
            Get Started
          </GoldButton>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="flex size-11 items-center justify-center rounded-lg text-white xl:hidden"
              >
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] border-pb-line bg-[#0B0E0F] text-white"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-10 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-3 text-base hover:bg-white/5",
                      pathname === link.href ? "text-pb-bronze" : "text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
