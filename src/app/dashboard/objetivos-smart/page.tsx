
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
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
  ArrowRight
} from "lucide-react";
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

const smartGoalsData = {
  S: {
    letter: "S",
    title: "Específico",
    icon: Target,
    description: "Metas claras y bien definidas para guiar nuestras acciones.",
    challenges: [
      { id: "s1", icon: PackagePlus, title: "Innovación en Productos y Tecnología", description: "Desarrollar productos, procesos y tecnología para mejorar la atención y ventas.", progress: 75, status: "En progreso", value: "3/4 Proyectos" },
      { id: "s2", icon: RefreshCcw, title: "Sistemática Comercial", description: "Reimplantar y optimizar la sistemática comercial para impulsar los resultados.", progress: 50, status: "Normal", value: "2/4 Fases" },
      { id: "s3", icon: Network, title: "Modernización de TI", description: "Actualizar nuestra arquitectura de tecnología de la información para soportar el crecimiento.", progress: 25, status: "En riesgo", value: "1/4 Hitos" },
      { id: "s4", icon: Users, title: "Visión Cliente Céntrico como Foco", description: "Colocar al cliente en el centro de todas nuestras estrategias y operaciones.", progress: 80, status: "En progreso", value: "4/5 Iniciativas" },
    ]
  },
  M: {
    letter: "M",
    title: "Medible",
    icon: Scaling,
    description: "Indicadores clave para cuantificar y seguir nuestro progreso.",
    challenges: [
      { id: "m1", icon: TrendingUp, title: "Crecimiento Rentable y Sostenible", description: "Asegurar un crecimiento rentable y sostenible del volumen de negocios.", progress: 90, status: "Normal", value: "90% vs obj." },
      { id: "m2", icon: Gauge, title: "Eficiencia Operativa", description: "Aumentar la eficiencia en todos nuestros procesos operativos.", progress: 60, status: "En progreso", value: "+12% Eficiencia" },
    ]
  },
  A: {
    letter: "A",
    title: "Alcanzable",
    icon: Goal,
    description: "Objetivos realistas que podemos lograr con nuestros recursos.",
    challenges: [
      { id: "a1", icon: Award, title: "Cultura de Alto Desempeño", description: "Fomentar una cultura organizacional orientada a la excelencia y el alto rendimiento.", progress: 85, status: "Normal", value: "8.5/10 Encuesta" },
      { id: "a2", icon: GraduationCap, title: "Desarrollo del Talento", description: "Potenciar las capacidades y el crecimiento profesional de nuestro equipo.", progress: 70, status: "En progreso", value: "70% Plan" },
    ]
  },
  R: {
    letter: "R",
    title: "Relevante",
    icon: Sparkles,
    description: "Metas alineadas con nuestra visión y el impacto en el negocio.",
    challenges: [
      { id: "r1", icon: Gavel, title: "Cumplimiento Normativo", description: "Garantizar la adecuación continua a la nueva normativa vigente en el sector.", progress: 100, status: "Completado", value: "100% Cumplido" },
    ]
  },
  T: {
    letter: "T",
    title: "Temporal",
    icon: Timer,
    description: "Un marco de tiempo definido para la consecución de las metas.",
    challenges: [
       { id: "t1", icon: Calculator, title: "Culminar Proyecto Multicotizador Web", description: "Finalizar y lanzar el multicotizador web para Pólizas de Automóvil y Personas durante el segundo semestre.", progress: 40, status: "En riesgo", value: "Q3 2025" },
       { id: "t2", icon: PackagePlus, title: "Avanzar en el Plan de Productos", description: "Impulsar el desarrollo de nuevos productos y las actualizaciones de los existentes en el segundo semestre.", progress: 65, status: "Normal", value: "Q4 2025" },
    ]
  },
};

const allChallenges = (Object.keys(smartGoalsData) as (keyof typeof smartGoalsData)[])
  .flatMap(key => smartGoalsData[key].challenges.map(c => ({...c, category: key})));


