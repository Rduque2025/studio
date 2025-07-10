
'use client';

import Link from "next/link";
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Users, Cpu, DollarSign, Megaphone, Settings, Plane, ShieldCheck, LifeBuoy } from "lucide-react"; 
import { mockDepartments } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";

const iconMap: { [key: string]: React.ElementType } = {
  rh: Users,
  it: Cpu,
  finanzas: DollarSign,
  marketing: Megaphone,
  operaciones: Settings,
  vacaciones: Plane,
  hcm: ShieldCheck,
  servicios: LifeBuoy
};

const departmentGridConfig = [
  { id: 'rh', className: "bg-neutral-800 text-white row-span-2 hover:bg-neutral-900", title: "Recursos Humanos", description: "Constancias, recibos y más." },
  { id: 'it', className: "bg-neutral-200 text-neutral-900 hover:bg-neutral-300", title: "Soporte TI", description: "Problemas con equipos o software." },
  { id: 'servicios', className: "bg-sky-400 text-white hover:bg-sky-500", title: "Servicios Generales", description: "Solicitudes de mantenimiento." },
  { id: 'hcm', className: "bg-lime-300 text-neutral-900 hover:bg-lime-400", title: "Póliza HCM", description: "Consultas y reembolsos." }
];

export default function RequerimientosPage() {
  const getDepartmentDetails = (id: string) => {
      const dept = mockDepartments.find(d => d.id === id);
      const config = departmentGridConfig.find(c => c.id === id);
      return { ...dept, ...config };
  };

  const services = ['rh', 'it', 'servicios', 'hcm'];

  return (
    <div className="bg-background min-h-[calc(100vh-10rem)] flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
        <SectionWrapper 
          title="Portal de Requerimientos"
          description="Seleccione el departamento para iniciar su solicitud."
          headerClassName="text-left mb-8"
          titleClassName="text-4xl md:text-5xl"
          descriptionClassName="text-left max-w-none text-base"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 h-[600px]">
            {services.map(id => {
              const details = getDepartmentDetails(id);
              const IconComponent = iconMap[id] || Settings;
              const linkHref = details.directLink ? details.directLink : `/dashboard/requerimientos/${id}`;
              
              return (
                <Link key={id} href={linkHref} className="block group">
                  <Card className={cn("w-full h-full rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl border-none", details.className)}>
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="p-3 rounded-full bg-white/20">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <ArrowUpRight className="h-6 w-6 opacity-70 group-hover:opacity-100 group-hover:rotate-45 transition-transform duration-300" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold opacity-80">{details.description}</p>
                      <h3 className="text-3xl font-bold mt-1">{details.title}</h3>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
