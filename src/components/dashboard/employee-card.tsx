
import Image from "next/image";
import type { TeamMember } from "@/ai/flows/get-team-members-flow";
import { Mail, Phone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmployeeCardProps {
  employee: TeamMember;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="group flex flex-col">
      <div className="relative w-full aspect-[4/5] overflow-hidden mb-4 bg-muted rounded-lg">
        <Image
          src={employee.ImageUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbnxlbnwwfHx8fDE3NTgwMjA4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080'}
          alt={`Portrait of ${employee.Nombre}`}
          layout="fill"
          objectFit="cover"
          data-ai-hint="person portrait"
          className="grayscale transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-2">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-foreground">{employee.Nombre}</h3>
            <p className="text-xs text-muted-foreground">{employee.Cargo}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-2">
            {employee.Correo && (
                 <a 
                    href={`mailto:${employee.Correo}`}
                    className={cn(
                        "inline-flex items-center justify-center h-8 w-8 rounded-full",
                        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                        "text-muted-foreground"
                    )}
                 >
                    <Mail className="h-4 w-4" />
                 </a>
            )}
            {employee.UrlContacto && employee.UrlContacto.startsWith('tel:') && (
                <Button asChild variant="outline" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted">
                    <a href={employee.UrlContacto}>
                    <Phone className="h-4 w-4" />
                    </a>
                </Button>
            )}
        </div>
      </div>
    </div>
  );
}
