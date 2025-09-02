
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MenuItem } from "@/ai/flows/get-menu-items-flow";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Utensils } from "lucide-react";

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
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={item.dataAiHint || ''}
            />
          ) : (
            <div className={cn("w-full h-full flex items-center justify-center", isCurrentDay ? "bg-black/10" : "bg-muted")}>
                <Utensils className={cn("h-16 w-16", isCurrentDay ? "text-primary-foreground/50" : "text-muted-foreground/50")} />
            </div>
          )}
        </div>
        {isCurrentDay && (
          <Badge variant="secondary" className="absolute top-2 right-2 z-10 bg-white/20 text-white backdrop-blur-sm">
            Hoy
          </Badge>
        )}
        {item.type && (
            <Badge variant="secondary" className="absolute top-2 left-2 z-10 bg-black/50 text-white backdrop-blur-sm">
                {item.type}
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
