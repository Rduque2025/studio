
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { mockCourses } from "@/lib/placeholder-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface CourseDetailsPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  // We'll only generate static pages for courses that have a detail page
  return mockCourses.filter(course => course.hasDetailPage).map((course) => ({
    id: course.id,
  }));
}

export default function CourseDetailsPage({ params: { id } }: CourseDetailsPageProps) {
  const course = mockCourses.find(c => c.id === id);

  if (!course || !course.hasDetailPage) {
    return (
      <div className="container mx-auto py-8 px-4">
        <SectionWrapper title="Curso no encontrado">
          <p>El curso que busca no existe, no está disponible o no tiene una página de detalle.</p>
           <Button asChild variant="link" className="mt-4 text-muted-foreground hover:no-underline p-0 h-auto text-xs">
            <Link href="/dashboard/cursos" className="flex items-center gap-2 group">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </span>
              {/* Adding text that appears on hover */}
              <span className="opacity-0 group-hover/button:opacity-100 transition-opacity">Volver a Cursos</span>
            </Link>
          </Button>
        </SectionWrapper>
      </div>
    );
  }

  // Find related courses from the same category, excluding the current one
  const relatedCourses = mockCourses.filter(c => c.category === course.category && c.id !== course.id).slice(0, 2);

  return (
    <div className="container mx-auto py-8 px-4">
       <Button asChild variant="link" className="mb-6 text-muted-foreground hover:no-underline p-0 h-auto text-xs">
        <Link href="/dashboard/cursos" className="flex items-center gap-2 group">
           <span className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </span>
          <span className="opacity-100 group-hover:opacity-100 transition-opacity">Volver</span>
        </Link>
      </Button>
      <Card className="overflow-hidden">
        <CardHeader className="p-0 relative h-64 md:h-96">
           <Image src={course.imageUrl} alt={course.title} layout="fill" objectFit="cover" data-ai-hint={course.dataAiHint} />
           <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
             <Badge variant="secondary" className="w-fit mb-2">{course.category}</Badge>
             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{course.title}</h1>
           </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardDescription className="text-base md:text-lg text-foreground mt-4 mb-6">
            {course.description}
          </CardDescription>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
                <h3 className="font-semibold text-lg">Detalles del Curso</h3>
                <p className="text-sm text-muted-foreground flex items-center"><Clock className="mr-2 h-4 w-4 text-primary" /> Duración: {course.duration}</p>
                <p className="text-sm text-muted-foreground flex items-center"><CheckCircle className="mr-2 h-4 w-4 text-primary" /> Nivel: Todos los niveles</p>
            </div>
             <div className="space-y-2">
                <h3 className="font-semibold text-lg">Instructor</h3>
                <p className="text-sm text-muted-foreground">Capital Humano Banesco</p>
                <p className="text-sm text-muted-foreground">Contacto: capital.humano@banesco.com</p>
            </div>
          </div>

          <h3 className="font-semibold text-lg mb-2">Contenido del Curso (Ejemplo)</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm mb-6">
            <li>Módulo 1: Introducción al Pensamiento Estratégico</li>
            <li>Módulo 2: Herramientas de Análisis (FODA, PESTEL)</li>
            <li>Módulo 3: Definición de Objetivos y KPIs</li>
            <li>Módulo 4: Ejecución y Seguimiento del Plan</li>
          </ul>

          <Button size="lg" className="w-full md:w-auto">
            Inscribirse al Curso
          </Button>
        </CardContent>
      </Card>
      
       {relatedCourses.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Cursos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedCourses.map(related => (
                 <Link href={`/dashboard/cursos/${related.id}`} key={related.id} className="group block">
                    <Card className="flex items-center gap-4 p-4 transition-shadow hover:shadow-md">
                        <Image src={related.imageUrl} alt={related.title} width={120} height={80} className="rounded-md object-cover aspect-video" data-ai-hint={related.dataAiHint} />
                        <div className="flex-1">
                            <p className="font-semibold text-sm group-hover:text-primary transition-colors">{related.title}</p>
                            <p className="text-xs text-muted-foreground">{related.category}</p>
                        </div>
                    </Card>
                 </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
