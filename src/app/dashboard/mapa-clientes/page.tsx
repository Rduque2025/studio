'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { 
  TrendingUp,
  UserPlus,
  UserCheck,
  FileClock,
  Calculator,
  Handshake,
  FileCheck2,
  CircleDollarSign,
  Smile,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { mockEmployees } from "@/lib/placeholder-data";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PackagePlus, 
  RefreshCcw, 
  Network, 
  Users, 
  Gauge, 
  ClipboardCheck, 
  Zap, 
  ListChecks, 
  Award, 
  Workflow, 
  GraduationCap, 
  Gem, 
  Gavel 
} from "lucide-react";


const commercialProcessSteps = [
    { number: 1, title: "Por Contactar", description: "Identificación y primer acercamiento con el cliente potencial.", icon: UserPlus },
    { number: 2, title: "Contactado", description: "Se establece comunicación y se presentan los servicios.", icon: UserCheck },
    { number: 3, title: "Esperando Recaudos", description: "Recopilación de la documentación necesaria del cliente.", icon: FileClock },
    { number: 4, title: "En Cotización", description: "Análisis de necesidades y preparación de la propuesta.", icon: Calculator },
    { number: 5, title: "En Negociación", description: "Discusión de términos, coberturas y cierre de acuerdos.", icon: Handshake },
    { number: 6, title: "Emitida", description: "Generación y entrega oficial de la póliza al cliente.", icon: FileCheck2 },
    { number: 7, title: "Cobrada", description: "Confirmación del pago y activación de la cobertura.", icon: CircleDollarSign },
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

const months = Object.keys(monthlyGoalsData) as (keyof typeof monthlyGoalsData)[];

const monthNames: Record<keyof typeof monthlyGoalsData, string> = {
    Ene: 'Enero', Feb: 'Febrero', Mar: 'Marzo', Abr: 'Abril', May: 'Mayo', Jun: 'Junio', Jul: 'Julio', Ago: 'Agosto', Sep: 'Septiembre', Oct: 'Octubre', Nov: 'Noviembre', Dic: 'Diciembre'
};


export default function NosotrosPage() {
  const [selectedMonth, setSelectedMonth] = useState<keyof typeof monthlyGoalsData>('Jun');
  
  const selectedData = monthlyGoalsData[selectedMonth];

  const kpis = [
      { id: 'primas', label: 'Primas Suscritas', icon: TrendingUp, value: selectedData.primas },
      { id: 'clientes', label: 'Clientes Nuevos', icon: UserPlus, value: selectedData.clientes },
      { id: 'cobranza', label: 'Meta de Cobranza', icon: CircleDollarSign, value: selectedData.cobranza },
      { id: 'nps', label: 'NPS (Satisfacción)', icon: Smile, value: selectedData.nps }
  ];

  const statsData = [
    { value: "+32", description: "Años de servicio continuo y confianza." },
    { value: "+200k", description: "Clientes que han depositado su confianza en nosotros." },
    { value: "+100", description: "Clínicas afiliadas a nuestra red a nivel nacional." },
    { value: "+200", description: "Empleados comprometidos con nuestra misión y valores." }
  ];


  return (
    <div className="bg-background">
      <div className="space-y-12">

        <section className="relative h-[600px] w-full group">
          <Link href="/dashboard/objetivos-smart" className="absolute inset-0 z-10" aria-label="Explorar desafíos estratégicos" />
          <Image 
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjb21wYW55fGVufDB8fHx8MTc1MDkwMzI3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Visión de la empresa"
            layout="fill"
            objectFit="cover"
            data-ai-hint="business vision"
            className="brightness-50 group-hover:brightness-[0.4] transition-all"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="container mx-auto absolute inset-0 flex flex-col justify-center items-start text-white p-12 z-20 pointer-events-none">
            <h2 className="text-4xl md:text-6xl font-extrabold max-w-2xl leading-tight">Nuestra Visión para el 2025</h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/90">
              Convertirnos en una compañía con foco en el negocio masivo, con un modelo sostenible de crecimiento rentable. Desarrollando productos de bajo costo dirigidos a la población venezolana que actualmente no tiene acceso a seguros, pero cuenta con ingresos para invertir en su protección básica.
            </p>
             <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-sm font-semibold">
                Explorar Desafíos Estratégicos <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-lg font-semibold text-primary">Proceso</p>
              <h3 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mt-2">
                Nuestra Sistemática Comercial
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {commercialProcessSteps.map(step => (
                <div key={step.number} className="text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary">
                      <step.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">{step.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-16">
              <p className="text-lg font-semibold text-primary">Resultados</p>
              <h3 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mt-2">
                Nuestra Trayectoria en Cifras
              </h3>
              <p className="mt-6 text-muted-foreground text-base leading-relaxed max-w-2xl">
                Con más de tres décadas en el mercado, hemos consolidado una trayectoria de solidez, crecimiento y confianza. Nuestros números reflejan el compromiso con nuestros clientes, aliados y colaboradores, impulsando el bienestar en Venezuela.
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:divide-x md:divide-border/70 space-y-8 md:space-y-0 text-center md:text-left">
              {statsData.map((stat, index) => (
                <div key={index} className="md:px-8 flex-1 first:md:pl-0 last:md:pr-0">
                  <p className="text-5xl lg:text-6xl font-extrabold text-primary mb-3">{stat.value}</p>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container mx-auto text-center px-4">
              <p className="text-lg font-semibold text-primary">Talento</p>
              <h3 className="text-5xl font-extrabold text-foreground tracking-tight mb-12">
                <span className="font-light text-muted-foreground">Conoce a nuestro</span><br/>equipo
              </h3>

              <div className="relative h-[380px] flex items-center justify-center">
                  {mockEmployees.slice(0, 3).map((employee, index) => {
                      const isCenter = index === 1;
                      return (
                          <div
                              key={employee.id}
                              className={cn(
                                  "absolute w-[280px] h-full transition-all duration-500 ease-in-out",
                                  isCenter ? 'z-20' : 'z-10'
                              )}
                              style={{
                                  transform: `translateX(${(index - 1) * 70}%) scale(${isCenter ? 1.05 : 0.9})`,
                                  transformOrigin: 'bottom center'
                              }}
                          >
                              <Card className="w-full h-full overflow-hidden rounded-2xl shadow-2xl group border-0">
                                  <Image
                                      src={employee.imageUrl}
                                      alt={employee.name}
                                      layout="fill"
                                      objectFit="cover"
                                      data-ai-hint={employee.dataAiHint}
                                      className="grayscale group-hover:grayscale-0 transition-all duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                  <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                      <CardTitle className="text-2xl font-bold uppercase tracking-wider">{employee.name}</CardTitle>
                                      <CardDescription className="text-white/80 lowercase">{employee.role}</CardDescription>
                                  </CardContent>
                              </Card>
                          </div>
                      )
                  })}
              </div>

              <div className="mt-12 text-center">
                  <Button asChild size="lg">
                      <Link href="/dashboard/equipo">
                          Ver todo el equipo <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
              </div>
          </div>
        </section>

        <section className="min-h-screen flex flex-col justify-center">
            <Card className="max-w-4xl mx-auto w-full bg-card shadow-lg rounded-2xl">
                <CardHeader className="text-center p-8">
                    <CardTitle className="text-3xl font-bold tracking-tight">Indicadores Clave de Progreso</CardTitle>
                    <CardDescription className="flex justify-center items-center mt-2">
                        Mostrando resultados para:
                        <Select value={selectedMonth} onValueChange={(value) => setSelectedMonth(value as keyof typeof monthlyGoalsData)}>
                            <SelectTrigger className="w-auto inline-flex ml-2 border-0 shadow-none bg-transparent h-auto p-1 text-base font-semibold text-primary">
                                <SelectValue placeholder="Seleccionar mes" />
                            </SelectTrigger>
                            <SelectContent>
                                {months.map((month) => (
                                    <SelectItem key={month} value={month}>{monthNames[month]}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 md:p-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {kpis.map((kpi) => (
                            <Card key={kpi.id} className="p-6 text-center bg-background border-border/60 shadow-sm">
                                <p className="text-4xl font-bold text-foreground">{kpi.value}<span className="text-2xl text-muted-foreground">%</span></p>
                                <p className="text-sm text-muted-foreground mt-2 font-medium">{kpi.label}</p>
                            </Card>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="justify-center p-6 border-t border-border/20">
                    <Button asChild>
                        <Link href="/dashboard/objetivos">
                            Ver Gráficos Detallados <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </section>

      </div>
    </div>
  );
}