export default function ObjetivosSmartPage({ params: { objectiveId } }: { params: { objectiveId: string } }) {
    
    return (
        <div className="container mx-auto py-8 px-4 bg-background">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                <div>
                  <Button asChild variant="link" className="text-muted-foreground hover:no-underline p-0 h-auto text-xs mb-4">
                      <Link href="/dashboard/mapa-clientes" className="flex items-center gap-2 group">
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
                          <ArrowLeft className="h-4 w-4" />
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">Volver a Nosotros</span>
                      </Link>
                  </Button>
                  <h1 className="text-4xl font-bold tracking-tight text-foreground">Pulso Estratégico</h1>
                  <p className="mt-2 text-muted-foreground max-w-2xl">
                    Un vistazo en tiempo real al progreso de nuestros desafíos estratégicos para 2025.
                    Estos son los objetivos que nos guían hacia el éxito.
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-2">
                  <Button variant="outline">Exportar</Button>
                  <Button>Nuevo Desafío</Button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* Left Panel - Main Visualization */}
                <div className="lg:col-span-2">
                    <Card className="h-full min-h-[400px] flex flex-col relative overflow-hidden bg-card shadow-sm border-none">
                        <Image 
                            src="https://images.unsplash.com/photo-1678830209439-d0032f90143a?q=80&w=2699&auto=format&fit=crop"
                            alt="AI Data Visualization"
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint="abstract glass"
                            className="opacity-20"
                        />
                        <CardHeader className="relative z-10">
                            <CardTitle>Visualización Estratégica</CardTitle>
                            <CardDescription>Análisis de progreso general.</CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10 flex-grow flex items-center justify-center">
                            {/* Placeholder for a larger chart or visualization */}
                            <p className="text-muted-foreground text-sm">Visualización de datos coming soon.</p>
                        </CardContent>
                        <CardFooter className="relative z-10">
                           <Button variant="outline" className="w-full bg-background/50 backdrop-blur-sm">
                                Explorar Datos <ArrowRight className="ml-2 h-4 w-4" />
                           </Button>
                        </CardFooter>
                    </Card>
                </div>
                
                {/* Right Panel - Key Metrics */}
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card className="bg-card shadow-sm border-none">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">Progreso Total</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-5xl font-bold text-foreground">72%</p>
                            <p className="text-xs text-muted-foreground mt-1">+5% desde la semana pasada</p>
                        </CardContent>
                    </Card>
                     <Card className="bg-card shadow-sm border-none">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">Desafíos Completados</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-5xl font-bold text-foreground">1</p>
                            <p className="text-xs text-muted-foreground mt-1">de {allChallenges.length} desafíos totales</p>
                        </CardContent>
                    </Card>
                     <Card className="bg-card shadow-sm border-none">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">Desafíos en Riesgo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-5xl font-bold text-destructive">2</p>
                             <p className="text-xs text-muted-foreground mt-1">Requieren atención inmediata</p>
                        </CardContent>
                    </Card>
                     <Card className="bg-card shadow-sm border-none">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">Objetivos Activos</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-5xl font-bold text-foreground">{allChallenges.length - 1}</p>
                             <p className="text-xs text-muted-foreground mt-1">Actualmente en seguimiento</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Challenges Grid */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Detalle de Desafíos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allChallenges.map((challenge) => (
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
                                        <span className="text-xs text-muted-foreground">{challenge.progress}%</span>
                                    </div>
                                    <Progress 
                                        value={challenge.progress} 
                                        indicatorClassName={cn(
                                            challenge.status === 'En riesgo' && 'bg-destructive',
                                            challenge.status === 'Completado' && 'bg-green-600'
                                        )}
                                    />
                                </div>
                                <div className="flex justify-between w-full items-center">
                                  <p className="text-xs font-medium text-foreground">{challenge.value}</p>
                                  <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                                      Ver detalles
                                  </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

    