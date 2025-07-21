
'use client';

import React, { useState } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Users, BrainCircuit } from "lucide-react";
import { CourseCard } from "@/components/dashboard/course-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { mockCourses, mockActivities } from "@/lib/placeholder-data";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

const benefits = [
  {
    icon: Leaf,
    title: "Inspírate",
    description: "Te damos el apoyo y las herramientas que necesitas para avanzar hacia la visión que persigues en tu bienestar personal y profesional."
  },
  {
    icon: Users,
    title: "Conéctate",
    description: "Únete a tus compañeros, comparte experiencias y anímense mutuamente en este viaje hacia el bienestar integral."
  },
  {
    icon: BrainCircuit,
    title: "Desarróllate",
    description: "Descubre las herramientas y recursos que necesitas para desarrollar nuevas habilidades y potenciar tu crecimiento."
  }
];

export default function BienestarPage() {
  const [activeTab, setActiveTab] = useState('actividades');

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center text-center px-4">
        <Image
          src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG5hdHVyZXxlbnwwfHx8fDE3NTI3ODk0ODF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Paisaje natural inspirador"
          layout="fill"
          objectFit="cover"
          data-ai-hint="fresh nature"
          className="brightness-[0.4]"
        />
        <div className="relative z-10 text-white max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            Bienvenido a tu Espacio de Bienestar
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Creamos oportunidades para que puedas construir un estilo de vida saludable y equilibrado.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="#explorar">
                Comienza tu Viaje
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <SectionWrapper
        title="Comienza tu viaje."
        description="Aporta tus talentos, tu energía, tus frustraciones y tus retos, y convirtámoslos en algo increíble."
      >
        <div className="grid md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center md:items-start text-center md:text-left">
              <benefit.icon className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
           <Button asChild variant="link" className="text-primary">
            <Link href="#explorar">
              DA EL PRIMER PASO HOY <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>
      
      {/* Content Section */}
      <div id="explorar" className="scroll-mt-20">
        <SectionWrapper
          className="bg-muted/50"
          title="Explora nuestros programas"
          description="Descubre todas las actividades y cursos que hemos preparado para ti."
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-10">
              <TabsTrigger value="actividades">Actividades</TabsTrigger>
              <TabsTrigger value="cursos">Cursos</TabsTrigger>
            </TabsList>
            <TabsContent value="actividades">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="cursos">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </SectionWrapper>
      </div>

    </div>
  );
}
