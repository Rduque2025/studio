
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/placeholder-data";
import { Badge } from "@/components/ui/badge";
import { Clock, Tag, PlayCircle } from "lucide-react";
import { Progress } from "../ui/progress";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const linkHref = course.hasDetailPage ? `/dashboard/cursos/${course.id}` : "#";
  const linkTarget = course.hasDetailPage ? "_self" : "_blank";

  return (
    <Link href={linkHref} target={linkTarget} className="group block h-full">
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg rounded-xl border-none">
        <CardHeader className="p-0 relative">
          <div className="aspect-video w-full relative overflow-hidden rounded-xl">
            <Image
              src={course.imageUrl}
              alt={course.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={course.dataAiHint}
              className="transition-transform duration-300 group-hover:scale-105"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
             <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="text-[10px] bg-black/50 text-white backdrop-blur-sm">{course.duration}</Badge>
             </div>
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-10 w-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <PlayCircle className="h-6 w-6 text-white"/>
                </div>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-2 pt-3">
          <CardTitle className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-1">
            {course.title}
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}
