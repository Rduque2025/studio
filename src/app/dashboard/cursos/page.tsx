
'use client';

import React from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { CourseCard } from "@/components/dashboard/course-card";
import { mockCourses } from "@/lib/placeholder-data";

export default function CursosPage() {
  return (
    <div id="explorar-cursos" className="scroll-mt-20">
        <SectionWrapper
          title="Desarrolla Nuevas Habilidades"
          description="Amplía tus conocimientos con nuestros cursos de desarrollo profesional y personal."
          className="bg-muted/50"
          titleClassName="text-4xl md:text-5xl font-extrabold tracking-tight"
          descriptionClassName="text-lg md:text-xl text-muted-foreground max-w-3xl"
        >
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </SectionWrapper>
      </div>
  );
}
