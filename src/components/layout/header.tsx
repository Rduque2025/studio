
"use client";

import Link from "next/link";
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
          {/* Text Logo for Banesco Seguros */}
          <span className="font-bold text-lg text-primary">Banesco Seguros</span>
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
