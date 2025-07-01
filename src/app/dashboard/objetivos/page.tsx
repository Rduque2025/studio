
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Lock, Unlock, ArrowLeft } from 'lucide-react';

const monthlyGoalsData = {
  Ene: { primas: 8, clientes: 15, cobranza: 6, nps: 88 },
  Feb: { primas: 16, clientes: 30, cobranza: 12, nps: 89 },
  Mar: { primas: 24, clientes: 47, cobranza: 18, nps: 90 },
  Abr: { primas: 32, clientes: 55, cobranza: 25, nps: 91 },
  May: { primas: 40, clientes: 62, cobranza: 33, nps: 91 },
  Jun: { primas: 50, clientes: 68, cobranza: 42, nps: 92 },
  Jul: { primas: 0, clientes: 0, cobranza: 0, nps: 0 },
  Ago: { primas: 0, clientes: 0, cobranza: 0, nps: 0 },
  Sep: { primas: 0, clientes: 0, cobranza: 0, nps: 0 },
  Oct: { primas: 0, clientes: 0, cobranza: 0, nps: 0 },
  Nov: { primas: 0, clientes: 0, cobranza: 0, nps: 0 },
  Dic: { primas: 0, clientes: 0, cobranza: 0, nps: 0 },
};

const months = Object.keys(monthlyGoalsData) as (keyof typeof monthlyGoalsData)[];

const barChartData = months.map(month => ({
  name: month,
  "Primas": monthlyGoalsData[month].primas,
}));


export default function ObjetivosDashboardPage() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === '1234') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Contraseña incorrecta. Por favor, intente de nuevo.');
            setPassword('');
        }
    };
    
    const selectedMonth: keyof typeof monthlyGoalsData = 'Jun';
    const selectedMonthData = monthlyGoalsData[selectedMonth];
    const kpis = {
      primas: { label: 'Primas Suscritas', value: selectedMonthData.primas },
      clientes: { label: 'Clientes Nuevos', value: selectedMonthData.clientes },
      cobranza: { label: 'Meta de Cobranza', value: selectedMonthData.cobranza },
      nps: { label: 'NPS (Satisfacción)', value: selectedMonthData.nps }
    };

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto py-8 px-4 flex justify-center items-center min-h-[calc(100vh-200px)]">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lock className="h-5 w-5" />
                            Acceso Restringido
                        </CardTitle>
                        <CardDescription>
                            Esta sección contiene información confidencial.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label htmlFor="password-input" className="text-sm font-medium text-muted-foreground">Contraseña</label>
                                <Input 
                                    id="password-input"
                                    type="password" 
                                    placeholder="Ingrese la contraseña" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            {error && <p className="text-sm text-destructive">{error}</p>}
                            <Button type="submit" className="w-full">
                                <Unlock className="mr-2 h-4 w-4" />
                                Acceder
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const npsData = [
        { name: 'value', value: kpis.nps.value },
        { name: 'remaining', value: 100 - kpis.nps.value },
    ];
    
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
              <h1 className="text-3xl font-bold">Estadísticas</h1>
              <p className="text-muted-foreground">Análisis de objetivos clave para {selectedMonth}.</p>
          </div>
          <Button asChild variant="outline">
              <Link href="/dashboard/mapa-clientes">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver
              </Link>
          </Button>
        </div>

        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 shadow-sm">
                    <CardHeader>
                        <CardTitle>Progreso de Primas Suscritas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barChartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                    <XAxis 
                                        dataKey="name" 
                                        stroke="hsl(var(--muted-foreground))" 
                                        fontSize={12} 
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis 
                                        stroke="hsl(var(--muted-foreground))" 
                                        fontSize={12} 
                                        unit="%" 
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'hsl(var(--muted))' }}
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--background))',
                                            borderColor: 'hsl(var(--border))',
                                            borderRadius: 'var(--radius)',
                                            boxShadow: 'hsl(var(--shadow))',
                                        }}
                                    />
                                    <Bar dataKey="Primas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-1 shadow-sm">
                    <CardHeader>
                        <CardTitle>NPS (Satisfacción)</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center pt-8">
                        <div className="w-48 h-48 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={npsData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius="70%"
                                        outerRadius="90%"
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={450}
                                        stroke="none"
                                    >
                                        <Cell fill="hsl(var(--primary))" />
                                        <Cell fill="hsl(var(--muted))" />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-bold text-foreground">{kpis.nps.value}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {Object.values(kpis).map(kpi => (
                     <Card key={kpi.label} className="shadow-sm">
                         <CardHeader>
                            <CardDescription>{kpi.label}</CardDescription>
                             <CardTitle className="text-4xl font-bold">{kpi.value}{kpi.label !== 'Clientes Nuevos' ? '%' : ''}</CardTitle>
                         </CardHeader>
                     </Card>
                 ))}
            </div>
        </div>
      </div>
    );
}
