
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { mockCourses, mockDocuments } from "@/lib/placeholder-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlayCircle, Download, FileText, ArrowRight, ArrowLeft as ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CourseCard } from "@/components/dashboard/course-card";

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

  const relatedCourses = mockCourses.filter(c => c.category === course.category && c.id !== course.id);
  const additionalMaterials = mockDocuments.slice(0, 4);

  return (
    <div className="container mx-auto py-8 px-4">
       <Button asChild variant="link" className="mb-6 text-muted-foreground hover:no-underline p-0 h-auto text-sm">
        <Link href="/dashboard/cursos" className="flex items-center gap-2 group">
           <span className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </span>
          <span className="opacity-100 group-hover:opacity-100 transition-opacity">Volver</span>
        </Link>
      </Button>

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{course.title}</h1>
      
      {/* All Lessons Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Todas las Lecciones</h2>
            <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <ArrowLeftIcon className="h-4 w-4"/>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <ArrowRight className="h-4 w-4"/>
                </Button>
            </div>
        </div>
        <ScrollArea className="w-full">
            <div className="flex gap-4 pb-4">
                {relatedCourses.map(relatedCourse => (
                    <div key={relatedCourse.id} className="w-64 flex-shrink-0">
                         <CourseCard course={relatedCourse} />
                    </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Video Player Section */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl mb-12">
        <Image src={course.imageUrl} alt={`Lección sobre ${course.title}`} layout="fill" objectFit="cover" data-ai-hint={course.dataAiHint} className="opacity-70"/>
        <div className="absolute inset-0 flex items-center justify-center">
            <Button variant="ghost" size="icon" className="h-20 w-20 bg-white/20 text-white backdrop-blur-sm rounded-full hover:bg-white/30">
                <PlayCircle className="h-12 w-12" />
            </Button>
        </div>
        <div className="absolute bottom-4 left-4 text-white p-4">
            <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm">Lección Actual</Badge>
            <h3 className="text-2xl font-bold mt-2">{course.title}</h3>
        </div>
      </div>

      {/* Additional Materials Section */}
       <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Materiales Adicionales</h2>
            <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <ArrowLeftIcon className="h-4 w-4"/>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <ArrowRight className="h-4 w-4"/>
                </Button>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalMaterials.map(doc => (
                <Card key={doc.id} className="flex items-center p-4 gap-4 bg-muted/50 border-0">
                    <div className="p-3 bg-background rounded-lg shadow-sm">
                        <FileText className="h-5 w-5 text-primary"/>
                    </div>
                    <div className="flex-grow">
                        <p className="text-sm font-semibold">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">{doc.area}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Download className="h-4 w-4"/>
                    </Button>
                </Card>
            ))}
        </div>
      </div>

    </div>
  );
}
