
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { mockCourses, mockDocuments } from "@/lib/placeholder-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlayCircle, Download, FileText, ChevronRight, ChevronLeft, Video } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CourseCard } from "@/components/dashboard/course-card";
import { Progress } from "@/components/ui/progress";

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
  const relatedCourses = mockCourses.filter(c => c.category === course?.category && c.id !== course?.id);

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
      <div className="mb-8">
        <Button asChild variant="link" className="text-muted-foreground hover:no-underline p-0 h-auto">
            <Link href="/dashboard/cursos" className="flex items-center gap-2 group">
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium">Volver</span>
            </Link>
        </Button>
      </div>

      <div className="space-y-12">
        <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground">{course.category}</p>
        </div>

        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Todas las Lecciones</h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4"/></Button>
                    <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4"/></Button>
                </div>
            </div>
            <ScrollArea className="w-full">
                <div className="flex space-x-4 pb-4">
                    {relatedCourses.map(related => (
                        <div key={related.id} className="w-60 flex-shrink-0">
                           <CourseCard course={related} />
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>

        <Card className="overflow-hidden shadow-lg border-none">
            <CardHeader>
                <CardTitle>Lección Actual: {course.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black group">
                    <Image src={course.imageUrl} alt={course.title} layout="fill" objectFit="cover" data-ai-hint={course.dataAiHint} className="opacity-50 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Button variant="ghost" size="icon" className="h-20 w-20 bg-white/20 text-white backdrop-blur-sm rounded-full hover:bg-white/30 hover:text-white transition-colors">
                           <PlayCircle className="h-12 w-12" />
                        </Button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                        <Progress value={40} className="h-2" indicatorClassName="bg-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
        
        <div>
            <h2 className="text-xl font-semibold mb-4">Materiales Adicionales</h2>
            <div className="space-y-3">
              {mockDocuments.slice(0,3).map(doc => (
                <Card key={doc.id} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-muted rounded-md border">
                                <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">{doc.title}</h3>
                                <p className="text-xs text-muted-foreground line-clamp-1">{doc.description}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon">
                            <Download className="h-5 w-5 text-muted-foreground" />
                        </Button>
                    </CardContent>
                </Card>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
