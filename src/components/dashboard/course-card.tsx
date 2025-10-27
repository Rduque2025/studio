
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
      <div className="flex flex-col h-full">
        <div className="relative w-full aspect-square overflow-hidden rounded-lg mb-3 group">
            <Image
                src={course.imageUrl}
                alt={course.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={course.dataAiHint}
                className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <PlayCircle className="h-10 w-10 text-white" />
            </div>
            <div className="absolute bottom-2 left-2">
                <Badge variant="secondary" className="bg-black/50 text-white text-[10px]">{course.duration}</Badge>
            </div>
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1">{course.title}</h3>
        </div>
      </div>
    </Link>
  );
}
