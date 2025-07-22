
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { 
  ArrowLeft, 
  TrendingUp, 
  LayoutGrid,
  FileSignature,
  CircleDollarSign,
  Users,
  Package,
  FolderKanban,
  ChevronUp,
  ChevronDown,
  Lock,
  ChevronLeft as ChevronLeftIcon,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip as ShadTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


// --- MOCK DATA ---
const salesTrendData = [
  { name: 'Ene', Ventas: 2300, "Mes Anterior": 1900 },
  { name: 'Feb', Ventas: 2100, "Mes Anterior": 2200 },
  { name: 'Mar', Ventas: 3200, "Mes Anterior": 2500 },
  { name: 'Abr', Ventas: 2800, "Mes Anterior": 3000 },
  { name: 'May', Ventas: 3500, "Mes Anterior": 3100 },
  { name: 'Jun', Ventas: 4100, "Mes Anterior": 3600 },
];

const topExecutivesData = [
  { name: 'Ana Pérez', sales: 120000, avatar: 'AP' },
  { name: 'Carlos Rivas', sales: 110000, avatar: 'CR' },
  { name: 'Sofía Castillo', sales: 95000, avatar: 'SC' },
  { name: 'Luis Mendez', sales: 80000, avatar: 'LM' },
];

const salesForceData = [
    { month: 'Ene', value: 250, budget: 400 },
    { month: 'Feb', value: 280, budget: 400 },
    { month: 'Mar', value: 350, budget: 400 },
    { month: 'Abr', value: 320, budget: 400 },
    { month: 'May', value: 410, budget: 400 },
    { month: 'Jun', value: 450, budget: 400 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
};

const menuItems = [
  { name: 'General', icon: LayoutGrid, href: '#' },
  { name: 'Suscrito', icon: FileSignature, href: '#' },
  { name: 'Cobrado', icon: CircleDollarSign, href: '#' },
  { name: 'Ejecutivos', icon: Users, href: '#' },
  { name: 'Productos', icon: Package, href: '#' },
  { name: 'Proyectos', icon: FolderKanban, href: '#' },
];

// --- AUTHENTICATION COMPONENT ---
const CORRECT_COMBINATION = [12, 34, 56];

const PinTumber = ({ value }: { value: number }) => {
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="relative w-28 h-20 rounded-2xl bg-[#333] shadow-lg flex items-center justify-center overflow-hidden">
        <span className="font-mono text-4xl font-bold text-white z-10">{formatNumber(value)}</span>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function GerenciaComercialDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [combination, setCombination] = useState([12, 34, 56]);
  const [error, setError] = useState('');

  const handleCombinationChange = (index: number, delta: number) => {
    const newCombination = [...combination];
    newCombination[index] = (newCombination[index] + delta + 100) % 100;
    setCombination(newCombination);
    setError('');
  };

  const checkCombination = useCallback(() => {
    if (JSON.stringify(combination) === JSON.stringify(CORRECT_COMBINATION)) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Combinación incorrecta');
    }
  }, [combination]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 1500);
      return () => clearTimeout(timer);
    }
  }, [error]);
  
  const [activeTab, setActiveTab] = useState('General');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);


  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-muted">
        <div className={cn(
            "flex justify-center items-center gap-1 transition-all p-2 bg-[#2a2a2a] rounded-3xl shadow-2xl",
            error ? "animate-shake" : ""
          )}>
          {combination.map((value, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
               <Button variant="ghost" size="icon" onClick={() => handleCombinationChange(index, 1)} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <ChevronUp className="h-5 w-5" />
                </Button>
                <PinTumber value={value} />
                <Button variant="ghost" size="icon" onClick={() => handleCombinationChange(index, -1)} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <ChevronDown className="h-5 w-5" />
                </Button>
            </div>
          ))}
        </div>
        
        <div className="h-6 mt-6">
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        </div>

        <Button size="lg" className="w-48 mt-4" onClick={checkCombination}>
            Desbloquear
        </Button>
      </div>
    );
  }

  return (
    <div className="flex bg-muted min-h-screen">
      <TooltipProvider delayDuration={0}>
        <aside className={cn(
            "relative min-h-screen flex flex-col bg-card border-r transition-all duration-300",
            isSidebarExpanded ? "w-72" : "w-20"
          )}>
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-6 w-6 bg-card hover:bg-muted"
                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              >
                <ChevronLeftIcon className={cn("h-4 w-4 transition-transform", !isSidebarExpanded && "rotate-180")} />
              </Button>
            </div>
            
            <div className="flex items-center h-16 border-b px-4">
              <div className={cn("flex items-center gap-3", !isSidebarExpanded && "hidden")}>
                <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="font-bold text-lg">Gerencia</span>
              </div>
              <div className={cn("p-2 bg-primary text-primary-foreground rounded-lg mx-auto", isSidebarExpanded && "hidden")}>
                <TrendingUp className="h-5 w-5" />
              </div>
              <Button variant="ghost" size="icon" className={cn("ml-auto", !isSidebarExpanded && "hidden")}>
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>

          <nav className="flex-1 p-4 space-y-2">
            <p className={cn("px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider", !isSidebarExpanded && "hidden")}>
              Navegación
            </p>
            <ul className="space-y-1 w-full">
              {menuItems.map(item => (
                <li key={item.name}>
                  <ShadTooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        onClick={() => setActiveTab(item.name)}
                        className={cn(
                          "flex items-center py-2 rounded-lg text-sm font-medium transition-colors",
                          "hover:bg-muted hover:text-foreground",
                          activeTab === item.name ? "bg-muted text-foreground font-semibold" : "text-muted-foreground",
                          isSidebarExpanded ? "px-3 gap-3" : "justify-center h-12",
                        )}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        <span className={cn("transition-all", !isSidebarExpanded && "w-0 opacity-0")}>{item.name}</span>
                      </Link>
                    </TooltipTrigger>
                      {!isSidebarExpanded && (
                        <TooltipContent side="right">
                            {item.name}
                        </TooltipContent>
                    )}
                  </ShadTooltip>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t">
             <ShadTooltip>
                <TooltipTrigger asChild>
                  <Button 
                    asChild 
                    variant="ghost" 
                    className={cn(
                      "w-full text-muted-foreground hover:text-foreground", 
                      isSidebarExpanded ? "justify-start gap-3" : "justify-center"
                    )}
                    size={isSidebarExpanded ? 'default' : 'icon'}
                  >
                    <Link href="/dashboard/mapa-clientes">
                      <ArrowLeft className="h-5 w-5 flex-shrink-0" />
                      <span className={cn(
                        "transition-all", 
                        !isSidebarExpanded && "w-0 opacity-0"
                      )}>Volver</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                {!isSidebarExpanded && (
                    <TooltipContent side="right">
                        Volver
                    </TooltipContent>
                )}
            </ShadTooltip>
          </div>
        </aside>
      </TooltipProvider>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gerencia Comercial</h1>
            <p className="text-muted-foreground text-sm">Rendimiento y KPIs clave para Junio 2025.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Stat Cards */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Ventas (Mes)</CardTitle>
                <CardDescription className="text-xs text-green-600">
                  +15.2% vs. mes anterior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{formatCurrency(750000)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Cobranza (Mes)</CardTitle>
                <CardDescription className="text-xs text-green-600">
                  +5.7% vs. mes anterior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{formatCurrency(690000)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Nuevos Clientes</CardTitle>
                 <CardDescription className="text-xs text-red-600">
                  -2.1% vs. mes anterior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">+1,230</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Main Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Resumen de Ventas</CardTitle>
              </CardHeader>
              <CardContent className="h-[350px] w-full">
                <ResponsiveContainer>
                  <AreaChart data={salesTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="fillVentas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                    <Tooltip
                      cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1 }}
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{paddingBottom: '20px'}} />
                    <Area type="monotone" dataKey="Ventas" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#fillVentas)" activeDot={{ r: 8, style: { fill: 'hsl(var(--primary))' } }} />
                    <Area type="monotone" dataKey="Mes Anterior" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Sales Force Chart */}
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Fuerza de Ventas</CardTitle>
                    <CardDescription className="text-xs">Volumen de primas suscritas mensualmente.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesForceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                            <Tooltip
                                cursor={{ fill: 'hsl(var(--muted))' }}
                                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                            />
                            <Legend verticalAlign="top" align="right" iconType="circle" />
                            <Bar dataKey="budget" name="Presupuesto" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="value" name="Ventas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Top Executives */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Rendimiento de Ejecutivos</CardTitle>
                 <CardDescription className="text-xs">Top 4 por ventas en el mes.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topExecutivesData.map((exec) => (
                  <div key={exec.name} className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{exec.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate">{exec.name}</p>
                      <p className="text-xs text-muted-foreground">{formatCurrency(exec.sales)}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
    

    

