
'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
  const CardContent = (
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
    return <Link href={href}>{CardContent}</Link>;
  }

  return CardContent;
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
            description="Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros."
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
            description="Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros."
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
            description="Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros."
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
