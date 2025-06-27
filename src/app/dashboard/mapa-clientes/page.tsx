
'use client';

import React, { useState } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { 
  TrendingUp,
  PackagePlus,
  Award,
  RefreshCcw,
  Gauge,
  Network,
  Gavel,
  Users,
  Hospital,
  Car,
  Briefcase,
  UserPlus,
  UserCheck,
  FileClock,
  Calculator,
  Handshake,
  FileCheck2,
  CircleDollarSign,
  Smile,
  ClipboardCheck,
  Zap,
  ListChecks,
  Workflow,
  GraduationCap,
  Gem
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { mockEmployees, teamDepartments } from "@/lib/placeholder-data";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const commercialProcessSteps = [
    { title: "Por Contactar", icon: UserPlus },
    { title: "Contactado", icon: UserCheck },
    { title: "Esperando Recaudos", icon: FileClock },
    { title: "En Cotización", icon: Calculator },
    { title: "En Negociación", icon: Handshake },
    { title: "Emitida", icon: FileCheck2 },
    { title: "Cobrada", icon: CircleDollarSign },
];

const monthlyGoalsData = {
  Ene: { primas: 8, clientes: 15, cobranza: 6, nps: 88 },
  Feb: { primas: 16, clientes: 30, cobranza: 12, nps: 89 },
  Mar: { primas: 24, clientes: 47, cobranza: 18, nps: 90 },
  Abr: { primas: 32, clientes: 55, cobranza: 25, nps: 91 },
  May: { primas: 40, clientes: 62, cobranza: 33, nps: 91 },
  Jun: { primas: 50, clientes: 68, cobranza: 42, nps: 92 },
  Jul: { primas: 0, clientes: 0, cobranza: 0, nps: 0 },
  Ago: { primas: 0, clientes: 0, cobranza: 0, nps: 0 },
  Sep: { primas: 0, clientes: 0, cobranza: 0, nps: 0 },
  Oct: { primas: 0, clientes: 0, cobranza: 0, nps: 0 },
  Nov: { primas: 0, clientes: 0, cobranza: 0, nps: 0 },
  Dic: { primas: 0, clientes: 0, cobranza: 0, nps: 0 },
};

const monthlyMetaTarget = {
  Ene: 10,
  Feb: 19,
  Mar: 22,
  Abr: 33,
  May: 44,
  Jun: 49,
  Jul: 60,
  Ago: 70,
  Sep: 80,
  Oct: 88,
  Nov: 95,
  Dic: 100,
};

const months = Object.keys(monthlyGoalsData) as (keyof typeof monthlyGoalsData)[];

const monthNames: Record<keyof typeof monthlyGoalsData, string> = {
    Ene: 'Enero', Feb: 'Febrero', Mar: 'Marzo', Abr: 'Abril', May: 'Mayo', Jun: 'Junio', Jul: 'Julio', Ago: 'Agosto', Sep: 'Septiembre', Oct: 'Octubre', Nov: 'Noviembre', Dic: 'Diciembre'
};

const smartGoalsData = {
  S: {
    letter: "S",
    title: "Específico",
    description: "Metas claras y bien definidas para guiar nuestras acciones.",
    color: "bg-[#003c71]",
    textColor: "text-[#003c71]",
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
    color: "bg-[#3A568F]",
    textColor: "text-[#3A568F]",
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
    color: "bg-[#6366AF]",
    textColor: "text-[#6366AF]",
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
    color: "bg-[#8D76C7]",
    textColor: "text-[#8D76C7]",
    challenges: [
      { icon: Gavel, title: "Cumplimiento Normativo", description: "Garantizar la adecuación continua a la nueva normativa vigente en el sector." },
    ]
  },
  T: {
    letter: "T",
    title: "Temporal",
    description: "Un marco de tiempo definido para la consecución de las metas.",
    color: "bg-[#B788D5]",
    textColor: "text-[#B788D5]",
    challenges: [
       { icon: Calculator, title: "Culminar Proyecto Multicotizador Web", description: "Finalizar y lanzar el multicotizador web para Pólizas de Automóvil y Personas durante el segundo semestre." },
       { icon: PackagePlus, title: "Avanzar en el Plan de Productos", description: "Impulsar el desarrollo de nuevos productos y las actualizaciones de los existentes en el segundo semestre." },
       { icon: Gavel, title: "Adecuación a la Nueva Normativa", description: "Cumplir con los plazos establecidos para la adecuación a la nueva regulación en el segundo semestre." },
    ]
  },
};

type SmartKey = keyof typeof smartGoalsData;


export default function NosotrosPage() {
  const [selectedMonth, setSelectedMonth] = useState<keyof typeof monthlyGoalsData>('Jun');
  const [activeSmartGoal, setActiveSmartGoal] = useState<SmartKey | null>(null);
  const selectedData = monthlyGoalsData[selectedMonth];

  const kpis = [
      { id: 'primas', label: 'Primas Suscritas', icon: TrendingUp, value: selectedData.primas },
      { id: 'clientes', label: 'Clientes Nuevos', icon: UserPlus, value: selectedData.clientes },
      { id: 'cobranza', label: 'Meta de Cobranza', icon: CircleDollarSign, value: selectedData.cobranza },
      { id: 'nps', label: 'NPS (Satisfacción)', icon: Smile, value: selectedData.nps }
  ];

  const getProgressColor = (progress: number): string => {
    if (progress >= 90) return '#22c55e'; // Green for 90%+
    if (progress >= 50) return '#f59e0b'; // Amber/Yellow for 50-89%
    return 'hsl(var(--destructive))';    // Red for < 50%
  };

  const lineChartData = months.map(month => ({
    name: month,
    "Progreso Primas": monthlyGoalsData[month].primas,
    "Meta": monthlyMetaTarget[month],
  }));

  const handleChartClick = (data: any) => {
    if (data && data.activeLabel) {
      const monthKey = data.activeLabel as keyof typeof monthlyGoalsData;
      if (months.includes(monthKey)) {
        setSelectedMonth(monthKey);
      }
    }
  };


  return (
    <div className="container mx-auto py-8 px-4">
      <SectionWrapper>
        <div className="space-y-12 mt-6">
          <Card className="overflow-hidden shadow-lg rounded-xl">
            <CardHeader className="p-0">
              <div className="relative w-full h-64 md:h-80">
                <Image 
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjb21wYW55fGVufDB8fHx8MTc1MDkwMzI3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Visión de la empresa"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="business vision"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                   <h2 className="text-4xl md:text-5xl font-bold text-white">Nuestra Visión para el 2025</h2>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 md:p-10 text-sm">
                <p className="mb-6 text-muted-foreground leading-relaxed">
                    Convertirnos en una compañía con foco en el negocio masivo, con un modelo sostenible de crecimiento rentable. Desarrollando productos de bajo costo dirigidos a la población venezolana que actualmente no tiene acceso a seguros, pero cuenta con ingresos para invertir en su protección básica.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    Seguir mejorando nuestros productos para empresas, ofreciendo coberturas y tarifas competitivas que cumplan sus necesidades de protección. Además, nos enfocaremos en agilizar la entrega de nuestros servicios para satisfacer sus expectativas de tiempo.
                </p>
            </CardContent>
          </Card>

          <Card className="shadow-none border-none rounded-xl">
            <CardContent className="p-4 md:p-8">
              <div className="flex flex-col md:flex-row items-stretch gap-4">
                <div className={cn(
                    "flex md:flex-col gap-2 transition-all duration-300 ease-in-out",
                    !activeSmartGoal && "grid w-full grid-cols-2 sm:grid-cols-5",
                    activeSmartGoal && "flex-row md:flex-col md:w-auto"
                )}>
                    {Object.keys(smartGoalsData).map((key) => {
                        const goal = smartGoalsData[key as SmartKey];
                        const isActive = activeSmartGoal === goal.letter;
                        const isAnyActive = !!activeSmartGoal;

                        return (
                            <button
                                key={goal.letter}
                                onClick={() => {
                                    if (activeSmartGoal === goal.letter) {
                                        setActiveSmartGoal(null);
                                    } else {
                                        setActiveSmartGoal(goal.letter as SmartKey);
                                    }
                                }}
                                className={cn(
                                    "p-4 rounded-lg text-white text-left transition-all duration-300 flex flex-col",
                                    goal.color,
                                    !isActive && 'hover:shadow-lg hover:-translate-y-1',
                                    isActive && 'shadow-xl scale-105',
                                    isAnyActive ? 
                                        (isActive ? 
                                            "h-48 justify-between md:w-48" :
                                            "h-20 justify-center items-center text-center p-2 w-full md:w-20"
                                        ) 
                                    : "h-48 justify-between"
                                )}
                            >
                                <div className={cn(isAnyActive && !isActive && 'hidden')}>
                                    <p className="text-sm font-semibold">{goal.title}</p>
                                    <p className="text-xs text-white/80 mt-1">{goal.description}</p>
                                </div>
                                <p className={cn(
                                    "font-extrabold opacity-80",
                                    isAnyActive && !isActive ? 'text-4xl self-center' : 'text-6xl self-end'
                                )}>
                                    {goal.letter}
                                </p>
                            </button>
                        );
                    })}
                </div>

                {activeSmartGoal && (
                    <div className="flex-1 p-6 rounded-lg min-h-[350px] animate-in fade-in-0 duration-500">
                        <ul className="space-y-4">
                            {smartGoalsData[activeSmartGoal].challenges.map((challenge, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className={cn("flex-shrink-0 p-3 rounded-full", smartGoalsData[activeSmartGoal].color)}>
                                        <challenge.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-foreground text-sm">{challenge.title}</h5>
                                        <p className="text-muted-foreground text-xs">{challenge.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-none rounded-xl">
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="p-8 md:p-10 text-left hover:no-underline [&[data-state=open]>svg]:text-primary">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-primary">
                                Gráfico de Tendencia de Metas
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Pulse para ver/ocultar el progreso mensual de Primas Suscritas.
                            </p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="px-8 md:px-10 pb-8 pt-0">
                            <div className="w-full h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart
                                    data={lineChartData}
                                    onClick={handleChartClick}
                                    margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                                  >
                                    <defs>
                                      <linearGradient id="colorProgreso" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                      </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis 
                                      dataKey="name" 
                                      stroke="hsl(var(--muted-foreground))" 
                                      fontSize={12} 
                                      tickLine={false}
                                      axisLine={false}
                                    />
                                    <YAxis 
                                      stroke="hsl(var(--muted-foreground))" 
                                      fontSize={12} 
                                      unit="%" 
                                      tickLine={false}
                                      axisLine={false}
                                    />
                                    <Tooltip
                                      cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 2, strokeDasharray: '3 3' }}
                                      contentStyle={{
                                          backgroundColor: 'hsl(var(--background))',
                                          borderColor: 'hsl(var(--border))',
                                          borderRadius: 'var(--radius)',
                                      }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="Meta" 
                                        stroke="hsl(var(--muted-foreground))" 
                                        strokeWidth={2}
                                        strokeDasharray="5 5" 
                                        dot={false}
                                        activeDot={false}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="Progreso Primas" 
                                        stroke="hsl(var(--primary))" 
                                        strokeWidth={2.5}
                                        fillOpacity={1}
                                        fill="url(#colorProgreso)"
                                        activeDot={{ r: 6, style: { fill: 'hsl(var(--primary))' } }}
                                        dot={(props) => {
                                            const { cx, cy, payload } = props;
                                            if (payload.name === selectedMonth) {
                                                return <circle key={payload.name} cx={cx} cy={cy} r={6} fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth={2} />;
                                            }
                                            return null;
                                        }}
                                    />
                                  </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
             <CardContent className="p-8 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {kpis.map((kpi) => {
                    const data = [
                        { name: 'value', value: kpi.value },
                        { name: 'remaining', value: 100 - kpi.value },
                    ];
                    const chartColor = getProgressColor(kpi.value);

                    return (
                        <div key={kpi.id} className="flex flex-col items-center text-center">
                            <div className="relative w-36 h-36">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius="70%"
                                            outerRadius="100%"
                                            dataKey="value"
                                            startAngle={90}
                                            endAngle={-270}
                                            paddingAngle={0}
                                            stroke="none"
                                        >
                                            <Cell fill={chartColor} className="focus:outline-none" />
                                            <Cell fill="hsl(var(--muted))" className="focus:outline-none" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-foreground">{kpi.value}%</span>
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <p className="font-semibold text-foreground flex items-center justify-center gap-2">
                                    <kpi.icon className="h-5 w-5" style={{ color: chartColor }} />
                                    {kpi.label}
                                </p>
                            </div>
                        </div>
                    );
                })}
                </div>
            </CardContent>
          </Card>

            <Card className="shadow-lg rounded-xl overflow-hidden">
                <div className="grid md:grid-cols-5">
                    <div className="md:col-span-2 bg-foreground text-background p-8 md:p-12 flex flex-col justify-center">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            Nuestra Trayectoria en Cifras
                        </h3>
                        <p className="text-sm text-background/80 leading-relaxed">
                            Más de tres décadas de compromiso y confianza nos respaldan. Conozca los números que reflejan nuestra solidez y el impacto que generamos en la vida de miles de venezolanos.
                        </p>
                    </div>
                    <div className="md:col-span-3 bg-background p-8 md:p-12">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="flex flex-col items-center justify-center text-center aspect-square rounded-full bg-gradient-to-br from-chart-2 to-chart-5 text-primary-foreground p-4 shadow-lg transition-transform hover:scale-105">
                                <p className="text-4xl lg:text-5xl font-bold">+32</p>
                                <p className="text-xs lg:text-sm mt-1">Años de servicio</p>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center aspect-square rounded-full bg-gradient-to-br from-emerald-500 to-green-400 text-primary-foreground p-4 shadow-lg transition-transform hover:scale-105">
                                 <p className="text-4xl lg:text-5xl font-bold">+200k</p>
                                <p className="text-xs lg:text-sm mt-1">Clientes satisfechos</p>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center aspect-square rounded-full bg-gradient-to-br from-amber-500 to-yellow-400 text-foreground p-4 shadow-lg transition-transform hover:scale-105">
                                 <p className="text-4xl lg:text-5xl font-bold">+100</p>
                                <p className="text-xs lg:text-sm mt-1">Clínicas aliadas</p>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center aspect-square rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-primary-foreground p-4 shadow-lg transition-transform hover:scale-105">
                                 <p className="text-4xl lg:text-5xl font-bold">+200</p>
                                <p className="text-xs lg:text-sm mt-1">Empleados</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

           <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-primary text-center">
                Nuestra Sistemática Comercial
              </CardTitle>
              <CardDescription className="text-muted-foreground text-center">
                El flujo de nuestro proceso de ventas, desde el contacto inicial hasta el cierre.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <ScrollArea className="w-full">
                <div className="flex items-start py-4 px-2 min-w-max">
                  {commercialProcessSteps.map((step, index) => (
                    <React.Fragment key={step.title}>
                      <div className="flex flex-col items-center text-center w-28 shrink-0">
                        <div className="flex items-center justify-center w-20 h-20 bg-card rounded-full text-primary shadow-lg border hover:shadow-xl transition-shadow duration-300">
                          <step.icon className="h-8 w-8" />
                        </div>
                        <p className="mt-2 text-xs font-semibold">{step.title}</p>
                      </div>
                      {index < commercialProcessSteps.length - 1 && (
                        <div className="flex-1 flex items-center mt-10 shrink-0 px-2">
                          <div className="w-full h-px bg-border" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-primary text-center">
                Nuestro Equipo
              </CardTitle>
               <CardDescription className="text-muted-foreground text-center">
                  Conozca a los profesionales que impulsan nuestra visión.
               </CardDescription>
            </CardHeader>
            <CardContent className="p-8 md:p-10">
              <Tabs defaultValue={teamDepartments[0].id} className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-auto">
                  {teamDepartments.map((dept) => (
                    <TabsTrigger key={dept.id} value={dept.id}>{dept.name}</TabsTrigger>
                  ))}
                </TabsList>
                {teamDepartments.map((dept) => (
                  <TabsContent key={dept.id} value={dept.id}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                      {mockEmployees
                        .filter((employee) => employee.department === dept.name)
                        .map((employee) => (
                          <div key={employee.id} className="flex flex-col items-center text-center p-4 border rounded-lg bg-card transition-shadow hover:shadow-md">
                            <Avatar className="h-20 w-20 mb-4">
                              <AvatarImage src={employee.imageUrl} alt={employee.name} data-ai-hint={employee.dataAiHint} />
                              <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="font-semibold text-foreground">{employee.name}</p>
                            <p className="text-sm text-muted-foreground">{employee.role}</p>
                          </div>
                        ))}
                         {mockEmployees.filter((employee) => employee.department === dept.name).length === 0 && (
                            <p className="col-span-full text-center text-muted-foreground mt-4">No hay empleados en este departamento.</p>
                        )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    </div>
  );
}
