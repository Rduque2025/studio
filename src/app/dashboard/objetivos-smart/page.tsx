
'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  PackagePlus, 
  RefreshCcw, 
  Network, 
  Users, 
  TrendingUp, 
  Gauge, 
  ClipboardCheck, 
  Zap, 
  ListChecks, 
  Award, 
  Workflow, 
  GraduationCap, 
  Gem, 
  Gavel, 
  Calculator,
  Target,
  Scaling,
  Goal,
  Sparkles,
  Timer,
  MoreVertical,
  ArrowRight,
  Clock,
  Heart,
  MessageCircle,
  Smile,
  Meh,
  Frown,
  Quote,
  Star
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { npsData, mockCustomerFeedback as staticFeedback } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getCustomerFeedback, type CustomerFeedback } from '@/ai/flows/get-customer-feedback-flow';
import { Skeleton } from '@/components/ui/skeleton';


const smartGoalsData = {
  S: {
    letter: "S",
    title: "Específico",
    icon: Target,
    description: "Metas claras y bien definidas para guiar nuestras acciones.",
    challenges: [
      { id: "s1", icon: PackagePlus, title: "Innovación en Productos y Tecnología", description: "Desarrollar productos, procesos y tecnología para mejorar la atención y ventas.", status: "En progreso" },
      { id: "s2", icon: RefreshCcw, title: "Sistemática Comercial", description: "Reimplantar y optimizar la sistemática comercial para impulsar los resultados.", status: "Normal" },
      { id: "s3", icon: Network, title: "Modernización de TI", description: "Actualizar nuestra arquitectura de tecnología de la información para soportar el crecimiento.", status: "En riesgo" },
      { id: "s4", icon: Users, title: "Visión Cliente Céntrico como Foco", description: "Colocar al cliente en el centro de todas nuestras estrategias y operaciones.", status: "En progreso" },
    ]
  },
  M: {
    letter: "M",
    title: "Medible",
    icon: Scaling,
    description: "Indicadores clave para cuantificar y seguir nuestro progreso.",
    challenges: [
      { id: "m1", icon: TrendingUp, title: "Crecimiento Rentable y Sostenible", description: "Asegurar un crecimiento rentable y sostenible del volumen de negocios.", status: "Normal" },
      { id: "m2", icon: Gauge, title: "Eficiencia Operativa", description: "Aumentar la eficiencia en todos nuestros procesos operativos.", status: "En progreso" },
    ]
  },
  A: {
    letter: "A",
    title: "Alcanzable",
    icon: Goal,
    description: "Objetivos realistas que podemos lograr con nuestros recursos.",
    challenges: [
      { id: "a1", icon: Award, title: "Cultura de Alto Desempeño", description: "Fomentar una cultura organizacional orientada a la excelencia y el alto rendimiento.", status: "Normal" },
      { id: "a2", icon: GraduationCap, title: "Desarrollo del Talento", description: "Potenciar las capacidades y el crecimiento profesional de nuestro equipo.", status: "En progreso" },
    ]
  },
  R: {
    letter: "R",
    title: "Relevante",
    icon: Sparkles,
    description: "Metas alineadas con nuestra visión y el impacto en el negocio.",
    challenges: [
      { id: "r1", icon: Gavel, title: "Cumplimiento Normativo", description: "Garantizar la adecuación continua a la nueva normativa vigente en el sector.", status: "Completado" },
    ]
  },
  T: {
    letter: "T",
    title: "Temporal",
    icon: Timer,
    description: "Un marco de tiempo definido para la consecución de las metas.",
    challenges: [
       { id: "t1", icon: Calculator, title: "Culminar Proyecto Multicotizador Web", description: "Finalizar y lanzar el multicotizador web para Pólizas de Automóvil y Personas durante el segundo semestre.", status: "En riesgo" },
       { id: "t2", icon: PackagePlus, title: "Avanzar en el Plan de Productos", description: "Impulsar el desarrollo de nuevos productos y las actualizaciones de los existentes en el segundo semestre.", status: "Normal" },
    ]
  },
};

const getStatus = (progress: number) => {
    if (progress < 40) return { label: "EN RIESGO", color: "text-red-600", bg: "bg-red-100", ring: "ring-red-200", stroke: "stroke-red-500", progressClass: "bg-destructive" };
    if (progress < 75) return { label: "EN PROGRESO", color: "text-amber-600", bg: "bg-amber-100", ring: "ring-amber-200", stroke: "stroke-amber-500", progressClass: "bg-amber-500" };
    return { label: "EN CAMINO", color: "text-green-600", bg: "bg-green-100", ring: "ring-green-200", stroke: "stroke-green-500", progressClass: "bg-green-500" };
};

