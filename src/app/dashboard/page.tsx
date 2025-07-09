
'use client';

import React, { useRef, useState, useEffect } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Sun,
  Umbrella,
  Ship,
  Bike
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
import { Separator } from "@/components/ui/separator";
import type { MenuItem } from '@/lib/placeholder-data';
import { MenuItemCard } from '@/components/dashboard/menu-item-card';
import { cn } from '@/lib/utils';


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

const pilaresData = [
    { number: "01", title: "Solidez", text: "Garantizamos la capacidad de respuesta ante compromisos.", icon: Landmark },
    { number: "02", title: "Talento", text: "Equipo de profesionales capacitados y motivados.", icon: UsersRound },
    { number: "03", title: "Tecnología", text: "Invertimos para optimizar procesos y mejorar experiencia.", icon: Cpu },
    { number: "04", title: "Adaptabilidad", text: "Nos ajustamos a los cambios del entorno y del mercado.", icon: GitFork },
];


export default function DashboardPage() {
  const menuScrollAreaRef = useRef<HTMLDivElement>(null);
  const [selectedMenu, setSelectedMenu] = useState<'Clásico' | 'Dieta' | 'Ejecutivo'>('Clásico');
  const [currentDayName, setCurrentDayName] = useState('');
  
  useEffect(() => {
    const today = new Date();
    const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' });
    setCurrentDayName(dayName.charAt(0).toUpperCase() + dayName.slice(1));
  }, []);

  const handleMenuScroll = (direction: 'left' | 'right') => {
    const viewport = menuScrollAreaRef.current?.querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]');
    if (viewport) {
      const scrollAmount = 320; // Approximately the width of one card plus gap
      viewport.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const allMenuItems: MenuItem[] = [
    ...mockMenuItems,
    ...mockDietMenuItems,
    ...mockExecutiveMenuItems,
  ];

  const filteredMenuItems = allMenuItems.filter(item => item.type === selectedMenu);

  return (
    <div className="bg-background">
        
        {/* Hero Section */}
        <section className="relative h-screen w-full bg-card">
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
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex items-center justify-center">
              <span className="text-[250px] font-black text-primary/10 leading-none">4</span>
              <span className="text-7xl font-bold text-foreground -ml-4" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                PILARES
              </span>
            </div>
            
            <div className="space-y-4">
              {pilaresData.map((pilar) => (
                <div 
                  key={pilar.number}
                  className="group p-6 rounded-2xl transition-all duration-300 ease-in-out hover:bg-card hover:shadow-xl hover:scale-105"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-muted text-muted-foreground text-lg font-bold transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                      {pilar.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{pilar.title}</h3>
                      <p className="text-sm text-muted-foreground">{pilar.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      
        {/* Portal de Requerimientos Section */}
        <SectionWrapper>
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="relative aspect-square w-full rounded-lg overflow-hidden">
                     <Image
                        src="https://images.unsplash.com/photo-1554224155-8d044218af68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxmb3JtfGVufDB8fHx8MTc1MjI0OTc4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Persona llenando un formulario de requerimiento"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="form document"
                     />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-foreground tracking-tight">Portal de Requerimientos</h2>
                    <p className="text-muted-foreground">
                        Centraliza tus solicitudes. Desde consultas de recursos humanos hasta soporte técnico, envía tus requerimientos a los departamentos correspondientes de forma ágil y organizada.
                    </p>
                    <Button asChild>
                        <Link href="/dashboard/requerimientos">
                            Ir al Portal
                        </Link>
                    </Button>
                </div>
            </div>
        </SectionWrapper>

        {/* Gestión de Vacaciones Section */}
        <SectionWrapper>
          <div className="bg-card shadow-lg rounded-2xl overflow-hidden min-h-[700px] flex flex-col md:flex-row">
            {/* Left Panel */}
            <div className="w-full md:w-2/3 relative min-h-[400px] md:min-h-full">
              <Image 
                src="https://images.unsplash.com/photo-1507525428034-b723a9ce6890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiZWFjaHxlbnwwfHx8fDE3NTAzNDI5NDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Playa tropical para representar vacaciones"
                layout="fill"
                objectFit="cover"
                data-ai-hint="beach vacation"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12 text-white">
                <h2 className="text-5xl font-bold leading-tight">Gestión de Vacaciones</h2>
                <p className="mt-4 max-w-md text-white/90">
                  Planifica tu viaje con las mejores recomendaciones y gestiona tus solicitudes de forma sencilla.
                </p>
                <Button asChild className="mt-6 w-fit">
                  <Link href="/dashboard/vacaciones">Explorar</Link>
                </Button>
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-full md:w-1/3 bg-background p-8 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Explorar</h3>
              <div className="flex space-x-4 text-sm mb-6 border-b pb-4">
                <button className="font-semibold text-primary">Popular</button>
                <button className="text-muted-foreground hover:text-foreground">Lujo</button>
                <button className="text-muted-foreground hover:text-foreground">Aventura</button>
              </div>
              
              <div className="space-y-6">
                <div className="relative h-48 w-full rounded-2xl overflow-hidden group">
                  <Image 
                    src="https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxDYXJpYmJlYW58ZW58MHx8fHwxNzUyMzM0NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Caribe"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="Caribbean beach"
                    className="group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-bold text-lg">Caribe</h4>
                    <p className="text-xs">Playas de arena blanca y aguas turquesas.</p>
                  </div>
                </div>
                <div className="relative h-48 w-full rounded-2xl overflow-hidden group">
                  <Image 
                    src="https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxNYWxkaXZlc3xlbnwwfHx8fDE3NTIzMzQ2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Maldivas"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="Maldives resort"
                    className="group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                   <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-bold text-lg">Maldivas</h4>
                    <p className="text-xs">Bungalows sobre el agua y lujo tropical.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>


        {/* Póliza HCM Section */}
        <SectionWrapper>
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="relative aspect-square w-full rounded-lg overflow-hidden">
                     <Image
                        src="https://images.unsplash.com/photo-1581092580497-c3d25e76326c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxoZWFsdGhjYXJlfGVufDB8fHx8MTc1MjI0OTc4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Doctor revisando documentos de póliza de salud"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="healthcare medical"
                     />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-foreground tracking-tight">Póliza HCM</h2>
                    <p className="text-muted-foreground">
                        Tu bienestar es nuestra prioridad. Accede a toda la información de tu Póliza de Hospitalización, Cirugía y Maternidad. Consulta tu cobertura, la red de clínicas afiliadas y gestiona tus reembolsos.
                    </p>
                    <Button asChild>
                        <Link href="/dashboard/poliza-hcm">
                            Consultar Póliza
                        </Link>
                    </Button>
                </div>
            </div>
        </SectionWrapper>

        {/* Menus Section */}
        <SectionWrapper className="min-h-screen flex flex-col justify-center py-0 md:py-0">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-4">
              <h2 className="text-4xl font-bold text-foreground">Menú Semanal</h2>
              <p className="text-muted-foreground mt-4">
                Opciones de almuerzo disponibles para toda la semana en el comedor.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                 <div className="flex items-center gap-2 flex-wrap">
                    <Button size="sm" variant={selectedMenu === 'Clásico' ? 'default' : 'outline'} onClick={() => setSelectedMenu('Clásico')}>Clásico</Button>
                    <Button size="sm" variant={selectedMenu === 'Dieta' ? 'default' : 'outline'} onClick={() => setSelectedMenu('Dieta')}>Dieta</Button>
                    <Button size="sm" variant={selectedMenu === 'Ejecutivo' ? 'default' : 'outline'} onClick={() => setSelectedMenu('Ejecutivo')}>Ejecutivo</Button>
                  </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleMenuScroll('left')}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleMenuScroll('right')}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
              </div>
              <div ref={menuScrollAreaRef}>
                <ScrollArea className="w-full">
                  <div className="flex w-max space-x-8 py-4">
                    {filteredMenuItems.map((item) => (
                      <MenuItemCard key={item.id} item={item} isCurrentDay={currentDayName === item.day} />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
          </div>
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
