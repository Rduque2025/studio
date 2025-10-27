
'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, X } from 'lucide-react';
import Link from 'next/link';

const CategoryCard = ({
  title,
  description,
  imageUrl,
  bgColor,
  textColor,
  className,
  imageClassName,
}: {
  title: string;
  description: string;
  imageUrl: string;
  bgColor: string;
  textColor: string;
  className?: string;
  imageClassName?: string;
}) => {
  return (
    <Card className={`relative rounded-2xl overflow-hidden shadow-lg p-8 flex flex-col justify-between transition-transform hover:scale-[1.02] ${bgColor} ${textColor} ${className}`}>
      <div className="relative z-10">
        <h3 className="flex items-center text-3xl font-bold tracking-tight">
          {title}
          <PlayCircle className="ml-3 h-7 w-7" />
        </h3>
        <p className="mt-2 text-sm max-w-xs">{description}</p>
      </div>
      <Image
        src={imageUrl}
        alt={title}
        width={250}
        height={250}
        className={`absolute bottom-0 right-0 z-0 object-contain ${imageClassName}`}
      />
    </Card>
  );
};

export default function CursosPage() {
  return (
    <div className="bg-muted min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-lg relative">
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/20 hover:bg-black/30">
            <X className="h-5 w-5" />
          </Button>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight">
              Donde potencias el talento que impulsa tu carrera
            </h1>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryCard
            title="Inteligencia Artificial"
            description="Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros"
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(12).png?raw=true"
            bgColor="bg-card"
            textColor="text-card-foreground"
            className="lg:row-span-2 min-h-[300px] lg:min-h-[620px] justify-end"
            imageClassName="w-[80%] h-auto -bottom-8 right-1/2 translate-x-1/2 lg:w-[350px] lg:h-[350px] lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2"
          />

          <CategoryCard
            title="Comunicaciones"
            description="Aprende a desarrollar habilidades de comunicación más eficientes, para expresar ideas con claridad y transmitir mensajes de forma efectiva."
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(13).png?raw=true"
            bgColor="bg-indigo-500"
            textColor="text-white"
            className="min-h-[300px]"
            imageClassName="w-[200px] h-[200px] -bottom-4 -right-4"
          />

          <CategoryCard
            title="Programación"
            description="Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros"
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(14).png?raw=true"
            bgColor="bg-purple-400"
            textColor="text-white"
            className="min-h-[300px]"
            imageClassName="w-[200px] h-[200px] -bottom-4 -right-4"
          />
        </div>
      </div>
    </div>
  );
}
