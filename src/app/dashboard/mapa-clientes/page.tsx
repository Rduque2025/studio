
"use client";

import React, { useMemo, useEffect, useState, use } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Users, FileCheck, Smile, UserPlus, TrendingUp, Target, Activity, Percent, ArrowUp, ArrowDown, DollarSign, Filter, RotateCcw } from 'lucide-react';
import { Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { cn } from "@/lib/utils"; 
import { regions as mapRegionsData } from "@/components/dashboard/venezuela-map"; // For state list
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress"; // Import Progress component

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

const lineasNegocioOptions = ['Salud', 'Auto', 'Patrimoniales', 'Persona'];
const canalesVentaOptions = ['Banco', 'Tradicional', 'Canales Alternos'];
const regionesOptions = ['Capital', 'Central', 'Occidental', 'Oriental', 'Los Llanos', 'Andina', 'Guayana'];
const estadosOptions = mapRegionsData.map(r => r.name).sort();


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
  progressPercentage?: number; // New prop for progress bar
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, description, isPercentage, percentageChange, progressPercentage }) => {
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
        {progressPercentage !== undefined && (
          <Progress value={progressPercentage} className="mt-2 h-2" />
        )}
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

  const [cobradoCardDescription, setCobradoCardDescription] = useState<string | undefined>(undefined);
  const [suscritoCardDescription, setSuscritoCardDescription] = useState<string | undefined>(undefined);
  
  const currentCobrado = useMemo(() => logroCobradoData[logroCobradoData.length - 1], []);
  const currentSuscrito = useMemo(() => logroSuscritoData[logroSuscritoData.length - 1], []);

  const cobradoPercentageChange = useMemo(() => currentCobrado ? parseFloat((((currentCobrado.real - currentCobrado.meta) / currentCobrado.meta) * 100).toFixed(1)) : undefined, [currentCobrado]);
  const suscritoPercentageChange = useMemo(() => currentSuscrito ? parseFloat((((currentSuscrito.real - currentSuscrito.meta) / currentSuscrito.meta) * 100).toFixed(1)) : undefined, [currentSuscrito]);

  const cobradoProgressPercentage = useMemo(() => currentCobrado && currentCobrado.meta > 0 ? (currentCobrado.real / currentCobrado.meta) * 100 : 0, [currentCobrado]);
  const suscritoProgressPercentage = useMemo(() => currentSuscrito && currentSuscrito.meta > 0 ? (currentSuscrito.real / currentSuscrito.meta) * 100 : 0, [currentSuscrito]);

  useEffect(() => {
    if (currentCobrado) {
      setCobradoCardDescription(`Meta Acumulada: ${currentCobrado.meta.toLocaleString()}`);
    }
    if (currentSuscrito) {
      setSuscritoCardDescription(`Meta Acumulada: ${currentSuscrito.meta.toLocaleString()}`);
    }
  }, [currentCobrado, currentSuscrito]);

  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [selectedLineas, setSelectedLineas] = useState<string[]>([]);
  const [selectedCanales, setSelectedCanales] = useState<string[]>([]);
  const [selectedRegiones, setSelectedRegiones] = useState<string[]>([]);
  const [selectedEstados, setSelectedEstados] = useState<string[]>([]);

  const handleCheckboxChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
    checked: boolean
  ) => {
    setter(prev => 
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  const handleApplyFilters = () => {
    console.log("Filtros Aplicados:", {
      lineasNegocio: selectedLineas,
      canalesVenta: selectedCanales,
      regiones: selectedRegiones,
      estados: selectedEstados,
    });
    // Placeholder for actual data fetching/filtering logic
  };

  const handleClearFilters = () => {
    setSelectedLineas([]);
    setSelectedCanales([]);
    setSelectedRegiones([]);
    setSelectedEstados([]);
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      <SectionWrapper
        title="Indicadores Clave de Rendimiento"
        description="Visualice las métricas acumuladas y el rendimiento de la empresa. Utilice los filtros para refinar los datos."
        descriptionClassName="text-xs"
      >
        {/* Filter Dialog Trigger */}
        <div className="mb-8 flex justify-end">
          <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl">
              <DialogHeader>
                <DialogTitle>Filtros de Indicadores</DialogTitle>
                <DialogDescription>
                  Seleccione los criterios para refinar los datos mostrados. Los cambios se aplicarán al cerrar este diálogo.
                </DialogDescription>
              </DialogHeader>
              
              <ScrollArea className="max-h-[60vh] pr-4 my-4">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="lineas-negocio">
                    <AccordionTrigger>Líneas de Negocio</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-2">
                        {lineasNegocioOptions.map(linea => (
                          <div key={linea} className="flex items-center space-x-2">
                            <Checkbox
                              id={`dialog-linea-${linea}`}
                              checked={selectedLineas.includes(linea)}
                              onCheckedChange={(checked) => handleCheckboxChange(setSelectedLineas, linea, !!checked)}
                            />
                            <Label htmlFor={`dialog-linea-${linea}`} className="font-normal text-sm">{linea}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="canales-venta">
                    <AccordionTrigger>Canales de Venta</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-2">
                        {canalesVentaOptions.map(canal => (
                          <div key={canal} className="flex items-center space-x-2">
                            <Checkbox
                              id={`dialog-canal-${canal}`}
                              checked={selectedCanales.includes(canal)}
                              onCheckedChange={(checked) => handleCheckboxChange(setSelectedCanales, canal, !!checked)}
                            />
                            <Label htmlFor={`dialog-canal-${canal}`} className="font-normal text-sm">{canal}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="regiones">
                    <AccordionTrigger>Región Geográfica</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-2">
                        {regionesOptions.map(region => (
                          <div key={region} className="flex items-center space-x-2">
                            <Checkbox
                              id={`dialog-region-${region}`}
                              checked={selectedRegiones.includes(region)}
                              onCheckedChange={(checked) => handleCheckboxChange(setSelectedRegiones, region, !!checked)}
                            />
                            <Label htmlFor={`dialog-region-${region}`} className="font-normal text-sm">{region}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="estados">
                    <AccordionTrigger>Estado</AccordionTrigger>
                    <AccordionContent>
                      <ScrollArea className="h-40"> {/* Nested ScrollArea for states */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-2">
                          {estadosOptions.map(estado => (
                            <div key={estado} className="flex items-center space-x-2">
                              <Checkbox
                                id={`dialog-estado-${estado}`}
                                checked={selectedEstados.includes(estado)}
                                onCheckedChange={(checked) => handleCheckboxChange(setSelectedEstados, estado, !!checked)}
                              />
                              <Label htmlFor={`dialog-estado-${estado}`} className="font-normal text-sm">{estado}</Label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ScrollArea>
              
              <DialogFooter className="mt-2 gap-2 sm:justify-between">
                <Button variant="outline" onClick={handleClearFilters} className="sm:mr-auto">
                  <RotateCcw className="mr-2 h-4 w-4" /> Limpiar
                </Button>
                <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => setIsFilterDialogOpen(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={() => {
                      handleApplyFilters();
                      setIsFilterDialogOpen(false);
                    }}>
                      <Filter className="mr-2 h-4 w-4" /> Aplicar
                    </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Row 1: Metric Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <MetricCard title="Total Clientes (Acumulado)" value={keyMetricsData.totalClientes} icon={Users} description="Número total de clientes activos." percentageChange={2.1} />
          <MetricCard title="Pólizas Activas (Acumulado)" value={keyMetricsData.polizasActivas} icon={FileCheck} description="Total de pólizas vigentes." percentageChange={1.5}/>
          <MetricCard title="NPS Acumulado" value={keyMetricsData.npsActual} icon={Smile} description="Net Promoter Score (última medición)." isPercentage percentageChange={2.0}/>
          <MetricCard title="Nuevos Clientes (Mes Actual)" value={keyMetricsData.nuevosClientesMes} icon={UserPlus} description="Clientes adquiridos este mes." percentageChange={-5.2}/>
          {currentCobrado && (
            <MetricCard 
              title="Logro Cobrado Acumulado"
              value={currentCobrado.real} 
              icon={DollarSign} 
              description={cobradoCardDescription || "Cargando descripción..."}
              percentageChange={cobradoPercentageChange}
              progressPercentage={cobradoProgressPercentage}
            />
          )}
          {currentSuscrito && (
            <MetricCard 
              title="Logro Suscrito Acumulado"
              value={currentSuscrito.real} 
              icon={DollarSign} 
              description={suscritoCardDescription || "Cargando descripción..."}
              percentageChange={suscritoPercentageChange}
              progressPercentage={suscritoProgressPercentage}
            />
          )}
        </div>

        {/* Row 2: Performance Charts */}
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Logro Cobrado vs. Meta
              </CardTitle>
              <CardDescription className="text-xs">Comparativa mensual del monto cobrado real frente a la meta establecida.</CardDescription>
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
              <CardDescription className="text-xs">Comparativa mensual del monto suscrito real frente a la meta establecida.</CardDescription>
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
                Tendencia del NPS (Mensual)
              </CardTitle>
              <CardDescription className="text-xs">Evolución mensual del Net Promoter Score.</CardDescription>
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
                Índice de Siniestralidad (Mensual)
              </CardTitle>
              <CardDescription className="text-xs">Evolución mensual del índice de siniestralidad (%).</CardDescription>
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
