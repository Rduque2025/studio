
import Image from "next/image";
import Link from "next/link";
import { Card, CardFooter } from "@/components/ui/card";
import type { Employee } from "@/lib/placeholder-data";
import { Twitter, Instagram } from "lucide-react";

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <Card className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-card aspect-[4/5]">
      <div className="relative h-full w-full">
        <Image
          src={employee.imageUrl}
          alt={employee.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint={employee.dataAiHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <CardFooter className="p-4 absolute bottom-0 left-0 w-full z-10">
          <div className="text-white">
            <p className="font-semibold text-sm">{employee.name}</p>
            <p className="text-xs text-white/80">{employee.role}</p>
          </div>
          <div className="flex items-center space-x-2 ml-auto">
            <Link href="#" className="text-white/80 hover:text-white">
              <Twitter className="h-4 w-4" />
            </Link>
            <Link href="#" className="text-white/80 hover:text-white">
              <Instagram className="h-4 w-4" />
            </Link>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
