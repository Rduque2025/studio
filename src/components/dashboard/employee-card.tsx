
import Image from "next/image";
import Link from "next/link";
import type { Employee } from "@/lib/placeholder-data";
import { Mail, Phone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="group flex flex-col">
      <div className="relative w-full aspect-[4/5] overflow-hidden mb-4 bg-muted rounded-lg">
        <Image
          src={employee.imageUrl}
          alt={`Portrait of ${employee.name}`}
          layout="fill"
          objectFit="cover"
          data-ai-hint={employee.dataAiHint}
          className="grayscale transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-2">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-foreground">{employee.name}</h3>
            <p className="text-sm text-muted-foreground">{employee.role}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Button asChild variant="outline" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted">
            <a href={`mailto:${employee.name.toLowerCase().replace(' ', '.')}@banescoseguros.com`}>
              <Mail className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted">
             <Phone className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
