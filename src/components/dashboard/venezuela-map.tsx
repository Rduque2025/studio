
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Users, Briefcase } from 'lucide-react'; // Icons for client types

interface RegionData {
  id: string;
  name: string;
  d: string;
  naturalClients: number;
  juridicalClients: number;
  fill?: string;
}

const regions: RegionData[] = [
  { id: "amazonas", name: "Amazonas", d: "M100 350 L120 380 L90 400 L70 370 Z", naturalClients: 90, juridicalClients: 60 },
  { id: "anzoategui", name: "Anzoátegui", d: "M200 150 L230 160 L220 190 L190 180 Z", naturalClients: 720, juridicalClients: 480 },
  { id: "apure", name: "Apure", d: "M50 250 L100 240 L110 280 L60 290 Z", naturalClients: 270, juridicalClients: 180 },
  { id: "aragua", name: "Aragua", d: "M150 130 L170 135 L165 155 L145 150 Z", naturalClients: 1500, juridicalClients: 1000 },
  { id: "barinas", name: "Barinas", d: "M80 200 L120 190 L130 230 L90 240 Z", naturalClients: 480, juridicalClients: 320 },
  { id: "bolivar", name: "Bolívar", d: "M200 250 L300 230 L320 350 L220 360 Z", naturalClients: 570, juridicalClients: 380 },
  { id: "carabobo", name: "Carabobo", d: "M130 120 L150 125 L145 145 L125 140 Z", naturalClients: 1920, juridicalClients: 1280 },
  { id: "capital", name: "Distrito Capital", d: "M160 110 L180 115 L175 130 L155 125 Z", naturalClients: 3300, juridicalClients: 2200, fill: "hsl(var(--primary))" },
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

export function InteractiveVenezuelaMap() {
  const totalNaturalClients = useMemo(() => regions.reduce((sum, r) => sum + r.naturalClients, 0), []);
  const totalJuridicalClients = useMemo(() => regions.reduce((sum, r) => sum + r.juridicalClients, 0), []);
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  const displayedNaturalTitle = selectedRegion ? `Naturales en ${selectedRegion.name}` : "Clientes Naturales (Nacional)";
  const displayedJuridicalTitle = selectedRegion ? `Jurídicos en ${selectedRegion.name}` : "Clientes Jurídicos (Nacional)";
  
  const displayedNaturalCount = selectedRegion ? selectedRegion.naturalClients : totalNaturalClients;
  const displayedJuridicalCount = selectedRegion ? selectedRegion.juridicalClients : totalJuridicalClients;

  const [formattedNaturalCount, setFormattedNaturalCount] = useState<string | number>(displayedNaturalCount);
  const [formattedJuridicalCount, setFormattedJuridicalCount] = useState<string | number>(displayedJuridicalCount);

  useEffect(() => {
    setFormattedNaturalCount(displayedNaturalCount.toLocaleString());
  }, [displayedNaturalCount]);

  useEffect(() => {
    setFormattedJuridicalCount(displayedJuridicalCount.toLocaleString());
  }, [displayedJuridicalCount]);

  const handleRegionClick = (region: RegionData) => {
    if (selectedRegion && selectedRegion.id === region.id) {
      setSelectedRegion(null);
    } else {
      setSelectedRegion(region);
    }
  };

  const handleShowTotal = () => {
    setSelectedRegion(null);
  };

  const getPathFill = (region: RegionData, currentSelectedRegion: RegionData | null): string | undefined => {
    if (currentSelectedRegion?.id === region.id) {
      return 'hsl(var(--accent))'; 
    }
    if (region.fill) {
      return region.fill;
    }
    return undefined; 
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="text-center border-muted shadow-sm bg-card">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-lg font-semibold flex items-center justify-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {displayedNaturalTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-3xl font-bold text-primary">{formattedNaturalCount}</p>
          </CardContent>
        </Card>
        <Card className="text-center border-muted shadow-sm bg-card">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-lg font-semibold flex items-center justify-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              {displayedJuridicalTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-3xl font-bold text-primary">{formattedJuridicalCount}</p>
          </CardContent>
        </Card>
      </div>
      
      {selectedRegion && (
        <div className="text-center">
          <Button variant="link" onClick={handleShowTotal} className="text-sm">
            Ver total nacional
          </Button>
        </div>
      )}

      <TooltipProvider delayDuration={100}>
        <div className="w-full aspect-[1.5] rounded-lg border bg-card p-4 overflow-hidden flex items-center justify-center shadow-sm">
          <svg 
            viewBox="0 0 350 420" 
            className="w-full h-full max-w-lg max-h-[500px]"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleShowTotal();
              }
            }}
          >
            <title>Mapa de Venezuela</title>
            {regions.map(region => (
              <Tooltip key={region.id}>
                <TooltipTrigger asChild>
                  <path
                    id={region.id}
                    d={region.d}
                    className={cn(
                      "stroke-border fill-muted hover:fill-accent/70 transition-colors cursor-pointer"
                    )}
                    style={{ fill: getPathFill(region, selectedRegion) }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRegionClick(region);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">{region.name}</p>
                  <p>Naturales: {region.naturalClients.toLocaleString()}</p>
                  <p>Jurídicos: {region.juridicalClients.toLocaleString()}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </svg>
        </div>
      </TooltipProvider>
    </div>
  );
}
