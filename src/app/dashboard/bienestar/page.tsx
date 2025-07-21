
'use client';

import React, { useState } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Users, BrainCircuit, Flag, ToyBrick } from "lucide-react";
import { CourseCard } from "@/components/dashboard/course-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { mockCourses, mockActivities } from "@/lib/placeholder-data";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { EventHighlightCard, type EventHighlightProps } from '@/components/dashboard/event-highlight-card';

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

const importantEvents: EventHighlightProps[] = [
  {
    icon: Flag,
    title: "Día de la Independencia",
    date: "5 de Julio",
    description: "Conmemoramos un hito histórico de nuestra nación. Habrá actividades especiales y sorpresas en la oficina.",
    imageUrl: "https://images.unsplash.com/photo-1621208030917-a4170d18b6e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxWZW5lenVlbGElMjBmbGFnfGVufDB8fHx8MTc1MzEyODg2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "Venezuela flag"
  },
  {
    icon: ToyBrick,
    title: "Día del Niño",
    date: "21 de Julio",
    description: "Celebremos a los más pequeños de la casa. Un día lleno de alegría, juegos y actividades para las familias.",
    imageUrl: "https://images.unsplash.com/photo-1546422401-63b7829a231f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjaGlsZHJlbiUyMHBsYXlpbmd8ZW58MHx8fHwxNzUzMTI4ODkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "children playing"
  }
];

export default function BienestarPage() {
  const [activeTab, setActiveTab] = useState('actividades');

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center text-center px-4">
        <Image
          src="https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwYWlzYWplfGVufDB8fHx8MTc1MzEyNzUyOHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Paisaje natural inspirador"
          layout="fill"
          objectFit="cover"
          data-ai-hint="fresh nature"
          className="brightness-[0.4]"
        />
        <div className="relative z-10 text-white max-w-4xl mx-auto">
           <h2 className="text-xl md:text-2xl font-light">Bienvenido a tu</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Espacio de Bienestar.
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/90 max-w-xl mx-auto">
            Creamos oportunidades para que puedas construir un estilo de vida saludable y equilibrado.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#explorar">
                Comienza tu Viaje
              </Link>
            </Button>
             <Button asChild size="lg" variant="link" className="text-white">
              <Link href="#empezar">
                Saber más <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Important Events Section */}
      <SectionWrapper
        title="Eventos Importantes del Mes"
        description="Mantente al día con las celebraciones y fechas especiales que tenemos en Banesco Seguros."
        titleClassName="text-4xl md:text-5xl font-extrabold tracking-tight"
        descriptionClassName="text-lg md:text-xl text-muted-foreground max-w-3xl"
      >
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {importantEvents.map((event, index) => (
            <EventHighlightCard key={index} {...event} />
          ))}
        </div>
        <div className="text-center mt-16">
           <Button asChild variant="link" className="text-sm font-semibold tracking-widest text-muted-foreground hover:text-primary">
            <Link href="/dashboard/calendario">
              VER CALENDARIO COMPLETO <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>
      
       {/* Get Started Today Section */}
      <div id="empezar" className="scroll-mt-20">
        <SectionWrapper
          className="bg-muted/50"
          title="Empieza hoy."
          description="Descubre nuestro marco de bienestar para tu crecimiento."
          titleClassName="text-4xl md:text-5xl font-extrabold tracking-tight"
          descriptionClassName="text-lg md:text-xl text-muted-foreground max-w-3xl"
        >
          <div className="grid lg:grid-cols-2 gap-16 mt-16 items-start">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-2">
                <h4 className="text-lg font-bold">Bienestar Físico</h4>
                <p className="text-muted-foreground text-sm">Actividades y recursos para mantener tu cuerpo activo y saludable.</p>
              </div>
               <div className="space-y-2">
                <h4 className="text-lg font-bold">Bienestar Mental</h4>
                <p className="text-muted-foreground text-sm">Herramientas para gestionar el estrés y fomentar una mentalidad positiva.</p>
              </div>
               <div className="space-y-2">
                <h4 className="text-lg font-bold">Crecimiento Profesional</h4>
                <p className="text-muted-foreground text-sm">Cursos y talleres para desarrollar nuevas habilidades y avanzar en tu carrera.</p>
              </div>
               <div className="space-y-2">
                <h4 className="text-lg font-bold">Conexión Social</h4>
                <p className="text-muted-foreground text-sm">Eventos y grupos para construir relaciones significativas con tus compañeros.</p>
              </div>
            </div>
            <Card className="p-8">
              <CardHeader className="text-center p-0">
                <BrainCircuit className="h-10 w-10 text-primary mx-auto mb-4" />
                <CardTitle className="font-bold text-2xl">Únete a la comunidad</CardTitle>
                <CardDescription className="text-sm">Recibe notificaciones sobre nuevas actividades y recursos de bienestar.</CardDescription>
              </CardHeader>
              <CardContent className="p-0 mt-6 space-y-4">
                <Input placeholder="Nombre" />
                <Input type="email" placeholder="Correo electrónico" />
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-xs text-muted-foreground">Acepto los términos de servicio y la política de privacidad.</Label>
                </div>
                 <Button className="w-full bg-foreground hover:bg-foreground/90 text-background" size="lg">Comenzar</Button>
              </CardContent>
            </Card>
          </div>
        </SectionWrapper>
      </div>

      {/* Content Section */}
      <div id="explorar" className="scroll-mt-20">
        <SectionWrapper
          title="Explora nuestros programas"
          description="Descubre todas las actividades y cursos que hemos preparado para ti."
          titleClassName="text-4xl md:text-5xl font-extrabold tracking-tight"
          descriptionClassName="text-lg md:text-xl text-muted-foreground max-w-3xl"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-12">
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
