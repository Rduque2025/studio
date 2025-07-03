
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  ArrowLeft, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  LayoutGrid,
  FileSignature,
  CircleDollarSign,
  Package,
  FolderKanban,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

// --- MOCK DATA ---
const salesTrendData = [
  { name: 'Ene', Ventas: 2300 },
  { name: 'Feb', Ventas: 2100 },
  { name: 'Mar', Ventas: 3200 },
  { name: 'Abr', Ventas: 2800 },
  { name: 'May', Ventas: 3500 },
  { name: 'Jun', Ventas: 4100 },
];

const topExecutivesData = [
  { name: 'Ana Pérez', sales: 120000, goal: 150000, performance: 80 },
  { name: 'Carlos Rivas', sales: 110000, goal: 140000, performance: 78 },
  { name: 'Sofía Castillo', sales: 95000, goal: 130000, performance: 73 },
  { name: 'Luis Mendez', sales: 80000, goal: 120000, performance: 67 },
  { name: 'Maria Garcia', sales: 75000, goal: 110000, performance: 68 },
];

const salesForceData = [
    { month: 'Ene', value: 250 },
    { month: 'Feb', value: 280 },
    { month: 'Mar', value: 350 },
    { month: 'Abr', value: 320 },
    { month: 'May', value: 410 },
    { month: 'Jun', value: 450 },
    { month: 'Jul', value: 430 },
    { month: 'Ago', value: 480 },
    { month: 'Sep', value: 460 },
    { month: 'Oct', value: 500 },
    { month: 'Nov', value: 520 },
    { month: 'Dic', value: 550 },
];

const kpiClosingRateData = [{ name: 'completed', value: 65 }, { name: 'remaining', value: 35 }];
const kpiNewClientsData = [{ name: 'completed', value: 85 }, { name: 'remaining', value: 15 }];
const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))'];

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
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('General');

  const CORRECT_PASSWORD = '1234';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Contraseña incorrecta. Intente de nuevo.');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted">
        <Card className="w-full max-w-sm mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Acceso Protegido</CardTitle>
            <CardDescription>
              Este dashboard es confidencial. Por favor, ingrese la contraseña para continuar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-muted-foreground">Contraseña</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="****"
                  required
                />
              </div>
              {error && <p className="text-sm font-medium text-destructive">{error}</p>}
              <Button type="submit" className="w-full">
                Acceder al Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-muted min-h-screen">
      <div className="container mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 bg-background p-4 flex-shrink-0 border-r min-h-screen">
          <div className="mb-8 flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                  <Target className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold">Comercial</h2>
          </div>
          <nav>
            <ul className="space-y-2">
              {menuItems.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setActiveTab(item.name)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground transition-colors",
                      "hover:bg-muted hover:text-foreground",
                      activeTab === item.name && "bg-primary/10 text-primary font-semibold"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-8">
              <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/dashboard/mapa-clientes">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver
                  </Link>
              </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard: Gerencia Comercial</h1>
              <p className="text-muted-foreground text-sm">Rendimiento y KPIs clave para Junio 2025.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Stat Cards */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Ventas (Mes)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{formatCurrency(750000)}</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" /> +15.2%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Cobranza (Mes)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{formatCurrency(690000)}</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" /> +5.7%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Nuevos Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">+1,230</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    vs. 1,256 mes anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Primas Suscritas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{formatCurrency(1250000)}</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" /> +8.1%
                  </p>
                </CardContent>
              </Card>

              {/* Main Trend Chart */}
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Indicador de Tendencia de Ventas</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] w-full">
                  <ResponsiveContainer>
                    <LineChart data={salesTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                      <Tooltip
                        cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
                        contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                      />
                      <Line type="monotone" dataKey="Ventas" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Executives & KPIs */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Top Rendimiento (Ejecutivos)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topExecutivesData.map((exec) => (
                    <div key={exec.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{exec.name}</span>
                        <span className="text-muted-foreground">{exec.performance}%</span>
                      </div>
                      <Progress value={exec.performance} indicatorClassName="bg-primary" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card>
                      <CardHeader>
                          <CardTitle className="text-center text-sm font-medium text-muted-foreground">Tasa de Cierre</CardTitle>
                      </CardHeader>
                      <CardContent className="flex items-center justify-center h-32">
                          <div className="relative h-full w-full">
                              <ResponsiveContainer>
                                  <PieChart>
                                      <Pie data={kpiClosingRateData} cx="50%" cy="50%" innerRadius="70%" outerRadius="90%" dataKey="value" startAngle={90} endAngle={450} stroke="none">
                                          {kpiClosingRateData.map((entry, index) => (
                                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                          ))}
                                      </Pie>
                                  </PieChart>
                              </ResponsiveContainer>
                              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                  <span className="text-3xl font-bold text-foreground">{kpiClosingRateData[0].value}%</span>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader>
                          <CardTitle className="text-center text-sm font-medium text-muted-foreground">Meta Nuevos Clientes</CardTitle>
                      </CardHeader>
                      <CardContent className="flex items-center justify-center h-32">
                          <div className="relative h-full w-full">
                              <ResponsiveContainer>
                                  <PieChart>
                                      <Pie data={kpiNewClientsData} cx="50%" cy="50%" innerRadius="70%" outerRadius="90%" dataKey="value" startAngle={90} endAngle={450} stroke="none">
                                          {kpiNewClientsData.map((entry, index) => (
                                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                          ))}
                                      </Pie>
                                  </PieChart>
                              </ResponsiveContainer>
                              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                  <span className="text-3xl font-bold text-foreground">{kpiNewClientsData[0].value}%</span>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              </div>


              {/* Sales Force Chart */}
              <Card className="lg:col-span-4">
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
                              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          </BarChart>
                      </ResponsiveContainer>
                  </CardContent>
              </Card>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
