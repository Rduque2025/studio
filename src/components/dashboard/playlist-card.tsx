
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { PlaylistItem } from "@/lib/placeholder-data";
import { PlayCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaylistCardProps {
  item: PlaylistItem;
}

export function PlaylistCard({ item }: PlaylistCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-lg border-none shadow-sm transition-all hover:shadow-lg">
      <div className="relative aspect-square w-full">
        <Image
          src={item.albumArtUrl}
          alt={`Portada del álbum para ${item.title}`}
          layout="fill"
          objectFit="cover"
          data-ai-hint={item.dataAiHint}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="ghost" size="icon" className="h-16 w-16 bg-white/20 text-white backdrop-blur-sm rounded-full hover:bg-white/30 hover:text-white">
            <PlayCircle className="h-10 w-10" />
          </Button>
        </div>
      </div>
      <CardContent className="p-3 bg-card">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-semibold text-sm leading-tight text-foreground truncate">{item.title}</h4>
                <p className="text-xs text-muted-foreground truncate">{item.artist}</p>
            </div>
             <p className="text-xs text-muted-foreground flex-shrink-0 ml-2">{item.duration}</p>
        </div>
      </CardContent>
    </Card>
  );
}
