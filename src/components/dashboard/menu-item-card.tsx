
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MenuItem } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface MenuItemCardProps {
  item: MenuItem;
  isCurrentDay?: boolean;
}

export function MenuItemCard({ item, isCurrentDay }: MenuItemCardProps) {
  return (
    <Card className={cn(
      "w-[350px] overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg flex-shrink-0 flex flex-col",
      isCurrentDay && "scale-105 bg-primary text-primary-foreground"
    )}>
      <CardHeader className="p-0 relative">
        <div className="relative w-full aspect-square">
          <Image
            src={item.imageUrl}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={item.dataAiHint}
          />
        </div>
        {isCurrentDay && (
          <Badge variant="secondary" className="absolute top-2 right-2 z-10 bg-white/20 text-white backdrop-blur-sm">
            Hoy
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <p className={cn(
            "text-sm font-semibold",
            isCurrentDay ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>{item.day}</p>
          {item.price && (
            <Badge variant={isCurrentDay ? "secondary" : "outline"}>{item.price}</Badge>
          )}
        </div>
        <CardTitle className="text-base font-bold leading-tight mb-2">{item.name}</CardTitle>
        <CardDescription className={cn(
          "text-xs flex-grow",
           isCurrentDay ? "text-primary-foreground/90" : "text-muted-foreground"
        )}>
          {item.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