const getNpsStatus = (score: number) => {
    if (score < 0) return { label: "Necesita Mejora", color: "text-red-600", bg: "bg-red-100", stroke: "stroke-red-500" };
    if (score < 50) return { label: "Bueno", color: "text-amber-600", bg: "bg-amber-100", stroke: "stroke-amber-500" };
    return { label: "Excelente", color: "text-green-600", bg: "bg-green-100", stroke: "stroke-green-500" };
};

const ProgressRing = ({ progress, statusLabel, statusColor }: { progress: number; statusLabel: string; statusColor: string; }) => {
    const [animatedProgress, setAnimatedProgress] = useState(0);
    const [animatedNumber, setAnimatedNumber] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const strokeWidth = 10;
    const radius = 80;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimatedProgress(progress);
                    let start = 0;
                    const end = progress;
                    if (start === end) return;
                    
                    const duration = 1500;
                    const incrementTime = (duration / end) * (1000 / 60);
                    const timer = setInterval(() => {
                        start += 1;
                        setAnimatedNumber(start);
                        if (start === end) clearInterval(timer);
                    }, incrementTime);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [progress]);

    const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

    return (
        <div ref={ref} className="relative h-48 w-48">
            <svg className="h-full w-full" viewBox="0 0 200 200">
                <circle
                    className="stroke-current text-muted/30"
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                />
                <circle
                    className={cn("stroke-current", statusColor)}
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                    style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-foreground">{animatedNumber}%</span>
                <Badge className={cn("font-semibold tracking-wider mt-2 bg-opacity-80 text-white", statusColor.replace('text-', 'bg-'))}>{statusLabel}</Badge>
            </div>
        </div>
    );
};


