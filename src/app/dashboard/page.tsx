
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
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
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

export default function DashboardPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentBannerImageIndex, setCurrentBannerImageIndex] = useState(0);

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
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
            aria-label="Banner anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextBannerImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
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
        contentClassName="p-0" 
      >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed text-sm">
                En Banesco Seguros, nos dedicamos a ofrecer soluciones de protección innovadoras y confiables, adaptadas a las necesidades de nuestros clientes en Venezuela. Con una sólida trayectoria en el mercado asegurador, nuestro principal objetivo es brindar tranquilidad y respaldo a individuos, familias y empresas.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4 text-sm">
                Nos esforzamos por mantener los más altos estándares de servicio, con un equipo de profesionales comprometidos con la excelencia y la atención personalizada. Creemos en la importancia de construir relaciones a largo plazo basadas en la confianza y la transparencia.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4 text-sm">
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
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
      </SectionWrapper>

      <SectionWrapper title="Menú Semanal" description="Consulte las opciones de almuerzo para esta semana en el comedor.">
        <ScrollArea className="w-full whitespace-nowrap rounded-md bg-card shadow-sm border-none">
          <div className="flex w-max space-x-4 p-4">
            {mockMenuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SectionWrapper>

      <SectionWrapper title="Menú de Dieta" description="Opciones saludables y balanceadas para cuidar su alimentación.">
       <ScrollArea className="w-full whitespace-nowrap rounded-md bg-card shadow-sm border-none">
          <div className="flex w-max space-x-4 p-4">
            {mockDietMenuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SectionWrapper>

      <SectionWrapper title="Menú Ejecutivo" description="Platos especiales para una experiencia gastronómica superior.">
        <ScrollArea className="w-full whitespace-nowrap rounded-md bg-card shadow-sm border-none">
          <div className="flex w-max space-x-4 p-4">
            {mockExecutiveMenuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SectionWrapper>

      <SectionWrapper 
        title="Valores y Pilares Fundamentales"
        description="Los principios que guían nuestro actuar diario."
        cardClassName="bg-transparent shadow-none rounded-lg border-none" 
      >
        <Card className="bg-transparent shadow-none rounded-lg border-none"> 
          <CardContent className="p-6 grid md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-6"> 
              <h3 className="text-xl font-semibold text-primary mb-4">Nuestros Valores</h3>
              {[
                { title: "Confianza", text: "Construimos relaciones sólidas y duraderas basadas en la transparencia y el cumplimiento de nuestros compromisos." },
                { title: "Innovación", text: "Buscamos constantemente nuevas y mejores formas de proteger lo que más valoran nuestros clientes." },
                { title: "Excelencia en el Servicio", text: "Nos esforzamos por superar las expectativas de nuestros clientes en cada interacción." },
                { title: "Compromiso Social", text: "Contribuimos activamente al desarrollo y bienestar de las comunidades donde operamos." },
                { title: "Integridad", text: "Actuamos con honestidad y ética en todas nuestras operaciones." },
              ].map(value => (
                <div key={value.title} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="block font-medium text-foreground">{value.title}</strong>
                    <span className="text-sm text-muted-foreground leading-snug">{value.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-6"> 
              <h3 className="text-xl font-semibold text-primary mb-4">Nuestros Pilares</h3>
              {[
                { title: "Solidez Financiera", text: "Garantizamos la capacidad de respuesta ante los compromisos adquiridos con nuestros asegurados." },
                { title: "Talento Humano", text: "Contamos con un equipo de profesionales altamente capacitados y motivados." },
                { title: "Tecnología e Innovación", text: "Invertimos en tecnología para optimizar procesos y mejorar la experiencia del cliente." },
                { title: "Adaptabilidad", text: "Nos ajustamos a los cambios del entorno y a las necesidades evolutivas del mercado." },
              ].map(pillar => (
                <div key={pillar.title} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="block font-medium text-foreground">{pillar.title}</strong>
                    <span className="text-sm text-muted-foreground leading-snug">{pillar.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>

      <SectionWrapper title="Cursos Disponibles" description="Amplíe sus conocimientos y habilidades con nuestra oferta formativa.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </SectionWrapper>
      
      <SectionWrapper title="Código de Vestimenta" description="Guía rápida sobre el código de vestimenta de la empresa.">
        <ScrollArea className="w-full whitespace-nowrap rounded-md bg-card shadow-sm border-none">
          <div className="flex w-max space-x-4 p-4">
            {mockDressCodeItems.map((item) => (
              <DressCodeCard key={item.id} item={item} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SectionWrapper>

      <SectionWrapper title="Actividades y Bienestar" description="Participe en nuestras próximas actividades y programas de bienestar.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}

