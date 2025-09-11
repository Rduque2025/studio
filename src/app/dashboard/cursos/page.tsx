
'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CourseCard } from "@/components/dashboard/course-card";
import { CourseCategoryCard } from "@/components/dashboard/course-category-card";
import { mockCourses } from "@/lib/placeholder-data";
import { ArrowRight, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function CursosPage() {
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(mockCourses.map(course => course.category))];
    const categoryData: { [key: string]: { imageUrl: string; dataAiHint: string } } = {
      "Google Workspace": { imageUrl: "https://images.unsplash.com/photo-1592096304832-62463bfdc822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxnb29nbGV8ZW58MHx8fHwxNzU3NTE5Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080", dataAiHint: "google logo" },
      "Desarrollo": { imageUrl: "https://images.unsplash.com/photo-1579403124614-197f69d8187b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxkZXZlbG9wfGVufDB8fHx8MTc1NzYxNzU3OXww&ixlib=rb-4.1.0&q=80&w=1080", dataAiHint: "personal development" },
    };
    return uniqueCategories.map(cat => ({
      name: cat,
      ...categoryData[cat]
    }));
  }, []);

  const featuredCourse = mockCourses.find(c => c.id === 'pensamiento-estrategico');

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      {featuredCourse && (
        <section className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center text-center px-4 rounded-b-3xl overflow-hidden">
          <Image
            src={featuredCourse.imageUrl}
            alt={featuredCourse.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={featuredCourse.dataAiHint || 'strategy plan'}
            className="brightness-[0.4]"
          />
          <div className="relative z-10 text-white max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="bg-white/20 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full">{featuredCourse.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              {featuredCourse.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              {featuredCourse.description}
            </p>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Categorías de Cursos</h2>
            <Button variant="link" asChild>
              <Link href="#todos-los-cursos">Ver todos <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(cat => (
              <CourseCategoryCard
                key={cat.name}
                category={cat.name}
                imageUrl={cat.imageUrl}
                dataAiHint={cat.dataAiHint}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Courses Section */}
      <section id="todos-los-cursos" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-left mb-8">
            <h2 className="text-3xl font-bold">Todos los Cursos</h2>
            <p className="text-muted-foreground mt-2">Explora nuestra oferta completa de cursos para tu desarrollo.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {mockCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
