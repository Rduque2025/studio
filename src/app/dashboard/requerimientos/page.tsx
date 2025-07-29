'use client';

import { useState } from "react";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { mockDepartments } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, MoreVertical, Pencil } from "lucide-react";
import type { Department } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";

const DepartmentCard = ({ department }: { department: Department }) => {
  const linkHref = department.directLink ? department.directLink : `/dashboard/requerimientos/${department.id}`;
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 rounded-3xl h-full flex flex-col",
        "bg-gradient-to-br from-secondary to-primary text-primary-foreground"
      )}
    >
      <div className="p-6 flex-grow flex flex-col">
        <CardTitle className="text-sm font-bold mb-4 flex-grow">{department.name}</CardTitle>
        <Button asChild variant="link" className="p-0 h-auto font-semibold text-primary-foreground/80 hover:text-primary-foreground self-start">
          <Link href={linkHref} className="flex items-center gap-2">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-black/20">
              <ArrowRight className="h-4 w-4" />
            </span>
            Saber más
          </Link>
        </Button>
      </div>
      <div className="w-full h-32 flex-shrink-0 relative">
        <Image 
          src={`https://placehold.co/300x200.png`} 
          alt={department.name} 
          layout="fill"
          objectFit="cover"
        />
      </div>
    </Card>
  );
};

export default function RequerimientosPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  
  const getDepartmentsByCategory = (category: string) => {
    if (category === "ALL") {
      return mockDepartments;
    }
    return mockDepartments.filter(d => d.category === category);
  }

  const filteredDepartments = getDepartmentsByCategory(activeCategory);

  return (
    <div className="flex min-h-[calc(100vh-6rem)] bg-muted/30">
      <SidebarNav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      
      <main className="flex-1 p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDepartments.map((dept) => (
            <DepartmentCard key={dept.id} department={dept} />
          ))}
        </div>
      </main>

      <div className="fixed bottom-8 right-8 z-20">
        <Button className="rounded-full h-12 shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          Añadir Área
        </Button>
      </div>

    </div>
  );
}