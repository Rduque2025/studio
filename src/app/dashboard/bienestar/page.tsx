
'use client';

import React, { useState, useEffect } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CourseCard } from "@/components/dashboard/course-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { MenuItemCard } from "@/components/dashboard/menu-item-card";
import { mockCourses, mockActivities, mockMenuItems } from "@/lib/placeholder-data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const bienestarNews = [
  {
    id: "news-1",
    title: "Celebramos el Día del Padre",
    description: "Un almuerzo especial para todos los padres de nuestra familia Banesco.",
    imageUrl: "https://images.unsplash.com/photo-1542948843-bf19f4f535cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxmYXRoZXJzJTIwZGF5fGVufDB8fHx8MTc1MDg3OTgwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "fathers day",
    gridClass: "md:col-span-2 md:row-span-2",
    link: "#evento-destacado",
    badge: "Evento Pasado",
  },
  {
    id: "news-2",
    title: "Viernes de Pasticho",
    description: "¡No te pierdas el menú especial de esta semana!",
    imageUrl: "https://images.unsplash.com/photo-1745178964606-e8f4818f57b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxsYXNhZ25hJTIwZm9vZHxlbnwwfHx8fDE3NTA4Nzk4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "lasagna food",
    gridClass: "md:col-span-1 md:row-span-1",
    link: "#menu-semanal",
    badge: "Menú",
  },
  {
    id: "news-3",
    title: "Nuevo Programa: Conecta2",
    description: "Fomentando la colaboración y el bienestar entre equipos.",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8fDE3NTA4Nzk4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "team collaboration",
    gridClass: "md:col-span-1 md:row-span-1",
    link: "#",
    badge: "Nuevo",
  },
  {
    id: "news-4",
    title: "Clases de Yoga Semanales",
    description: "Encuentra tu equilibrio y reduce el estrés cada lunes y miércoles.",
    imageUrl: "https://images.unsplash.com/flagged/photo-1564740930826-1aabf6c8a776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx5b2dhJTIwZml0bmVzc3xlbnwwfHx8fDE3NTA4Nzk4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "yoga fitness",
    gridClass: "md:col-span-1 md:row-span-1",
    link: "#actividades",
    badge: "Actividad",
  },
  {
    id: "news-5",
    title: "Curso de Liderazgo Efectivo",
    description: "Inscríbete ahora y potencia tus habilidades de gestión.",
    imageUrl: "https://images.unsplash.com/photo-1624555130296-e551faf8969b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxsZWFkZXJzaGlwJTIwbWVldGluZ3xlbnwwfHx8fDE3NTA4Nzk4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "leadership meeting",
    gridClass: "md:col-span-2 md:row-span-1",
    link: "#cursos",
    badge: "Formación",
  },
   {
    id: "news-6",
    title: "Tips de Alimentación Saludable",
    description: "Descubre cómo mejorar tu dieta en la oficina.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxoZWFsdGh5JTIwZm9vZHxlbnwwfHx8fDE3NTA4Nzk4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "healthy food",
    gridClass: "md:col-span-1 md:row-span-1",
    link: "/dashboard/biblioteca",
    badge: "Artículo",
  },
];


export default function BienestarPage() {
  const [currentDayName, setCurrentDayName] = useState('');

  useEffect(() => {
    const today = new Date();
    const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' });
    setCurrentDayName(dayName.charAt(0).toUpperCase() + dayName.slice(1));
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      <SectionWrapper 
        title="Lobby de Bienestar"
        description="Noticias, eventos y recursos para tu desarrollo y bienestar integral en Banesco Seguros."
        titleClassName="text-3xl font-bold text-primary"
        descriptionClassName="text-secondary"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px]">
          {bienestarNews.map(item => (
            <Link key={item.id} href={item.link} className={`relative rounded-xl overflow-hidden group block shadow-lg hover:shadow-2xl transition-shadow duration-300 ${item.gridClass}`}>
              <Image 
                src={item.imageUrl}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={item.dataAiHint}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent backdrop-blur-[2px] transition-all duration-300 group-hover:from-black/80 group-hover:backdrop-blur-md" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                {item.badge && (
                  <span className="mb-2 text-xs font-semibold uppercase tracking-wider bg-primary/80 text-primary-foreground px-2 py-1 rounded-full self-start">
                    {item.badge}
                  </span>
                )}
                <h3 className="text-xl lg:text-2xl font-bold">{item.title}</h3>
                <p className="text-sm mt-1 text-white/90 hidden md:block">{item.description}</p>
                 <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-sm font-semibold">
                  Ver más <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>
      
      <div id="actividades" className="scroll-mt-24">
       <SectionWrapper title="Actividades y Bienestar" description="Participe en nuestras próximas actividades y programas de bienestar." titleClassName="text-primary" descriptionClassName="text-secondary">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </SectionWrapper>
      </div>

      <div id="cursos" className="scroll-mt-24">
        <SectionWrapper title="Cursos Disponibles" description="Amplíe sus conocimientos y habilidades con nuestra oferta formativa." titleClassName="text-primary" descriptionClassName="text-secondary">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </SectionWrapper>
      </div>

      <div id="menu-semanal" className="scroll-mt-24">
        <SectionWrapper title="Menú Semanal" description="Consulte las opciones de almuerzo para esta semana en el comedor." titleClassName="text-primary" descriptionClassName="text-secondary">
          <ScrollArea className="w-full whitespace-nowrap rounded-md bg-card shadow-sm border-none">
            <div className="flex w-max space-x-4 p-4">
              {mockMenuItems.map((item) => (
                <MenuItemCard key={item.id} item={item} isCurrentDay={currentDayName === item.day} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </SectionWrapper>
      </div>

      <div id="evento-destacado" className="scroll-mt-24">
        <SectionWrapper
          title="Evento Reciente Destacado"
          description="Revive los mejores momentos de nuestros últimos encuentros."
          titleClassName="text-primary"
          descriptionClassName="text-secondary"
        >
          <Card className="overflow-hidden md:flex shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="md:w-1/3 h-64 md:h-auto relative">
              <Image
                src="https://images.unsplash.com/photo-1542948843-bf19f4f535cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxmYXRoZXJzJTIwZGF5fGVufDB8fHx8MTc1MDg3OTgwMnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Celebración del Día del Padre"
                layout="fill"
                objectFit="cover"
                data-ai-hint="fathers day"
              />
            </div>
            <div className="md:w-2/3 p-6 flex flex-col justify-center">
              <Badge variant="secondary" className="mb-2 self-start">Evento Destacado</Badge>
              <h3 className="text-xl font-bold text-primary mb-2">Celebramos el Día del Padre</h3>
              <p className="text-xs text-muted-foreground mb-4">
                16 de Junio, 2024
              </p>
              <p className="text-xs text-foreground mb-6">
                Un almuerzo especial para todos los padres de nuestra familia Banesco, reconociendo su invaluable labor y dedicación. Fue una jornada llena de camaradería y alegría.
              </p>
              <Button asChild variant="outline" size="sm" className="self-start">
                <Link href="/dashboard/calendario">
                  Ver más en el calendario <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </SectionWrapper>
      </div>
    </div>
  );
}
