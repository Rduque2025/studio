
'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Users, BrainCircuit, ToyBrick, Mail, Briefcase, ChevronLeft, ChevronRight, Star, Smile, Meh, Frown, Send } from "lucide-react";
import { CourseCard } from "@/components/dashboard/course-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { mockCourses, mockActivities } from "@/lib/placeholder-data";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { EventHighlightCard, type EventHighlightProps } from '@/components/dashboard/event-highlight-card';
import type { LucideIcon } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import type { MenuItem } from '@/ai/flows/get-menu-items-flow';
import { getMenuItems } from '@/ai/flows/get-menu-items-flow';
import { MenuItemCard } from '@/components/dashboard/menu-item-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useEvents } from '@/contexts/events-context';
import { format, getMonth, getYear } from 'date-fns';
import { es } from 'date-fns/locale';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const ESPECIAL_KEYWORDS = ['día de', 'feriado', 'conmemorativo', 'aniversario', 'independencia', 'mujer', 'trabajador', 'resistencia', 'navidad', 'noche buena', 'festivo', 'resultados anuales', 'carnavales', 'santo', 'batalla', 'natalicio', 'año nuevo', 'fin de año'];

// Helper function to normalize day names for comparison
const normalizeDayName = (name: string) => {
  return name
    .toLowerCase()
    .normalize("NFD") // Decompose accented characters
    .replace(/[\u0000-\u007f]/g, ""); // Remove diacritical marks
};

type Satisfaction = 'happy' | 'neutral' | 'sad' | null;


