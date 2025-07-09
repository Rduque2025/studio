
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { mockDepartments } from "@/lib/placeholder-data";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface DepartmentPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  // Filter out departments that have a directLink, as they have their own pages
  const dynamicPages = mockDepartments.filter(dept => !dept.directLink);
  return dynamicPages.map((dept) => ({
    slug: dept.id,
  }));
}

export default function DepartmentRequestPage({ params }: DepartmentPageProps) {
  const slug = params.slug;
  const department = mockDepartments.find(d => d.id === slug);

  if (!department) {
    return (
      <div className="container mx-auto py-8 px-4">
        <SectionWrapper title="Departamento no encontrado">
          <p>El departamento que busca no existe.</p>
           <Button asChild variant="outline" className="mt-4">
            <Link href="/dashboard/requerimientos">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al portal
            </Link>
          </Button>
        </SectionWrapper>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
       <Button asChild variant="outline" className="mb-6">
        <Link href="/dashboard/requerimientos">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al portal
        </Link>
      </Button>
      <SectionWrapper 
        title={`Formulario de Requerimiento: ${department.name}`}
        description={`Complete el siguiente formulario para enviar su solicitud al departamento de ${department.name}.`}
      >
        <Card className="border-dashed border-2">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">En Construcción</h3>
            <p className="text-muted-foreground">
              El formulario específico para el departamento de <span className="font-medium text-foreground">{department.name}</span> está actualmente en desarrollo.
              <br />
              Por favor, vuelva más tarde.
            </p>
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
