

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { CourseCard } from "@/components/dashboard/course-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { MenuItemCard } from "@/components/dashboard/menu-item-card";
import { DressCodeCard } from "@/components/dashboard/dress-code-card"; 
import { mockCourses, mockActivities, mockMenuItems, mockDressCodeItems, mockDietMenuItems, mockExecutiveMenuItems } from "@/lib/placeholder-data"; 
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronLeft, 
  ChevronRight,
  Handshake, 
  Lightbulb, 
  Award,     
  Globe,     
  Landmark,  
  UsersRound,
  Cpu,       
  GitFork,   
  Building2
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';


const rotatingImagesData = [
  { 
    src: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxDb25maWFuemF8ZW58MHx8fHwxNzQ4MjkwNzU3fDA&ixlib=rb-4.1.0&q=80&w=1080", 
    alt: "Imagen corporativa de Banesco Seguros", 
    hint: "corporate office" 
  },
  { 
    src: "https://images.unsplash.com/photo-1576696058573-12b47c49559e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8RkFNSUxJQXxlbnwwfHx8fDE3NDgyOTEzMjd8MA&ixlib=rb-4.1.0&q=80&w=1080", 
    alt: "Protección y confianza familiar Banesco Seguros", 
    hint: "family protection" 
  },
  { 
    src: "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNnx8RU1QUkVTQXxlbnwwfHx8fDE3NDgyOTE1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080", 
    alt: "Solidez financiera Banesco Seguros", 
    hint: "financial security" 
  },
];

const bannerImagesData = [
  {
    src: "https://placehold.co/1200x400.png",
    alt: "Banner principal del portal de gestión 1",
    hint: "corporate banner"
  },
  {
    src: "https://placehold.co/1200x400/003c71/ffffff.png", 
    alt: "Banner principal del portal de gestión 2",
    hint: "company values"
  },
  {
    src: "https://placehold.co/1200x400/1a61ab/ffffff.png", 
    alt: "Banner principal del portal de gestión 3",
    hint: "employee portal"
  },
];

const valoresData = [
  { title: "Confianza", text: "Relaciones sólidas y duraderas basadas en transparencia.", icon: Handshake, bgColor: "bg-yellow-500", iconColor: "text-yellow-600" },
  { title: "Innovación", text: "Buscamos constantemente nuevas y mejores formas de proteger.", icon: Lightbulb, bgColor: "bg-teal-500", iconColor: "text-teal-600" },
  { title: "Excelencia", text: "Superamos las expectativas de nuestros clientes en cada interacción.", icon: Award, bgColor: "bg-purple-600", iconColor: "text-purple-700" },
  { title: "Compromiso", text: "Contribuimos al desarrollo y bienestar de las comunidades.", icon: Globe, bgColor: "bg-rose-500", iconColor: "text-rose-600" },
];

const pilaresData = [
  { title: "Solidez", text: "Garantizamos la capacidad de respuesta ante compromisos.", icon: Landmark, bgColor: "bg-sky-600", iconColor: "text-sky-700" },
  { title: "Talento", text: "Equipo de profesionales capacitados y motivados.", icon: UsersRound, bgColor: "bg-lime-600", iconColor: "text-lime-700" },
  { title: "Tecnología", text: "Invertimos para optimizar procesos y mejorar experiencia.", icon: Cpu, bgColor: "bg-indigo-600", iconColor: "text-indigo-700" },
  { title: "Adaptabilidad", text: "Nos ajustamos a los cambios del entorno y del mercado.", icon: GitFork, bgColor: "bg-pink-600", iconColor: "text-pink-700" },
];

const pillPositions = [
  { base: "top-[2%] left-[1%] sm:top-[5%] sm:left-[2%]", orientation: "left" as const },
  { base: "top-[2%] right-[1%] sm:top-[5%] sm:right-[2%]", orientation: "right" as const },
  { base: "bottom-[2%] left-[1%] sm:bottom-[5%] sm:left-[2%]", orientation: "left" as const },
  { base: "bottom-[2%] right-[1%] sm:bottom-[5%] sm:right-[2%]", orientation: "right" as const },
];


