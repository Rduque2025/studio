'use client';

import React, { useRef } from 'react';
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
    title: 'ADN Banesco Seguros',
    description: 'Conoce nuestra identidad, valores y lo que nos impulsa a ser líderes en el mercado.',
    imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(17).png?raw=true',
    dataAiHint: 'dna strand',
    href: '#',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-900',
  },
  {
    title: 'Cursos Regulatorios',
    description: 'Mantente al día con las normativas y procedimientos esenciales para tu rol en la organización.',
    imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(19).png?raw=true',
    dataAiHint: 'law regulations',
    href: '#',
    bgColor: 'bg-primary',
    textColor: 'text-primary-foreground',
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
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const handleCarouselScroll = (direction: 'left' | 'right') => {
        const viewport = scrollAreaRef.current?.querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]');
        if (viewport) {
            const scrollAmount = 320; // Adjust based on card width + gap
            viewport.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

  return (
    <div className="bg-muted min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* New Carousel Section */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h1 className="text-5xl font-extrabold tracking-tight">
              Descubre todo lo que <br/> Banesco Seguros tiene para ti
            </h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => handleCarouselScroll('left')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleCarouselScroll('right')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div ref={scrollAreaRef}>
            <ScrollArea>
              <div className="flex space-x-6 pb-4">
                {carouselItems.map((item) => (
                  <Link href={item.href} key={item.title} className="block w-80 h-48 flex-shrink-0">
                    <Card className={cn("h-full w-full relative rounded-xl overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex items-center", item.bgColor, item.textColor)}>
                      <div className="w-2/3 pr-4">
                          <h3 className="text-lg font-bold uppercase">{item.title}</h3>
                          <p className="text-xs mt-1 opacity-90">{item.description}</p>
                      </div>
                      <div className="w-1/3 relative h-full">
                         <Image
                          src={item.imageUrl}
                          alt={item.title}
                          layout="fill"
                          objectFit="contain"
                          data-ai-hint={item.dataAiHint}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute top-1/2 -right-3 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                            <ChevronRight className="h-4 w-4 text-white" />
                         </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
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
