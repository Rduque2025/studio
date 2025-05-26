
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { InteractiveVenezuelaMap, regions, type Region, type BusinessLineData } from "@/components/dashboard/venezuela-map";
import { Bar, BarChart, CartesianGrid, YAxis, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Users, Briefcase } from 'lucide-react';


const nationalBusinessLineTotals: BusinessLineData = regions.reduce(
  (acc, region) => {
    acc.personas += region.clientsByLine.personas;
    acc.automovil += region.clientsByLine.automovil;
    acc.patrimoniales += region.clientsByLine.patrimoniales;
    return acc;
  },
  { personas: 0, automovil: 0, patrimoniales: 0 }
);

const chartConfig = {
  Clientes: { 
    label: "Nº de Clientes",
  },
  Personas: {
    label: "Personas",
    color: "hsl(217, 91%, 60%)", // Primary Blue
  },
  Automóvil: {
    label: "Automóvil",
    color: "hsl(160, 70%, 45%)", // Teal/Green
  },
  Patrimoniales: {
    label: "Patrimoniales",
    color: "hsl(35, 95%, 55%)",  // Orange
  },
} satisfies ChartConfig;


export default function MapaClientesPage() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const currentData: BusinessLineData = selectedRegion 
    ? selectedRegion.clientsByLine 
    : nationalBusinessLineTotals;

  const chartData = [
    { name: "Personas", Clientes: currentData.personas, fill: chartConfig.Personas.color },
    { name: "Automóvil", Clientes: currentData.automovil, fill: chartConfig.Automóvil.color },
    { name: "Patrimoniales", Clientes: currentData.patrimoniales, fill: chartConfig.Patrimoniales.color },
  ];

  const totalNaturalClientsCurrent = currentData.personas;
  const totalJuridicalClientsCurrent = currentData.automovil + currentData.patrimoniales;

  const [formattedNaturalCount, setFormattedNaturalCount] = useState<string | number>(totalNaturalClientsCurrent);
  const [formattedJuridicalCount, setFormattedJuridicalCount] = useState<string | number>(totalJuridicalClientsCurrent);

  useEffect(() => {
    setFormattedNaturalCount(totalNaturalClientsCurrent.toLocaleString());
  }, [totalNaturalClientsCurrent]);

  useEffect(() => {
    setFormattedJuridicalCount(totalJuridicalClientsCurrent.toLocaleString());
  }, [totalJuridicalClientsCurrent]);

  const displayedNaturalTitle = selectedRegion ? `Naturales en ${selectedRegion.name}` : "Clientes Naturales (Nacional)";
  const displayedJuridicalTitle = selectedRegion ? `Jurídicos en ${selectedRegion.name}` : "Clientes Jurídicos (Nacional)";
  
  const chartDescription = selectedRegion 
    ? `Clientes por línea de negocio en ${selectedRegion.name}.`
    : "Total de clientes activos por cada línea de negocio principal a nivel nacional.";


  const handleRegionSelected = (region: Region | null) => {
    setSelectedRegion(region);
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      <SectionWrapper
        title="Mapa Interactivo de Clientes"
        description="Visualice la distribución de clientes a nivel nacional y por estado."
      >
        <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="text-center border-muted shadow-sm bg-card">
            <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-base font-semibold flex items-center justify-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {displayedNaturalTitle}
                </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
                <p className="text-2xl font-bold text-primary">{formattedNaturalCount}</p>
            </CardContent>
            </Card>
            <Card className="text-center border-muted shadow-sm bg-card">
            <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-base font-semibold flex items-center justify-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                {displayedJuridicalTitle}
                </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
                <p className="text-2xl font-bold text-primary">{formattedJuridicalCount}</p>
            </CardContent>
            </Card>
        </div>
        {selectedRegion && (
            <div className="text-center mb-4">
            <Button variant="link" onClick={() => setSelectedRegion(null)} className="text-sm">
                Ver total nacional
            </Button>
            </div>
        )}
        <InteractiveVenezuelaMap selectedRegionId={selectedRegion?.id || null} onRegionSelect={handleRegionSelected} />
      </SectionWrapper>

      <SectionWrapper
        title="Clientes por Líneas de Negocio"
        description={chartDescription}
      >
        <Card className="border shadow-sm">
          <CardHeader>
            {/* CardTitle removed as per user request */}
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  layout="vertical" 
                  data={chartData}
                  margin={{
                    top: 5, 
                    right: 30, 
                    left: 20,
                    bottom: 5,
                  }}
                  accessibilityLayer
                >
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <YAxis
                    type="category"
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    tickLine={false}
                    axisLine={false}
                    width={100} 
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted))" }} 
                    content={<ChartTooltipContent />} 
                  />
                   <Legend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="Clientes" 
                    radius={[0, 8, 8, 0]} 
                  >
                    {chartData.map((entry) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={entry.fill || "hsl(var(--foreground))"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}

