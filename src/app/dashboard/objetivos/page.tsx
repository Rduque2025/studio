
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
  MoreHorizontal,
  Check,
  X as XIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip as ShadTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getCommercialData, type CommercialData } from '@/ai/flows/get-commercial-data-flow';
import { Skeleton } from '@/components/ui/skeleton';


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

const PinTumber = ({ value, isFocused, onClick }: { value: number; isFocused: boolean; onClick: () => void }) => {
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-28 h-20 rounded-2xl bg-[#333] shadow-lg flex items-center justify-center overflow-hidden transition-all duration-200 outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-muted"
      )}
    >
      <span className={cn(
        "font-sans text-4xl font-bold z-10 transition-all duration-300",
        isFocused ? "scale-110 text-white" : "scale-90 text-white/50"
      )}>
        {formatNumber(value)}
      </span>
    </button>
  );
};


const AuthToggle = ({ onCheck, onError, onIdle }: { onCheck: () => boolean; onError: () => void; onIdle: () => void; }) => {
    const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');

    const handleClick = () => {
        if (status !== 'idle') return;

        setStatus('checking');
        const isCorrect = onCheck();

        setTimeout(() => {
            if (isCorrect) {
                setStatus('success');
            } else {
                setStatus('error');
                onError();
                setTimeout(() => {
                    setStatus('idle');
                    onIdle();
                }, 1000);
            }
        }, 500);
    };

    const isToggled = status === 'success' || status === 'checking';
    
    return (
        <button
            onClick={handleClick}
            className={cn(
                "relative flex items-center h-14 w-32 rounded-full transition-colors duration-300",
                {
                    "bg-[#333]": status === 'idle' || status === 'checking',
                    "bg-green-500": status === 'success',
                    "bg-red-500": status === 'error',
                }
            )}
        >
            <div className={cn(
                "absolute top-1/2 -translate-y-1/2 flex items-center justify-center h-12 w-12 bg-white rounded-full shadow-lg transform transition-transform duration-300 ease-in-out",
                {
                    "left-1": status === 'idle',
                    "left-[calc(100%-3.25rem)]": isToggled || status === 'error',
                }
            )}>
                {status === 'idle' && <Lock className="h-5 w-5 text-gray-400" />}
                {status === 'success' && <Check className="h-5 w-5 text-green-500" />}
                {status === 'error' && <XIcon className="h-5 w-5 text-red-500" />}
            </div>
        </button>
    );
};


