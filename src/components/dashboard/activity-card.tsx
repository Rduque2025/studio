
"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Star, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { Activity } from "@/lib/placeholder-data";

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    // Ensure date formatting happens only on the client side
    setFormattedDate(format(new Date(activity.date), "PPP", { locale: es }));
  }, [activity.date]);

  return (
    <Link 
      href={`/dashboard/actividades/${activity.id}`} 
      className={cn("w-72 md:w-80 h-96 flex-shrink-0 relative rounded-xl overflow-hidden group block shadow-lg hover:shadow-2xl transition-shadow duration-300")}
    >
      <Image
        src={activity.imageUrl}
        alt={activity.title}
        layout="fill"
        objectFit="cover"
        data-ai-hint={activity.dataAiHint}
        className="transition-transform duration-300 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent backdrop-blur-[2px] transition-all duration-300 group-hover:from-black/80 group-hover:backdrop-blur-sm" />

      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
        {activity.isRecommended && (
          <Badge
            variant="default"
            className="mb-2 self-start bg-amber-500 hover:bg-amber-600 text-white shadow-md px-2 py-1 text-xs"
          >
            <Star className="mr-1.5 h-3 w-3" />
            Recomendado
          </Badge>
        )}
        
        <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
        
        <div className="space-y-1 text-xs text-white/90 mb-3">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" /> 
            <span>{formattedDate || "Cargando fecha..."}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" /> 
            <span>{activity.location}</span>
          </div>
        </div>
        
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-sm font-semibold">
          Más Información <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
