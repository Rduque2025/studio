"use client";

import Link from "next/link";
import { Home, CalendarDays, HeartHandshake, FileText, BookOpen, Menu, Search, Settings, Bell, Clock, Target } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEvents, type CalendarEvent } from "@/contexts/events-context"; 
import { format, isToday, intervalToDuration, isPast } from "date-fns"; 
import { es } from "date-fns/locale"; 
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";


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
  { name: "Configuración", href: "/dashboard/settings", icon: Settings, activePaths: ["/dashboard/settings"] },
];

// Client-side component for countdown to prevent hydration errors
function Countdown({ eventDate, eventTime }: { eventDate: Date; eventTime?: string }) {
  const [countdown, setCountdown] = useState('');

  const calculate = React.useCallback(() => {
    if (!eventTime) {
      setCountdown('');
      return;
    }
    const now = new Date();
    const [hours, minutes] = eventTime.split(':').map(Number);
    const eventDateTime = new Date(eventDate);
    eventDateTime.setHours(hours, minutes, 0, 0);

    if (isPast(eventDateTime)) {
      setCountdown('Comenzó');
      return;
    }

    const duration = intervalToDuration({ start: now, end: eventDateTime });
    const parts = [];
    if (duration.days && duration.days > 0) parts.push(`${duration.days}d`);
    if (duration.hours && duration.hours > 0) parts.push(`${duration.hours}h`);
    if (duration.minutes && duration.minutes > 0) parts.push(`${duration.minutes}m`);
    
    if (parts.length === 0 && duration.seconds && duration.seconds > 0) {
       parts.push(`${duration.seconds}s`);
    } else if (parts.length < 2 && duration.seconds && duration.seconds > 0 && !(duration.days || duration.hours) && !(duration.minutes && duration.minutes >=10 )) {
       parts.push(`${duration.seconds}s`);
    }

    if (parts.length === 0) {
      setCountdown('Ahora');
      return;
    }

    setCountdown(`en ${parts.join(' ')}`);
  }, [eventDate, eventTime]);

  useEffect(() => {
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [calculate]);

  if (!countdown) return null;

  return (
    <Badge variant="outline">
      {countdown}
    </Badge>
  );
}


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { allEvents, getCategoryDisplayStyles } = useEvents(); 
  const [todaysEvents, setTodaysEvents] = useState<CalendarEvent[]>([]); 
  const [isRemindersPopoverOpen, setIsRemindersPopoverOpen] = useState(false);
  const [isSearchPopoverOpen, setIsSearchPopoverOpen] = useState(false);
  const pathname = usePathname();


  useEffect(() => {
    const filtered = allEvents.filter(event => isToday(event.date));
    setTodaysEvents(filtered.sort((a, b) => {
        if (!a.time && !b.time) return 0;
        if (!a.time) return 1;
        if (!b.time) return -1;
        return a.time.localeCompare(b.time);
    }));
  }, [allEvents]); 

  const handleMobileLinkClick = (item: (typeof navItemsMobile)[number]) => {
    if (item.isSearch || item.isReminders) {
      // Handled by popover
    } else {
      setIsMobileMenuOpen(false);
    }
  };


  return (
    <header className="sticky top-0 z-50 w-full flex h-20 items-center justify-center px-4">
      {/* Desktop Header Capsule */}
      <nav className="hidden md:grid w-full max-w-7xl grid-cols-3 items-center bg-card/95 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border">
        {/* Left side: Logo */}
        <div className="flex items-center justify-start">
          <Link href="/dashboard" className="flex items-center space-x-2 flex-shrink-0">
            <Image
              src="https://www.banescoseguros.com/wp-content/uploads/2024/06/Logo-bs-horizontal-1.png"
              alt="Banesco Seguros Logo"
              width={86}
              height={20}
              priority
            />
          </Link>
        </div>

        {/* Center: Nav Links */}
        <div className="flex items-center justify-center space-x-1">
          {navItemsDesktop.map((item) => {
            const isActive = item.href === '/dashboard' 
                ? pathname === '/dashboard' 
                : item.activePaths.some(p => pathname.startsWith(p));
            
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
        <div className="flex items-center justify-end space-x-1">
          <Popover open={isSearchPopoverOpen} onOpenChange={setIsSearchPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
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

          <Popover open={isRemindersPopoverOpen} onOpenChange={setIsRemindersPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                {todaysEvents.length > 0 && (
                  <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
                )}
                <span className="sr-only">Recordatorios</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
              <div className="p-4">
                <h4 className="font-medium text-sm text-foreground">Recordatorios de Hoy</h4>
              </div>
              
              {todaysEvents.length > 0 ? (
                <ScrollArea className="h-[200px]">
                  <div className="p-4 space-y-3">
                    {todaysEvents.map((event) => {
                      const categoryStyles = event.isUserEvent && event.category ? getCategoryDisplayStyles(event.category) : null;
                      
                      return (
                        <div key={event.id} className="text-xs">
                          <div className="flex justify-between items-start">
                            <div className="flex-grow">
                              <p className="font-medium text-foreground truncate">{event.title}</p>
                              <p className="text-muted-foreground truncate">{event.description || "Evento programado."}</p>
                            </div>
                            {categoryStyles && (
                              <Badge variant="outline" className={cn("ml-2 text-xs self-start flex-shrink-0", categoryStyles.badgeClass)}>
                                {categoryStyles.badgeText}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">
                              {format(event.date, "PPP", { locale: es })}
                            </Badge>
                            {event.time && (
                              <Badge variant="outline" className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                {format(new Date(`1970-01-01T${event.time}`), 'p', { locale: es })}
                              </Badge>
                            )}
                            {event.time && (
                              <Countdown eventDate={event.date} eventTime={event.time} />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              ) : (
                <p className="p-4 text-sm text-muted-foreground">No hay recordatorios para hoy.</p>
              )}
              
              <div className="p-2 text-center border-t">
                <Button variant="link" size="sm" asChild onClick={() => {setIsRemindersPopoverOpen(false); setIsMobileMenuOpen(false);}}>
                  <Link href="/dashboard/calendario">Ver Calendario</Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Link href="/dashboard/settings" legacyBehavior passHref>
            <Button 
              variant="ghost" 
              size="icon" 
              asChild
              className={cn(pathname === "/dashboard/settings" && "bg-accent text-accent-foreground")}
            >
              <a> 
                <Settings className="h-5 w-5" />
                <span className="sr-only">Configuración</span>
              </a>
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="flex md:hidden w-full items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-2 flex-shrink-0">
          <Image
            src="https://www.banescoseguros.com/wp-content/uploads/2024/06/Logo-bs-horizontal-1.png"
            alt="Banesco Seguros Logo"
            width={86}
            height={16}
            className="h-4 w-auto"
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
                const isActive = item.href === '/dashboard' 
                    ? pathname === '/dashboard' 
                    : item.activePaths.some(p => p !== '/dashboard' && pathname.startsWith(p));
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
                    {item.icon === Bell && todaysEvents.length > 0 && (
                       <span className="ml-auto block h-2 w-2 rounded-full bg-primary" />
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
