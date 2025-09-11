
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseCategoryCardProps {
  category: string;
  imageUrl: string;
  dataAiHint: string;
}

export function CourseCategoryCard({ category, imageUrl, dataAiHint }: CourseCategoryCardProps) {
  return (
    <Link href="#" className="group block">
      <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <Image
          src={imageUrl}
          alt={`Category: ${category}`}
          layout="fill"
          objectFit="cover"
          data-ai-hint={dataAiHint}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h3 className="text-2xl font-bold">{category}</h3>
          <p className="text-sm text-white/80 mt-1">Explora nuestros cursos de {category.toLowerCase()}.</p>
          <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity -rotate-45 group-hover:rotate-0 duration-300">
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
