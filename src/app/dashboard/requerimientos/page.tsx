
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

interface DepartmentCardProps {
  department: Department;
  isActive: boolean;
  onClick: () => void;
}

const DepartmentCard = ({ department, isActive, onClick }: DepartmentCardProps) => {
  const Icon = department.icon || MoreHorizontal;
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all duration-200 flex flex-col items-center justify-center p-4 aspect-square text-center",
        isActive
          ? "bg-primary text-primary-foreground shadow-lg -translate-y-1"
          : "bg-card hover:bg-primary hover:text-primary-foreground"
      )}
    >
      <Icon className="h-8 w-8 mb-2" />
      <p className="text-xs font-semibold">{department.name}</p>
    </Card>
  );
};


export default function RequerimientosPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);


  const filteredDepartments = activeCategory === 'ALL'
    ? mockDepartments
    : mockDepartments.filter(dept => dept.category === activeCategory);

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-muted/40 p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-6xl min-h-[70vh] rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-foreground">Portal de Requerimientos</h1>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Solicitud
                </Button>
            </div>
        </header>

        {/* Main Content */}
        <div className="flex-grow grid md:grid-cols-12 gap-8">
          
          {/* Left Navigation */}
          <nav className="md:col-span-3 lg:col-span-3">
            <div className="flex flex-col space-y-2">
              {categories.map((category) => {
                const isActive = activeCategory === category.id;
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors relative",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
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
           <div className="md:col-span-8 lg:col-span-8">
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredDepartments.map((dept) => {
                    const departmentDetails = mockDepartments.find(d => d.id === dept.id);
                    if (!departmentDetails) return null;
                    
                    const href = departmentDetails.directLink ? departmentDetails.directLink : `/dashboard/requerimientos/${departmentDetails.id}`;

                    return (
                        <Link href={href} key={dept.id}>
                           <DepartmentCard
                                department={dept}
                                isActive={selectedDepartment === dept.id}
                                onClick={() => setSelectedDepartment(dept.id)}
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
