
'use client';

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { mockDepartments } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, LayoutGrid, Users, Megaphone, FolderKanban, MoreHorizontal } from "lucide-react";
import type { Department } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";


const categories = [
    { id: "ALL", name: "ALL", icon: LayoutGrid },
    { id: "Capital Humano", name: "Capital Humano", icon: Users },
    { id: "Mercadeo", name: "Mercadeo", icon: Megaphone },
    { id: "Proyectos", name: "Proyectos", icon: FolderKanban },
    { id: "Otros", name: "Otros", icon: MoreHorizontal }
];

export default function RequerimientosPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const selectedCategoryDetails = categories.find(c => c.id === activeCategory);

  const filteredDepartments = activeCategory === 'ALL'
    ? mockDepartments
    : mockDepartments.filter(dept => dept.category === activeCategory);

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-muted/40 p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-6xl min-h-[70vh] rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Solicitud
          </Button>
        </header>

        {/* Main Content */}
        <div className="flex-grow grid md:grid-cols-12 gap-8">
          
          {/* Left Navigation */}
          <nav className="md:col-span-3 lg:col-span-2 relative">
            <div className="flex flex-col space-y-2">
              {categories.map((category) => {
                const isActive = activeCategory === category.id;
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{category.name}</span>
                    {isActive && (
                      <div className="absolute right-0 h-full w-1 bg-primary rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          <Separator orientation="vertical" className="hidden md:block h-auto" />

          {/* Right Content */}
          <div className="md:col-span-8 lg:col-span-9 flex flex-col">
              {selectedCategoryDetails && (
                 <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
                   <div className="p-4 bg-muted rounded-full mb-4">
                     <selectedCategoryDetails.icon className="h-12 w-12 text-muted-foreground" />
                   </div>
                   <h2 className="text-2xl font-bold text-foreground mb-2">
                      {selectedCategoryDetails.id === 'ALL' ? 'Todos los Requerimientos' : `Categoría: ${selectedCategoryDetails.name}`}
                   </h2>
                   <p className="text-muted-foreground max-w-md">
                      {selectedCategoryDetails.id === 'ALL' 
                        ? 'Explore todas las solicitudes disponibles en las diferentes unidades y gerencias.'
                        : `Encuentre todas las solicitudes y recursos relacionados con ${selectedCategoryDetails.name}.`
                      }
                   </p>
                    <div className="mt-8 w-full">
                       <Link href={`/dashboard/requerimientos`} className="text-sm font-semibold text-primary hover:underline">
                          Ver todas las solicitudes de esta categoría
                       </Link>
                    </div>
                 </div>
              )}
          </div>

        </div>
      </Card>
    </div>
  );
}
