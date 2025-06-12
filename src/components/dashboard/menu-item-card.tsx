
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MenuItem } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils"; // Import cn

interface MenuItemCardProps {
  item: MenuItem;
  isCurrentDay?: boolean; // New prop
}

export function MenuItemCard({ item, isCurrentDay }: MenuItemCardProps) {
  return (
    <Card className={cn(
      "w-64 md:w-72 flex-shrink-0 overflow-hidden relative", // Added relative for badge positioning
      isCurrentDay && "border-primary ring-2 ring-primary shadow-lg"
    )}>
      {isCurrentDay && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-semibold z-10">
          Hoy
        </div>
      )}
      <CardHeader className="p-0">
        <div className="relative w-full h-40">
          <Image
            src={item.imageUrl}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={item.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className={cn(
          "text-md font-semibold mb-1",
          isCurrentDay && "text-primary"
        )}>{item.day}</CardTitle>
        <p className="text-sm font-medium text-primary mb-1">{item.name}</p>
        <CardDescription className="text-xs text-muted-foreground h-12 overflow-hidden text-ellipsis">
          {item.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
