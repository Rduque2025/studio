'use client';

import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { mockDepartments } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Department } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import Image from "next/image";

const DepartmentCard = ({ department }: { department: Department }) => {
  const linkHref = department.directLink ? department.directLink : `/dashboard/requerimientos/${department.id}`;
  
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 rounded-3xl text-primary-foreground h-full"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--primary)))'
      }}
    >
      <div className="flex flex-col md:flex-row items-center h-full">
        <div className="p-6 md:p-8 flex-grow flex flex-col">
          <CardTitle className="text-base font-bold mb-4 flex-grow">{department.name}</CardTitle>
          <Button asChild variant="link" className="p-0 h-auto font-semibold text-primary-foreground/80 hover:text-primary-foreground self-start">
            <Link href={linkHref} className="flex items-center gap-2">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-black/20">
                <ArrowRight className="h-4 w-4" />
              </span>
              Saber más
            </Link>
          </Button>
        </div>
        <div className="w-full md:w-40 h-32 md:h-full flex-shrink-0 relative">
          <Image 
            src={`https://placehold.co/300x300.png`} 
            alt={department.name} 
            layout="fill"
            objectFit="cover"
            className="md:rounded-l-none md:rounded-r-3xl"
          />
        </div>
      </div>
    </Card>
  );
};

export default function RequerimientosPage() {
  const categories = ["ALL", "Capital Humano", "Mercadeo", "Proyectos", "Otros"];
  
  const getDepartmentsByCategory = (category: string) => {
    if (category === "ALL") {
      return mockDepartments;
    }
    return mockDepartments.filter(d => d.category === category);
  }

  return (
    <div className="bg-muted/30 min-h-[calc(100vh-6rem)] relative">
      <div className="container mx-auto py-12 px-4">
        
        <Tabs defaultValue="ALL" className="w-full">
          <TabsList className="flex items-center justify-between w-full max-w-xl mx-auto mb-12 bg-transparent p-0">
            {categories.map(cat => (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="text-muted-foreground data-[state=active]:text-primary data-[state=active]:text-sm data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:bg-transparent relative data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-[-8px] data-[state=active]:after:left-1/2 data-[state=active]:after:-translate-x-1/2 data-[state=active]:after:w-1/2 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary transition-all"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(cat => (
             <TabsContent key={cat} value={cat}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </Button>
      </div>

    </div>
  );
}
