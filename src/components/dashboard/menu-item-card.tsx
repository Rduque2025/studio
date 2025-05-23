import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MenuItem } from "@/lib/placeholder-data";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <Card className="w-64 md:w-72 flex-shrink-0 overflow-hidden">
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
        <CardTitle className="text-md font-semibold mb-1">{item.day}</CardTitle>
        <p className="text-sm font-medium text-primary mb-1">{item.name}</p>
        <CardDescription className="text-xs text-muted-foreground h-12 overflow-hidden text-ellipsis">
          {item.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
