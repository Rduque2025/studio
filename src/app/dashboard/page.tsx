
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { CourseCard } from "@/components/dashboard/course-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { mockCourses, mockActivities, mockMenuItems, mockDietMenuItems, mockExecutiveMenuItems } from "@/lib/placeholder-data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Landmark,
  UsersRound,
  Cpu,
  GitFork,
  ArrowRight,
  Plane,
  ShieldCheck,
  FileText,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

const faqData = [
  {
    id: "faq1",
    question: "¿Cómo puedo consultar la cobertura de mi póliza HCM?",
    answer: "Puedes consultar todos los detalles de tu póliza, incluyendo coberturas, red de clínicas y estatus de reembolsos, accediendo a la sección 'Póliza HCM' desde el menú de Accesos Rápidos en esta misma página."
  },
  {
    id: "faq2",
    question: "¿Cuál es el procedimiento para solicitar vacaciones?",
    answer: "Para solicitar tus días libres, dirígete a 'Gestión de Vacaciones' en los Accesos Rápidos. Allí podrás ver tu saldo de días disponibles, seleccionar las fechas deseadas y enviar la solicitud para su aprobación."
  },
  {
    id: "faq3",
    question: "¿A quién debo contactar para soporte técnico?",
    answer: "Si tienes algún inconveniente técnico con tu equipo o con alguna de las plataformas, puedes generar un ticket de soporte dirigiéndote al 'Portal de Requerimientos' y seleccionando el departamento de 'Tecnología de Información'."
  },
  {
    id: "faq4",
    question: "¿Dónde puedo ver el menú del comedor de esta semana?",
    answer: "El menú semanal del comedor está disponible en la página principal del portal, justo debajo de los Accesos Rápidos. Puedes navegar entre las opciones de Menú General, Dieta y Ejecutivo usando las pestañas."
  },
  {
    id: "faq5",
    question: "¿Cómo me inscribo en un curso o actividad de bienestar?",
    answer: "Tanto los cursos como las actividades de bienestar se encuentran en la sección 'Bienestar' accesible desde el menú de navegación principal. Dentro de cada sección, podrás ver los detalles y encontrar los botones para inscribirte o confirmar tu asistencia."
  }
];


export default function DashboardPage() {
  const [currentDayName, setCurrentDayName] = useState('');
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date();
    const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' });
    setCurrentDayName(dayName.charAt(0).toUpperCase() + dayName.slice(1));
  }, []);

  const todaysMenus = useMemo(() => {
    if (!currentDayName) return [];

    const classicMenu = mockMenuItems.find(item => item.day === currentDayName);
    const dietMenu = mockDietMenuItems.find(item => item.day === currentDayName);
    const executiveMenu = mockExecutiveMenuItems.find(item => item.day === currentDayName);
    
    const menus = [];
    if (classicMenu) menus.push({ ...classicMenu, type: 'Menú Clásico', price: '100 Bs.' });
    if (dietMenu) menus.push({ ...dietMenu, type: 'Menú de Dieta', price: '100 Bs.' });
    if (executiveMenu) menus.push({ ...executiveMenu, type: 'Menú Ejecutivo', price: '13 $' });

    return menus;
  }, [currentDayName]);


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
            title="Menú de Hoy"
            description={currentDayName ? `Opciones disponibles para el ${currentDayName}.` : "Consultando menú..."}
        >
             <Card className="max-w-4xl mx-auto shadow-md">
                <CardContent className="p-2 md:p-4">
                    <div className="space-y-2">
                        {todaysMenus.length > 0 ? (
                            todaysMenus.map((menu) => {
                                const isExpanded = expandedMenu === menu.id;
                                return (
                                    <div
                                        key={menu.id}
                                        className="border-b last:border-b-0 py-3 cursor-pointer group"
                                        onClick={() => setExpandedMenu(prev => prev === menu.id ? null : menu.id)}
                                    >
                                        <div className="flex items-center gap-4 px-2 md:px-4">
                                            <Image 
                                                src={menu.imageUrl} 
                                                alt={menu.name}
                                                width={64} 
                                                height={64}
                                                className="rounded-md object-cover aspect-square"
                                                data-ai-hint={menu.dataAiHint}
                                            />
                                            <div className="flex-grow">
                                                <h3 className="font-semibold text-base md:text-lg leading-tight group-hover:text-primary transition-colors">{menu.name}</h3>
                                                <p className="text-xs md:text-sm text-muted-foreground">{menu.type}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0 w-20">
                                                <p className="font-bold text-base md:text-lg text-foreground">{menu.price}</p>
                                            </div>
                                        </div>
                                        
                                        <div className={cn(
                                            "overflow-hidden transition-all duration-300 ease-in-out",
                                            isExpanded ? "max-h-40 mt-2" : "max-h-0"
                                        )}>
                                            <p className="text-sm text-muted-foreground px-2 md:px-4 ml-[calc(64px+1rem)]">
                                                {menu.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-6 text-center text-muted-foreground">
                                No hay menú disponible para hoy o se está cargando.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
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

        {/* FAQ Section */}
        <SectionWrapper>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div className="space-y-4 text-center md:text-left">
              <div className="flex justify-center md:justify-start">
                <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Preguntas Frecuentes
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Preguntas Frecuentes</h2>
              <p className="text-muted-foreground text-lg">
                Respuestas a las dudas más comunes. Si no encuentras lo que buscas, no dudes en contactarnos a través del portal de requerimientos.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqData.map((faq) => (
                <AccordionItem value={faq.id} key={faq.id} className="bg-card border-0 rounded-lg shadow-sm data-[state=open]:shadow-md transition-shadow">
                  <AccordionTrigger className="p-6 text-left font-semibold text-base hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SectionWrapper>

    </div>
  );
}
