
'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const carouselItems = [
  {
    title: 'Cursos Regulatorios',
    description: 'Mantente al día con las normativas y procedimientos esenciales para tu rol en la organización.',
    imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(19).png?raw=true',
    dataAiHint: 'law regulations',
    href: '#',
    bgColor: 'bg-indigo-500',
    textColor: 'text-white',
  },
  {
    title: 'Nuestros Productos',
    description: 'Explora a fondo nuestro portafolio de productos y fortalece tu conocimiento comercial.',
    imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(18).png?raw=true',
    dataAiHint: 'product portfolio',
    href: '#',
    bgColor: 'bg-sky-400',
    textColor: 'text-white',
  },
    {
    title: 'ADN Banesco Seguros',
    description: 'Conoce nuestra identidad, valores y lo que nos impulsa a ser líderes en el mercado.',
    imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blobain/image-Photoroom%20(17).png?raw=true',
    dataAiHint: 'dna strand',
    href: '#',
    bgColor: 'bg-primary',
    textColor: 'text-primary-foreground',
  },
  {
    title: 'Nuestros Valores de Marca',
    description: 'Descubre los principios que nos guían y fortalecen nuestro compromiso contigo.',
    imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(20).png?raw=true',
    dataAiHint: 'brand values',
    href: '#',
    bgColor: 'bg-slate-500',
    textColor: 'text-white',
  },
];


const CategoryCard = ({
  title,
  description,
  imageUrl,
  bgColor,
  textColor,
  label,
  className,
  imageClassName,
  isLightCard,
  href,
}: {
  title: string;
  description: string;
  imageUrl?: string;
  bgColor: string;
  textColor: string;
  label: string;
  className?: string;
  imageClassName?: string;
  isLightCard?: boolean;
  href?: string;
}) => {
  const CardContentComponent = (
    <Card className={cn(
      "relative rounded-2xl overflow-hidden shadow-lg p-6 flex flex-col justify-between transition-transform hover:scale-[1.02]",
      bgColor,
      textColor,
      className
    )}>
      <div className="relative z-10">
        <Badge variant="secondary" className={cn(
          "mb-2",
          isLightCard ? "bg-neutral-500 text-white" : "bg-white/20 text-white backdrop-blur-sm"
        )}>{label}</Badge>
        <h3 className="flex items-center text-2xl font-bold tracking-tight">
          {title}
        </h3>
        <p className="mt-2 text-xs max-w-xs">{description}</p>
      </div>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={250}
          height={250}
          quality={100}
          className={cn("absolute z-0 object-contain", imageClassName)}
        />
      )}
    </Card>
  );

  if (href) {
    return <Link href={href}>{CardContentComponent}</Link>;
  }

  return CardContentComponent;
};

export default function CursosPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const currentItem = carouselItems[currentIndex];

  return (
    <div className="bg-muted min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* New Carousel Section */}
        <div>
          <div className="mb-8">
            <h1 className="text-5xl font-extrabold tracking-tight">
              Descubre todo lo que <br/> Banesco Seguros tiene para ti
            </h1>
            <p className="mt-4 text-sm text-muted-foreground max-w-lg">
              Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros
            </p>
          </div>
          <div className="relative">
             <div className="overflow-hidden relative">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                   {carouselItems.map((item) => (
                      <div key={item.title} className="w-full flex-shrink-0">
                         <Link href={item.href} className="group block">
                            <Card className={cn(
                              "h-full w-full relative rounded-xl overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col min-h-[456px]",
                              item.bgColor,
                              item.textColor
                            )}>
                              <div className="relative z-10 flex-grow flex flex-col justify-center">
                                  <h3 className="text-5xl font-bold uppercase">{item.title}</h3>
                                  <p className="text-sm mt-2 opacity-90">{item.description}</p>
                              </div>
                              <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
                                  <Image
                                      src={item.imageUrl}
                                      alt=""
                                      width={250}
                                      height={250}
                                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                                  />
                              </div>
                              <div className="relative z-10 flex justify-between items-center mt-auto">
                                <div className="absolute bottom-0 right-0 h-12 w-12 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="h-5 w-5 text-white" />
                                </div>
                              </div>
                            </Card>
                          </Link>
                      </div>
                   ))}
                </div>
             </div>
             <Button
                variant="ghost"
                size="icon"
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-card/80 hover:bg-card rounded-full h-10 w-10 shadow-md"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-card/80 hover:bg-card rounded-full h-10 w-10 shadow-md"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
          </div>
        </div>

        {/* Existing Courses Section */}
        <div>
            <h1 className="text-5xl font-extrabold tracking-tight">
              Donde potencias el talento <br /> que impulsa tu carrera
            </h1>
            <p className="mt-4 text-sm text-muted-foreground max-w-lg">
              Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <CategoryCard
            title="Google Workspace"
            description="Domina las herramientas de Google. Cursos de Sheets, Slides, y más para potenciar tu productividad y colaboración."
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(15).png?raw=true"
            bgColor="bg-blue-100"
            textColor="text-blue-900"
            label="Educativo"
            className="min-h-[250px]"
            imageClassName="w-[150px] h-[150px] bottom-0 right-4"
            isLightCard={true}
            href="/dashboard/cursos/google-workspace"
          />

          <CategoryCard
            title="Comunicaciones"
            description="Aprende a desarrollar habilidades de comunicación más eficientes, para expresar ideas con claridad y transmitir mensajes de forma efectiva."
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(13).png?raw=true"
            bgColor="bg-indigo-500"
            textColor="text-white"
            label="Cursos"
            className="min-h-[250px]"
            imageClassName="w-[180px] h-[180px] bottom-4 right-4"
          />

          <CategoryCard
            title="Inteligencia Artificial"
            description="Descubre cómo la IA está transformando el mundo de los seguros y aprende a utilizarla en tu día a día."
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(12).png?raw=true"
            bgColor="bg-card"
            textColor="text-card-foreground"
            label="Educativo"
            className="min-h-[250px]"
            imageClassName="w-[180px] h-[180px] bottom-4 right-4"
            isLightCard={true}
          />

          <CategoryCard
            title="Organización"
            description="Mejora tu productividad con cursos sobre gestión del tiempo, planificación y métodos de organización personal."
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(14).png?raw=true"
            bgColor="bg-purple-200"
            textColor="text-purple-900"
            label="Información"
            className="min-h-[250px]"
            imageClassName="w-[180px] h-[180px] bottom-4 right-4"
            isLightCard={true}
          />

          <CategoryCard
            title="Herramientas Digitales"
            description="Explora y domina las herramientas digitales que optimizan nuestros procesos y mejoran la experiencia del cliente."
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(16).png?raw=true"
            bgColor="bg-sky-400"
            textColor="text-white"
            label="Cursos"
            className="min-h-[250px]"
            imageClassName="w-[180px] h-[180px] bottom-4 right-4"
          />
        </div>
      </div>
    </div>
  );
}