export default function DashboardPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentBannerImageIndex, setCurrentBannerImageIndex] = useState(0);
  const [currentDayName, setCurrentDayName] = useState('');
  const [currentDisplay, setCurrentDisplay] = useState<'valores' | 'pilares'>('valores');

  useEffect(() => {
    const today = new Date();
    const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' });
    setCurrentDayName(dayName.charAt(0).toUpperCase() + dayName.slice(1));
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === 0 ? rotatingImagesData.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === rotatingImagesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevBannerImage = () => {
    setCurrentBannerImageIndex(prevIndex =>
      prevIndex === 0 ? bannerImagesData.length - 1 : prevIndex - 1
    );
  };

  const handleNextBannerImage = () => {
    setCurrentBannerImageIndex(prevIndex =>
      prevIndex === bannerImagesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleDisplay = () => {
    setCurrentDisplay(prev => prev === 'valores' ? 'pilares' : 'valores');
  };

  const ValuePillarPill = ({ title, text, icon, bgColor, iconColor, orientation = 'left' }: { title: string, text: string, icon: React.ElementType, bgColor: string, iconColor: string, orientation?: 'left' | 'right' }) => {
    const IconToRender = icon; 
    return (
      <div className={cn("flex items-center w-72 md:w-80 my-4", orientation === 'right' ? 'flex-row-reverse' : '')}>
        <div className={cn(
            "text-white py-4 rounded-lg shadow-md h-40 flex flex-col justify-center", 
            bgColor, 
            orientation === 'left' ? 'rounded-r-none pl-4 pr-6' : 'rounded-l-none pr-4 pl-6'
          )}
        >
          <h4 className="font-semibold text-md mb-1">{title}</h4>
          <p className="text-xs leading-tight">{text}</p>
        </div>
        <div className={cn(
            "bg-card p-3 rounded-full shadow-lg z-10", 
            orientation === 'left' ? '-ml-4' : '-mr-4'
          )}
        >
          <IconToRender className={cn("h-8 w-8", iconColor)} />
        </div>
      </div>
    );
  };


  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      <section className="mb-12">
        <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
          <Image
            key={bannerImagesData[currentBannerImageIndex].src}
            src={bannerImagesData[currentBannerImageIndex].src}
            alt={bannerImagesData[currentBannerImageIndex].alt}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            data-ai-hint={bannerImagesData[currentBannerImageIndex].hint}
            priority={currentBannerImageIndex === 0} 
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevBannerImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary/70 hover:bg-primary text-primary-foreground rounded-full"
            aria-label="Banner anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextBannerImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/70 hover:bg-primary text-primary-foreground rounded-full"
            aria-label="Siguiente banner"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </section>

      <SectionWrapper 
        title="Banesco Seguros Venezuela"
        description="Nuestra trayectoria y compromiso con Venezuela."
        cardClassName="bg-transparent rounded-lg shadow-none border-none" 
        titleClassName="text-4xl md:text-5xl font-bold text-primary py-4" 
        descriptionClassName="text-secondary"
        contentClassName="p-0" 
      >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-6">
              <p className="text-secondary leading-relaxed text-sm">
                En Banesco Seguros, nos dedicamos a ofrecer soluciones de protección innovadoras y confiables, adaptadas a las necesidades de nuestros clientes en Venezuela. Con una sólida trayectoria en el mercado asegurador, nuestro principal objetivo es brindar tranquilidad y respaldo a individuos, familias y empresas.
              </p>
              <p className="text-secondary leading-relaxed mt-4 text-sm">
                Nos esforzamos por mantener los más altos estándares de servicio, con un equipo de profesionales comprometidos con la excelencia y la atención personalizada. Creemos en la importancia de construir relaciones a largo plazo basadas en la confianza y la transparencia.
              </p>
              <p className="text-secondary leading-relaxed mt-4 text-sm">
                Nuestra visión es ser la aseguradora líder en el país, reconocida por nuestra solidez financiera, innovación constante y profundo compromiso social con el desarrollo de Venezuela.
              </p>
            </div>
            <div
              className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-md"
            >
              <Image 
                key={rotatingImagesData[currentImageIndex].src} 
                src={rotatingImagesData[currentImageIndex].src}
                alt={rotatingImagesData[currentImageIndex].alt}
                layout="fill"
                objectFit="cover"
                data-ai-hint={rotatingImagesData[currentImageIndex].hint}
                className="rounded-lg"
                priority={currentImageIndex === 0} 
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary/70 hover:bg-primary text-primary-foreground rounded-full"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/70 hover:bg-primary text-primary-foreground rounded-full"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
      </SectionWrapper>
      
      <SectionWrapper 
        title="Nuestros Principios Fundamentales"
        cardClassName="bg-transparent shadow-none rounded-lg border-none"
        contentClassName="p-0"
        titleClassName="text-3xl font-bold text-primary mb-8 text-center"
      >
        <div className="relative min-h-[500px] md:min-h-[600px] w-full max-w-3xl mx-auto">
          <button
            onClick={toggleDisplay}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-card rounded-full shadow-2xl border-4 border-background z-20 cursor-pointer hover:scale-105 transition-transform"
            aria-label="Cambiar vista entre valores y pilares"
          >
            <Building2 className="h-16 w-16 md:h-20 md:w-20 text-primary" />
          </button>
          
          {pillPositions.map((pos, index) => {
            const valor = valoresData[index];
            const pilar = pilaresData[index];
            return (
              <React.Fragment key={index}>
                {/* Valor Pill */}
                <div 
                  className={cn(
                    "absolute transition-all duration-500 ease-in-out",
                    pos.base,
                    currentDisplay === 'valores' 
                      ? "opacity-100 scale-100" 
                      : "opacity-0 scale-90 pointer-events-none"
                  )}
                >
                  {valor && <ValuePillarPill {...valor} orientation={pos.orientation} />}
                </div>
                {/* Pilar Pill */}
                <div 
                  className={cn(
                    "absolute transition-all duration-500 ease-in-out",
                    pos.base,
                    currentDisplay === 'pilares' 
                      ? "opacity-100 scale-100" 
                      : "opacity-0 scale-90 pointer-events-none"
                  )}
                >
                  {pilar && <ValuePillarPill {...pilar} orientation={pos.orientation} />}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </SectionWrapper>

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

      <SectionWrapper title="Menú de Dieta" description="Opciones saludables y balanceadas para cuidar su alimentación." titleClassName="text-primary" descriptionClassName="text-secondary">
       <ScrollArea className="w-full whitespace-nowrap rounded-md bg-card shadow-sm border-none">
          <div className="flex w-max space-x-4 p-4">
            {mockDietMenuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} isCurrentDay={currentDayName === item.day} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SectionWrapper>

      <SectionWrapper title="Menú Ejecutivo" description="Platos especiales para una experiencia gastronómica superior." titleClassName="text-primary" descriptionClassName="text-secondary">
        <ScrollArea className="w-full whitespace-nowrap rounded-md bg-card shadow-sm border-none">
          <div className="flex w-max space-x-4 p-4">
            {mockExecutiveMenuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} isCurrentDay={currentDayName === item.day} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SectionWrapper>
      
      <SectionWrapper title="Cursos Disponibles" description="Amplíe sus conocimientos y habilidades con nuestra oferta formativa." titleClassName="text-primary" descriptionClassName="text-secondary">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </SectionWrapper>
      
      <SectionWrapper title="Código de Vestimenta" description="Guía rápida sobre el código de vestimenta de la empresa." titleClassName="text-primary" descriptionClassName="text-secondary">
        <ScrollArea className="w-full whitespace-nowrap rounded-md bg-card shadow-sm border-none">
          <div className="flex w-max space-x-4 p-4">
            {mockDressCodeItems.map((item) => (
              <DressCodeCard key={item.id} item={item} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SectionWrapper>

      <SectionWrapper title="Actividades y Bienestar" description="Participe en nuestras próximas actividades y programas de bienestar." titleClassName="text-primary" descriptionClassName="text-secondary">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
    

    
