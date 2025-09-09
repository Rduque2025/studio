
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MenuItem } from "@/ai/flows/get-menu-items-flow";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Utensils, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface MenuItemCardProps {
  item: MenuItem;
  isCurrentDay?: boolean;
}

export function MenuItemCard({ item, isCurrentDay }: MenuItemCardProps) {
  return (
    <Card className="w-80 flex-shrink-0 overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-xl flex flex-col h-[420px]">
        <CardHeader className="p-0 relative h-3/5">
            <div className="relative w-full h-full">
                {item.imageUrl ? (
                    <Image
                    src={item.imageUrl}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={item.dataAiHint || ''}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                        <Utensils className="h-16 w-16 text-muted-foreground/50" />
                    </div>
                )}
            </div>
            
            {isCurrentDay && (
                <Badge variant="secondary" className="absolute top-3 left-3 z-10 bg-black/50 text-white backdrop-blur-sm">
                    Plato del Día
                </Badge>
            )}
             <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                 <Utensils className="h-4 w-4 text-foreground"/>
             </div>

        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow bg-card">
            <div className="flex-grow">
                <p className="text-sm font-bold text-foreground mb-1">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.day} - {item.type}</p>
                 <CardDescription className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {item.description}
                </CardDescription>
            </div>

            <div className="flex justify-between items-center mt-4">
                {item.price && (
                     <Badge variant="outline" className="text-xs font-semibold rounded-lg px-3 py-1">
                        {item.price}
                    </Badge>
                )}
                <Button size="icon" className="rounded-full h-9 w-9 flex-shrink-0">
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        </CardContent>
    </Card>
  );
}
