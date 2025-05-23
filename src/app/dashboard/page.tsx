import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { InteractiveVenezuelaMap } from "@/components/dashboard/venezuela-map";
import { CourseCard } from "@/components/dashboard/course-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { MenuItemCard } from "@/components/dashboard/menu-item-card";
import { mockCourses, mockActivities, mockMenuItems } from "@/lib/placeholder-data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      <SectionWrapper title="Mapa Interactivo de Clientes" description="Visualice la distribución de clientes a nivel nacional.">
        <InteractiveVenezuelaMap />
      </SectionWrapper>

      <SectionWrapper title="Cursos Disponibles" description="Amplíe sus conocimientos y habilidades con nuestra oferta formativa.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </SectionWrapper>
      
      <SectionWrapper title="Menú Semanal" description="Consulte las opciones de almuerzo para esta semana en el comedor.">
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex w-max space-x-4 p-4">
            {mockMenuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SectionWrapper>

      <SectionWrapper title="Actividades y Bienestar" description="Participe en nuestras próximas actividades y programas de bienestar.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
