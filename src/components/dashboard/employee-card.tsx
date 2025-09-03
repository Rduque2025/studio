
import Image from "next/image";
import Link from "next/link";
import type { Employee } from "@/lib/placeholder-data";
import { Mail, Phone, ArrowUpRight } from "lucide-react";

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="group">
      <div className="relative w-full aspect-[4/5] overflow-hidden mb-4 bg-muted rounded-lg">
        <Image
          src={employee.imageUrl}
          alt={`Portrait of ${employee.name}`}
          layout="fill"
          objectFit="cover"
          data-ai-hint={employee.dataAiHint}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="text-sm">
        <h3 className="font-semibold text-foreground">{employee.name}</h3>
        <p className="text-muted-foreground">{employee.role}</p>
        <div className="mt-2 space-y-1 text-muted-foreground">
           <div className="flex items-center gap-2">
               <Phone className="h-3 w-3" />
               <span>+58 212 501 1111</span>
            </div>
           <a href={`mailto:${employee.name.toLowerCase().replace(' ', '.')}@banescoseguros.com`} className="flex items-center gap-2 hover:text-primary transition-colors">
               <Mail className="h-3 w-3" />
               <span>{`${employee.name.toLowerCase().replace(' ', '.')}@...`}</span>
            </a>
        </div>
         <Link href="#" className="inline-flex items-center gap-2 mt-3 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Ir al Perfil</span>
            <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
