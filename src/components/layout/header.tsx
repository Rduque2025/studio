
"use client";

import Link from "next/link";
import { Home, CalendarDays, HeartHandshake, FileText, BookOpen, Menu, Search, Settings, Database, Bell, Clock } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import Image from "next/image";
// import { mockCalendarEvents } from "@/lib/placeholder-data"; // No longer needed directly
import { useEvents, type CalendarEvent } from "@/contexts/events-context"; // Import useEvents
import { format, isToday } from "date-fns"; 
import { es } from "date-fns/locale"; 
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";


const navItemsDesktop = [
  { name: "General", href: "/dashboard", icon: Home },
  { name: "Datos", href: "/dashboard/mapa-clientes", icon: Database },
  { name: "Calendario", href: "/dashboard/calendario", icon: CalendarDays },
  { name: "Bienestar", href: "/dashboard/bienestar", icon: HeartHandshake },
  { name: "Requerimientos", href: "/dashboard/requerimientos", icon: FileText },
  { name: "Biblioteca Digital", href: "/dashboard/biblioteca", icon: BookOpen },
];

const navItemsMobile = [
  ...navItemsDesktop,
  { name: "Recordatorios", href: "#", icon: Bell, isReminders: true }, 
  { name: "Buscar", href: "#", icon: Search, isSearch: true }, 
  { name: "Configuración", href: "/dashboard/settings", icon: Settings },
];


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { allEvents, getCategoryDisplayStyles } = useEvents(); // Use context to get all events
  const [todaysEvents, setTodaysEvents] = useState<CalendarEvent[]>([]); // State for today's events from context
  const [isRemindersPopoverOpen, setIsRemindersPopoverOpen] = useState(false);
  const [isSearchPopoverOpen, setIsSearchPopoverOpen] = useState(false);


  useEffect(() => {
    // Filter allEvents for today - client-side only
    const filtered = allEvents.filter(event => isToday(event.date));
    setTodaysEvents(filtered);
  }, [allEvents]); // Re-filter when allEvents from context changes

  const handleMobileLinkClick = (item: (typeof navItemsMobile)[number]) => {
    if (item.isSearch || item.isReminders) {
      // For search and reminders, we might open a popover or specific UI in mobile
      // For now, it won't do anything special beyond what Popover does
    } else {
      setIsMobileMenuOpen(false);
    }
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/dashboard" className="ml-6 mr-4 flex items-center space-x-2 flex-shrink-0">
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

        <div className="flex items-center justify-end flex-shrink-0 ml-auto md:ml-6 space-x-1"> 
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-1">
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
                <Separator />
                {todaysEvents.length > 0 ? (
                  <ScrollArea className="h-[200px]">
                    <div className="p-4 space-y-3">
                      {todaysEvents.map((event) => {
                        const categoryStyles = event.isUserEvent && event.category ? getCategoryDisplayStyles(event.category) : null;
                        const displayColor = categoryStyles ? categoryStyles.dotColor : event.color;
                        // Ensure color is a valid CSS color string by removing 'bg-' prefix if it exists
                        const badgeBgColor = displayColor.startsWith('bg-') ? displayColor.substring(3) : displayColor;
                        const isDarkColor = ['blue-600', 'pink-500', 'red-500', 'purple-500', 'green-600', 'orange-500'].some(c => badgeBgColor.includes(c));

                        return (
                          <div key={event.id} className="text-xs">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium text-foreground truncate">{event.title}</p>
                                    <p className="text-muted-foreground truncate">{event.description || "Evento programado."}</p>
                                </div>
                                {categoryStyles && (
                                    <Badge variant="outline" className={cn("ml-2 text-xs self-start", categoryStyles.badgeClass)}>
                                        {categoryStyles.badgeText}
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge 
                                    variant="outline" 
                                    style={{
                                        backgroundColor: badgeBgColor, 
                                        color: isDarkColor ? 'white' : 'hsl(var(--foreground))',
                                        borderColor: badgeBgColor,
                                    }}
                                >
                                    {format(event.date, "PPP", { locale: es })}
                                </Badge>
                                {event.time && (
                                    <Badge variant="outline">
                                        <Clock className="mr-1 h-3 w-3" />
                                        {format(new Date(`1970-01-01T${event.time}`), 'p', { locale: es })}
                                    </Badge>
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
                 <Separator />
                <div className="p-2 text-center">
                    <Button variant="link" size="sm" asChild onClick={() => {setIsRemindersPopoverOpen(false); setIsMobileMenuOpen(false);}}>
                        <Link href="/dashboard/calendario">Ver Calendario</Link>
                    </Button>
                </div>
              </PopoverContent>
            </Popover>


            <Link href="/dashboard/settings" legacyBehavior passHref>
              <Button variant="ghost" size="icon" asChild>
                <a> 
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
                      onClick={() => handleMobileLinkClick(item)}
                    >
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span>{item.name}</span>
                      {item.icon === Bell && todaysEvents.length > 0 && (
                         <span className="ml-auto block h-2 w-2 rounded-full bg-primary" />
                      )}
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
