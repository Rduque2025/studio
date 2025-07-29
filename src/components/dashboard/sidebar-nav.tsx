'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Users,
  Megaphone,
  FolderKanban,
  MoreHorizontal,
  LogOut,
  HelpCircle,
  Sun,
  Moon,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';

const mainNavItems = [
  { id: 'ALL', label: 'ALL', icon: LayoutGrid },
  { id: 'Capital Humano', label: 'Capital Humano', icon: Users },
  { id: 'Mercadeo', label: 'Mercadeo', icon: Megaphone },
  { id: 'Proyectos', label: 'Proyectos', icon: FolderKanban },
  { id: 'Otros', label: 'Otros', icon: MoreHorizontal },
];

const footerNavItems = [
  { id: 'help', label: 'Ayuda', icon: HelpCircle },
  { id: 'logout', label: 'Cerrar Sesión', icon: LogOut },
];

interface SidebarNavProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function SidebarNav({ activeCategory, setActiveCategory }: SidebarNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'relative flex flex-col bg-card text-card-foreground border-r transition-all duration-300 ease-in-out h-auto',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <div className="flex items-center h-16 px-4 border-b shrink-0">
          <div className="flex items-center gap-2">
            <Image
              src="https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_auto,s_webp:avif/banescointernacional.com/wp-content/uploads/2024/11/Isotipo.png"
              alt="Logo"
              width={32}
              height={32}
            />
            <span className={cn('font-semibold text-lg whitespace-nowrap', isCollapsed && 'opacity-0 w-0 hidden')}>
              Portal
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn('h-7 w-7 ml-auto rounded-full', isCollapsed && 'mr-auto')}
            onClick={toggleSidebar}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-2 overflow-auto">
          {mainNavItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Button
                  variant={activeCategory === item.id ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full flex items-center gap-3',
                    isCollapsed ? 'justify-center' : 'justify-start'
                  )}
                  onClick={() => setActiveCategory(item.id)}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className={cn('whitespace-nowrap', isCollapsed && 'sr-only')}>{item.label}</span>
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" sideOffset={5}>
                  {item.label}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>

        <div className="mt-auto p-2 border-t">
          {footerNavItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full flex items-center gap-3',
                    isCollapsed ? 'justify-center' : 'justify-start'
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className={cn('whitespace-nowrap', isCollapsed && 'sr-only')}>{item.label}</span>
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" sideOffset={5}>
                  {item.label}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
          
          <div className="p-2 mt-2">
            <div
              className={cn(
                'relative flex items-center h-8 rounded-full bg-muted p-1 transition-all duration-300',
                isCollapsed && 'w-8 h-8 justify-center'
              )}
            >
              <Button
                variant={isDarkMode ? 'ghost' : 'secondary'}
                size="icon"
                className="h-6 w-6 rounded-full flex-1"
                onClick={() => setIsDarkMode(false)}
              >
                <Sun className="h-4 w-4" />
              </Button>
              <Button
                variant={!isDarkMode ? 'ghost' : 'secondary'}
                size="icon"
                className="h-6 w-6 rounded-full flex-1"
                onClick={() => setIsDarkMode(true)}
              >
                <Moon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}