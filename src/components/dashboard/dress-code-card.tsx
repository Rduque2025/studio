
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DressCodeItem } from "@/lib/placeholder-data";

interface DressCodeCardProps {
  item: DressCodeItem;
}

export function DressCodeCard({ item }: DressCodeCardProps) {
  return (
    <Card className="w-72 md:w-80 flex-shrink-0 shadow-lg overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={item.imageUrl}
            alt={item.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={item.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-md font-semibold mb-1">{item.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground h-16 overflow-hidden text-ellipsis">
          {item.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
