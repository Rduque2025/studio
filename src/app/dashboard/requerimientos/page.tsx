
'use client';

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { mockDepartments } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, LayoutGrid, Users, Megaphone, FolderKanban, MoreHorizontal, ChevronRight, ArrowRight } from "lucide-react";
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

interface DepartmentCardProps {
  department: Department;
  isActive: boolean;
}

const DepartmentCard = ({ department, isActive }: DepartmentCardProps) => {
  const Icon = department.icon || MoreHorizontal;
  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 flex flex-col text-left rounded-2xl h-full",
        "bg-card shadow-sm hover:shadow-xl hover:-translate-y-1",
        isActive ? "shadow-xl ring-2 ring-primary" : "shadow-sm"
      )}
    >
      <CardContent className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
              </div>
          </div>
          <div className="flex-grow">
            <p className="text-base font-semibold text-foreground mb-1">{department.name}</p>
            <p className="text-xs text-muted-foreground">{department.description}</p>
          </div>
          <div className="mt-4 text-right">
              <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
      </CardContent>
    </Card>
  );
};


export default function RequerimientosPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const filteredDepartments = activeCategory === 'ALL'
    ? mockDepartments
    : mockDepartments.filter(dept => dept.category === activeCategory);

  return (
    <div className="min-h-screen bg-transparent p-4 sm:p-6 md:p-8">
      <Card className="w-full rounded-3xl bg-transparent p-6 sm:p-8 flex flex-col border-none shadow-none">
        
        <header className="flex justify-between items-center mb-8">
            <div>
                 <Button variant="ghost" size="icon" asChild className="hidden">
                    <Link href="/dashboard">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
            </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Solicitud
          </Button>
        </header>

        <div className="flex-grow grid md:grid-cols-12 gap-8">
          
          <nav className="md:col-span-3 lg:col-span-2">
            <div className="flex flex-col space-y-2">
              {categories.map((category) => {
                const isActive = activeCategory === category.id;
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "flex items-center justify-between gap-3 w-full p-3 rounded-lg text-left transition-colors",
                      isActive 
                        ? "text-primary font-bold" 
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium text-sm">{category.name}</span>
                    </div>
                     {isActive && <div className="h-6 w-1 bg-primary rounded-full" />}
                  </button>
                );
              })}
            </div>
          </nav>

          <Separator orientation="vertical" className="hidden md:block h-auto" />

           <div className="md:col-span-8 lg:col-span-9">
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDepartments.map((dept) => {
                    const departmentDetails = mockDepartments.find(d => d.id === dept.id);
                    if (!departmentDetails) return null;
                    
                    const href = departmentDetails.directLink ? departmentDetails.directLink : `/dashboard/requerimientos/${departmentDetails.id}`;

                    return (
                        <Link href={href} key={dept.id} className="block h-full">
                           <DepartmentCard 
                                department={dept} 
                                isActive={false} // Visual active state handled by menu now
                            />
                        </Link>
                    );
                })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
