
'use client';

import Link from "next/link";
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { mockDepartments } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";

const DepartmentCard = ({ id, title, description, href, step }: { id: string, title: string, description: string, href: string, step: number }) => {
  return (
    <Link href={href} className="block group">
      <Card className="flex flex-col h-full bg-card hover:border-primary/50 transition-colors shadow-sm hover:shadow-lg border p-6 rounded-xl">
        <div className="flex items-center justify-start mb-4">
          <div className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-primary text-primary font-bold text-sm">
            {step}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground flex-grow">
          {description}
        </p>
      </Card>
    </Link>
  );
};

export default function RequerimientosPage() {
  const departmentsToShow = mockDepartments.filter(d => ['rh', 'it', 'servicios', 'hcm', 'vacaciones', 'finanzas'].includes(d.id));

  return (
    <div className="bg-muted/50 min-h-[calc(100vh-10rem)] py-12 md:py-24">
      <div className="container mx-auto px-4">
        
        <header className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
                 <p className="text-sm font-semibold text-primary mb-2">NUESTRO PROCESO DE SOLICITUD</p>
                 <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Portal de Requerimientos</h1>
            </div>
            <div className="flex items-center">
                 <p className="text-base text-muted-foreground">
                    Para realizar una solicitud, simplemente seleccione el departamento correcto de la lista a continuación. Cada sección lo guiará a través del formulario apropiado para garantizar que su solicitud se gestione de manera rápida y eficiente. A continuación, se presenta un resumen de cada portal.
                </p>
            </div>
        </header>
        
        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {departmentsToShow.map((dept, index) => {
              const linkHref = dept.directLink ? dept.directLink : `/dashboard/requerimientos/${dept.id}`;
              
              return (
                <DepartmentCard 
                  key={dept.id}
                  id={dept.id}
                  title={dept.name}
                  description={dept.description}
                  href={linkHref}
                  step={index + 1}
                />
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
