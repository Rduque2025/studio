'use client';

import { useState } from "react";
import Link from "next/link";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { mockDepartments } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, Users, Megaphone, FolderKanban, MoreHorizontal } from "lucide-react";
import type { Department } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";


const DepartmentCard = ({ 
  department, 
  isActive, 
  onClick 
}: { 
  department: Department, 
  isActive: boolean, 
  onClick: () => void 
}) => {
  const Icon = department.icon || MoreHorizontal;
  const linkHref = department.directLink ? department.directLink : `/dashboard/requerimientos/${department.id}`;

  return (
    <Link href={linkHref} onClick={onClick}>
        <div className={cn(
            "rounded-2xl p-4 text-center transition-all duration-300 h-32 flex flex-col justify-center items-center gap-2",
            isActive 
              ? "bg-amber-300 shadow-lg scale-105" 
              : "bg-card hover:shadow-md hover:-translate-y-1"
          )}>
            <div className={cn(
                "flex items-center justify-center h-12 w-12 rounded-full mb-1 transition-colors",
                isActive ? "bg-white/50" : "bg-muted"
            )}>
              <Icon className={cn(
                  "h-6 w-6",
                  isActive ? "text-amber-800" : "text-muted-foreground"
              )} />
            </div>
            <p className={cn(
                "text-xs font-semibold",
                 isActive ? "text-amber-900" : "text-foreground"
            )}>{department.name}</p>
        </div>
    </Link>
  );
};


export default function RequerimientosPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  return (
    <div className="min-h-[calc(100vh-6rem)] bg-muted/40 p-4 flex items-center justify-center">
        
        <Card className="w-full max-w-4xl rounded-3xl shadow-2xl p-6 sm:p-8">
            <CardContent className="p-0">
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/dashboard">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <h1 className="text-lg font-semibold text-foreground">Portal de Requerimientos</h1>
                    </div>
                    <Button size="sm" className="bg-rose-500 hover:bg-rose-600 text-white rounded-full">
                        Nueva Solicitud
                    </Button>
                </header>

                <main>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {mockDepartments.map((dept) => (
                        <DepartmentCard 
                          key={dept.id} 
                          department={dept}
                          isActive={activeCategory === dept.id}
                          onClick={() => setActiveCategory(dept.id)}
                        />
                      ))}
                    </div>
                </main>
            </CardContent>
        </Card>

    </div>
  );
}
