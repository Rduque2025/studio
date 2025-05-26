
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Activity } from "@/lib/placeholder-data";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState, useEffect } from "react";

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
    <Card className="flex flex-col h-full overflow-hidden">
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
          {activity.description}
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
