
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
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
  Timer
} from "lucide-react";
import { cn } from '@/lib/utils';

const smartGoalsData = {
  S: {
    letter: "S",
    title: "Específico",
    icon: Target,
    description: "Metas claras y bien definidas para guiar nuestras acciones.",
    challenges: [
      { icon: PackagePlus, title: "Innovación en Productos y Tecnología", description: "Desarrollar productos, procesos y tecnología para mejorar la atención y ventas." },
      { icon: RefreshCcw, title: "Sistemática Comercial", description: "Reimplantar y optimizar la sistemática comercial para impulsar los resultados." },
      { icon: Network, title: "Modernización de TI", description: "Actualizar nuestra arquitectura de tecnología de la información para soportar el crecimiento." },
      { icon: Users, title: "Visión Cliente Céntrico como Foco", description: "Colocar al cliente en el centro de todas nuestras estrategias y operaciones." },
    ]
  },
  M: {
    letter: "M",
    title: "Medible",
    icon: Scaling,
    description: "Indicadores clave para cuantificar y seguir nuestro progreso.",
    challenges: [
      { icon: TrendingUp, title: "Crecimiento Rentable y Sostenible", description: "Asegurar un crecimiento rentable y sostenible del volumen de negocios." },
      { icon: Gauge, title: "Eficiencia Operativa", description: "Aumentar la eficiencia en todos nuestros procesos operativos." },
      { icon: TrendingUp, title: "Logro del Volumen de Negocio", description: "Alcanzar las metas de negocio suscrito y cobrado." },
      { icon: ClipboardCheck, title: "Gestión Efectiva de Proyectos", description: "Implementar y seguir una metodología de gestión de proyectos que asegure resultados." },
      { icon: Zap, title: "Enfoque en Temas Críticos con Urgencia", description: "Identificar y abordar los asuntos críticos para el negocio con agilidad y sentido de urgencia." },
      { icon: ListChecks, title: "Mayor Efectividad en Control y Seguimiento", description: "Mejorar los mecanismos de control y seguimiento de los indicadores y proyectos clave." },
    ]
  },
  A: {
    letter: "A",
    title: "Alcanzable",
    icon: Goal,
    description: "Objetivos realistas que podemos lograr con nuestros recursos.",
    challenges: [
      { icon: Award, title: "Cultura de Alto Desempeño", description: "Fomentar una cultura organizacional orientada a la excelencia y el alto rendimiento." },
      { icon: Workflow, title: "Sinergia de Funciones Corporativas", description: "Mejorar la colaboración y sinergia entre las áreas y con BBU." },
      { icon: GraduationCap, title: "Desarrollo del Talento", description: "Potenciar las capacidades y el crecimiento profesional de nuestro equipo." },
      { icon: Gem, title: "Fortalecimiento de Valores, Ética y Cultura", description: "Vivir y promover activamente nuestros valores, la ética y una cultura organizacional sólida." },
    ]
  },
  R: {
    letter: "R",
    title: "Relevante",
    icon: Sparkles,
    description: "Metas alineadas con nuestra visión y el impacto en el negocio.",
    challenges: [
      { icon: Gavel, title: "Cumplimiento Normativo", description: "Garantizar la adecuación continua a la nueva normativa vigente en el sector." },
    ]
  },
  T: {
    letter: "T",
    title: "Temporal",
    icon: Timer,
    description: "Un marco de tiempo definido para la consecución de las metas.",
    challenges: [
       { icon: Calculator, title: "Culminar Proyecto Multicotizador Web", description: "Finalizar y lanzar el multicotizador web para Pólizas de Automóvil y Personas durante el segundo semestre." },
       { icon: PackagePlus, title: "Avanzar en el Plan de Productos", description: "Impulsar el desarrollo de nuevos productos y las actualizaciones de los existentes en el segundo semestre." },
       { icon: Gavel, title: "Adecuación a la Nueva Normativa", description: "Cumplir con los plazos establecidos para la adecuación a la nueva regulación en el segundo semestre." },
    ]
  },
};

type SmartKey = keyof typeof smartGoalsData;

export default function ObjetivosSmartPage() {
    const [activeTab, setActiveTab] = useState<SmartKey>('S');
    const activeGoal = smartGoalsData[activeTab];

    return (
        <div className="container mx-auto py-8 md:py-16 px-4">
            <div className="mb-8 flex justify-start">
                <Button asChild variant="link" className="text-muted-foreground hover:no-underline p-0 h-auto text-xs">
                    <Link href="/dashboard/mapa-clientes" className="flex items-center gap-2 group">
                       <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                      </span>
                      Volver a Nosotros
                    </Link>
                </Button>
            </div>
            
            <Card className="shadow-lg rounded-2xl overflow-hidden">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxvZmZpY2UlMjBtZWV0aW5nfGVufDB8fHx8MTc1MzE5MzYyM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Equipo trabajando en objetivos"
                  layout="fill"
                  objectFit="cover"
                  className="brightness-50"
                  data-ai-hint="office brainstorming"
                />
                <div className="relative p-8 md:p-12 text-white">
                    <h2 className="text-3xl font-bold tracking-tight">Nuestros Desafíos Estratégicos</h2>
                    <p className="max-w-xl mt-2 text-white/90">
                      Organizados bajo la metodología S.M.A.R.T. para asegurar que nuestras metas sean claras y alcanzables.
                    </p>
                </div>
              </div>
              <CardContent className="p-6 md:p-8 space-y-8">
                {/* Grid of categories */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {(Object.keys(smartGoalsData) as SmartKey[]).map((key) => {
                    const goal = smartGoalsData[key];
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={cn(
                          "group rounded-xl p-4 text-left transition-all duration-200",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          activeTab === key ? "bg-primary/10" : "bg-muted/50 hover:bg-muted"
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <div className={cn(
                            "p-2 rounded-lg bg-background group-hover:bg-white transition-colors",
                             activeTab === key && "bg-primary text-primary-foreground"
                          )}>
                             <goal.icon className={cn("h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors", activeTab === key && "text-primary-foreground")} />
                          </div>
                          <span className={cn(
                            "text-xs font-medium px-2 py-1 rounded-full",
                             activeTab === key ? "bg-primary text-primary-foreground" : "bg-background"
                          )}>
                            {goal.challenges.length}
                          </span>
                        </div>
                        <div className="mt-4">
                          <p className="font-semibold text-sm text-foreground">{goal.title}</p>
                          <p className="text-xs text-muted-foreground">{goal.letter}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Details of selected category */}
                <div className="space-y-4 pt-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      <span className="text-primary">{activeGoal.letter}</span> — {activeGoal.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{activeGoal.description}</p>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                      {activeGoal.challenges.map((challenge, index) => (
                          <div key={index} className="flex items-start gap-4 p-3 bg-muted/30 rounded-lg">
                              <div className="p-2.5 bg-background rounded-md flex-shrink-0 mt-1 shadow-sm border">
                                  <challenge.icon className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                  <p className="text-sm font-medium leading-tight text-foreground">{challenge.title}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{challenge.description}</p>
                              </div>
                          </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
    );
}
