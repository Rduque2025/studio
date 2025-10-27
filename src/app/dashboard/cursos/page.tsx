
'use client';

import React, { useMemo } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { CourseCard } from "@/components/dashboard/course-card";
import { mockCourses } from "@/lib/placeholder-data";

export default function CursosPage() {
  const categories = useMemo(() => {
    const groupedCourses: { [key: string]: typeof mockCourses } = {};
    mockCourses.forEach(course => {
      if (!groupedCourses[course.category]) {
        groupedCourses[course.category] = [];
      }
      groupedCourses[course.category].push(course);
    });
    return Object.keys(groupedCourses).map(category => ({
      name: category,
      courses: groupedCourses[category]
    }));
  }, []);

  const featuredCourse = mockCourses.find(c => c.id === 'pensamiento-estrategico');

  return (
    <div className="bg-background text-foreground">
      {featuredCourse && (
         <SectionWrapper
            title={featuredCourse.title}
            description={featuredCourse.description}
            titleClassName="text-4xl md:text-5xl font-extrabold tracking-tight"
            descriptionClassName="text-lg md:text-xl text-muted-foreground max-w-3xl"
        >
        </SectionWrapper>
      )}

      <div className="container mx-auto px-4 space-y-12">
        {categories.map(category => (
          <section key={category.name}>
            <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
