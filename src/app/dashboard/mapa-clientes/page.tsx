
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


const commercialProcessSteps = [
    { number: 1, title: "Por Contactar", description: "Identificación y primer acercamiento con el cliente potencial.", icon: UserPlus, color: "text-red-500", bgColor: "bg-red-100" },
    { number: 2, title: "Contactado", description: "Se establece comunicación y se presentan los servicios.", icon: UserCheck, color: "text-orange-500", bgColor: "bg-orange-100" },
    { number: 3, title: "Esperando Recaudos", description: "Recopilación de la documentación necesaria del cliente.", icon: FileClock, color: "text-amber-500", bgColor: "bg-amber-100" },
    { number: 4, title: "En Cotización", description: "Análisis de necesidades y preparación de la propuesta.", icon: Calculator, color: "text-yellow-500", bgColor: "bg-yellow-100" },
    { number: 5, title: "En Negociación", description: "Discusión de términos, coberturas y cierre de acuerdos.", icon: Handshake, color: "text-lime-500", bgColor: "bg-lime-100" },
    { number: 6, title: "Emitida", description: "Generación y entrega oficial de la póliza al cliente.", icon: FileCheck2, color: "text-green-500", bgColor: "bg-green-100" },
    { number: 7, title: "Cobrada", description: "Confirmación del pago y activación de la cobertura.", icon: CircleDollarSign, color: "text-emerald-500", bgColor: "bg-emerald-100" },
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
  
  const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(1);

  const handlePrevEmployee = () => {
      setCurrentEmployeeIndex(prev => (prev === 0 ? mockEmployees.length - 1 : prev - 1));
  };
  const handleNextEmployee = () => {
      setCurrentEmployeeIndex(prev => (prev === mockEmployees.length - 1 ? 0 : prev + 1));
  };

  const getCardStyle = (index: number) => {
    const offset = (index - currentEmployeeIndex + mockEmployees.length) % mockEmployees.length;
    if (offset === 0) { // Center
      return { transform: 'scale(1.05) translateY(-10px)', zIndex: 3, opacity: 1 };
    }
    if (offset === 1) { // Right
      return { transform: 'translateX(50%) scale(0.9)', zIndex: 2, opacity: 0.7 };
    }
    if (offset === mockEmployees.length - 1) { // Left
      return { transform: 'translateX(-50%) scale(0.9)', zIndex: 2, opacity: 0.7 };
    }
    return { transform: `translateX(${(offset - 1.5) * 50}%) scale(0.8)`, zIndex: 1, opacity: 0 };
  };


  return (
    <div className="bg-background">
      <div className="space-y-24">

        <section className="relative h-[600px] w-full group cursor-pointer">
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
        
        <section className="bg-muted/60 py-16 md:py-24 my-12">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-foreground tracking-tight">Nuestra Sistemática Comercial</h3>
              <p className="text-muted-foreground mt-3 text-lg max-w-2xl mx-auto">El flujo de nuestro proceso de ventas, desde el contacto inicial hasta el cierre.</p>
            </div>
            <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2"></div>
                <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8">
                    {commercialProcessSteps.map((step) => (
                    <div key={step.number} className="text-center p-4 rounded-xl bg-background shadow-md border">
                        <div className="flex justify-center mb-4">
                        <div className={cn("w-16 h-16 flex items-center justify-center rounded-full shadow-inner border-4 border-background", step.bgColor)}>
                            <step.icon className={cn("h-7 w-7", step.color)} />
                        </div>
                        </div>
                        <h4 className="font-bold text-sm mb-1 h-10 flex items-center justify-center">{step.title}</h4>
                    </div>
                    ))}
                </div>
            </div>
          </div>
        </section>

       <section className="container mx-auto">
           <Card className="bg-card/50 border-none">
            <CardContent className="p-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                      <p className="text-6xl font-extrabold text-primary">+32</p>
                      <p className="text-sm text-muted-foreground mt-2 font-medium">Años de servicio</p>
                  </div>
                  <div>
                      <p className="text-6xl font-extrabold text-primary">+200k</p>
                      <p className="text-sm text-muted-foreground mt-2 font-medium">Clientes satisfechos</p>
                  </div>
                  <div>
                      <p className="text-6xl font-extrabold text-primary">+100</p>
                      <p className="text-sm text-muted-foreground mt-2 font-medium">Clínicas aliadas</p>
                  </div>
                  <div>
                      <p className="text-6xl font-extrabold text-primary">+200</p>
                      <p className="text-sm text-muted-foreground mt-2 font-medium">Empleados</p>
                  </div>
              </div>
            </CardContent>
           </Card>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container mx-auto text-center">
              <p className="text-lg font-semibold text-primary">Conoce a nuestro</p>
              <h3 className="text-5xl font-extrabold text-foreground tracking-tight mb-12">equipo</h3>

              <div className="relative h-[450px] max-w-3xl mx-auto flex items-center justify-center">
                  {mockEmployees.slice(0, 3).map((employee, index) => {
                      const isCenter = index === 1;
                      return (
                          <div
                              key={employee.id}
                              className={cn(
                                  "absolute w-[280px] h-[380px] transition-all duration-500 ease-in-out",
                                  isCenter ? 'z-10' : 'z-0'
                              )}
                              style={{
                                  transform: `translateX(${(index - 1) * 60}%) scale(${isCenter ? 1 : 0.85})`,
                                  transformOrigin: 'bottom center'
                              }}
                          >
                              <Card className="w-full h-full overflow-hidden rounded-2xl shadow-2xl group">
                                  <Image
                                      src={employee.imageUrl}
                                      alt={employee.name}
                                      layout="fill"
                                      objectFit="cover"
                                      data-ai-hint={employee.dataAiHint}
                                      className="grayscale group-hover:grayscale-0 transition-all duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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

        <section className="min-h-screen flex flex-col justify-center my-12">
            <Card className="max-w-4xl mx-auto w-full bg-muted/60 border-none shadow-lg rounded-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold tracking-tight">Indicadores Clave de Progreso</CardTitle>
                    <CardDescription className="flex justify-center items-center">
                        Mostrando resultados para:
                        <Select value={selectedMonth} onValueChange={(value) => setSelectedMonth(value as keyof typeof monthlyGoalsData)}>
                            <SelectTrigger className="w-auto inline-flex ml-2 border-0 shadow-none bg-transparent h-auto p-1 text-base">
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
