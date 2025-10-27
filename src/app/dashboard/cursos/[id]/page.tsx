
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { mockCourses, mockDocuments } from "@/lib/placeholder-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, ChevronLeft, ChevronRight, Clock, FileText, Folder, Link as LinkIcon, Lock, MessageSquare, Paperclip, Upload, PlayCircle, MoreVertical } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CourseCard } from "@/components/dashboard/course-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CourseDetailsPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return mockCourses.filter(course => course.hasDetailPage).map((course) => ({
    id: course.id,
  }));
}

const hometasks = [
  { id: 1, title: 'Introducción al Pensamiento Estratégico', isCompleted: true, isLocked: false },
  { id: 2, title: 'Análisis FODA y PESTEL', isCompleted: true, isLocked: false },
  { id: 3, title: 'Definición de Objetivos y KPIs', isCompleted: false, isLocked: false, isCurrent: true },
  { id: 4, title: 'Ejecución del Plan Estratégico', isCompleted: false, isLocked: true },
  { id: 5, title: 'Métricas en Diseño UX', isCompleted: false, isLocked: true },
  { id: 6, title: 'Análisis Avanzado de Google Analytics', isCompleted: false, isLocked: true },
];

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
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">Volver a Cursos</span>
            </Link>
          </Button>
        </SectionWrapper>
      </div>
    );
  }

  const relatedCourses = mockCourses.filter(c => c.category === course.category && c.id !== course.id).slice(0, 4);

  return (
    <div className="bg-muted/40 min-h-screen">
      <div className="container mx-auto grid lg:grid-cols-12 gap-8 py-8 px-4">
        
        {/* Main Content */}
        <main className="lg:col-span-8 space-y-8">
            <Button asChild variant="link" className="text-muted-foreground hover:no-underline p-0 h-auto text-xs">
                <Link href="/dashboard/cursos" className="flex items-center gap-2 group">
                    <ChevronLeft className="h-4 w-4" />
                    Volver
                </Link>
            </Button>
            
            <h1 className="text-3xl font-bold">{course.title}</h1>

            {/* All Lessons */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Todas las Lecciones</h2>
                     <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                 <ScrollArea className="w-full">
                    <div className="flex space-x-4 pb-4">
                        {relatedCourses.map((related) => (
                           <div key={related.id} className="w-64 flex-shrink-0">
                             <CourseCard course={related} />
                           </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            {/* Video Player */}
            <Card className="overflow-hidden shadow-lg">
                <CardHeader className="flex flex-row justify-between items-center p-4 bg-muted/50">
                    <div>
                        <CardDescription>Lección 4</CardDescription>
                        <CardTitle className="text-lg">Introducción a {course.title}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="relative aspect-video w-full">
                         <Image src={course.imageUrl} alt={course.title} layout="fill" objectFit="cover" data-ai-hint={course.dataAiHint} />
                         <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Button variant="ghost" size="icon" className="h-20 w-20 bg-white/20 text-white backdrop-blur-sm rounded-full hover:bg-white/30 hover:text-white">
                                <PlayCircle className="h-12 w-12" />
                            </Button>
                         </div>
                    </div>
                </CardContent>
            </Card>

            {/* Additional Materials */}
            <div>
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Materiales Adicionales</h2>
                     <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                 <div className="grid md:grid-cols-2 gap-4">
                    <Card className="hover:bg-muted/50 transition-colors">
                        <CardContent className="p-4 flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                               <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">Guía de Inicio Rápido</h3>
                                <p className="text-xs text-muted-foreground">Un documento PDF con los conceptos clave del curso.</p>
                            </div>
                            <Button variant="ghost" size="icon" className="ml-auto flex-shrink-0 h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
                        </CardContent>
                    </Card>
                     <Card className="hover:bg-muted/50 transition-colors">
                        <CardContent className="p-4 flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                               <Folder className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">Recursos del Proyecto</h3>
                                <p className="text-xs text-muted-foreground">Accede a la carpeta con todos los materiales del curso.</p>
                            </div>
                             <Button variant="ghost" size="icon" className="ml-auto flex-shrink-0 h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
           <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Progreso de Tareas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                   {hometasks.map(task => (
                       <div key={task.id}>
                           <div className="flex items-center p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                                <div className="flex items-center justify-center h-6 w-6 rounded-full border-2 text-xs font-bold mr-4
                                    data-[completed=true]:bg-primary data-[completed=true]:text-primary-foreground data-[completed=true]:border-primary
                                    data-[current=true]:border-primary"
                                    data-completed={task.isCompleted}
                                    data-current={task.isCurrent}
                                >
                                   {task.isCompleted ? <CheckCircle className="h-4 w-4" /> : task.id}
                               </div>
                                <p className="text-sm font-medium flex-grow">{task.title}</p>
                                {task.isLocked ? <Lock className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                           </div>
                           {task.isCurrent && (
                                <div className="pl-12 pr-4 py-4 space-y-4">
                                    <div className="space-y-1">
                                        <Label htmlFor={`link-${task.id}`} className="text-xs">Pegar enlace de Figma</Label>
                                        <div className="relative">
                                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id={`link-${task.id}`} placeholder="https://figma.com/..." className="pl-9" />
                                        </div>
                                    </div>
                                     <div className="space-y-1">
                                        <Label htmlFor={`comment-${task.id}`} className="text-xs">Añadir comentario</Label>
                                        <Textarea id={`comment-${task.id}`} placeholder="Escribe aquí tu comentario..." rows={2} />
                                    </div>
                                    <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-2">
                                        <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">Arrastra o <Button variant="link" className="p-0 h-auto">busca</Button> el archivo</p>
                                    </div>
                                </div>
                           )}
                       </div>
                   ))}
                </CardContent>
           </Card>
        </aside>

      </div>
    </div>
  );
}
