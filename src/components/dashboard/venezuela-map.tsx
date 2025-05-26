
"use client";

import React, { useState, useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface RegionData {
  id: string;
  name: string;
  d: string;
  clients: number;
  fill?: string; // Original fill, e.g., for Distrito Capital
}

const regions: RegionData[] = [
  { id: "amazonas", name: "Amazonas", d: "M100 350 L120 380 L90 400 L70 370 Z", clients: 150 },
  { id: "anzoategui", name: "Anzoátegui", d: "M200 150 L230 160 L220 190 L190 180 Z", clients: 1200 },
  { id: "apure", name: "Apure", d: "M50 250 L100 240 L110 280 L60 290 Z", clients: 450 },
  { id: "aragua", name: "Aragua", d: "M150 130 L170 135 L165 155 L145 150 Z", clients: 2500 },
  { id: "barinas", name: "Barinas", d: "M80 200 L120 190 L130 230 L90 240 Z", clients: 800 },
  { id: "bolivar", name: "Bolívar", d: "M200 250 L300 230 L320 350 L220 360 Z", clients: 950 },
  { id: "carabobo", name: "Carabobo", d: "M130 120 L150 125 L145 145 L125 140 Z", clients: 3200 },
  { id: "capital", name: "Distrito Capital", d: "M160 110 L180 115 L175 130 L155 125 Z", clients: 5500, fill: "hsl(var(--primary))" },
  { id: "delta-amacuro", name: "Delta Amacuro", d: "M300 180 L340 170 L330 220 L290 210 Z", clients: 300 },
  { id: "falcon", name: "Falcón", d: "M80 80 L120 70 L130 110 L90 120 Z", clients: 1100 },
  { id: "guarico", name: "Guárico", d: "M120 180 L180 170 L190 230 L130 240 Z", clients: 700 },
  { id: "lara", name: "Lara", d: "M100 120 L130 110 L140 150 L110 160 Z", clients: 1800 },
  { id: "merida", name: "Mérida", d: "M60 170 L90 160 L100 200 L70 210 Z", clients: 1300 },
  { id: "miranda", name: "Miranda", d: "M170 100 L210 110 L200 140 L160 130 Z", clients: 4200 },
  { id: "monagas", name: "Monagas", d: "M250 170 L290 160 L280 200 L240 190 Z", clients: 650 },
  { id: "nueva-esparta", name: "Nueva Esparta", d: "M250 80 L270 85 L265 100 L245 95 Z", clients: 900 },
  { id: "portuguesa", name: "Portuguesa", d: "M100 160 L130 150 L140 190 L110 200 Z", clients: 750 },
  { id: "sucre", name: "Sucre", d: "M280 120 L320 110 L310 150 L270 140 Z", clients: 850 },
  { id: "tachira", name: "Táchira", d: "M30 150 L60 140 L70 180 L40 190 Z", clients: 1500 },
  { id: "trujillo", name: "Trujillo", d: "M80 140 L110 130 L120 170 L90 180 Z", clients: 1000 },
  { id: "vargas", name: "La Guaira (Vargas)", d: "M165 95 L185 100 L180 110 L160 105 Z", clients: 1700 },
  { id: "yaracuy", name: "Yaracuy", d: "M120 100 L140 105 L135 125 L115 120 Z", clients: 950 },
  { id: "zulia", name: "Zulia", d: "M10 50 L70 40 L80 130 L20 140 Z", clients: 3500 },
];

export function InteractiveVenezuelaMap() {
  const totalClients = useMemo(() => regions.reduce((sum, r) => sum + r.clients, 0), []);
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  const displayedName = selectedRegion ? `Clientes en ${selectedRegion.name}` : "Clientes Totales en Venezuela";
  const displayedCount = selectedRegion ? selectedRegion.clients : totalClients;

  const handleRegionClick = (region: RegionData) => {
    if (selectedRegion && selectedRegion.id === region.id) {
      setSelectedRegion(null); // Deselect if clicking the same region
    } else {
      setSelectedRegion(region);
    }
  };

  const handleShowTotal = () => {
    setSelectedRegion(null);
  };

  const getPathFill = (region: RegionData, currentSelectedRegion: RegionData | null): string | undefined => {
    if (currentSelectedRegion?.id === region.id) {
      return 'hsl(var(--accent))'; // Selected region color
    }
    // Use original fill if defined (e.g., for Distrito Capital)
    if (region.fill) {
      return region.fill;
    }
    // For other regions, rely on the default fill-muted from className
    return undefined; 
  };

  return (
    <div className="space-y-6">
      <Card className="text-center border-none shadow-none bg-transparent">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">{displayedName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-primary">{displayedCount.toLocaleString()}</p>
          {selectedRegion && (
            <Button variant="link" onClick={handleShowTotal} className="mt-2 text-sm">
              Ver total nacional
            </Button>
          )}
        </CardContent>
      </Card>

      <TooltipProvider delayDuration={100}>
        <div className="w-full aspect-[1.5] rounded-lg border bg-card p-4 overflow-hidden flex items-center justify-center">
          <svg 
            viewBox="0 0 350 420" 
            className="w-full h-full max-w-lg max-h-[500px]"
            onClick={(e) => {
              // If the click target is the SVG itself (background), and not a path
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
                      e.stopPropagation(); // Prevent SVG background click from firing immediately
                      handleRegionClick(region);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">{region.name}</p>
                  <p>Clientes: {region.clients.toLocaleString()}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            {/* The text title inside SVG can be removed if card title is sufficient */}
            {/* <text x="175" y="30" textAnchor="middle" className="text-lg font-semibold fill-foreground">
              Mapa Interactivo de Clientes
            </text> */}
          </svg>
        </div>
      </TooltipProvider>
    </div>
  );
}
