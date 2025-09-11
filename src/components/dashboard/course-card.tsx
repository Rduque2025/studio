
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
  const linkHref = course.hasDetailPage ? `/dashboard/cursos/${course.id}` : "#";
  const linkTarget = course.hasDetailPage ? "_self" : "_blank";

  return (
    <Link href={linkHref} target={linkTarget} className="group block h-full">
      <div className="flex flex-col h-full">
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl mb-4">
            <Image
                src={course.imageUrl}
                alt={course.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={course.dataAiHint}
                className="transition-transform duration-300 group-hover:scale-105"
            />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-1">
            <span>{course.category}</span>
            <span>&bull;</span>
            <span>{course.duration}</span>
          </div>
          <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">{course.title}</h3>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{course.description}</p>
        </div>
      </div>
    </Link>
  );
}
