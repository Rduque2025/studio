
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/placeholder-data";
import { Badge } from "@/components/ui/badge";
import { Clock, Tag } from "lucide-react";
import { Progress } from "../ui/progress";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const linkHref = course.hasDetailPage ? `/dashboard/cursos/${course.id}` : "#";
  const linkTarget = course.hasDetailPage ? "_self" : "_blank";

  return (
    <Link href={linkHref} target={linkTarget} className="group block h-full">
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg rounded-xl">
        <CardHeader className="p-0 relative">
          <div className="aspect-video w-full relative overflow-hidden">
            <Image
              src={course.imageUrl}
              alt={course.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={course.dataAiHint}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Badge variant="secondary" className="text-[10px] mb-2">{course.category}</Badge>
          <CardTitle className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors h-10">
            {course.title}
          </CardTitle>
          <CardDescription className="text-xs mt-2 flex items-center text-muted-foreground">
            <Clock className="mr-1.5 h-3 w-3" />
            {course.duration}
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Progress value={75} className="h-2" />
        </CardFooter>
      </Card>
    </Link>
  );
}
