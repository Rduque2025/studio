
"use client";

import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

export interface BusinessLineData {
  personas: number;
  automovil: number;
  patrimoniales: number;
}

export interface SalesChannelData {
  banco: number;
  tradicional: number;
  alternos: number;
}

export interface RegionClientData extends BusinessLineData, SalesChannelData {}

export interface Region {
  id: string;
  name: string;
  d: string;
  clients: RegionClientData;
  // fill?: string; // Removed fill from here to standardize default appearance
}

const rawRegionsData = [
  { id: "amazonas", name: "Amazonas", d: "M100 350 L120 380 L90 400 L70 370 Z", naturalClients: 90, juridicalClients: 60, salesBanco: 70, salesTradicional: 50, salesAlternos: 30 },
  { id: "anzoategui", name: "Anzoátegui", d: "M200 150 L230 160 L220 190 L190 180 Z", naturalClients: 720, juridicalClients: 480, salesBanco: 500, salesTradicional: 400, salesAlternos: 300 },
  { id: "apure", name: "Apure", d: "M50 250 L100 240 L110 280 L60 290 Z", naturalClients: 270, juridicalClients: 180, salesBanco: 200, salesTradicional: 150, salesAlternos: 100 },
  { id: "aragua", name: "Aragua", d: "M150 130 L170 135 L165 155 L145 150 Z", naturalClients: 1500, juridicalClients: 1000, salesBanco: 1200, salesTradicional: 800, salesAlternos: 500 },
  { id: "barinas", name: "Barinas", d: "M80 200 L120 190 L130 230 L90 240 Z", naturalClients: 480, juridicalClients: 320, salesBanco: 350, salesTradicional: 250, salesAlternos: 200 },
  { id: "bolivar", name: "Bolívar", d: "M200 250 L300 230 L320 350 L220 360 Z", naturalClients: 570, juridicalClients: 380, salesBanco: 400, salesTradicional: 300, salesAlternos: 250 },
  { id: "carabobo", name: "Carabobo", d: "M130 120 L150 125 L145 145 L125 140 Z", naturalClients: 1920, juridicalClients: 1280, salesBanco: 1500, salesTradicional: 1000, salesAlternos: 700 },
  { id: "capital", name: "Distrito Capital", d: "M160 110 L180 115 L175 130 L155 125 Z", naturalClients: 3300, juridicalClients: 2200, salesBanco: 2500, salesTradicional: 1800, salesAlternos: 1200 }, // Removed fill: "hsl(var(--primary))"
  { id: "delta-amacuro", name: "Delta Amacuro", d: "M300 180 L340 170 L330 220 L290 210 Z", naturalClients: 180, juridicalClients: 120, salesBanco: 120, salesTradicional: 100, salesAlternos: 80 },
  { id: "falcon", name: "Falcón", d: "M80 80 L120 70 L130 110 L90 120 Z", naturalClients: 660, juridicalClients: 440, salesBanco: 500, salesTradicional: 350, salesAlternos: 250 },
  { id: "guarico", name: "Guárico", d: "M120 180 L180 170 L190 230 L130 240 Z", naturalClients: 420, juridicalClients: 280, salesBanco: 300, salesTradicional: 200, salesAlternos: 200 },
  { id: "lara", name: "Lara", d: "M100 120 L130 110 L140 150 L110 160 Z", naturalClients: 1080, juridicalClients: 720, salesBanco: 800, salesTradicional: 600, salesAlternos: 400 },
  { id: "merida", name: "Mérida", d: "M60 170 L90 160 L100 200 L70 210 Z", naturalClients: 780, juridicalClients: 520, salesBanco: 600, salesTradicional: 400, salesAlternos: 300 },
  { id: "miranda", name: "Miranda", d: "M170 100 L210 110 L200 140 L160 130 Z", naturalClients: 2520, juridicalClients: 1680, salesBanco: 2000, salesTradicional: 1400, salesAlternos: 800 },
  { id: "monagas", name: "Monagas", d: "M250 170 L290 160 L280 200 L240 190 Z", naturalClients: 390, juridicalClients: 260, salesBanco: 300, salesTradicional: 200, salesAlternos: 150 },
  { id: "nueva-esparta", name: "Nueva Esparta", d: "M250 80 L270 85 L265 100 L245 95 Z", naturalClients: 540, juridicalClients: 360, salesBanco: 400, salesTradicional: 300, salesAlternos: 200 },
  { id: "portuguesa", name: "Portuguesa", d: "M100 160 L130 150 L140 190 L110 200 Z", naturalClients: 450, juridicalClients: 300, salesBanco: 350, salesTradicional: 250, salesAlternos: 150 },
  { id: "sucre", name: "Sucre", d: "M280 120 L320 110 L310 150 L270 140 Z", naturalClients: 510, juridicalClients: 340, salesBanco: 400, salesTradicional: 250, salesAlternos: 200 },
  { id: "tachira", name: "Táchira", d: "M30 150 L60 140 L70 180 L40 190 Z", naturalClients: 900, juridicalClients: 600, salesBanco: 700, salesTradicional: 500, salesAlternos: 300 },
  { id: "trujillo", name: "Trujillo", d: "M80 140 L110 130 L120 170 L90 180 Z", naturalClients: 600, juridicalClients: 400, salesBanco: 450, salesTradicional: 300, salesAlternos: 250 },
  { id: "vargas", name: "La Guaira (Vargas)", d: "M165 95 L185 100 L180 110 L160 105 Z", naturalClients: 1020, juridicalClients: 680, salesBanco: 800, salesTradicional: 500, salesAlternos: 400 },
  { id: "yaracuy", name: "Yaracuy", d: "M120 100 L140 105 L135 125 L115 120 Z", naturalClients: 570, juridicalClients: 380, salesBanco: 400, salesTradicional: 300, salesAlternos: 250 },
  { id: "zulia", name: "Zulia", d: "M10 50 L70 40 L80 130 L20 140 Z", naturalClients: 2100, juridicalClients: 1400, salesBanco: 1600, salesTradicional: 1100, salesAlternos: 800 },
];

