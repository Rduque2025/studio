
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Calculator 
} from "lucide-react";
import { cn } from '@/lib/utils';

const smartGoalsData = {
  S: {
    letter: "S",
    title: "Específico",
    description: "Metas claras y bien definidas para guiar nuestras acciones.",
    color: "bg-[#543db8]",
    textColor: "text-white",
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
    description: "Indicadores clave para cuantificar y seguir nuestro progreso.",
    color: "bg-[#003c71]",
    textColor: "text-white",
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
    description: "Objetivos realistas que podemos lograr con nuestros recursos.",
    color: "bg-[#1a61ab]",
    textColor: "text-white",
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
    description: "Metas alineadas con nuestra visión y el impacto en el negocio.",
    color: "bg-[#3f94cd]",
    textColor: "text-white",
    challenges: [
      { icon: Gavel, title: "Cumplimiento Normativo", description: "Garantizar la adecuación continua a la nueva normativa vigente en el sector." },
    ]
  },
  T: {
    letter: "T",
    title: "Temporal",
    description: "Un marco de tiempo definido para la consecución de las metas.",
    color: "bg-[#59d1ff]",
    textColor: "text-white",
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
                <Button asChild variant="link" className="text-muted-foreground hover:no-underline p-0 h-auto text-sm">
                    <Link href="/dashboard/mapa-clientes" className="flex items-center gap-2 group">
                       <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                      </span>
                      Volver a Nosotros
                    </Link>
                </Button>
            </div>
            
            <div className="text-left mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Nuestros Desafíos Estratégicos</h1>
                <p className="text-muted-foreground mt-4 text-base md:text-lg max-w-3xl">
                  Organizados bajo la metodología S.M.A.R.T. para asegurar que nuestras metas sean Específicas, Medibles, Alcanzables, Relevantes y Temporales.
                </p>
            </div>

            <div className="border-b mb-12">
                <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-px">
                    {Object.keys(smartGoalsData).map((key) => {
                        const goal = smartGoalsData[key as SmartKey];
                        return (
                            <button 
                                key={key} 
                                onClick={() => setActiveTab(key as SmartKey)}
                                className={cn(
                                    "px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2",
                                    activeTab === key
                                        ? "border-primary text-primary"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {goal.title}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                    <span className="text-primary">{activeGoal.letter}</span> — {activeGoal.title}
                </h2>
                <p className="text-muted-foreground text-base max-w-2xl">{activeGoal.description}</p>
                
                <div className="pt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeGoal.challenges.map((challenge, index) => (
                        <Card key={index} className="border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300 bg-card/50 flex items-start gap-4 p-4">
                            <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0 mt-1">
                                <challenge.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold leading-tight">{challenge.title}</h3>
                                <p className="text-xs text-muted-foreground mt-1">{challenge.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
