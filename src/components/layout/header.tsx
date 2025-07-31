

"use client";

import Link from "next/link";
import { Home, CalendarDays, HeartHandshake, FileText, BookOpen, Menu, Search, Bell, Clock, Target, User, Archive } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEvents, type CalendarEvent } from "@/contexts/events-context"; 
import { mockNotifications as initialMockNotifications, type NotificationItem } from "@/lib/placeholder-data";
import { format, isToday, intervalToDuration, isPast } from "date-fns"; 
import { es } from "date-fns/locale"; 
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { UserAuthForm } from "@/components/auth/user-auth-form";

const navItemsDesktop = [
  { name: "General", href: "/dashboard", icon: Home, activePaths: ["/dashboard"] },
  { name: "Nosotros", href: "/dashboard/mapa-clientes", icon: Target, activePaths: ["/dashboard/mapa-clientes", "/dashboard/objetivos", "/dashboard/objetivos-smart"] },
  { name: "Calendario", href: "/dashboard/calendario", icon: CalendarDays, activePaths: ["/dashboard/calendario"] },
  { name: "Bienestar", href: "/dashboard/bienestar", icon: HeartHandshake, activePaths: ["/dashboard/bienestar", "/dashboard/cursos", "/dashboard/actividades"] },
  { name: "Requerimientos", href: "/dashboard/requerimientos", icon: FileText, activePaths: ["/dashboard/requerimientos"] },
  { name: "Biblioteca", href: "/dashboard/biblioteca", icon: BookOpen, activePaths: ["/dashboard/biblioteca"] },
];

const navItemsMobile = [
  ...navItemsDesktop,
  { name: "Recordatorios", href: "#", icon: Bell, isReminders: true, activePaths: [] }, 
  { name: "Buscar", href: "#", icon: Search, isSearch: true, activePaths: [] }, 
  { name: "Perfil", href: "#", icon: User, isUser: true, activePaths: [] },
];


const UserProfileButton = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="group hover:bg-transparent">
                <User className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="sr-only">Perfil de Usuario</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <UserAuthForm />
            </PopoverContent>
          </Popover>
    );
}


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchPopoverOpen, setIsSearchPopoverOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialMockNotifications);
  const pathname = usePathname();

  const checkIsActive = (item: { href: string, activePaths: string[] }) => {
    if (item.href === '/dashboard' && pathname === '/dashboard') {
        return true;
    }
    // Check if the current pathname starts with any of the active paths, but isn't just the root dashboard path
    return item.href !== '/dashboard' && item.activePaths.some(p => pathname.startsWith(p));
  };

  const handleMobileLinkClick = (item: (typeof navItemsMobile)[number]) => {
    if (item.isSearch || item.isReminders || item.isUser) {
      // Handled by popover
    } else {
      setIsMobileMenuOpen(false);
    }
  };
  
  const handleArchiveAll = () => {
    setNotifications([]);
  };


  return (
    <header className="sticky top-0 z-50 w-full flex h-24 items-center justify-center px-4">
      {/* Desktop Header Capsule */}
      <nav className="hidden md:grid w-full max-w-7xl grid-cols-3 items-center bg-card/95 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border">
        {/* Left side: Logo */}
        <div className="flex items-center justify-start">
          <Link href="/dashboard" className="flex items-center space-x-2 flex-shrink-0">
            <Image
              src="https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_auto,s_webp:avif/banescointernacional.com/wp-content/uploads/2024/11/Isotipo.png"
              alt="Banesco Seguros Logo"
              width={32}
              height={32}
              priority
            />
          </Link>
        </div>

        {/* Center: Nav Links */}
        <div className="flex items-center justify-center space-x-1">
          {navItemsDesktop.map((item) => {
            const isActive = checkIsActive(item);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "transition-colors px-3 py-1.5 rounded-full text-xs font-medium",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right side: Action Icons */}
        <div className="flex items-center justify-self-end space-x-1">
          <Popover open={isSearchPopoverOpen} onOpenChange={setIsSearchPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="group hover:bg-transparent">
                <Search className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="sr-only">Buscar</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="search" placeholder="Buscar..." className="h-9" />
                <Button type="submit" size="sm" onClick={() => setIsSearchPopoverOpen(false)}>Buscar</Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
               <Button variant="ghost" size="icon" className="relative group hover:bg-transparent">
                <Bell className="h-5 w-5 transition-transform group-hover:scale-110" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {notifications.length}
                  </span>
                )}
                <span className="sr-only">Notificaciones</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0" align="end">
              <div className="p-4 pr-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-sm">Notificaciones</h4>
                    <p className="text-xs text-muted-foreground">Tienes {notifications.length} notificaciones nuevas.</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground group hover:bg-transparent" onClick={handleArchiveAll}>
                    <Archive className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </Button>
                </div>
              </div>

              <div className="w-full border-b border-dashed border-border"></div>
              
              <ScrollArea className="h-96">
                <div className="p-4 pr-6 space-y-2">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div key={notification.id} className="relative flex gap-3 items-start timeline-item">
                        {/* Timeline line */}
                        <div className="timeline-line"></div>

                        {/* Icon */}
                        <div className={cn("mt-1 flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center z-10", notification.iconColor)}>
                          <notification.icon className="h-4 w-4" />
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
                          <div className="flex justify-between items-center">
                            <p className="font-medium text-xs">{notification.title}</p>
                            <p className="text-[10px] text-muted-foreground">{notification.time}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{notification.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                     <div className="text-center py-16 text-muted-foreground">
                        <p className="text-sm">No tienes notificaciones nuevas.</p>
                      </div>
                  )}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
          
          <UserProfileButton />

        </div>
      </nav>

      {/* Mobile Header */}
      <div className="flex md:hidden w-full items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-2 flex-shrink-0">
          <Image
            src="https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_auto,s_webp:avif/banescointernacional.com/wp-content/uploads/2024/11/Isotipo.png"
            alt="Banesco Seguros Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
        {/* Mobile Menu Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4 mt-8">
              {navItemsMobile.map((item) => {
                 const isActive = checkIsActive(item);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 p-2 rounded-md",
                      isActive && item.href !== "#"
                        ? "bg-accent text-accent-foreground font-semibold"
                        : "hover:bg-accent hover:text-accent-foreground text-foreground"
                    )}
                    onClick={() => handleMobileLinkClick(item)}
                  >
                    <item.icon className={cn(
                      "h-5 w-5",
                      isActive && item.href !== "#"
                        ? "text-accent-foreground"
                        : "text-muted-foreground"
                     )} />
                    <span>{item.name}</span>
                    {item.icon === Bell && notifications.length > 0 && (
                       <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                         {notifications.length}
                       </span>
                    )}
                  </Link>
                );
                })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
