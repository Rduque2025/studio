
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/placeholder-data";
import { Badge } from "@/components/ui/badge";
import { Clock, Tag } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  // Use a standard link for courses without a detail page, assuming it's an external resource.
  // In a real scenario, this link would come from the course data.
  const linkHref = course.hasDetailPage ? `/dashboard/cursos/${course.id}` : "#";
  const linkTarget = course.hasDetailPage ? "_self" : "_blank";

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={course.imageUrl}
            alt={course.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={course.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg font-semibold mb-2">{course.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mb-3 h-16 overflow-hidden text-ellipsis">
          {course.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Tag className="h-3 w-3" /> {course.category}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {course.duration}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild className="w-full" variant="default">
          <Link href={linkHref} target={linkTarget}>
            {course.hasDetailPage ? "Ver Detalles" : "Acceder al Curso"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
