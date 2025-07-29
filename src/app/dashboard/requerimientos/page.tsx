
'use client';

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { mockDepartments } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { Plus, Users, Megaphone, FolderKanban, MoreHorizontal, ArrowLeft } from "lucide-react";
import type { Department } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";


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
    <Link href={linkHref} onClick={onClick} className="group">
        <div className={cn(
            "rounded-2xl p-4 text-center transition-all duration-300 h-32 flex flex-col justify-center items-center gap-2",
            isActive 
              ? "bg-primary text-primary-foreground shadow-lg scale-105" 
              : "bg-muted/50 hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:-translate-y-1"
          )}>
            <div className={cn(
                "flex items-center justify-center h-12 w-12 rounded-full mb-1 transition-colors",
                isActive ? "bg-white/20" : "bg-white group-hover:bg-white/20"
            )}>
              <Icon className={cn(
                  "h-6 w-6",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary-foreground"
              )} />
            </div>
            <p className={cn(
                "text-xs font-semibold",
                 isActive ? "text-primary-foreground" : "text-foreground group-hover:text-primary-foreground"
            )}>{department.name}</p>
        </div>
    </Link>
  );
};


export default function RequerimientosPage() {
  const [activeDepartment, setActiveDepartment] = useState<Department | null>(null);
  
  return (
    <div className="min-h-[calc(100vh-6rem)] bg-muted/40 p-4 flex items-center justify-center">
        
        <Card className="w-full max-w-4xl rounded-3xl shadow-2xl p-6 sm:p-8">
            <CardContent className="p-0">
                <header className="flex justify-end items-center mb-8">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Solicitud
                    </Button>
                </header>

                <main>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {mockDepartments.map((dept) => (
                        <DepartmentCard 
                          key={dept.id} 
                          department={dept}
                          isActive={activeDepartment?.id === dept.id}
                          onClick={() => setActiveDepartment(dept)}
                        />
                      ))}
                    </div>
                </main>
            </CardContent>
        </Card>

    </div>
  );
}
