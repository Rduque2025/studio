
import Link from "next/link";
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockDepartments } from "@/lib/placeholder-data";
import { ArrowRight, Users, Cpu, DollarSign, Megaphone, Settings, Plane, ShieldCheck } from "lucide-react"; // Added ShieldCheck

const iconMap: { [key: string]: React.ElementType } = {
  rh: Users,
  it: Cpu,
  finanzas: DollarSign,
  marketing: Megaphone,
  operaciones: Settings,
  vacaciones: Plane,
  hcm: ShieldCheck, // Added hcm icon
};


export default function RequerimientosPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="container mx-auto py-8 px-4">
      <SectionWrapper 
        title="Portal de Requerimientos"
        description="Seleccione el departamento o servicio para enviar su solicitud o consulta."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDepartments.map((dept) => {
            const IconComponent = iconMap[dept.id] || Settings;
            const linkHref = dept.directLink ? dept.directLink : `/dashboard/requerimientos/${dept.id}`;
            return (
              <Card key={dept.id} className="transition-colors flex flex-col">
                <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{dept.description}</CardDescription>
                </CardContent>
                <div className="p-4 border-t">
                  <Button asChild className="w-full">
                    <Link href={linkHref}>
                      Acceder <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </SectionWrapper>
    </div>
  );
}
