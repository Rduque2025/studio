
"use client";

import Link from "next/link";
import { Home, CalendarDays, HeartHandshake, FileText, BookOpen, Menu, Search, Bell, Clock, Target, User, Archive, LogOut } from "lucide-react"; 
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
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItemsDesktop = [
  { name: "General", href: "/dashboard", icon: Home, activePaths: ["/dashboard"] },
  { name: "Nosotros", href: "/dashboard/mapa-clientes", icon: Target, activePaths: ["/dashboard/mapa-clientes", "/dashboard/objetivos", "/dashboard/objetivos-smart"] },
  { name: "Calendario", href: "/dashboard/calendario", icon: CalendarDays, activePaths: ["/dashboard/calendario"] },
  { name: "Bienestar", href: "/dashboard/bienestar", icon: HeartHandshake, activePaths: ["/dashboard/bienestar", "/dashboard/cursos", "/dashboard/actividades"] },
  { name: "Requerimientos", href: "/dashboard/requerimientos", icon: FileText, activePaths: ["/dashboard/requerimientos"] },
  { name: "Biblioteca", href: "/dashboard/biblioteca", icon: BookOpen, activePaths: ["/dashboard/biblioteca"] },
];

const UserProfileButton = () => {
    const { userEmail, logout } = useAuth();
    const userInitials = userEmail ? userEmail.substring(0, 2).toUpperCase() : 'U';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full group focus-visible:ring-0 focus-visible:ring-offset-0">
                    <Avatar className="h-9 w-9 transition-transform group-hover:scale-110 group-focus:scale-110">
                        <AvatarFallback className="bg-primary text-primary-foreground">{userInitials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-xs font-medium leading-none text-muted-foreground">Mi Cuenta</p>
                        <p className="text-xs leading-none text-foreground truncate">
                            {userEmail}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchPopoverOpen, setIsSearchPopoverOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialMockNotifications);
  const { allEvents } = useEvents();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const navItemsMobile = [
    ...navItemsDesktop,
    { name: "Recordatorios", href: "#", icon: Bell, isReminders: true, activePaths: [] }, 
    { name: "Buscar", href: "#", icon: Search, isSearch: true, activePaths: [] }, 
  ];

  useEffect(() => {
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');

    const todaysEvents = allEvents.filter(event => format(event.date, 'yyyy-MM-dd') === todayStr);

    const eventNotifications: NotificationItem[] = todaysEvents.map(event => ({
      id: `event-${event.id}`,
      type: 'event',
      title: event.title,
      description: event.description,
      time: event.time ? format(new Date(`1970-01-01T${event.time}`), 'p', { locale: es }) : 'Todo el día',
      icon: CalendarDays,
      iconColor: 'bg-rose-100 text-rose-500'
    }));

    const combinedNotifications = [...initialMockNotifications];
    eventNotifications.forEach(en => {
      if (!combinedNotifications.some(cn => cn.id === en.id)) {
        combinedNotifications.push(en);
      }
    });
    
    setNotifications(combinedNotifications);
  }, [allEvents]);

  const handleSearch = () => {
    if (pathname === '/dashboard') {
      const normalizedSearchTerm = searchTerm.toLowerCase().trim();
      const element = document.getElementById(normalizedSearchTerm);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsSearchPopoverOpen(false);
        setSearchTerm('');
      } else {
        toast({
            title: "No se encontró la sección",
            description: `No se pudo encontrar una sección llamada "${searchTerm}" en esta página.`,
            variant: "destructive"
        })
      }
    } else {
        toast({
            title: "Búsqueda no disponible",
            description: "La búsqueda por sección solo está disponible en la página principal.",
        })
    }
  };

  const checkIsActive = (item: { href: string, activePaths: string[] }) => {
    if (item.href === '/dashboard' && pathname === '/dashboard') {
        return true;
    }
    return item.href !== '/dashboard' && item.activePaths.some(p => pathname.startsWith(p));
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };
  
  const handleArchiveAll = () => {
    setNotifications([]);
  };


  return (
    <header className="sticky top-0 z-50 w-full flex h-24 items-center justify-center px-4">
      <nav className="hidden md:grid w-full max-w-7xl grid-cols-3 items-center bg-card/95 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border">
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

        <div className="flex items-center justify-self-end space-x-1">
          <Popover open={isSearchPopoverOpen} onOpenChange={setIsSearchPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="group hover:bg-transparent">
                <Search className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="sr-only">Buscar</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 border-0 bg-transparent shadow-none" align="end" sideOffset={16}>
              <div className="relative flex w-full items-center rounded-full bg-card shadow-lg">
                <Input
                  type="search"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="h-12 w-full rounded-full border-0 bg-transparent pl-6 pr-14 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-foreground text-background shadow-md transition-transform hover:scale-105"
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5" />
                </Button>
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
                        <div className="timeline-line"></div>
                        <div className={cn("mt-1 flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center z-10", notification.iconColor)}>
                          <notification.icon className="h-4 w-4" />
                        </div>
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
        <div className="flex items-center gap-2">
          <UserProfileButton />
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
                      onClick={handleMobileLinkClick}
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
      </div>
    </header>
  );
}