export default function ObjetivosSmartPage() {
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof smartGoalsData | null>(null);
    const [activeFeedbackCategory, setActiveFeedbackCategory] = useState<'PROMOTOR' | 'NEUTRO' | 'DETRACTOR'>('PROMOTOR');
    const [customerFeedback, setCustomerFeedback] = useState<CustomerFeedback[]>([]);
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(true);
    const [yearProgress, setYearProgress] = useState({
      day: 0,
      totalDays: 365,
      percentage: 0,
    });
    
    const companyProgress = 58; // Static value as before

    useEffect(() => {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const endOfYear = new Date(now.getFullYear(), 11, 31);
        const dayOfYear = Math.ceil((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
        const totalDaysInYear = (startOfYear.getFullYear() % 4 === 0 && startOfYear.getFullYear() % 100 !== 0) || startOfYear.getFullYear() % 400 === 0 ? 366 : 365;
        const percentage = Math.round((dayOfYear / totalDaysInYear) * 100);

        setYearProgress({ day: dayOfYear, totalDays: totalDaysInYear, percentage });
    }, []);

    useEffect(() => {
      const fetchFeedback = async () => {
        setIsLoadingFeedback(true);
        try {
          const feedbackData = await getCustomerFeedback();
          setCustomerFeedback(feedbackData);
        } catch (error) {
          console.error("Failed to fetch customer feedback:", error);
          setCustomerFeedback([]); // Set to empty on error to avoid crash
        } finally {
          setIsLoadingFeedback(false);
        }
      };
      fetchFeedback();
    }, []);
    
    const handleCategoryClick = (categoryKey: keyof typeof smartGoalsData) => {
        if (selectedCategory === categoryKey) {
            setSelectedCategory(null); // Deselect if clicked again
        } else {
            setSelectedCategory(categoryKey);
        }
    };

    const npsStatus = getNpsStatus(npsData.score);
    
    const companyProgressStatus = getStatus(companyProgress);
    const yearProgressStatus = getStatus(yearProgress.percentage);

    const filteredFeedback = useMemo(() => {
        if (isLoadingFeedback) return [];
        return customerFeedback.filter(feedback => feedback['CATEGORÍA'] === activeFeedbackCategory).slice(0, 10);
    }, [activeFeedbackCategory, customerFeedback, isLoadingFeedback]);
    
    const getSentimentIcon = (category: 'PROMOTOR' | 'NEUTRO' | 'DETRACTOR') => {
        switch (category) {
            case 'PROMOTOR':
                return <Smile className="h-5 w-5 text-green-600" />;
            case 'NEUTRO':
                return <Meh className="h-5 w-5 text-amber-500" />;
            case 'DETRACTOR':
                return <Frown className="h-5 w-5 text-red-500" />;
            default:
                return null;
        }
    };

    const getBadgeClass = (category: 'PROMOTOR' | 'NEUTRO' | 'DETRACTOR') => {
        switch (category) {
            case 'PROMOTOR':
                return "bg-green-100 text-green-800 border-green-200";
            case 'NEUTRO':
                return "bg-amber-100 text-amber-800 border-amber-200";
            case 'DETRACTOR':
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-muted text-muted-foreground";
        }
    }


    return (
        <div className="container mx-auto py-8 px-4 bg-background space-y-12">
            
            {/* Back Button */}
            <div className="mb-8">
                <Button asChild variant="link" className="text-muted-foreground hover:no-underline p-0 h-auto text-xs pl-2">
                    <Link href="/dashboard/mapa-clientes" className="flex items-center gap-2 group">
                        <span className="flex items-center justify-center h-7 w-7 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">Volver a Nosotros</span>
                    </Link>
                </Button>
            </div>

            {/* Header */}
            <Card className="relative w-full overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-2xl min-h-[300px] flex flex-col justify-center p-8 md:p-12">
              <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none"></div>
              <div className="absolute right-10 top-10 w-60 h-60 rounded-full bg-white/5 pointer-events-none"></div>
              <div className="absolute -left-10 bottom-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none"></div>

              <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-1">
                      <p className="text-8xl font-black text-white/80">01</p>
                  </div>
                  <div className="md:col-span-11 md:pl-8">
                      <p className="text-primary-foreground/80 mb-2">En Sintonía con</p>
                      <h1 className="text-4xl md:text-5xl font-bold">Nuestros Objetivos</h1>
                      <p className="mt-4 max-w-2xl text-primary-foreground/80">
                          Un vistazo en tiempo real al progreso de nuestros desafíos estratégicos para 2025. Seleccione una categoría para ver los detalles.
                      </p>
                  </div>
              </div>
            </Card>


            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2">
                {!selectedCategory ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                        <Card className="shadow-sm border-none bg-card flex flex-col justify-between p-6">
                            <CardHeader className="p-0">
                                <CardTitle className="text-sm font-medium">Progreso de la Empresa</CardTitle>
                                <CardDescription className="text-xs">Objetivo: 100%</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col items-center justify-center p-0">
                               <ProgressRing 
                                    progress={companyProgress} 
                                    statusLabel={companyProgressStatus.label} 
                                    statusColor={companyProgressStatus.color} 
                                />
                            </CardContent>
                        </Card>
                         <Card className="shadow-sm border-none bg-card flex flex-col justify-between p-6">
                            <CardHeader className="p-0">
                                <CardTitle className="text-sm font-medium">Progreso Anual</CardTitle>
                                <CardDescription className="text-xs">Día {yearProgress.day} de {yearProgress.totalDays}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col items-center justify-center p-0">
                               <ProgressRing 
                                    progress={yearProgress.percentage} 
                                    statusLabel={yearProgressStatus.label} 
                                    statusColor={yearProgressStatus.color} 
                                />
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {smartGoalsData[selectedCategory].challenges.map((challenge) => (
                            <Card key={challenge.id} className="bg-card shadow-sm border-none flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div className="p-2.5 bg-muted rounded-md flex-shrink-0 shadow-sm border">
                                            <challenge.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <CardTitle className="text-base font-semibold pt-2">{challenge.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-xs text-muted-foreground">{challenge.description}</p>
                                </CardContent>
                                <CardFooter className="flex flex-col items-start gap-3">
                                    <div className="w-full">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={cn(
                                                "text-xs font-medium",
                                                challenge.status === 'En riesgo' && 'text-destructive',
                                                challenge.status === 'Completado' && 'text-green-600',
                                                challenge.status === 'Normal' && 'text-primary'
                                            )}>{challenge.status}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-end w-full items-center">
                                        <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                                            Ver detalles
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
              </div>

              {/* Right Column: SMART Categories */}
              <div className="flex flex-col gap-4">
                {(Object.keys(smartGoalsData) as (keyof typeof smartGoalsData)[]).map((key) => {
                  const category = smartGoalsData[key];
                  const isActive = selectedCategory === key;
                  return (
                    <Card 
                      key={key} 
                      className={cn(
                        "cursor-pointer transition-all duration-300 shadow-sm border flex-1",
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-lg -translate-y-1" 
                          : "bg-card hover:bg-muted/50 hover:shadow-md"
                      )}
                      onClick={() => handleCategoryClick(key)}
                    >
                      <CardHeader className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                              "p-2 rounded-md flex-shrink-0",
                              isActive ? "bg-white/20" : "bg-muted"
                            )}>
                            <category.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-primary")} />
                          </div>
                          <div>
                            <CardTitle className="text-base font-bold">{category.title}</CardTitle>
                            <p className={cn("text-xs", isActive ? "text-primary-foreground/80" : "text-muted-foreground")}>
                              {category.challenges.length} {category.challenges.length === 1 ? 'desafío' : 'desafíos'}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Second Banner */}
            <Card className="relative w-full overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-2xl min-h-[300px] flex flex-col justify-center p-8 md:p-12">
              <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none"></div>
              <div className="absolute right-10 top-10 w-60 h-60 rounded-full bg-white/5 pointer-events-none"></div>
              <div className="absolute -left-10 bottom-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none"></div>

              <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-1">
                      <p className="text-8xl font-black text-white/80">02</p>
                  </div>
                  <div className="md:col-span-11 md:pl-8">
                      <p className="text-primary-foreground/80 mb-2">En Sintonía con</p>
                      <h1 className="text-4xl md:text-5xl font-bold">Nuestros Servicios</h1>
                      <p className="mt-4 max-w-2xl text-primary-foreground/80">
                          Descubre cómo cada uno de nuestros servicios contribuye a nuestra misión y al bienestar de nuestros clientes.
                      </p>
                  </div>
              </div>
            </Card>

             {/* Client Section */}
            <div className="py-12">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div className="relative">
                      <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">La Voz de Nuestros Clientes</h2>
                      <p className="text-muted-foreground max-w-md mb-6">
                          La opinión de nuestros clientes es el motor que impulsa nuestra mejora continua. Sus voces nos guían para ofrecer un servicio de excelencia.
                      </p>
                       <div className="flex items-center gap-2 flex-wrap">
                          <Button 
                            size="sm" 
                            variant={activeFeedbackCategory === 'PROMOTOR' ? 'default' : 'outline'}
                            onClick={() => setActiveFeedbackCategory('PROMOTOR')}
                            className="text-xs"
                          >
                            Promotores
                          </Button>
                           <Button 
                            size="sm" 
                            variant={activeFeedbackCategory === 'NEUTRO' ? 'default' : 'outline'}
                             onClick={() => setActiveFeedbackCategory('NEUTRO')}
                             className="text-xs"
                          >
                            Neutros
                          </Button>
                           <Button 
                            size="sm" 
                            variant={activeFeedbackCategory === 'DETRACTOR' ? 'default' : 'outline'}
                             onClick={() => setActiveFeedbackCategory('DETRACTOR')}
                             className="text-xs"
                          >
                            Detractores
                          </Button>
                      </div>
                  </div>
                  
                  <div className="space-y-6">
                      {isLoadingFeedback ? (
                        Array.from({ length: 3 }).map((_, index) => (
                           <Card key={index} className="bg-card shadow-sm border p-4">
                              <div className="flex items-start gap-4">
                                  <Skeleton className="h-12 w-12 rounded-full" />
                                  <div className="flex-grow space-y-2">
                                      <Skeleton className="h-4 w-1/4" />
                                      <Skeleton className="h-4 w-full" />
                                      <Skeleton className="h-4 w-3/4" />
                                  </div>
                              </div>
                          </Card>
                        ))
                      ) : filteredFeedback.length > 0 ? (
                        filteredFeedback.map((feedback, index) => {
                          const isPromoter = feedback['CATEGORÍA'] === 'PROMOTOR';
                          const category = feedback['CATEGORÍA'];
                          return (
                            <div key={`${feedback['NOMBRE TITULAR']}-${index}`} className="flex items-start gap-4">
                              {isPromoter && <div className="w-1 h-full bg-primary rounded-full" />}
                              <Card className={cn("bg-card shadow-sm border p-4 w-full", !isPromoter && "ml-3")}>
                                <div className="flex items-start gap-4">
                                  <Avatar className="h-12 w-12 border-2 border-muted">
                                    <AvatarFallback className="bg-background">
                                      {getSentimentIcon(category)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-grow">
                                    <div className="flex justify-between items-center">
                                      <p className="font-semibold text-sm">{feedback['NOMBRE TITULAR']}</p>
                                      <Badge variant="outline" className={cn(getBadgeClass(category))}>
                                        NPS: {feedback['CALIFICACIÓN']}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">"{feedback['COMENTARIO']}"</p>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          );
                        })
                      ) : (
                          <Card className="bg-card shadow-sm border-none">
                              <CardContent className="p-8 text-center text-muted-foreground text-sm">
                                  No hay comentarios en esta categoría.
                              </CardContent>
                          </Card>
                      )}
                  </div>
              </div>
            </div>
        </div>
    );
}
