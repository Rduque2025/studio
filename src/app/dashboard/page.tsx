
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { CourseCard } from "@/components/dashboard/course-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { MenuItemCard } from "@/components/dashboard/menu-item-card";
// DressCodeCard is no longer directly used in the map, but the data is.
import { mockCourses, mockActivities, mockMenuItems, mockDressCodeItems, mockDietMenuItems, mockExecutiveMenuItems, mockDepartments } from "@/lib/placeholder-data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Handshake,
  Lightbulb,
  Award,
  Globe,
  Landmark,
  UsersRound,
  Cpu,
  GitFork,
  Layers,
  Gem,
  ArrowRight,
  Users,
  DollarSign,
  Settings, // For fallback icon
  Megaphone, // Added for Marketing department if needed
  Plane, // For Vacaciones
  ShieldCheck, // For HCM
  Phone,
  MessageSquare
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Separator } from "@/components/ui/separator";


const rotatingImagesData = [
  {
    src: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxDb25maWFuemF8ZW58MHx8fHwxNzQ4MjkwNzU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Imagen corporativa de Banesco Seguros",
    hint: "corporate office"
  },
  {
    src: "https://images.unsplash.com/photo-1576696058573-12b47c49559e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8RkFNSUxJQXxlbnwwfHx8fDE3NDgyOTEzMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Protección y confianza familiar Banesco Seguros",
    hint: "family protection"
  },
  {
    src: "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNnx8RU1QUkVTQXxlbnwwfHx8fDE3NDgyOTE1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Solidez financiera Banesco Seguros",
    hint: "financial security"
  },
];

const bannerImagesData = [
  {
    src: "https://placehold.co/677x388.png",
    alt: "Banner principal del portal de gestión 1",
    hint: "corporate banner"
  },
  {
    src: "https://placehold.co/677x388/003c71/ffffff.png",
    alt: "Banner principal del portal de gestión 2",
    hint: "company values"
  },
  {
    src: "https://placehold.co/677x388/1a61ab/ffffff.png",
    alt: "Banner principal del portal de gestión 3",
    hint: "employee portal"
  },
];

const valoresData = [
  { title: "Confianza", text: "Relaciones sólidas y duraderas basadas en transparencia.", icon: Handshake, color: "bg-pink-500" },
  { title: "Innovación", text: "Buscamos constantemente nuevas y mejores formas de proteger.", icon: Lightbulb, color: "bg-purple-500" },
  { title: "Excelencia", text: "Superamos las expectativas de nuestros clientes en cada interacción.", icon: Award, color: "bg-blue-500" },
  { title: "Compromiso", text: "Contribuimos al desarrollo y bienestar de las comunidades.", icon: Globe, color: "bg-rose-500" },
];

const pilaresData = [
  { title: "Solidez", text: "Garantizamos la capacidad de respuesta ante compromisos.", icon: Landmark, color: "bg-sky-500" },
  { title: "Talento", text: "Equipo de profesionales capacitados y motivados.", icon: UsersRound, color: "bg-lime-500" },
  { title: "Tecnología", text: "Invertimos para optimizar procesos y mejorar experiencia.", icon: Cpu, color: "bg-indigo-500" },
  { title: "Adaptabilidad", text: "Nos ajustamos a los cambios del entorno y del mercado.", icon: GitFork, color: "bg-amber-500" },
];

const departmentIconMap: { [key: string]: React.ElementType } = {
  rh: Users,
  it: Cpu,
  finanzas: DollarSign,
  marketing: Megaphone, 
  operaciones: Settings,
  vacaciones: Plane,
  hcm: ShieldCheck,
};

const TimelineNode = ({ title, text, color, isLast }: { title: string, text: string, color: string, isLast: boolean }) => {
  return (
    <div className="flex items-start">
      {/* Timeline decorator */}
      <div className="flex flex-col items-center w-8 mr-4 flex-shrink-0">
        <div className={cn("flex items-center justify-center h-5 w-5 rounded-full z-10", color)} />
        {!isLast && <div className={cn("w-0.5 h-24", color)} />}
      </div>
      {/* Content */}
      <div className="w-full">
        <div className={cn("relative p-4 rounded-xl text-white shadow-md", color)}>
          <div className={cn("absolute top-1.5 -left-[18px] w-5 h-0.5", color)} />
          <h4 className="font-semibold text-sm">{title}</h4>
          <p className="text-xs leading-snug">{text}</p>
        </div>
      </div>
    </div>
  );
};


