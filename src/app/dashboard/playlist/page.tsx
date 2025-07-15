
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
        <Button asChild variant="outline">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
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