// --- MAIN COMPONENT ---
export default function GerenciaComercialDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [combination, setCombination] = useState([0, 0, 0]);
  const [isError, setIsError] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [inputBuffer, setInputBuffer] = useState('');
  const [dashboardData, setDashboardData] = useState<CommercialData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleArrowChange = (index: number, delta: number) => {
    const newCombination = [...combination];
    newCombination[index] = (newCombination[index] + delta + 100) % 100;
    setCombination(newCombination);
    setInputBuffer('');
  };

  const checkCombination = useCallback(() => {
    const isCorrect = JSON.stringify(combination) === JSON.stringify(CORRECT_COMBINATION);
    if (isCorrect) {
        setTimeout(() => {
            setIsAuthenticated(true);
        }, 800);
    }
    return isCorrect;
  }, [combination]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (focusedIndex === null) return;
      
      e.preventDefault();

      if (e.key >= '0' && e.key <= '9') {
        const newBuffer = inputBuffer + e.key;
        if (newBuffer.length <= 2) {
          setInputBuffer(newBuffer);
          if (newBuffer.length === 2) {
            const newCombination = [...combination];
            newCombination[focusedIndex] = parseInt(newBuffer, 10);
            setCombination(newCombination);
            setInputBuffer('');
            // Move to next input
            setFocusedIndex((prev) => (prev !== null ? (prev + 1) % 3 : 0));
          }
        }
      } else if (e.key === 'ArrowUp') {
        handleArrowChange(focusedIndex, 1);
      } else if (e.key === 'ArrowDown') {
        handleArrowChange(focusedIndex, -1);
      } else if (e.key === 'ArrowRight') {
        setFocusedIndex((prev) => (prev !== null ? (prev + 1) % 3 : 0));
      } else if (e.key === 'ArrowLeft') {
        setFocusedIndex((prev) => (prev !== null ? (prev - 1 + 3) % 3 : 0));
      } else if (e.key === 'Enter') {
        // The toggle now handles the check
      } else if (e.key === 'Backspace') {
        setInputBuffer(inputBuffer.slice(0, -1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedIndex, inputBuffer, combination, handleArrowChange, checkCombination]);
  
  const [activeTab, setActiveTab] = useState('General');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const data = await getCommercialData();
          setDashboardData(data);
        } catch (error) {
          console.error("Error fetching commercial data:", error);
          // Handle error state if needed
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);


  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-muted" onClick={() => setFocusedIndex(null)}>
        <div className="w-full max-w-xs flex flex-col items-center">
            <div className={cn(
                "flex justify-center items-center gap-1 transition-all p-2 bg-[#2a2a2a] rounded-3xl shadow-2xl w-full",
                isError ? "animate-shake" : ""
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {combination.map((value, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                   <Button variant="ghost" size="icon" onClick={() => handleArrowChange(index, 1)} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <ChevronUp className="h-5 w-5" />
                    </Button>
                    <PinTumber 
                      value={value}
                      isFocused={focusedIndex === index}
                      onClick={() => setFocusedIndex(index)}
                    />
                    <Button variant="ghost" size="icon" onClick={() => handleArrowChange(index, -1)} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <ChevronDown className="h-5 w-5" />
                    </Button>
                </div>
              ))}
            </div>
            
            <div className="h-6 mt-6" />

            <div className="mt-4">
               <AuthToggle 
                  onCheck={checkCombination} 
                  onError={() => setIsError(true)} 
                  onIdle={() => setIsError(false)} 
                />
            </div>
        </div>
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
            {isLoading || !dashboardData ? (
              <>
                <Card><CardHeader><Skeleton className="h-5 w-24" /><Skeleton className="h-4 w-32" /></CardHeader><CardContent><Skeleton className="h-10 w-36" /></CardContent></Card>
                <Card><CardHeader><Skeleton className="h-5 w-24" /><Skeleton className="h-4 w-32" /></CardHeader><CardContent><Skeleton className="h-10 w-36" /></CardContent></Card>
                <Card><CardHeader><Skeleton className="h-5 w-24" /><Skeleton className="h-4 w-32" /></CardHeader><CardContent><Skeleton className="h-10 w-36" /></CardContent></Card>
              </>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Ventas (Mes)</CardTitle>
                    <CardDescription className={cn(
                      "text-xs",
                      dashboardData.kpis.monthlySales.change >= 0 ? 'text-green-600' : 'text-red-600'
                    )}>
                      {dashboardData.kpis.monthlySales.change >= 0 ? '+' : ''}
                      {dashboardData.kpis.monthlySales.change.toFixed(1)}% vs. mes anterior
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{formatCurrency(dashboardData.kpis.monthlySales.value)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Cobranza (Mes)</CardTitle>
                     <CardDescription className={cn(
                      "text-xs",
                      dashboardData.kpis.monthlyCollection.change >= 0 ? 'text-green-600' : 'text-red-600'
                    )}>
                      {dashboardData.kpis.monthlyCollection.change >= 0 ? '+' : ''}
                      {dashboardData.kpis.monthlyCollection.change.toFixed(1)}% vs. mes anterior
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{formatCurrency(dashboardData.kpis.monthlyCollection.value)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Nuevos Clientes</CardTitle>
                     <CardDescription className={cn(
                      "text-xs",
                      dashboardData.kpis.newClients.change >= 0 ? 'text-green-600' : 'text-red-600'
                    )}>
                      {dashboardData.kpis.newClients.change >= 0 ? '+' : ''}
                      {dashboardData.kpis.newClients.change.toFixed(1)}% vs. mes anterior
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">+{dashboardData.kpis.newClients.value.toLocaleString()}</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {isLoading || !dashboardData ? (
                <Card>
                  <CardHeader><Skeleton className="h-6 w-40" /></CardHeader>
                  <CardContent><Skeleton className="h-[350px] w-full" /></CardContent>
                </Card>
            ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Resumen de Ventas</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[350px] w-full">
                    <ResponsiveContainer>
                      <AreaChart data={dashboardData.salesTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                        <Area type="monotone" dataKey="currentMonth" name="Ventas" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#fillVentas)" activeDot={{ r: 8, style: { fill: 'hsl(var(--primary))' } }} />
                        <Area type="monotone" dataKey="previousMonth" name="Mes Anterior" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {isLoading || !dashboardData ? (
              <>
                <Card className="lg:col-span-2">
                  <CardHeader><Skeleton className="h-6 w-32" /><Skeleton className="h-4 w-48" /></CardHeader>
                  <CardContent><Skeleton className="h-[300px] w-full" /></CardContent>
                </Card>
                <Card>
                  <CardHeader><Skeleton className="h-6 w-32" /><Skeleton className="h-4 w-48" /></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4"><Skeleton className="h-10 w-10 rounded-full" /><div className="space-y-2"><Skeleton className="h-4 w-[150px]" /><Skeleton className="h-4 w-[100px]" /></div></div>
                    <div className="flex items-center gap-4"><Skeleton className="h-10 w-10 rounded-full" /><div className="space-y-2"><Skeleton className="h-4 w-[150px]" /><Skeleton className="h-4 w-[100px]" /></div></div>
                    <div className="flex items-center gap-4"><Skeleton className="h-10 w-10 rounded-full" /><div className="space-y-2"><Skeleton className="h-4 w-[150px]" /><Skeleton className="h-4 w-[100px]" /></div></div>
                    <div className="flex items-center gap-4"><Skeleton className="h-10 w-10 rounded-full" /><div className="space-y-2"><Skeleton className="h-4 w-[150px]" /><Skeleton className="h-4 w-[100px]" /></div></div>
                  </CardContent>
                </Card>
              </>
            ) : (
            <>
              <Card className="lg:col-span-2">
                  <CardHeader>
                      <CardTitle className="text-lg font-semibold">Fuerza de Ventas</CardTitle>
                      <CardDescription className="text-xs">Volumen de primas suscritas mensualmente.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={dashboardData.salesForce} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
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

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Rendimiento de Ejecutivos</CardTitle>
                   <CardDescription className="text-xs">Top 4 por ventas en el mes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashboardData.topExecutives.map((exec) => (
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
            </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
    

    






    



    

    
