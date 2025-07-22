
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
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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

const progressChartData = [
  { month: 'Ene', value: 10 },
  { month: 'Feb', value: 15 },
  { month: 'Mar', value: 25 },
  { month: 'Abr', value: 30 },
  { month: 'May', value: 38 },
  { month: 'Jun', value: 42 },
];

export default function ObjetivosSmartPage() {
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof smartGoalsData | null>(null);
    
    const handleCategoryClick = (categoryKey: keyof typeof smartGoalsData) => {
        if (selectedCategory === categoryKey) {
            setSelectedCategory(null); // Deselect if clicked again
        } else {
            setSelectedCategory(categoryKey);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 bg-background">
            
            {/* Back Button */}
            <div className="mb-8">
                <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground p-0 h-auto text-xs pl-2">
                    <Link href="/dashboard/mapa-clientes" className="flex items-center gap-2 group">
                        <span className="flex items-center justify-center h-7 w-7 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                        </span>
                        <span className="group-hover:text-primary transition-colors">Volver a Nosotros</span>
                    </Link>
                </Button>
            </div>

            {/* Header */}
            <Card className="relative w-full overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-2xl min-h-[300px] flex flex-col justify-center p-8 md:p-12 mb-12">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              
              <div className="lg:col-span-2">
                {!selectedCategory ? (
                    <Card className="shadow-sm border-none bg-card p-6 flex flex-col justify-between h-full">
                        <div>
                            <CardHeader className="p-0">
                                <CardTitle>Progreso General 2025</CardTitle>
                                <CardDescription>Crecimiento acumulado de objetivos completados.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0 mt-4">
                                <p className="text-4xl font-bold text-primary">+42% Crecimiento</p>
                                <p className="text-sm text-muted-foreground">vs. año anterior</p>
                            </CardContent>
                        </div>
                        <div className="h-48 -ml-6 -mr-2 -mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={progressChartData}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))'
                                    }}
                                    labelClassName="font-bold"
                                    formatter={(value: number) => [`${value}%`, "Progreso"]}
                                />
                                <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorUv)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
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
        </div>
    );
}

    
