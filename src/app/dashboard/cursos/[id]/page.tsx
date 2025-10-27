
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { mockCourses } from "@/lib/placeholder-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlayCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface CourseDetailsPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
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
              <span className="opacity-0 group-hover/button:opacity-100 transition-opacity">Volver a Cursos</span>
            </Link>
          </Button>
        </SectionWrapper>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
       <Button asChild variant="link" className="mb-6 text-muted-foreground hover:no-underline p-0 h-auto text-xs">
        <Link href="/dashboard/cursos" className="flex items-center gap-2 group">
           <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">Volver a Cursos</span>
        </Link>
      </Button>
      <Card className="overflow-hidden">
        <CardHeader className="p-0 relative h-64 md:h-96">
           <Image src={course.imageUrl} alt={course.title} layout="fill" objectFit="cover" data-ai-hint={course.dataAiHint} />
           <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{course.title}</h1>
             <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm bg-white/20 text-white backdrop-blur-sm">
                    {course.category}
                </Badge>
                <Badge variant="secondary" className="text-sm bg-white/20 text-white backdrop-blur-sm">
                    {course.duration}
                </Badge>
             </div>
           </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardDescription className="text-base md:text-lg text-foreground mt-4 mb-6">
            {course.description}
          </CardDescription>
          
          <Button size="lg" className="w-full md:w-auto">
            <PlayCircle className="mr-2 h-5 w-5" /> Iniciar Curso
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
