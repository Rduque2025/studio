
'use client';

import React, { useState, useEffect } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { CourseCard } from "@/components/dashboard/course-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { MenuItemCard } from "@/components/dashboard/menu-item-card";
import { mockCourses, mockActivities, mockMenuItems, mockDietMenuItems, mockExecutiveMenuItems } from "@/lib/placeholder-data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Landmark,
  UsersRound,
  Cpu,
  GitFork,
  ArrowRight,
  Plane,
  ShieldCheck,
  FileText
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const pilaresData = [
  { title: "Solidez", text: "Garantizamos la capacidad de respuesta ante compromisos.", icon: Landmark },
  { title: "Talento", text: "Equipo de profesionales capacitados y motivados.", icon: UsersRound },
  { title: "Tecnología", text: "Invertimos para optimizar procesos y mejorar experiencia.", icon: Cpu },
  { title: "Adaptabilidad", text: "Nos ajustamos a los cambios del entorno y del mercado.", icon: GitFork },
];

const quickAccessLinks = [
    {
        title: "Portal de Requerimientos",
        description: "Envíe solicitudes o consultas a los departamentos.",
        href: "/dashboard/requerimientos",
        icon: FileText
    },
    {
        title: "Gestión de Vacaciones",
        description: "Planifique y solicite sus días libres.",
        href: "/dashboard/vacaciones",
        icon: Plane
    },
    {
        title: "Póliza HCM",
        description: "Consulte su cobertura, red de clínicas y más.",
        href: "/dashboard/poliza-hcm",
        icon: ShieldCheck
    }
];

export default function DashboardPage() {
  const [currentDayName, setCurrentDayName] = useState('');

  useEffect(() => {
    const today = new Date();
    const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' });
    setCurrentDayName(dayName.charAt(0).toUpperCase() + dayName.slice(1));
  }, []);


  return (
    <div className="bg-background">
        
        {/* Hero Section */}
        <section className="relative h-[500px] w-full bg-card">
            <Image
                src="https://images.unsplash.com/photo-1570483358100-6d222cdea6ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOXx8Q0lFTE98ZW58MHx8fHwxNzUxNjYxMjM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Fondo abstracto del portal"
                layout="fill"
                objectFit="cover"
                data-ai-hint="sky abstract"
                className="opacity-20"
                priority
            />
            <div className="container mx-auto h-full flex flex-col justify-center items-start text-left p-4 z-10 relative">
                <h1 className="text-4xl md:text-6xl font-extrabold max-w-2xl text-foreground">
                    Tu Ecosistema Digital Banesco Seguros
                </h1>
                <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                    Bienvenido al espacio donde encontrarás todas las herramientas, recursos y actividades para tu día a día en Banesco Seguros.
                </p>
                <Button asChild size="lg" className="mt-8">
                    <Link href="/dashboard/bienestar">
                        Explorar Bienestar
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </section>

        {/* Pilares Section */}
        <SectionWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pilaresData.map((pilar) => (
                <Card key={pilar.title} className="text-center p-6 border-none shadow-sm">
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary">
                            <pilar.icon className="h-7 w-7" />
                        </div>
                    </div>
                    <CardTitle className="text-xl font-semibold mb-2">{pilar.title}</CardTitle>
                    <CardDescription className="text-sm">{pilar.text}</CardDescription>
                </Card>
            ))}
          </div>
        </SectionWrapper>
      
        {/* Quick Access Section */}
        <SectionWrapper
            title="Accesos Rápidos"
            description="Encuentre los servicios y portales más utilizados."
        >
            <div className="grid md:grid-cols-3 gap-6">
                {quickAccessLinks.map((link) => (
                    <Link href={link.href} key={link.title}>
                        <Card className="p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <CardHeader className="flex flex-row items-center gap-4 p-0 mb-4">
                                <div className="p-3 rounded-lg bg-primary/10">
                                    <link.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg font-bold">{link.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <p className="text-sm text-muted-foreground">{link.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </SectionWrapper>

        {/* Menus Section */}
        <SectionWrapper
          title="Menú del Comedor"
          description="Consulta las opciones de almuerzo para esta semana."
        >
            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto h-auto">
                    <TabsTrigger value="general">Menú General</TabsTrigger>
                    <TabsTrigger value="dieta">Menú de Dieta</TabsTrigger>
                    <TabsTrigger value="ejecutivo">Menú Ejecutivo</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {mockMenuItems.map((item) => (
                            <MenuItemCard key={item.id} item={item} isCurrentDay={currentDayName === item.day} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="dieta" className="mt-8">
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {mockDietMenuItems.map((item) => (
                            <MenuItemCard key={item.id} item={item} isCurrentDay={currentDayName === item.day} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="ejecutivo" className="mt-8">
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {mockExecutiveMenuItems.map((item) => (
                            <MenuItemCard key={item.id} item={item} isCurrentDay={currentDayName === item.day} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </SectionWrapper>

        {/* Cursos Section */}
        <SectionWrapper 
            title="Cursos Disponibles" 
            description="Amplíe sus conocimientos y habilidades con nuestra oferta formativa."
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            <div className="text-center mt-8">
                <Button asChild variant="outline">
                    <Link href="/dashboard/bienestar#cursos">
                    Ver todos los Cursos <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </SectionWrapper>

        {/* Actividades Section */}
        <SectionWrapper 
            title="Actividades y Bienestar" 
            description="Participe en nuestras próximas actividades y programas de bienestar."
        >
            <ScrollArea className="w-full">
              <div className="flex space-x-4 pb-4">
                {mockActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
             <div className="text-center mt-8">
                <Button asChild variant="outline">
                    <Link href="/dashboard/bienestar#actividades">
                    Ver todas las Actividades <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </SectionWrapper>
      
        {/* Mision y Valores Section */}
        <SectionWrapper>
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="relative aspect-square w-full rounded-lg overflow-hidden">
                     <Image
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtZWV0aW5nfGVufDB8fHx8MTc1MDI3NzU0OHww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Reunión de equipo Banesco Seguros"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="meeting team"
                     />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-foreground tracking-tight">Nuestra Misión y Oferta de Valor</h2>
                    <p className="text-muted-foreground">
                       Somos una empresa de seguros reconocida por su excelencia y calidad, orientada a satisfacer las necesidades de nuestros clientes, intermediarios y organización, brindando asesoría y protección con soluciones ágiles y oportunas.
                    </p>
                     <p className="font-semibold text-foreground">
                        ¡Cumplimos lo que prometemos!
                    </p>
                    <Button asChild>
                        <Link href="/dashboard/mapa-clientes">
                            Conocer más sobre nosotros
                        </Link>
                    </Button>
                </div>
            </div>
        </SectionWrapper>
    </div>
  );
}
