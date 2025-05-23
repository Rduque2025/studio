import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { mockActivities } from "@/lib/placeholder-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ActivityDetailsPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return mockActivities.map((activity) => ({
    id: activity.id,
  }));
}

export default function ActivityDetailsPage({ params }: ActivityDetailsPageProps) {
  const activity = mockActivities.find(a => a.id === params.id);

  if (!activity) {
    return (
      <div className="container mx-auto py-8 px-4">
        <SectionWrapper title="Actividad no encontrada">
          <p>La actividad que busca no existe o no está disponible.</p>
           <Button asChild variant="outline" className="mt-4">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
            </Link>
          </Button>
        </SectionWrapper>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
       <Button asChild variant="outline" className="mb-6">
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Actividades
        </Link>
      </Button>
      <Card className="overflow-hidden">
        <CardHeader className="p-0 relative h-64 md:h-96">
           <Image src={activity.imageUrl} alt={activity.title} layout="fill" objectFit="cover" data-ai-hint={activity.dataAiHint} />
           <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{activity.title}</h1>
             <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm bg-white/20 text-white backdrop-blur-sm">
                    <CalendarDays className="mr-1 h-4 w-4" /> {format(new Date(activity.date), "PPP", { locale: es })}
                </Badge>
                <Badge variant="secondary" className="text-sm bg-white/20 text-white backdrop-blur-sm">
                    <MapPin className="mr-1 h-4 w-4" /> {activity.location}
                </Badge>
             </div>
           </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardDescription className="text-base md:text-lg text-foreground mt-4 mb-6">
            {activity.description} Participe en esta enriquecedora actividad diseñada para fomentar la colaboración y el bienestar. Habrá refrigerios y oportunidades de networking. No se pierda esta excelente oportunidad de conectar con sus colegas.
          </CardDescription>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
                <h3 className="font-semibold text-lg">Detalles del Evento</h3>
                <p className="text-sm text-muted-foreground flex items-center"><Clock className="mr-2 h-4 w-4 text-primary" /> Hora: 3:00 PM - 5:00 PM</p>
                <p className="text-sm text-muted-foreground flex items-center"><Users className="mr-2 h-4 w-4 text-primary" /> Aforo: 50 personas</p>
                <p className="text-sm text-muted-foreground flex items-center"><MapPin className="mr-2 h-4 w-4 text-primary" /> Dirección: {activity.location}, Salón Principal</p>
            </div>
             <div className="space-y-2">
                <h3 className="font-semibold text-lg">Organizador</h3>
                <p className="text-sm text-muted-foreground">Departamento de Bienestar Corporativo</p>
                <p className="text-sm text-muted-foreground">Contacto: bienestar@banesco.com</p>
            </div>
          </div>

          <h3 className="font-semibold text-lg mb-2">Agenda (Ejemplo)</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm mb-6">
            <li>3:00 PM: Bienvenida y registro</li>
            <li>3:15 PM: Charla principal / Inicio de actividad</li>
            <li>4:30 PM: Sesión de preguntas y respuestas / Networking</li>
            <li>5:00 PM: Cierre del evento</li>
          </ul>

          <Button size="lg" className="w-full md:w-auto">
            Confirmar Asistencia
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

