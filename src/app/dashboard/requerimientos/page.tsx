
'use client';

import Link from "next/link";
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Cpu, DollarSign, Megaphone, Settings, Plane, ShieldCheck, LifeBuoy } from "lucide-react"; 
import { mockDepartments } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const iconMap: { [key: string]: LucideIcon } = {
  rh: Users,
  it: Cpu,
  finanzas: DollarSign,
  marketing: Megaphone,
  operaciones: Settings,
  vacaciones: Plane,
  hcm: ShieldCheck,
  servicios: LifeBuoy
};

const DepartmentCard = ({ id, title, description, href }: { id: string, title: string, description: string, href: string }) => {
  const IconComponent = iconMap[id] || Settings;

  return (
    <Card className="flex flex-col justify-between bg-card hover:bg-muted/50 transition-colors shadow-sm hover:shadow-lg border-border/60">
      <CardHeader>
        <div className="mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-primary" />
            </div>
        </div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground pt-1 min-h-[40px]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="link" className="p-0 text-sm">
          <Link href={href}>
            Acceder <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function RequerimientosPage() {
  const departmentsToShow = mockDepartments.filter(d => ['rh', 'it', 'servicios', 'hcm', 'vacaciones', 'finanzas'].includes(d.id));

  return (
    <div className="bg-background min-h-[calc(100vh-10rem)] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <SectionWrapper 
          headerClassName="text-left mb-10"
          titleClassName="text-4xl md:text-5xl font-extrabold tracking-tight"
          descriptionClassName="text-left max-w-2xl text-lg mt-4"
          title="Portal de Requerimientos"
          description="Centraliza tus solicitudes y gestiona tus necesidades en un solo lugar. Seleccione el departamento para iniciar su solicitud."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentsToShow.map(dept => {
              const linkHref = dept.directLink ? dept.directLink : `/dashboard/requerimientos/${dept.id}`;
              
              return (
                <DepartmentCard 
                  key={dept.id}
                  id={dept.id}
                  title={dept.name}
                  description={dept.description}
                  href={linkHref}
                />
              );
            })}
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
