
"use client";

import Link from "next/link";
import { Home, CalendarDays, HeartHandshake, FileText, BookOpen, Menu, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const navItemsDesktop = [
  { name: "General", href: "/dashboard", icon: Home },
  { name: "Calendario", href: "/dashboard/calendario", icon: CalendarDays },
  { name: "Bienestar", href: "/dashboard/bienestar", icon: HeartHandshake },
  { name: "Requerimientos", href: "/dashboard/requerimientos", icon: FileText },
  { name: "Biblioteca Digital", href: "/dashboard/biblioteca", icon: BookOpen },
];

const navItemsMobile = [
  ...navItemsDesktop,
  { name: "Buscar", href: "#", icon: Search }, // Placeholder, actual search can be implemented later
  { name: "Configuración", href: "/dashboard/settings", icon: Settings }, // Placeholder for settings page
];


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/dashboard" className="ml-2 mr-4 flex items-center space-x-2 flex-shrink-0">
          <Image
            src="https://www.banescoseguros.com/wp-content/uploads/2024/06/Logo-bs-horizontal-1.png"
            alt="Banesco Seguros Logo"
            width={150} 
            height={32}
            className="h-8 w-auto" 
            priority
          />
        </Link>
        
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-3 text-xs font-medium">
          {navItemsDesktop.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60 px-2 py-1 rounded-md"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end flex-shrink-0 ml-auto md:ml-6 space-x-2">
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Buscar</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="search" placeholder="Buscar..." className="h-9" />
                  <Button type="submit" size="sm">Buscar</Button>
                </div>
              </PopoverContent>
            </Popover>

            <Link href="/dashboard/settings" legacyBehavior passHref>
              <Button variant="ghost" size="icon" asChild>
                <a> {/* Use <a> for Next.js Link with legacyBehavior */}
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Configuración</span>
                </a>
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Trigger */}
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
                  {navItemsMobile.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
                      onClick={() => {
                        if (item.name !== "Buscar" || item.href !== "#") {
                           setIsMobileMenuOpen(false);
                        }
                      }}
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
