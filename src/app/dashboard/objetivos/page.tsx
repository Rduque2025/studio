
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/dashboard/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { Lock, Unlock, ArrowLeft } from 'lucide-react';

// Data copied from mapa-clientes page
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

const monthlyMetaTarget = {
  Ene: 10,
  Feb: 19,
  Mar: 22,
  Abr: 33,
  May: 44,
  Jun: 49,
  Jul: 60,
  Ago: 70,
  Sep: 80,
  Oct: 88,
  Nov: 95,
  Dic: 100,
};

const months = Object.keys(monthlyGoalsData) as (keyof typeof monthlyGoalsData)[];

const lineChartData = months.map(month => ({
  name: month,
  "Progreso Primas": monthlyGoalsData[month].primas,
  "Meta": monthlyMetaTarget[month],
}));


export default function ObjetivosDashboardPage() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [selectedMonth, setSelectedMonth] = useState<keyof typeof monthlyGoalsData>('Jun');


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

    const handleChartClick = (data: any) => {
        if (data && data.activeLabel) {
          const monthKey = data.activeLabel as keyof typeof monthlyGoalsData;
          if (months.includes(monthKey)) {
            setSelectedMonth(monthKey);
          }
        }
    };
    
    const barChartData = months.map(month => ({
        name: month,
        "Clientes Nuevos": monthlyGoalsData[month].clientes,
        "Cobranza (%)": monthlyGoalsData[month].cobranza,
    }));

    const selectedMonthData = monthlyGoalsData[selectedMonth];
    const radialChartData = [
        { name: 'Primas', value: selectedMonthData.primas, fill: 'hsl(var(--chart-1))' },
        { name: 'Clientes', value: selectedMonthData.clientes, fill: 'hsl(var(--chart-2))' },
        { name: 'Cobranza', value: selectedMonthData.cobranza, fill: 'hsl(var(--chart-3))' },
        { name: 'NPS', value: selectedMonthData.nps, fill: 'hsl(var(--chart-4))' },
    ];


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
    
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
            <Button asChild variant="outline">
                <Link href="/dashboard/mapa-clientes">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a la página anterior
                </Link>
            </Button>
        </div>
        <SectionWrapper 
            title="Dashboard Detallado de Objetivos"
            description="Análisis visual del progreso mensual de las primas suscritas frente a la meta establecida."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-lg lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Progreso Mensual de Primas Suscritas</CardTitle>
                        <CardDescription>
                        Haga clic en un punto del gráfico para ver los detalles de un mes específico. Mes seleccionado: {selectedMonth}.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full h-96">
                            <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={lineChartData}
                                onClick={handleChartClick}
                                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                            >
                                <defs>
                                <linearGradient id="colorProgreso" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
                                cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 2, strokeDasharray: '3 3' }}
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    borderColor: 'hsl(var(--border))',
                                    borderRadius: 'var(--radius)',
                                }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="Meta" 
                                    stroke="hsl(var(--muted-foreground))" 
                                    strokeWidth={2}
                                    strokeDasharray="5 5" 
                                    dot={false}
                                    activeDot={false}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="Progreso Primas" 
                                    stroke="hsl(var(--primary))" 
                                    strokeWidth={2.5}
                                    fillOpacity={1}
                                    fill="url(#colorProgreso)"
                                    activeDot={{ r: 6, style: { fill: 'hsl(var(--primary))' } }}
                                    dot={(props) => {
                                        const { cx, cy, payload } = props;
                                        if (payload.name === selectedMonth) {
                                            return <circle key={payload.name} cx={cx} cy={cy} r={6} fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth={2} />;
                                        }
                                        return null;
                                    }}
                                />
                            </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Clientes Nuevos vs. Cobranza</CardTitle>
                        <CardDescription>
                            Comparativa mensual de adquisición de clientes y progreso de cobranza.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barChartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
                                        tickLine={false}
                                        axisLine={false}
                                        label={{ value: 'Unidades / %', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: '12px', fill: 'hsl(var(--muted-foreground))' } }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'hsl(var(--muted))' }}
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--background))',
                                            borderColor: 'hsl(var(--border))',
                                            borderRadius: 'var(--radius)',
                                        }}
                                    />
                                    <Legend wrapperStyle={{fontSize: "12px", paddingTop: '10px'}} />
                                    <Bar dataKey="Clientes Nuevos" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="Cobranza (%)" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Resumen de KPIs para {selectedMonth}</CardTitle>
                        <CardDescription>
                            Progreso de los indicadores clave para el mes seleccionado.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart 
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius="10%" 
                                    outerRadius="80%" 
                                    barSize={15} 
                                    data={radialChartData}
                                >
                                    <RadialBar
                                        label={{ position: 'insideStart', fill: '#fff', fontSize: '12px' }}
                                        background
                                        dataKey="value"
                                    />
                                    <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={{top: '50%', right: 0, transform: 'translate(0, -50%)', lineHeight: '24px'}} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--background))',
                                            borderColor: 'hsl(var(--border))',
                                            borderRadius: 'var(--radius)',
                                        }}
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </SectionWrapper>
      </div>
    );
}
