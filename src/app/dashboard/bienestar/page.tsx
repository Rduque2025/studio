
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Users, BrainCircuit, ToyBrick, Mail, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
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

const benefits = [
  {
    icon: Leaf,
    title: "Inspírate",
    description: "Te damos el apoyo y las herramientas que necesitas para avanzar hacia la visión que persigues en tu bienestar personal y profesional."
  },
  {
    icon: Users,
    title: "Conéctate",
    description: "Únete a tus compañeros, comparte experiencias y anímense mutuamente en este viaje hacia el bienestar integral."
  },
  {
    icon: BrainCircuit,
    title: "Desarróllate",
    description: "Descubre las herramientas y recursos que necesitas para desarrollar nuevas habilidades y potenciar tu crecimiento."
  }
];

const importantEvents: EventHighlightProps[] = [
    {
      title: "Día de la Independencia",
      date: "5 de Julio",
      description: "Conmemoramos un hito histórico de nuestra nación. Habrá actividades especiales y sorpresas en la oficina.",
      imageUrl: "https://images.unsplash.com/photo-1663699786481-f457f366e70a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx2ZW5lenVlbGElMjBmbGFnfGVufDB8fHx8MTc1MzEyNzc3OHww&ixlib=rb-4.1.0&q=80&w=1080",
      dataAiHint: "Venezuela flag"
    },
    {
      title: "Día del Niño",
      date: "21 de Julio",
      description: "Celebremos a los más pequeños de la casa. Un día lleno de alegría, juegos y actividades para las familias.",
      imageUrl: "https://images.unsplash.com/photo-1531984929664-2fb2be468d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMnx8bmklQzMlQjFvfGVufDB8fHx8MTc1MzEyNzg5NXww&ixlib=rb-4.1.0&q=80&w=1080",
      dataAiHint: "children playing"
    }
];

export default function BienestarPage() {
    const menuScrollAreaRef = useRef<HTMLDivElement>(null);
    const [selectedMenu, setSelectedMenu] = useState<'Clásico' | 'Dieta' | 'Ejecutivo'>('Clásico');
    const [currentDayName, setCurrentDayName] = useState('');
    const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>([]);
    const [isLoadingMenu, setIsLoadingMenu] = useState(true);

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

    const handleMenuScroll = (direction: 'left' | 'right') => {
        const viewport = menuScrollAreaRef.current?.querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]');
        if (viewport) {
        const scrollAmount = 320; 
        viewport.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
        }
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
        title="Eventos Importantes del Mes"
        description="Mantente al día con las celebraciones y fechas especiales que tenemos en Banesco Seguros."
        titleClassName="text-4xl md:text-5xl font-extrabold tracking-tight"
        descriptionClassName="text-lg md:text-xl text-muted-foreground max-w-3xl"
      >
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {importantEvents.map((event, index) => (
            <EventHighlightCard key={index} {...event} />
          ))}
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
            <div className="flex w-max space-x-8 py-4">
                {isLoadingMenu ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <Card key={index} className="w-[350px] flex-shrink-0">
                      <Skeleton className="h-48 w-full" />
                      <CardContent className="p-4 space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                    </Card>
                  ))
                ) : filteredMenuItems.length > 0 ? (
                  filteredMenuItems.map((item) => (
                    <MenuItemCard key={item.id} item={item} isCurrentDay={currentDayName === item.day} />
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

      {/* Courses Section */}
      <div id="explorar-cursos" className="scroll-mt-20">
        <SectionWrapper
          title="Desarrolla Nuevas Habilidades"
          description="Amplía tus conocimientos con nuestros cursos de desarrollo profesional y personal."
          className="bg-muted/50"
          titleClassName="text-4xl md:text-5xl font-extrabold tracking-tight"
          descriptionClassName="text-lg md:text-xl text-muted-foreground max-w-3xl"
        >
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </SectionWrapper>
      </div>
      
      {/* Subscription Section */}
      <div id="empezar" className="scroll-mt-20">
        <SectionWrapper
          className="bg-muted/50"
          title="Mantente al Día"
          description="Suscríbete para recibir notificaciones sobre novedades, eventos y más directamente en tu correo."
          titleClassName="text-4xl md:text-5xl font-extrabold tracking-tight"
          descriptionClassName="text-lg md:text-xl text-muted-foreground max-w-3xl"
        >
            <Card className="mt-16 max-w-2xl mx-auto p-8 shadow-lg">
              <CardHeader className="text-center p-0">
                <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
                <CardTitle className="font-bold text-2xl">Únete a nuestra comunidad</CardTitle>
                <CardDescription className="text-sm">Recibe notificaciones sobre nuevas actividades y recursos de bienestar.</CardDescription>
              </CardHeader>
              <CardContent className="p-0 mt-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                    <Input type="email" placeholder="Tu correo electrónico" className="flex-grow" />
                    <Button className="w-full sm:w-auto bg-foreground hover:bg-foreground/90 text-background" size="lg">Suscribirse</Button>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="terms-sub" />
                    <Label htmlFor="terms-sub" className="text-xs text-muted-foreground">Acepto los términos de servicio y la política de privacidad.</Label>
                </div>
              </CardContent>
            </Card>
        </SectionWrapper>
      </div>

    </div>
  );
}
