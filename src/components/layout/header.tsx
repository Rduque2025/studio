
"use client";

import Link from "next/link";
// Removed import for Next.js Image as we are using inline SVG
import { Home, CalendarDays, HeartHandshake, FileText, BookOpen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";

const navItems = [
  { name: "General", href: "/dashboard", icon: Home },
  { name: "Calendario", href: "/dashboard/calendario", icon: CalendarDays },
  { name: "Bienestar", href: "/dashboard/bienestar", icon: HeartHandshake },
  { name: "Requerimientos", href: "/dashboard/requerimientos", icon: FileText },
  { name: "Biblioteca Digital", href: "/dashboard/biblioteca", icon: BookOpen },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
          {/* SVG Logo for Banesco Seguros */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 58" className="h-8 w-auto" aria-label="Banesco Seguros Logo">
            <title>Banesco Seguros Logo</title>
            <path fillRule="evenodd" fill="#d52027" d="M1.36,42.47 C1.36,33.58 10.67,28.03 28,28.03 C45.33,28.03 54.64,33.58 54.64,42.47 C54.64,47.73 50.02,52.55 42.51,55.22 C35.66,57.65 20.34,57.65 13.49,55.22 C5.98,52.55 1.36,47.73 1.36,42.47 Z M11.93,42.47 C11.93,38.52 16.62,35.34 28,35.34 C39.38,35.34 44.07,38.52 44.07,42.47 C44.07,46.42 39.38,49.6 28,49.6 C16.62,49.6 11.93,46.42 11.93,42.47 Z"/>
            <circle cx="28" cy="37" r="9" fill="#d52027"/>
            <circle cx="40" cy="23" r="9" fill="#00508c"/>
            <circle cx="19" cy="17" r="9" fill="#008464"/>
          </svg>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <Separator />
    </header>
  );
}
