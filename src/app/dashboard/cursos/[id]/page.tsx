
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { mockCourses } from "@/lib/placeholder-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, Clock, Tag, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface CourseDetailsPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return mockCourses.map((course) => ({
    id: course.id,
  }));
}

export default function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const id = params.id;
  const course = mockCourses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="container mx-auto py-8 px-4">
        <SectionWrapper title="Curso no encontrado">
          <p>El curso que busca no existe o no está disponible.</p>
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
        <Link href="/dashboard/bienestar">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Cursos
        </Link>
      </Button>
      <Card className="overflow-hidden">
        <CardHeader className="p-0 relative h-64 md:h-96">
           <Image src={course.imageUrl} alt={course.title} layout="fill" objectFit="cover" data-ai-hint={course.dataAiHint} />
           <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{course.title}</h1>
             <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm bg-white/20 text-white backdrop-blur-sm">
                    <Tag className="mr-1 h-4 w-4" /> {course.category}
                </Badge>
                <Badge variant="secondary" className="text-sm bg-white/20 text-white backdrop-blur-sm">
                    <Clock className="mr-1 h-4 w-4" /> {course.duration}
                </Badge>
             </div>
           </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardDescription className="text-xs text-muted-foreground mb-3 h-16 overflow-hidden text-ellipsis">
            {course.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </CardDescription>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
                <h3 className="font-semibold text-lg">Detalles del Curso</h3>
                <p className="text-sm text-muted-foreground flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-primary" /> Fecha de Inicio: Próximamente</p>
                <p className="text-sm text-muted-foreground flex items-center"><Users className="mr-2 h-4 w-4 text-primary" /> Plazas Disponibles: 25</p>
                <p className="text-sm text-muted-foreground flex items-center"><Tag className="mr-2 h-4 w-4 text-primary" /> Modalidad: Online / Presencial</p>
            </div>
             <div className="space-y-2">
                <h3 className="font-semibold text-lg">Instructor</h3>
                <p className="text-sm text-muted-foreground">Dr. Experto en la Materia</p>
                <p className="text-sm text-muted-foreground">Más de 10 años de experiencia en {course.category}.</p>
            </div>
          </div>

          <h3 className="font-semibold text-lg mb-2">Contenido del Curso (Ejemplo)</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm mb-6">
            <li>Módulo 1: Introducción y Conceptos Clave</li>
            <li>Módulo 2: Herramientas y Técnicas Avanzadas</li>
            <li>Módulo 3: Casos Prácticos y Ejemplos Reales</li>
            <li>Módulo 4: Proyecto Final y Evaluación</li>
          </ul>

          <Button size="lg" className="w-full md:w-auto">
            Inscribirse en el Curso
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
