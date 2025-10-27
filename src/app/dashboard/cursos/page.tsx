
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
    <Card className={`relative rounded-2xl overflow-hidden shadow-lg p-6 flex flex-col justify-between transition-transform hover:scale-[1.02] ${bgColor} ${textColor} ${className}`}>
      <div className="relative z-10">
        <h3 className="flex items-center text-2xl font-bold tracking-tight">
          {title}
          <PlayCircle className="ml-3 h-6 w-6" />
        </h3>
        <p className="mt-2 text-xs max-w-xs">{description}</p>
      </div>
      <Image
        src={imageUrl}
        alt={title}
        width={250}
        height={250}
        quality={100}
        className={`absolute bottom-0 right-0 z-0 object-contain ${imageClassName}`}
      />
    </Card>
  );
};

export default function CursosPage() {
  return (
    <div className="bg-muted min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight">
              Donde potencias el talento <br /> que impulsa tu carrera
            </h1>
            <p className="mt-4 text-sm text-muted-foreground max-w-lg">
              Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <CategoryCard
            title="Google Workspace"
            description="Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros."
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(15).png?raw=true"
            bgColor="bg-blue-100"
            textColor="text-blue-900"
            className="min-h-[250px]"
            imageClassName="w-[150px] h-[150px] -bottom-4 right-4"
          />

          <CategoryCard
            title="Comunicaciones"
            description="Aprende a desarrollar habilidades de comunicación más eficientes, para expresar ideas con claridad y transmitir mensajes de forma efectiva."
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(13).png?raw=true"
            bgColor="bg-indigo-500"
            textColor="text-white"
            className="min-h-[250px]"
            imageClassName="w-[180px] h-[180px] bottom-4 right-4"
          />

          <CategoryCard
            title="Inteligencia Artificial"
            description="Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros."
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(12).png?raw=true"
            bgColor="bg-card"
            textColor="text-card-foreground"
            className="min-h-[250px]"
            imageClassName="w-[180px] h-[180px] bottom-4 right-4"
          />

          <CategoryCard
            title="Organización"
            description="Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros."
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(11).png?raw=true"
            bgColor="bg-purple-200"
            textColor="text-purple-900"
            className="min-h-[250px]"
            imageClassName="w-[180px] h-[180px] bottom-4 right-4"
          />

          <CategoryCard
            title="Herramientas Digitales"
            description="Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros."
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(10).png?raw=true"
            bgColor="bg-sky-400"
            textColor="text-white"
            className="min-h-[250px]"
          />
        </div>
      </div>
    </div>
  );
}
