
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { InteractiveVenezuelaMap, regions as mapRegionsData, type Region as MapRegion, type BusinessLineData } from "@/components/dashboard/venezuela-map"; // Renamed to avoid conflict
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

// Consolidate region data definition here, as it's used by both map and this page's logic
const rawRegionsData = [
  { id: "amazonas", name: "Amazonas", d: "M100 350 L120 380 L90 400 L70 370 Z", naturalClients: 90, juridicalClients: 60 },
  { id: "anzoategui", name: "Anzoátegui", d: "M200 150 L230 160 L220 190 L190 180 Z", naturalClients: 720, juridicalClients: 480 },
  { id: "apure", name: "Apure", d: "M50 250 L100 240 L110 280 L60 290 Z", naturalClients: 270, juridicalClients: 180 },
  { id: "aragua", name: "Aragua", d: "M150 130 L170 135 L165 155 L145 150 Z", naturalClients: 1500, juridicalClients: 1000 },
  { id: "barinas", name: "Barinas", d: "M80 200 L120 190 L130 230 L90 240 Z", naturalClients: 480, juridicalClients: 320 },
  { id: "bolivar", name: "Bolívar", d: "M200 250 L300 230 L320 350 L220 360 Z", naturalClients: 570, juridicalClients: 380 },
  { id: "carabobo", name: "Carabobo", d: "M130 120 L150 125 L145 145 L125 140 Z", naturalClients: 1920, juridicalClients: 1280 },
  { id: "capital", name: "Distrito Capital", d: "M160 110 L180 115 L175 130 L155 125 Z", naturalClients: 3300, juridicalClients: 2200, fillOverride: "hsl(var(--primary))" },
  { id: "delta-amacuro", name: "Delta Amacuro", d: "M300 180 L340 170 L330 220 L290 210 Z", naturalClients: 180, juridicalClients: 120 },
  { id: "falcon", name: "Falcón", d: "M80 80 L120 70 L130 110 L90 120 Z", naturalClients: 660, juridicalClients: 440 },
  { id: "guarico", name: "Guárico", d: "M120 180 L180 170 L190 230 L130 240 Z", naturalClients: 420, juridicalClients: 280 },
  { id: "lara", name: "Lara", d: "M100 120 L130 110 L140 150 L110 160 Z", naturalClients: 1080, juridicalClients: 720 },
  { id: "merida", name: "Mérida", d: "M60 170 L90 160 L100 200 L70 210 Z", naturalClients: 780, juridicalClients: 520 },
  { id: "miranda", name: "Miranda", d: "M170 100 L210 110 L200 140 L160 130 Z", naturalClients: 2520, juridicalClients: 1680 },
  { id: "monagas", name: "Monagas", d: "M250 170 L290 160 L280 200 L240 190 Z", naturalClients: 390, juridicalClients: 260 },
  { id: "nueva-esparta", name: "Nueva Esparta", d: "M250 80 L270 85 L265 100 L245 95 Z", naturalClients: 540, juridicalClients: 360 },
  { id: "portuguesa", name: "Portuguesa", d: "M100 160 L130 150 L140 190 L110 200 Z", naturalClients: 450, juridicalClients: 300 },
  { id: "sucre", name: "Sucre", d: "M280 120 L320 110 L310 150 L270 140 Z", naturalClients: 510, juridicalClients: 340 },
  { id: "tachira", name: "Táchira", d: "M30 150 L60 140 L70 180 L40 190 Z", naturalClients: 900, juridicalClients: 600 },
  { id: "trujillo", name: "Trujillo", d: "M80 140 L110 130 L120 170 L90 180 Z", naturalClients: 600, juridicalClients: 400 },
  { id: "vargas", name: "La Guaira (Vargas)", d: "M165 95 L185 100 L180 110 L160 105 Z", naturalClients: 1020, juridicalClients: 680 },
  { id: "yaracuy", name: "Yaracuy", d: "M120 100 L140 105 L135 125 L115 120 Z", naturalClients: 570, juridicalClients: 380 },
  { id: "zulia", name: "Zulia", d: "M10 50 L70 40 L80 130 L20 140 Z", naturalClients: 2100, juridicalClients: 1400 },
];

export const regions: MapRegion[] = rawRegionsData.map(r => ({
  id: r.id,
  name: r.name,
  d: r.d,
  clientsByLine: {
    personas: r.naturalClients,
    automovil: Math.round(r.juridicalClients * 0.6),
    patrimoniales: Math.round(r.juridicalClients * 0.4),
  },
  fill: r.fillOverride, 
}));


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
  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(null);

  const currentData: BusinessLineData = useMemo(() => (selectedRegion 
    ? selectedRegion.clientsByLine 
    : nationalBusinessLineTotals), [selectedRegion]);

  const chartData = useMemo(() => [
    { name: "Personas", Clientes: currentData.personas, fill: chartConfig.Personas.color },
    { name: "Automóvil", Clientes: currentData.automovil, fill: chartConfig.Automóvil.color },
    { name: "Patrimoniales", Clientes: currentData.patrimoniales, fill: chartConfig.Patrimoniales.color },
  ], [currentData]);

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


  const handleRegionSelected = (regionId: string | null) => {
    if (regionId === null) {
      setSelectedRegion(null);
    } else {
      const regionDetails = regions.find(r => r.id === regionId);
      setSelectedRegion(regionDetails || null);
    }
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
            <Button variant="link" onClick={() => handleRegionSelected(null)} className="text-sm">
                Ver total nacional
            </Button>
            </div>
        )}
        <InteractiveVenezuelaMap regionsData={regions} selectedRegionId={selectedRegion?.id || null} onRegionSelect={handleRegionSelected} />
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

