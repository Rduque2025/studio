
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { PlaylistItem } from "@/lib/placeholder-data";
import { Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaylistCardProps {
  item: PlaylistItem;
}

export function PlaylistCard({ item }: PlaylistCardProps) {
  return (
    <Link 
      href={item.linkUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="group block"
    >
      <Card className="overflow-hidden rounded-lg border-none shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-square w-full">
          <Image
            src={item.albumArtUrl}
            alt={`Portada de la playlist ${item.title}`}
            layout="fill"
            objectFit="cover"
            data-ai-hint={item.dataAiHint}
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="ghost" size="icon" className="h-16 w-16 bg-white/20 text-white backdrop-blur-sm rounded-full hover:bg-white/30 hover:text-white">
              <Music2 className="h-8 w-8" />
            </Button>
          </div>
           <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-xs text-white/90">{item.description}</p>
           </div>
        </div>
      </Card>
    </Link>
  );
}
