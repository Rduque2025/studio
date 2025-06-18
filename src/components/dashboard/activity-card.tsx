
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Activity } from "@/lib/placeholder-data";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Star } from "lucide-react"; // Imported Star
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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
    <Card className={cn("flex flex-col h-full overflow-hidden relative")}> {/* Added relative class */}
      {activity.isRecommended && (
        <Badge
          variant="default"
          className="absolute top-2 right-2 z-10 bg-amber-500 hover:bg-amber-600 text-white shadow-md px-2 py-1 text-xs"
        >
          <Star className="mr-1.5 h-3 w-3" />
          Recomendado
        </Badge>
      )}
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={activity.imageUrl}
            alt={activity.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={activity.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg font-semibold mb-2">{activity.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3 h-16 overflow-hidden text-ellipsis">
          {activity.description.split('\n')[0]} {/* Show only first line or main part of description */}
        </CardDescription>
         <div className="space-y-1 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" /> 
            {formattedDate || "Cargando fecha..."}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {activity.location}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild className="w-full" variant="default">
          <Link href={`/dashboard/actividades/${activity.id}`}>Más Información</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