export default function BienestarPage() {
    const menuScrollAreaRef = useRef<HTMLDivElement>(null);
    const [selectedMenu, setSelectedMenu] = useState<'Clásico' | 'Dieta' | 'Ejecutivo'>('Clásico');
    const [currentDayName, setCurrentDayName] = useState('');
    const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>([]);
    const [isLoadingMenu, setIsLoadingMenu] = useState(true);
    const { allEvents } = useEvents();
    const [importantEvents, setImportantEvents] = useState<EventHighlightProps[]>([]);
    const [isLoadingEvents, setIsLoadingEvents] = useState(true);
    const [satisfaction, setSatisfaction] = useState<Satisfaction>(null);
    const [comment, setComment] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        const dayName = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
        setCurrentDayName(dayName.charAt(0).toUpperCase() + dayName.slice(1));
        
        const fetchMenu = async () => {
          setIsLoadingMenu(true);
          try {
            const items = await getMenuItems();
            setAllMenuItems(items);
          } catch (error) {
            console.error("Failed to fetch menu items", error);
          } finally {
            setIsLoadingMenu(false);
          }
        };
        fetchMenu();
    }, []);

    useEffect(() => {
        if (allEvents.length > 0) {
            setIsLoadingEvents(true);
            const now = new Date();
            const currentMonth = getMonth(now);
            const currentYear = getYear(now);

            const specialEventsThisMonth = allEvents
                .filter(event => {
                    const eventMonth = getMonth(event.date);
                    const eventYear = getYear(event.date);
                    const isSpecial = ESPECIAL_KEYWORDS.some(kw => event.title.toLowerCase().includes(kw));
                    return eventYear === currentYear && eventMonth === currentMonth && isSpecial;
                })
                .sort((a, b) => a.date.getTime() - b.date.getTime());

            const formattedEvents = specialEventsThisMonth.slice(0, 2).map(event => ({
                title: event.title,
                date: format(event.date, "d 'de' MMMM", { locale: es }),
                description: event.description || `Un evento especial programado para el ${format(event.date, "PPP", { locale: es })}.`,
                imageUrl: "https://images.unsplash.com/photo-1729155408920-20029e94e183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8cmVzdHxlbnwwfHx8fDE3NTc2MTQ5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
                dataAiHint: "celebration event"
            }));

            setImportantEvents(formattedEvents);
            setIsLoadingEvents(false);
        } else {
             // Handle case where allEvents might still be loading initially
            setIsLoadingEvents(true);
            setTimeout(() => { // Add a small delay to see if events load
                if(allEvents.length === 0) setIsLoadingEvents(false);
            }, 1500);
        }
    }, [allEvents]);

    const handleMenuScroll = (direction: 'left' | 'right') => {
        const viewport = menuScrollAreaRef.current?.querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]');
        if (viewport) {
        const scrollAmount = 344; // w-80 (320px) + space-x-6 (24px)
        viewport.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
        }
    };

    const handleFeedbackSubmit = () => {
        if (!satisfaction) {
            toast({
                title: "Calificación requerida",
                description: "Por favor, selecciona una opción de satisfacción.",
                variant: "destructive",
            });
            return;
        }
        if (!comment.trim()) {
             toast({
                title: "Comentario requerido",
                description: "Por favor, escribe tu sugerencia o comentario.",
                variant: "destructive",
            });
            return;
        }
        
        toast({
            title: "¡Gracias por tu opinión!",
            description: "Hemos recibido tu comentario y lo tendremos en cuenta.",
        });

        // Reset form
        setSatisfaction(null);
        setComment('');
    };


    const filteredMenuItems = allMenuItems.filter(item => item.type === selectedMenu);


  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center text-center px-4">
        <Image
          src="https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwYWlzYWplfGVufDB8fHx8MTc1MzEyNzUyOHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Paisaje natural inspirador"
          layout="fill"
          objectFit="cover"
          data-ai-hint="fresh nature"
          className="brightness-[0.4]"
        />
        <div className="relative z-10 text-white max-w-4xl mx-auto">
           <h2 className="text-xl md:text-2xl font-light">Bienvenido a tu</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Espacio de Bienestar.
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/90 max-w-xl mx-auto">
            Creamos oportunidades para que puedas construir un estilo de vida saludable y equilibrado.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#explorar-actividades">
                Comienza tu Viaje
              </Link>
            </Button>
             <Button asChild size="lg" variant="link" className="text-white">
              <Link href="#empezar">
                Saber más <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Important Events Section */}
      <SectionWrapper
        title="Eventos del Mes"
        description="Mantente al día con las celebraciones y fechas especiales que tenemos en Banesco Seguros."
        titleClassName="text-4xl md:text-5xl font-extrabold tracking-tight"
        descriptionClassName="text-lg md:text-xl text-muted-foreground max-w-3xl"
      >
        <div className="grid md:grid-cols-2 gap-8 mt-16 min-h-[400px]">
          {isLoadingEvents ? (
            <>
              <Skeleton className="h-96 w-full rounded-2xl" />
              <Skeleton className="h-96 w-full rounded-2xl" />
            </>
          ) : importantEvents.length > 0 ? (
            importantEvents.map((event, index) => (
              <EventHighlightCard key={index} {...event} />
            ))
          ) : (
            <div className="md:col-span-2 flex flex-col items-center justify-center text-center text-muted-foreground p-8 bg-muted/50 rounded-2xl">
              <Star className="h-12 w-12 mb-4 text-primary/50" />
              <h3 className="text-xl font-semibold text-foreground">No hay eventos destacados este mes</h3>
              <p className="max-w-md mt-2">No se encontraron feriados o fechas conmemorativas en el calendario para el mes en curso. ¡Consulta el calendario completo para ver todos los eventos!</p>
            </div>
          )}
        </div>
        <div className="text-center mt-16">
           <Button asChild variant="link" className="text-sm font-semibold tracking-widest text-muted-foreground hover:text-primary">
            <Link href="/dashboard/calendario">
              VER CALENDARIO COMPLETO <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>
      
      {/* Menu Section */}
      <SectionWrapper
        title="Menú Semanal del Comedor"
        description="Descubre las deliciosas opciones que tenemos para ti durante toda la semana."
        className="bg-muted/50"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
                <Button size="sm" variant={selectedMenu === 'Clásico' ? 'default' : 'outline'} onClick={() => setSelectedMenu('Clásico')}>Clásico</Button>
                <Button size="sm" variant={selectedMenu === 'Dieta' ? 'default' : 'outline'} onClick={() => setSelectedMenu('Dieta')}>Dieta</Button>
                <Button size="sm" variant={selectedMenu === 'Ejecutivo' ? 'default' : 'outline'} onClick={() => setSelectedMenu('Ejecutivo')}>Ejecutivo</Button>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => handleMenuScroll('left')}>
                <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleMenuScroll('right')}>
                <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
        <div ref={menuScrollAreaRef}>
            <ScrollArea className="w-full">
            <div className="flex w-max space-x-6 py-4">
                {isLoadingMenu ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="w-80 flex-shrink-0">
                        <Skeleton className="h-[420px] w-full rounded-2xl" />
                    </div>
                  ))
                ) : filteredMenuItems.length > 0 ? (
                  filteredMenuItems.map((item) => (
                    <MenuItemCard key={item.id} item={item} isCurrentDay={normalizeDayName(currentDayName) === normalizeDayName(item.day)} />
                  ))
                ) : (
                  <p className="text-muted-foreground">No hay menú de tipo "{selectedMenu}" disponible.</p>
                )}
            </div>
            <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
      </SectionWrapper>

      {/* Activities Section */}
      <div id="explorar-actividades" className="scroll-mt-20">
        <SectionWrapper
          title="Explora Nuestras Actividades"
          description="Desde yoga hasta talleres creativos, encuentra la actividad perfecta para ti."
          titleClassName="text-4xl md:text-5xl font-extrabold tracking-tight"
          descriptionClassName="text-lg md:text-xl text-muted-foreground max-w-3xl"
        >
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </SectionWrapper>
      </div>

      {/* Feedback Section */}
      <div id="empezar" className="scroll-mt-20">
        <SectionWrapper
          className="bg-muted/50"
          title="Buzón de Sugerencias y Comentarios"
          description="Tu opinión es importante. Déjanos tus sugerencias, comentarios o califica tu satisfacción con nuestros servicios de bienestar."
          titleClassName="text-4xl md:text-5xl font-extrabold tracking-tight"
          descriptionClassName="text-lg md:text-xl text-muted-foreground max-w-3xl"
        >
            <Card className="mt-16 max-w-2xl mx-auto p-8 shadow-lg">
              <CardHeader className="text-center p-0">
                <CardTitle className="font-bold text-2xl">¿Cómo calificarías tu experiencia?</CardTitle>
                <CardDescription className="text-sm mt-1">Selecciona una opción y déjanos tu comentario.</CardDescription>
              </CardHeader>
              <CardContent className="p-0 mt-6 space-y-6">
                <div className="flex justify-center gap-4">
                    <Button variant="ghost" size="icon" className={cn("h-16 w-16 rounded-full transition-all", satisfaction === 'happy' && 'bg-green-100 scale-110')} onClick={() => setSatisfaction('happy')}>
                        <Smile className={cn("h-8 w-8 text-muted-foreground", satisfaction === 'happy' && 'text-green-500')} />
                    </Button>
                    <Button variant="ghost" size="icon" className={cn("h-16 w-16 rounded-full transition-all", satisfaction === 'neutral' && 'bg-amber-100 scale-110')} onClick={() => setSatisfaction('neutral')}>
                        <Meh className={cn("h-8 w-8 text-muted-foreground", satisfaction === 'neutral' && 'text-amber-500')} />
                    </Button>
                    <Button variant="ghost" size="icon" className={cn("h-16 w-16 rounded-full transition-all", satisfaction === 'sad' && 'bg-red-100 scale-110')} onClick={() => setSatisfaction('sad')}>
                        <Frown className={cn("h-8 w-8 text-muted-foreground", satisfaction === 'sad' && 'text-red-500')} />
                    </Button>
                </div>
                <Textarea 
                    placeholder="Escribe tu comentario o sugerencia aquí..." 
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button size="lg" onClick={handleFeedbackSubmit}>
                    <Send className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
        </SectionWrapper>
      </div>

    </div>
  );
}
