
'use client';

import React, { useState, useEffect } from 'react';
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
  ArrowDown,
  Delete,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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

// --- COMPONENT ---
export default function GerenciaComercialDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('General');

  const PIN_LENGTH = 4;
  const CORRECT_PIN = '1234';

  const handlePinInput = (digit: string) => {
    if (pin.length < PIN_LENGTH) {
      setPin(pin + digit);
      setError('');
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
    setError('');
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
        setPin('');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (pin.length === PIN_LENGTH) {
      if (pin === CORRECT_PIN) {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('PIN incorrecto');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted">
        <Card className="w-full max-w-xs p-8 text-center shadow-lg rounded-2xl">
          <div className="mb-8">
             <Lock className="mx-auto h-8 w-8 text-primary" />
          </div>
          <div className="flex justify-center gap-4 mb-10">
            {[...Array(PIN_LENGTH)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-4 w-4 rounded-full border transition-colors duration-300",
                  error 
                    ? "bg-destructive/20 border-destructive" 
                    : pin.length > i 
                    ? "bg-primary border-primary" 
                    : "border-muted-foreground/30 bg-transparent"
                )}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[...'123456789'].map((num) => (
              <Button
                key={num}
                variant="ghost"
                className="text-2xl font-light h-16 w-16 rounded-full"
                onClick={() => handlePinInput(num)}
              >
                {num}
              </Button>
            ))}
            <div />
            <Button
              variant="ghost"
              className="text-2xl font-light h-16 w-16 rounded-full"
              onClick={() => handlePinInput('0')}
            >
              0
            </Button>
            <Button
              variant="ghost"
              className="text-2xl h-16 w-16 rounded-full flex items-center justify-center"
              onClick={handleBackspace}
            >
              <Delete className="h-6 w-6" />
            </Button>
          </div>
           <div className="h-6 mt-4">
             {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-muted min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-background p-4 flex-shrink-0 border-r min-h-screen sticky top-0 h-screen">
          <nav className="pt-8">
            <ul className="space-y-2">
              {menuItems.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setActiveTab(item.name)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground transition-colors",
                      "hover:bg-muted hover:text-foreground",
                      activeTab === item.name && "bg-primary text-primary-foreground font-semibold"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto absolute bottom-4 w-[calc(100%-2rem)]">
              <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/dashboard/mapa-clientes">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver
                  </Link>
              </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard de Analíticas</h1>
              <p className="text-muted-foreground text-sm">Rendimiento y KPIs clave para Junio 2025.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Stat Cards */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Ventas (Mes)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{formatCurrency(750000)}</p>
                   <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <span className="flex items-center text-green-600 font-semibold"><TrendingUp className="h-4 w-4 mr-1" /> 15.2%</span>
                    <span>vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Cobranza (Mes)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{formatCurrency(690000)}</p>
                   <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <span className="flex items-center text-green-600 font-semibold"><TrendingUp className="h-4 w-4 mr-1" /> 5.7%</span>
                    <span>vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Nuevos Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">+1,230</p>
                   <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <span className="flex items-center text-red-600 font-semibold"><ArrowDown className="h-4 w-4 mr-1" /> 2.1%</span>
                    <span>vs. mes anterior</span>
                  </div>
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
                      <CardTitle className="text-lg font-semibold">Fuerza de Ventas vs Presupuesto</CardTitle>
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
    </div>
  );
}

    