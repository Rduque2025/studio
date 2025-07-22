
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { PlaylistCard } from "@/components/dashboard/playlist-card";
import { mockPlaylist } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PlaylistPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Button asChild variant="link" className="text-muted-foreground hover:no-underline p-0 h-auto text-xs">
          <Link href="/dashboard" className="flex items-center gap-2 group">
             <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </span>
            Volver al Inicio
          </Link>
        </Button>
      </div>
      <SectionWrapper 
        title="Catálogo de Playlists"
        description="Explora nuestra colección completa de playlists diseñadas para cada momento de tu día."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockPlaylist.map(item => (
            <PlaylistCard key={item.id} item={item} />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
