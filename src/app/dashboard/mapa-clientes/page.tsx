
"use client";

import React, { useMemo, useEffect, useState, use } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileCheck, Smile, UserPlus, TrendingUp, Target, Activity, Percent, ArrowUp, ArrowDown } from 'lucide-react';
import { Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { cn } from "@/lib/utils"; // Import cn

const keyMetricsData = {
  totalClientes: 25789,
  polizasActivas: 32050,
  npsActual: 75,
  nuevosClientesMes: 312,
};

const logroCobradoData = [
  { month: "Ene", real: 450000, meta: 400000 },
  { month: "Feb", real: 480000, meta: 420000 },
  { month: "Mar", real: 510000, meta: 450000 },
  { month: "Abr", real: 490000, meta: 460000 },
  { month: "May", real: 530000, meta: 480000 },
  { month: "Jun", real: 550000, meta: 500000 },
];

const logroSuscritoData = [
  { month: "Ene", real: 600000, meta: 550000 },
  { month: "Feb", real: 620000, meta: 570000 },
  { month: "Mar", real: 650000, meta: 600000 },
  { month: "Abr", real: 630000, meta: 610000 },
  { month: "May", real: 670000, meta: 630000 },
  { month: "Jun", real: 700000, meta: 650000 },
];

const npsTrendData = [
  { month: "Ene", nps: 68 },
  { month: "Feb", nps: 70 },
  { month: "Mar", nps: 72 },
  { month: "Abr", nps: 71 },
  { month: "May", nps: 74 },
  { month: "Jun", nps: 75 },
];

const siniestralidadData = [
  { month: "Ene", indice: 55 },
  { month: "Feb", indice: 52 },
  { month: "Mar", indice: 50 },
  { month: "Abr", indice: 53 },
  { month: "May", indice: 49 },
  { month: "Jun", indice: 48 },
];

const cobradoChartConfig = {
  real: { label: "Cobrado Real", color: "hsl(var(--chart-1))" },
  meta: { label: "Meta Cobrado", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const suscritoChartConfig = {
  real: { label: "Suscrito Real", color: "hsl(var(--chart-1))" },
  meta: { label: "Meta Suscrito", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const npsChartConfig = {
  nps: { label: "NPS", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

const siniestralidadChartConfig = {
    indice: { label: "Índice de Siniestralidad (%)", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  description?: string;
  isPercentage?: boolean;
  percentageChange?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, description, isPercentage, percentageChange }) => {
  const [formattedValue, setFormattedValue] = useState<string | number>(value);

  useEffect(() => {
    if (typeof value === 'number' && !isPercentage) {
      setFormattedValue(value.toLocaleString());
    } else if (typeof value === 'number' && isPercentage) {
      setFormattedValue(`${value}%`);
    } else {
      setFormattedValue(value);
    }
  }, [value, isPercentage]);

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1.5">
          <div className="text-2xl font-bold text-primary">{formattedValue}</div>
          {percentageChange !== undefined && (
            <span className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold",
              percentageChange >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            )}>
              {percentageChange >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {Math.abs(percentageChange)}%
            </span>
          )}
        </div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};

interface MapaClientesPageProps {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function IndicadoresPage({ params, searchParams }: MapaClientesPageProps) {
  const routeParams = use(params);
  const unwrappedSearchParams = use(searchParams);

  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      <SectionWrapper
        title="Indicadores Clave de Rendimiento"
        description="Visualice las métricas más importantes y el rendimiento de la empresa."
      >
        {/* Row 1: Metric Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <MetricCard title="Total Clientes" value={keyMetricsData.totalClientes} icon={Users} description="Número total de clientes activos." percentageChange={2.1} />
          <MetricCard title="Pólizas Activas" value={keyMetricsData.polizasActivas} icon={FileCheck} description="Total de pólizas vigentes." percentageChange={1.5}/>
          <MetricCard title="NPS Actual" value={keyMetricsData.npsActual} icon={Smile} description="Net Promoter Score (última medición)." isPercentage percentageChange={2.0}/>
          <MetricCard title="Nuevos Clientes (Mes)" value={keyMetricsData.nuevosClientesMes} icon={UserPlus} description="Clientes adquiridos este mes." percentageChange={-5.2}/>
        </div>

        {/* Row 2: Performance Charts */}
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Logro Cobrado vs. Meta
              </CardTitle>
              <CardDescription>Comparativa mensual del monto cobrado real frente a la meta establecida.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2 pr-6 pb-6">
              <ChartContainer config={cobradoChartConfig} className="h-[300px] w-full">
                <BarChart data={logroCobradoData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toLocaleString()}k`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="real" name="Cobrado Real" fill="var(--color-real)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="meta" name="Meta Cobrado" fill="var(--color-meta)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Logro Suscrito vs. Meta
              </CardTitle>
              <CardDescription>Comparativa mensual del monto suscrito real frente a la meta establecida.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2 pr-6 pb-6">
              <ChartContainer config={suscritoChartConfig} className="h-[300px] w-full">
                <BarChart data={logroSuscritoData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toLocaleString()}k`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="real" name="Suscrito Real" fill="var(--color-real)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="meta" name="Meta Suscrito" fill="var(--color-meta)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Row 3: Other Indicators */}
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Tendencia del NPS
              </CardTitle>
              <CardDescription>Evolución mensual del Net Promoter Score.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2 pr-6 pb-6">
              <ChartContainer config={npsChartConfig} className="h-[300px] w-full">
                <LineChart data={npsTrendData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis domain={[60, 90]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="nps" name="NPS" stroke="var(--color-nps)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Percent className="h-5 w-5 text-primary" />
                Índice de Siniestralidad
              </CardTitle>
              <CardDescription>Evolución mensual del índice de siniestralidad (%).</CardDescription>
            </CardHeader>
            <CardContent className="pl-2 pr-6 pb-6">
              <ChartContainer config={siniestralidadChartConfig} className="h-[300px] w-full">
                <LineChart data={siniestralidadData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis domain={[40, 65]} unit="%" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="indice" name="Siniestralidad" stroke="var(--color-indice)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    </div>
  );
}

