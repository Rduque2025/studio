
"use client";

import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { InteractiveVenezuelaMap } from "@/components/dashboard/venezuela-map";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for the bar chart
const businessLinesData = [
  { name: "Personas", clients: 15320 },
  { name: "Automóvil", clients: 12510 },
  { name: "Patrimoniales", clients: 8120 },
];

// Configuration for the chart, defining labels and colors
const chartConfig = {
  clients: { // Corresponds to the dataKey in the <Bar /> component
    label: "Nº de Clientes",
  },
  // Keys here should match the 'name' field in businessLinesData for Cell fills and Tooltip labels
  Personas: {
    label: "Personas",
    color: "hsl(var(--chart-1))", // Uses CSS variables defined in globals.css
  },
  Automóvil: {
    label: "Automóvil",
    color: "hsl(var(--chart-2))",
  },
  Patrimoniales: {
    label: "Patrimoniales",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function MapaClientesPage() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      <SectionWrapper
        title="Mapa Interactivo de Clientes"
        description="Visualice la distribución de clientes a nivel nacional y por estado."
      >
        <InteractiveVenezuelaMap />
      </SectionWrapper>

      <SectionWrapper
        title="Clientes por Líneas de Negocio"
        description="Distribución de clientes según las principales líneas de negocio a nivel nacional."
      >
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Distribución Nacional de Clientes</CardTitle>
            <CardDescription>Total de clientes activos por cada línea de negocio principal.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={businessLinesData}
                  margin={{
                    top: 20, // Added top margin for tooltip space
                    right: 20,
                    left: 10,
                    bottom: 5,
                  }}
                  accessibilityLayer // For better accessibility
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name" // Categories for X-axis
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis
                    tickFormatter={(value) => value.toLocaleString()} // Format Y-axis numbers
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted))" }} // Background for hovered bar
                    content={<ChartTooltipContent />} // Use ShadCN's styled tooltip
                  />
                  <Bar
                    dataKey="clients" // The value to plot for each bar
                    radius={[8, 8, 0, 0]} // Rounded top corners for bars
                  >
                    {businessLinesData.map((entry) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={chartConfig[entry.name as keyof typeof chartConfig]?.color || "hsl(var(--foreground))"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
