
'use client';

import Link from "next/link";
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card } from "@/components/ui/card";
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
  { 
    id: 'rh', 
    className: "bg-neutral-800 text-white row-span-2 col-span-1 md:col-span-2", 
    title: "Recursos Humanos", 
    description: "Constancias, recibos y más." 
  },
  { 
    id: 'it', 
    className: "bg-sky-500 text-white col-span-1", 
    title: "Soporte TI", 
    description: "Equipos y software." 
  },
  { 
    id: 'servicios', 
    className: "bg-amber-400 text-neutral-900 col-span-1", 
    title: "Servicios Generales", 
    description: "Mantenimiento." 
  },
  { 
    id: 'hcm', 
    className: "bg-lime-400 text-neutral-900 col-span-1 md:col-span-2", 
    title: "Póliza HCM", 
    description: "Consultas y reembolsos." 
  }
];

const DepartmentCard = ({ id, className, title, description, href }: { id: string, className: string, title: string, description: string, href: string }) => {
  const IconComponent = iconMap[id] || Settings;

  return (
    <Link href={href} className={cn("group block relative overflow-hidden rounded-2xl", className)}>
      <Card className="w-full h-full p-6 flex flex-col justify-between transition-all duration-300 bg-transparent border-none shadow-none">
        {/* Concentric circles decoration */}
        <div className="absolute -right-1/4 -bottom-1/4 w-3/4 h-3/4 opacity-10 pointer-events-none">
            <div className="absolute inset-0 rounded-full bg-white/80"></div>
            <div className="absolute inset-[15%] rounded-full bg-white/60"></div>
            <div className="absolute inset-[30%] rounded-full bg-white/40"></div>
            <div className="absolute inset-[45%] rounded-full bg-white/20"></div>
        </div>
        
        <div className="relative z-10">
          <div className="p-3 rounded-full bg-black/10 w-fit mb-4">
            <IconComponent className="h-6 w-6" />
          </div>
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-end">
            <div>
              <p className="font-semibold">{title}</p>
              <h3 className="text-2xl font-bold mt-1">{description}</h3>
            </div>
            <ArrowUpRight className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </Card>
    </Link>
  );
};


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
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-4 h-[600px]">
            {departmentGridConfig.map(config => {
              const details = getDepartmentDetails(config.id);
              const linkHref = details.directLink ? details.directLink : `/dashboard/requerimientos/${details.id}`;
              
              return (
                <DepartmentCard 
                  key={config.id}
                  id={config.id}
                  className={config.className}
                  title={config.title}
                  description={config.description}
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
