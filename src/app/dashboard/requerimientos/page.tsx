
'use client';

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { mockDepartments } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, LayoutGrid, Users, Megaphone, FolderKanban, MoreHorizontal, ChevronRight } from "lucide-react";
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
}

const DepartmentCard = ({ department }: DepartmentCardProps) => {
  const Icon = department.icon || MoreHorizontal;
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 flex flex-col items-center justify-center p-4 aspect-square text-center",
        "bg-card hover:bg-primary hover:text-primary-foreground rounded-2xl"
      )}
    >
      <Icon className="h-8 w-8 mb-2" />
      <p className="text-xs font-semibold">{department.name}</p>
    </Card>
  );
};


export default function RequerimientosPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const filteredDepartments = activeCategory === 'ALL'
    ? mockDepartments
    : mockDepartments.filter(dept => dept.category === activeCategory);

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-background p-4 sm:p-6 md:p-8">
      <Card className="w-full rounded-3xl bg-card p-6 sm:p-8 flex flex-col border-none shadow-none">
        
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
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
                    {isActive && <div className="h-full w-1 bg-primary rounded-full" />}
                  </button>
                );
              })}
            </div>
          </nav>

          <Separator orientation="vertical" className="hidden md:block h-auto" />

           <div className="md:col-span-8 lg:col-span-9">
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredDepartments.map((dept) => {
                    const departmentDetails = mockDepartments.find(d => d.id === dept.id);
                    if (!departmentDetails) return null;
                    
                    const href = departmentDetails.directLink ? departmentDetails.directLink : `/dashboard/requerimientos/${departmentDetails.id}`;

                    return (
                        <Link href={href} key={dept.id} className="block">
                           <DepartmentCard department={dept} />
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
