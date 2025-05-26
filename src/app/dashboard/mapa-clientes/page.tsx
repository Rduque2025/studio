
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { InteractiveVenezuelaMap, mapRegionsData, type MapRegion, type MapRegionClientData } from "@/components/dashboard/venezuela-map";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Users, Briefcase, TrendingUp, BarChartHorizontal } from 'lucide-react'; 
import { Bar, BarChart, CartesianGrid, YAxis, ResponsiveContainer, Tooltip, Cell, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";


const regions = mapRegionsData; // Use the exported regions data

const nationalClientTotals: MapRegionClientData = regions.reduce(
  (acc, region) => {
    acc.personas += region.clients.personas;
    acc.automovil += region.clients.automovil;
    acc.patrimoniales += region.clients.patrimoniales;
    acc.banco += region.clients.banco;
    acc.tradicional += region.clients.tradicional;
    acc.alternos += region.clients.alternos;
    return acc;
  },
  { personas: 0, automovil: 0, patrimoniales: 0, banco: 0, tradicional: 0, alternos: 0 }
);

const businessLinesChartConfig = {
  Personas: { label: "Personas", color: "hsl(var(--chart-1))" },
  Automóvil: { label: "Automóvil", color: "hsl(var(--chart-2))" },
  Patrimoniales: { label: "Patrimoniales", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

const salesChannelsChartConfig = {
  Banco: { label: "Banco", color: "hsl(var(--chart-4))" },
  Tradicional: { label: "Tradicional", color: "hsl(var(--chart-5))" },
  "Canales Alternos": { label: "Canales Alternos", color: "hsl(210 30% 70%)" }, 
} satisfies ChartConfig;


export default function MapaClientesPage() {
  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(null);

  const currentData: MapRegionClientData = useMemo(() => {
    if (selectedRegion) {
      return selectedRegion.clients;
    }
    return regions.reduce((acc, region) => {
        acc.personas += region.clients.personas;
        acc.automovil += region.clients.automovil;
        acc.patrimoniales += region.clients.patrimoniales;
        acc.banco += region.clients.banco;
        acc.tradicional += region.clients.tradicional;
        acc.alternos += region.clients.alternos;
        return acc;
      }, { personas: 0, automovil: 0, patrimoniales: 0, banco: 0, tradicional: 0, alternos: 0 }
    );
  }, [selectedRegion]);


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
  
  const handleRegionSelected = (regionId: string | null) => {
    if (regionId === null) {
      setSelectedRegion(null);
    } else {
      const regionDetails = regions.find(r => r.id === regionId);
      setSelectedRegion(regionDetails || null);
    }
  };

  const businessLinesChartData = useMemo(() => [
    { name: "Personas", Clientes: currentData.personas, fill: businessLinesChartConfig.Personas.color },
    { name: "Automóvil", Clientes: currentData.automovil, fill: businessLinesChartConfig.Automóvil.color },
    { name: "Patrimoniales", Clientes: currentData.patrimoniales, fill: businessLinesChartConfig.Patrimoniales.color },
  ], [currentData]);

  const salesChannelsChartData = useMemo(() => [
    { name: "Banco", Clientes: currentData.banco, fill: salesChannelsChartConfig.Banco.color },
    { name: "Tradicional", Clientes: currentData.tradicional, fill: salesChannelsChartConfig.Tradicional.color },
    { name: "Canales Alternos", Clientes: currentData.alternos, fill: salesChannelsChartConfig["Canales Alternos"].color },
  ], [currentData]);

  const chartTitlePrefix = selectedRegion ? `en ${selectedRegion.name}` : "Nacional";

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
        
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            {selectedRegion && (
                <div className="text-center mb-2">
                <Button variant="link" onClick={() => handleRegionSelected(null)} className="text-sm">
                    Ver total nacional
                </Button>
                </div>
            )}
            <InteractiveVenezuelaMap regionsData={regions} selectedRegionId={selectedRegion?.id || null} onRegionSelect={handleRegionSelected} />
          </div>

          <div className="md:col-span-1 space-y-8">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChartHorizontal className="h-5 w-5 text-primary" />
                  Líneas de Negocio {chartTitlePrefix}
                </CardTitle>
              </CardHeader>
              <CardContent className="pl-0 pr-4">
                <ChartContainer config={businessLinesChartConfig} className="h-[200px] w-full">
                  <BarChart accessibilityLayer data={businessLinesChartData} layout="vertical" margin={{ left: 10, right: 10 }}>
                    <YAxis
                      dataKey="name"
                      type="category"
                      tickLine={false}
                      tickMargin={5}
                      axisLine={false}
                      className="text-xs"
                      width={100} 
                    />
                    <XAxis type="number" hide />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="Clientes" layout="vertical" radius={5}>
                       {businessLinesChartData.map((entry) => (
                        <Cell key={`cell-L-${entry.name}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Canales de Venta {chartTitlePrefix}
                </CardTitle>
              </CardHeader>
              <CardContent className="pl-0 pr-4">
                <ChartContainer config={salesChannelsChartConfig} className="h-[200px] w-full">
                  <BarChart accessibilityLayer data={salesChannelsChartData} layout="vertical" margin={{ left: 10, right: 10 }}>
                     <YAxis
                      dataKey="name"
                      type="category"
                      tickLine={false}
                      tickMargin={5}
                      axisLine={false}
                      className="text-xs"
                      width={100} 
                    />
                    <XAxis type="number" hide />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="Clientes" layout="vertical" radius={5}>
                      {salesChannelsChartData.map((entry) => (
                        <Cell key={`cell-C-${entry.name}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
