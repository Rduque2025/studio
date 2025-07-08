
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
      "w-80 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg flex-shrink-0",
      isCurrentDay && "scale-105"
    )}>
      <CardHeader className="p-0 relative">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={item.imageUrl}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={item.dataAiHint}
          />
        </div>
        {isCurrentDay && (
          <Badge className="absolute top-2 right-2 z-10">
            Hoy
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-1">
          <p className={cn(
            "text-sm font-semibold",
            isCurrentDay ? "text-primary" : "text-muted-foreground"
          )}>{item.day}</p>
          {item.price && (
            <Badge variant="outline">{item.price}</Badge>
          )}
        </div>
        <CardTitle className="text-base font-bold leading-tight mb-2 h-12">{item.name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground h-10 overflow-hidden text-ellipsis">
          {item.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
