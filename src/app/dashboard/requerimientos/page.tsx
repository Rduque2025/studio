
'use client';

import Link from "next/link";
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDepartments } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Plus, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Department } from "@/lib/placeholder-data";

const DepartmentCard = ({ department }: { department: Department }) => {
  const linkHref = department.directLink ? department.directLink : `/dashboard/requerimientos/${department.id}`;
  
  return (
    <Card className="bg-card hover:border-primary/20 transition-colors shadow-sm border p-6 rounded-2xl flex flex-col min-h-[220px]">
      <CardHeader className="p-0 flex-row justify-between items-start">
        <CardTitle className="text-base font-semibold text-foreground">{department.name}</CardTitle>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0 flex-grow flex flex-col justify-between mt-2">
        <p className="text-sm text-muted-foreground">
          {department.description}
        </p>
        <div className="flex justify-end mt-4">
          <Button asChild variant="default" className="rounded-full h-10 w-10 p-0 bg-foreground hover:bg-foreground/80">
            <Link href={linkHref}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function RequerimientosPage() {
  const categories = ["ALL", "TI", "RRHH", "General"];
  
  const getDepartmentsByCategory = (category: string) => {
    if (category === "ALL") {
      return mockDepartments.filter(d => ['rh', 'it', 'servicios', 'hcm', 'vacaciones', 'finanzas'].includes(d.id));
    }
    return mockDepartments.filter(d => d.category === category);
  }

  return (
    <div className="bg-muted/30 min-h-[calc(100vh-6rem)] relative">
      <div className="container mx-auto py-12 px-4">
        
        <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Portal de Requerimientos</h1>
            <p className="text-base text-muted-foreground mt-2 max-w-2xl">
              Gestiona todas tus solicitudes en un solo lugar. Selecciona una categoría y accede al formulario que necesites.
            </p>
        </header>
        
        <Tabs defaultValue="ALL" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4 mb-12 bg-transparent p-0">
            {categories.map(cat => (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:text-lg data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:bg-transparent relative data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-[-8px] data-[state=active]:after:left-1/2 data-[state=active]:after:-translate-x-1/2 data-[state=active]:after:w-1/2 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary transition-all"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(cat => (
             <TabsContent key={cat} value={cat}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getDepartmentsByCategory(cat).map((dept) => (
                    <DepartmentCard key={dept.id} department={dept} />
                  ))}
                </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="fixed bottom-8 right-8">
        <Button className="rounded-full h-12 shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          Añadir Área
          <RefreshCw className="ml-2 h-4 w-4" />
        </Button>
      </div>

    </div>
  );
}