export default function DashboardPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentBannerImageIndex, setCurrentBannerImageIndex] = useState(0);
  const [currentDayName, setCurrentDayName] = useState('');
  const [currentDressCodeImageIndex, setCurrentDressCodeImageIndex] = useState(0);
  const [currentDeptIndex, setCurrentDeptIndex] = useState(0);
  const [activePrinciple, setActivePrinciple] = useState<'valores' | 'pilares'>('valores');

  const featuredDepartments = mockDepartments.filter(dept => dept.id !== 'vacaciones' && dept.id !== 'hcm').slice(0, 3);
  const principlesToShow = activePrinciple === 'valores' ? valoresData : pilaresData;


  useEffect(() => {
    const today = new Date();
    const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' });
    setCurrentDayName(dayName.charAt(0).toUpperCase() + dayName.slice(1));
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? rotatingImagesData.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === rotatingImagesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevBannerImage = () => {
    setCurrentBannerImageIndex(prevIndex =>
      prevIndex === 0 ? bannerImagesData.length - 1 : prevIndex - 1
    );
  };

  const handleNextBannerImage = () => {
    setCurrentBannerImageIndex(prevIndex =>
      prevIndex === bannerImagesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevDressCodeImage = () => {
    setCurrentDressCodeImageIndex(prevIndex =>
      prevIndex === 0 ? mockDressCodeItems.length - 1 : prevIndex - 1
    );
  };

  const handleNextDressCodeImage = () => {
    setCurrentDressCodeImageIndex(prevIndex =>
      prevIndex === mockDressCodeItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevDept = () => {
    setCurrentDeptIndex(prev => (prev === 0 ? featuredDepartments.length - 1 : prev - 1));
  };

  const handleNextDept = () => {
    setCurrentDeptIndex(prev => (prev === featuredDepartments.length - 1 ? 0 : prev + 1));
  };


  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      <section className="mb-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
          {/* Banner Carousel */}
          <div className="relative w-full md:w-[677.33px] h-[388.39px] rounded-lg overflow-hidden shadow-lg mx-auto">
            <Image
              key={bannerImagesData[currentBannerImageIndex].src}
              src={bannerImagesData[currentBannerImageIndex].src}
              alt={bannerImagesData[currentBannerImageIndex].alt}
              layout="fill"
              objectFit="cover"
              data-ai-hint={bannerImagesData[currentBannerImageIndex].hint}
              priority={currentBannerImageIndex === 0}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevBannerImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary/70 hover:bg-primary text-primary-foreground rounded-full"
              aria-label="Banner anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextBannerImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/70 hover:bg-primary text-primary-foreground rounded-full"
              aria-label="Siguiente banner"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      <SectionWrapper
        title="Banesco Seguros Venezuela"
        description="Nuestra trayectoria y compromiso con Venezuela."
        cardClassName="bg-transparent rounded-lg shadow-none border-none"
        titleClassName="text-4xl md:text-5xl font-bold text-primary py-4"
        descriptionClassName="text-secondary font-semibold"
        contentClassName="p-0"
      >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-6">
              <p className="text-foreground leading-relaxed text-sm">
                En Banesco Seguros, nos dedicamos a ofrecer soluciones de protección innovadoras y confiables, adaptadas a las necesidades de nuestros clientes en Venezuela. Con una sólida trayectoria en el mercado asegurador, nuestro principal objetivo es brindar tranquilidad y respaldo a individuos, familias y empresas.
              </p>
              <p className="text-foreground leading-relaxed mt-4 text-sm">
                Nos esforzamos por mantener los más altos estándares de servicio, con un equipo de profesionales comprometidos con la excelencia y la atención personalizada. Creemos en la importancia de construir relaciones a largo plazo basadas en la confianza y la transparencia.
              </p>
              <p className="text-foreground leading-relaxed mt-4 text-sm">
                Nuestra visión es ser la aseguradora líder en el país, reconocida por nuestra solidez financiera, innovación constante y profundo compromiso social con el desarrollo de Venezuela.
              </p>
            </div>
             <div className="flex flex-col md:flex-row items-center gap-4">
                {/* Existing Rotating Image Carousel (Inner Right) */}
                <div className="relative w-full md:flex-1 h-[388.39px] rounded-lg overflow-hidden shadow-md">
                    <Image
                        key={rotatingImagesData[currentImageIndex].src}
                        src={rotatingImagesData[currentImageIndex].src}
                        alt={rotatingImagesData[currentImageIndex].alt}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={rotatingImagesData[currentImageIndex].hint}
                        priority={currentImageIndex === 0}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary/70 hover:bg-primary text-primary-foreground rounded-full"
                        aria-label="Imagen anterior"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/70 hover:bg-primary text-primary-foreground rounded-full"
                        aria-label="Siguiente imagen"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </div>
            </div>
          </div>
      </SectionWrapper>

      <SectionWrapper title="Menú Semanal" description="Consulte las opciones de almuerzo para esta semana en el comedor." titleClassName="text-primary" descriptionClassName="text-secondary">
        <ScrollArea className="w-full whitespace-nowrap rounded-md bg-card shadow-sm border-none">
          <div className="flex w-max space-x-4 p-4">
            {mockMenuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} isCurrentDay={currentDayName === item.day} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SectionWrapper>

      <SectionWrapper title="Menú de Dieta" description="Opciones saludables y balanceadas para cuidar su alimentación." titleClassName="text-primary" descriptionClassName="text-secondary">
       <ScrollArea className="w-full whitespace-nowrap rounded-md bg-card shadow-sm border-none">
          <div className="flex w-max space-x-4 p-4">
            {mockDietMenuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} isCurrentDay={currentDayName === item.day} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SectionWrapper>

      <SectionWrapper title="Menú Ejecutivo" description="Platos especiales para una experiencia gastronómica superior." titleClassName="text-primary" descriptionClassName="text-secondary">
        <ScrollArea className="w-full whitespace-nowrap rounded-md bg-card shadow-sm border-none">
          <div className="flex w-max space-x-4 p-4">
            {mockExecutiveMenuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} isCurrentDay={currentDayName === item.day} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SectionWrapper>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 items-start">
        <SectionWrapper 
          title="Portal de Requerimientos" 
          titleClassName="text-primary"
          className="md:col-span-1"
        >
          <div className="mb-4 text-center md:text-left">
            <Button asChild size="sm">
              <Link href="/dashboard/requerimientos">
                Ir al Portal de Requerimientos <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="relative w-full max-w-lg">
              {featuredDepartments.length > 0 && (() => {
                const dept = featuredDepartments[currentDeptIndex];
                const IconComponent = departmentIconMap[dept.id] || Settings;
                return (
                  <Card key={dept.id} className="transition-all duration-300 ease-in-out flex flex-col shadow-lg overflow-hidden rounded-lg">
                    {dept.imageUrl && (
                      <div className="relative w-full h-56 md:h-64">
                        <Image
                          src={dept.imageUrl}
                          alt={`Imagen para ${dept.name}`}
                          layout="fill"
                          objectFit="cover"
                          data-ai-hint={dept.dataAiHint || 'department service'}
                        />
                        {featuredDepartments.length > 1 && (
                          <>
                            <Button
                              onClick={handlePrevDept}
                              variant="ghost"
                              size="icon"
                              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-primary/70 hover:bg-primary text-primary-foreground rounded-full"
                              aria-label="Requerimiento anterior"
                            >
                              <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <Button
                              onClick={handleNextDept}
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-primary/70 hover:bg-primary text-primary-foreground rounded-full"
                              aria-label="Siguiente requerimiento"
                            >
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                    <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2 pt-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{dept.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow min-h-[50px]"> 
                      <CardDescription className="text-xs text-muted-foreground">{dept.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 border-t">
                      <Button asChild className="w-full">
                        <Link href={`/dashboard/requerimientos/${dept.id}`}>
                          Acceder <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })()}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper 
          title="Planifica tus próximas vacaciones!" 
          description="Planifique sus días libres, solicite vacaciones y consulte su saldo disponible."
          titleClassName="text-primary" 
          descriptionClassName="text-secondary text-xs"
          className="md:col-span-1"
        >
          <Card className="flex flex-col h-full overflow-hidden shadow-lg rounded-lg">
            <CardHeader className="p-0">
              <div className="relative w-full h-56 md:h-64">
                <Image
                    src="https://images.unsplash.com/photo-1519046904884-53103b34b206?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxiZWFjaHxlbnwwfHx8fDE3NTAzNDI5NDR8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="Gestión de Vacaciones"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="travel vacation"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <p className="text-xs text-muted-foreground">
                  Acceda al portal para solicitar sus vacaciones, verificar los días acumulados y planificar su próximo descanso.
              </p>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <Button asChild size="default" className="w-full">
                  <Link href="/dashboard/vacaciones">
                      Acceder a Gestión de Vacaciones <Plane className="ml-2 h-4 w-4" />
                  </Link>
              </Button>
            </CardFooter>
          </Card>
        </SectionWrapper>
      </div>

      <SectionWrapper 
        title="Nuestra Póliza HCM"
        description="Información y gestión de su Póliza de Hospitalización, Cirugía y Maternidad."
        titleClassName="text-primary"
        descriptionClassName="text-secondary text-xs"
      >
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="flex flex-col h-full overflow-hidden shadow-lg rounded-lg">
            <CardHeader className="p-0">
              <div className="relative w-full h-56 md:h-64">
                <Image
                    src="https://images.unsplash.com/photo-1740953448394-86122e98c1be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8Q0lSVUdJQXxlbnwwfHx8fDE3NTAzNTMxNjh8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="Póliza HCM Banesco Seguros"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="health insurance"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <p className="text-xs text-muted-foreground">
                  Consulte los detalles de su cobertura, red de clínicas afiliadas, y gestione sus reembolsos o claves de emergencia.
              </p>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <Button asChild size="default" className="w-full">
                  <Link href="/dashboard/poliza-hcm">
                      Conocer Más <ShieldCheck className="ml-2 h-4 w-4" />
                  </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full overflow-hidden rounded-lg bg-card border-none shadow-none">
            <CardHeader className="bg-primary text-primary-foreground text-center p-4">
                <CardTitle className="text-xl font-bold">
                    ¡En caso de Emergencia!
                </CardTitle>
                <CardDescription className="text-primary-foreground/80 text-xs">
                    Números de atención para siniestros y claves de emergencia.
                </CardDescription>
            </CardHeader>
             <CardContent className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <a 
                    href="https://wa.me/584242668446" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center justify-center p-4 bg-card hover:bg-muted rounded-lg transition-colors"
                >
                    <div className="mb-4 rounded-full bg-muted p-5">
                        <MessageSquare className="h-10 w-10 text-green-600 transition-transform duration-200 group-hover:scale-110" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-muted-foreground">WhatsApp</p>
                        <p className="text-xl font-bold text-green-600">0424-Contigo</p>
                    </div>
                </a>
                <a 
                    href="tel:05007258300"
                    className="group flex flex-col items-center justify-center p-4 bg-card hover:bg-muted rounded-lg transition-colors"
                >
                    <div className="mb-4 rounded-full bg-muted p-5">
                        <Phone className="h-10 w-10 text-primary transition-transform duration-200 group-hover:scale-110" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-muted-foreground">Llamar</p>
                        <p className="text-xl font-bold text-primary">0500-7258300</p>
                    </div>
                </a>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>


      <SectionWrapper title="Cursos Disponibles" description="Amplíe sus conocimientos y habilidades con nuestra oferta formativa." titleClassName="text-primary" descriptionClassName="text-secondary">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </SectionWrapper>

       <SectionWrapper title="Actividades y Bienestar" description="Participe en nuestras próximas actividades y programas de bienestar." titleClassName="text-primary" descriptionClassName="text-secondary">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        title="Nuestros Principios Fundamentales"
        cardClassName="bg-transparent shadow-none rounded-lg border-none"
        contentClassName="p-0"
        titleClassName="text-3xl font-bold text-primary mb-8 text-center"
      >
        <div className="mb-10 text-center">
          <h3 className="text-xl font-semibold text-primary mb-2">Nuestra Oferta de Valor</h3>
          <p className="text-sm text-foreground max-w-2xl mx-auto leading-relaxed">
            Somos una empresa cercana que se comunica de manera clara y sencilla, brindando asesorías y protección con{' '}
            <span className="font-semibold text-secondary">
              servicios y soluciones de calidad, ágiles y oportunas adaptadas a la necesidad de cada cliente. ¡Cumplimos lo que prometemos!
            </span>
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left md:sticky md:top-24">
                <h3 className="text-2xl font-bold text-primary">
                    {activePrinciple === 'valores' ? 'Valores' : 'Pilares'}
                </h3>
                <p className="text-muted-foreground mt-2 mb-6 text-xs">
                    {activePrinciple === 'valores' 
                        ? "Los principios éticos y profesionales que guían cada una de nuestras acciones y decisiones."
                        : "Las columnas fundamentales sobre las que construimos nuestra solidez y confianza en el mercado."}
                </p>
                <Button onClick={() => setActivePrinciple(p => p === 'valores' ? 'pilares' : 'valores')} variant="outline">
                    Ver {activePrinciple === 'valores' ? 'Pilares' : 'Valores'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
            
            <div className="md:col-span-2 space-y-8">
                {principlesToShow.map((item, index) => (
                  <TimelineNode
                    key={item.title}
                    title={item.title}
                    text={item.text}
                    color={item.color}
                    isLast={index === principlesToShow.length - 1}
                  />
                ))}
            </div>
        </div>
      </SectionWrapper>

       <SectionWrapper title="Nuestra Misión" titleClassName="text-2xl font-bold text-primary mb-6 text-center">
        <CardContent className="p-0">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="relative pl-6 md:pl-8 py-4 border-l-4 border-primary rounded-r-lg bg-card shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-in-out">
              <div className="absolute -left-[1.10rem] top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold text-md shadow-md border-2 border-background">1</div>
              <h3 className="text-lg font-semibold text-primary mb-1 ml-3">Excelencia y Calidad de Servicios</h3>
              <p className="text-muted-foreground text-xs ml-3 leading-relaxed">
                Ser una compañía de seguros reconocida por la excelencia en su calidad de servicios.
              </p>
            </div>

            <div className="relative pl-6 md:pl-8 py-4 border-l-4 border-primary rounded-r-lg bg-card shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-in-out md:ml-4 lg:ml-6">
              <div className="absolute -left-[1.10rem] top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold text-md shadow-md border-2 border-background">2</div>
              <h3 className="text-lg font-semibold text-primary mb-1 ml-3">Satisfacción de Necesidades</h3>
              <p className="text-muted-foreground text-xs ml-3 leading-relaxed">
                Orientada en la satisfacción de las necesidades de los clientes propios.
              </p>
            </div>

            <div className="relative pl-6 md:pl-8 py-4 border-l-4 border-primary rounded-r-lg bg-card shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-in-out md:ml-8 lg:ml-12">
              <div className="absolute -left-[1.10rem] top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold text-md shadow-md border-2 border-background">3</div>
              <h3 className="text-lg font-semibold text-primary mb-1 ml-3">Soporte Extendido</h3>
              <p className="text-muted-foreground text-xs ml-3 leading-relaxed">
                Atendiendo las necesidades de la organización y de los intermediarios.
              </p>
            </div>
          </div>
        </CardContent>
      </SectionWrapper>


      <SectionWrapper title="Código de Vestimenta" description="Guía rápida sobre el código de vestimenta de la empresa." titleClassName="text-primary" descriptionClassName="text-secondary">
        <div className="flex flex-col md:flex-row items-start justify-center gap-8 py-4">
          {/* Dress Code Image Viewer */}
          <div className="relative w-full md:w-[677.33px] h-[388.39px] rounded-lg overflow-hidden shadow-lg mx-auto">
            {mockDressCodeItems.length > 0 && (
              <Image
                key={mockDressCodeItems[currentDressCodeImageIndex].id}
                src={mockDressCodeItems[currentDressCodeImageIndex].imageUrl}
                alt={mockDressCodeItems[currentDressCodeImageIndex].title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={mockDressCodeItems[currentDressCodeImageIndex].dataAiHint}
                priority={currentDressCodeImageIndex === 0}
              />
            )}
            {mockDressCodeItems.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevDressCodeImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary/70 hover:bg-primary text-primary-foreground rounded-full"
                  aria-label="Código de vestimenta anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextDressCodeImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/70 hover:bg-primary text-primary-foreground rounded-full"
                  aria-label="Siguiente código de vestimenta"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
             {mockDressCodeItems.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                    <p className="text-muted-foreground">No hay información de código de vestimenta disponible.</p>
                </div>
            )}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

    

    

    


