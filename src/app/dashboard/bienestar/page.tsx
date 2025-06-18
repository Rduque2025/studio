
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { CourseCard } from "@/components/dashboard/course-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { MenuItemCard } from "@/components/dashboard/menu-item-card";
import { mockCourses, mockActivities, mockMenuItems } from "@/lib/placeholder-data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function BienestarPage() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      <SectionWrapper title="Actividades de Bienestar" description="Descubra nuestros programas diseñados para su salud y bienestar integral.">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockActivities.slice(0,3).map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
           {mockActivities.length === 0 && (
            <p className="col-span-full text-muted-foreground">No hay actividades de bienestar destacadas en este momento.</p>
          )}
        </div>
      </SectionWrapper>

      <SectionWrapper title="Cursos para el Crecimiento Personal" description="Inscríbase en cursos que fomentan el desarrollo personal y profesional.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.filter(course => course.category === "Desarrollo Personal" || course.category === "Habilidades Blandas").slice(0,3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </SectionWrapper>
      
      <SectionWrapper title="Alimentación Saludable: Menú Semanal" description="Opciones nutritivas y balanceadas disponibles en nuestro comedor.">
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex w-max space-x-4 p-4">
            {mockMenuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SectionWrapper>
    </div>
  );
}