export const regions: Region[] = rawRegionsData.map(r => ({
  id: r.id,
  name: r.name,
  d: r.d,
  clients: {
    personas: r.naturalClients,
    automovil: Math.round(r.juridicalClients * 0.6),
    patrimoniales: Math.round(r.juridicalClients * 0.4),
    banco: r.salesBanco,
    tradicional: r.salesTradicional,
    alternos: r.salesAlternos,
  },
  // Removed fill property from here
}));


interface InteractiveVenezuelaMapProps {
  regionsData: Region[]; 
  selectedRegionId: string | null;
  onRegionSelect: (regionId: string | null) => void; 
}


export function InteractiveVenezuelaMap({ regionsData, selectedRegionId, onRegionSelect }: InteractiveVenezuelaMapProps) {

  const handleRegionClick = (region: Region) => {
    if (selectedRegionId === region.id) {
      onRegionSelect(null); 
    } else {
      onRegionSelect(region.id);
    }
  };

  const handleBackgroundClick = () => {
    onRegionSelect(null); 
  };
  
  const getSelectedRegionFill = (regionId: string, currentSelectedId: string | null): string | undefined => {
    if (currentSelectedId === regionId) {
      return 'hsl(var(--accent))'; // Selected state color
    }
    return undefined; // Default fill will be handled by className
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div className="w-full aspect-[1.5] rounded-lg border bg-card p-4 overflow-hidden flex items-center justify-center shadow-sm">
        <svg 
          viewBox="0 0 350 420" 
          className="w-full h-full max-w-lg max-h-[500px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleBackgroundClick();
            }
          }}
        >
          <title>Mapa de Venezuela</title>
          {regionsData.map(region => (
            <Tooltip key={region.id}>
              <TooltipTrigger asChild>
                <path
                  id={region.id}
                  d={region.d}
                  className={cn(
                    "fill-primary stroke-background stroke-1 hover:fill-primary/80 transition-colors cursor-pointer"
                  )}
                  style={{ fill: getSelectedRegionFill(region.id, selectedRegionId) || undefined }}
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleRegionClick(region);
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-semibold">{region.name}</p>
                <p className="text-xs">Personas: {region.clients.personas.toLocaleString()}</p>
                <p className="text-xs">Automóvil: {region.clients.automovil.toLocaleString()}</p>
                <p className="text-xs">Patrimoniales: {region.clients.patrimoniales.toLocaleString()}</p>
                <hr className="my-1"/>
                <p className="text-xs">Canal Banco: {region.clients.banco.toLocaleString()}</p>
                <p className="text-xs">Canal Tradicional: {region.clients.tradicional.toLocaleString()}</p>
                <p className="text-xs">Canal Alternos: {region.clients.alternos.toLocaleString()}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </svg>
      </div>
    </TooltipProvider>
  );
}

export { regions as mapRegionsData };
export type { Region as MapRegion, BusinessLineData as MapBusinessLineData, SalesChannelData as MapSalesChannelData, RegionClientData as MapRegionClientData };

    