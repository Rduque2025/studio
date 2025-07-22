
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
import type { LucideIcon } from 'lucide-react';

const smartGoalsData = {
  S: {
    letter: "S",
    title: "Específico",
    icon: Target,
    description: "Metas claras y bien definidas para guiar nuestras acciones.",
    imageUrl: "https://images.unsplash.com/photo-1597945161640-9366e6d4253b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjb21wYXNzfGVufDB8fHx8MTc1MzIwMDYzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "compass",
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
    imageUrl: "https://images.unsplash.com/photo-1640958899059-7fd295c17aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8bWV0ZXJ8ZW58MHx8fHwxNzUzMjAwMzEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "abstract color",
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
    imageUrl: "https://images.unsplash.com/photo-1556009756-5a06dce4729d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxlc2NhbGVyYXxlbnwwfHx8fDE3NTMxOTcwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "escalera",
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
    imageUrl: "https://images.unsplash.com/photo-1606768666853-403c90a981ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwbGFuZXxlbnwwfHx8fDE3NTMyMDEwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "planets",
    challenges: [
      { icon: Gavel, title: "Cumplimiento Normativo", description: "Garantizar la adecuación continua a la nueva normativa vigente en el sector." },
    ]
  },
  T: {
    letter: "T",
    title: "Temporal",
    icon: Timer,
    description: "Un marco de tiempo definido para la consecución de las metas.",
    imageUrl: "https://images.unsplash.com/photo-1575203091586-611fe505bb0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMnx8Y2xvY2t8ZW58MHx8fHwxNzUzMjAxMjI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "abstract clock",
    challenges: [
       { icon: Calculator, title: "Culminar Proyecto Multicotizador Web", description: "Finalizar y lanzar el multicotizador web para Pólizas de Automóvil y Personas durante el segundo semestre." },
       { icon: PackagePlus, title: "Avanzar en el Plan de Productos", description: "Impulsar el desarrollo de nuevos productos y las actualizaciones de los existentes en el segundo semestre." },
       { icon: Gavel, title: "Adecuación a la Nueva Normativa", description: "Cumplir con los plazos establecidos para la adecuación a la nueva regulación en el segundo semestre." },
    ]
  },
};

type SmartKey = keyof typeof smartGoalsData;

interface SmartGoalCardProps {
  goal: {
    letter: string;
    title: string;
    icon: LucideIcon;
    challenges: any[];
    imageUrl: string;
    dataAiHint: string;
  };
  isActive: boolean;
  onClick: () => void;
}

const SmartGoalCard: React.FC<SmartGoalCardProps> = ({ goal, isActive, onClick }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className={cn(
        "group relative w-full h-80 rounded-2xl p-6 text-left transition-all duration-300 overflow-hidden cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive 
          ? "bg-primary text-primary-foreground shadow-xl scale-105" 
          : "bg-card shadow-md hover:shadow-lg hover:scale-105"
      )}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-grow">
          <p className="text-xl font-bold">{goal.title}</p>
          <p className={cn(
            "text-4xl font-extrabold mt-1 transition-colors",
            isActive ? "text-primary-foreground/30" : "text-muted-foreground/30"
            )}>{goal.letter}</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
          <Button 
            size="sm" 
            variant={isActive ? "secondary" : "default"} 
            className="w-full" 
            tabIndex={-1}
          >
            Explorar
          </Button>
        </div>
      </div>
      <Image
        src={goal.imageUrl}
        alt="Abstract background image"
        layout="fill"
        objectFit="cover"
        className="absolute bottom-0 right-0 z-0 opacity-80 group-hover:scale-110 transition-transform duration-500 ease-in-out"
        data-ai-hint={goal.dataAiHint}
      />
    </div>
  );
};


export default function ObjetivosSmartPage() {
    const [activeTab, setActiveTab] = useState<SmartKey | null>(null);
    const activeGoal = activeTab ? smartGoalsData[activeTab] : null;

    const handleTabClick = (key: SmartKey) => {
      if (activeTab === key) {
        setActiveTab(null); // Deselect if the same tab is clicked again
      } else {
        setActiveTab(key);
      }
    };

    return (
        <div className="container mx-auto py-8 md:py-16 px-4 space-y-12">
            <div className="flex justify-start">
                <Button asChild variant="link" className="text-muted-foreground hover:no-underline p-0 h-auto text-xs">
                    <Link href="/dashboard/mapa-clientes" className="flex items-center gap-2 group">
                       <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                      </span>
                       <span className="opacity-0 group-hover:opacity-100 transition-opacity">Volver a Nosotros</span>
                    </Link>
                </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Nuestros Desafíos Estratégicos</h1>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Los objetivos SMART son una herramienta estratégica que transforma las aspiraciones de una empresa en metas tangibles y funcionales. Al ser Específicos, Medibles, Alcanzables, Relevantes y con un plazo Temporal, proporcionan una claridad absoluta y un enfoque preciso. Esta metodología facilita el seguimiento riguroso del progreso y asegura que cada esfuerzo esté perfectamente alineado con la visión global de la compañía. De este modo, se garantiza que los recursos se utilicen eficientemente para impulsar el éxito corporativo.
                    </p>
                </div>
                 <div className="relative rounded-2xl overflow-hidden shadow-lg h-80 md:h-96">
                    <Image
                        src="https://images.unsplash.com/photo-1516850228053-a807778c4e0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxN3x8Y29oZXRlfGVufDB8fHx8MTc1MzE5OTA4OXww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Equipo trabajando en objetivos"
                        layout="fill"
                        objectFit="cover"
                        className="brightness-90"
                        data-ai-hint="cohete"
                    />
                </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {(Object.keys(smartGoalsData) as SmartKey[]).map((key) => (
                  <SmartGoalCard
                    key={key}
                    goal={smartGoalsData[key]}
                    isActive={activeTab === key}
                    onClick={() => handleTabClick(key)}
                  />
                ))}
              </div>

              {activeGoal && (
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
              )}
            </div>
        </div>
    );
}
