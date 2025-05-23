

import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { InteractiveVenezuelaMap } from "@/components/dashboard/venezuela-map";
import { CourseCard } from "@/components/dashboard/course-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { MenuItemCard } from "@/components/dashboard/menu-item-card";
import { DressCodeCard } from "@/components/dashboard/dress-code-card"; // Importar DressCodeCard
import { mockCourses, mockActivities, mockMenuItems, mockDressCodeItems } from "@/lib/placeholder-data"; // Importar mockDressCodeItems
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { List, ListItem } from "@/components/ui/list"; 
import { CheckCircle } from "lucide-react";
import Image from "next/image";


export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      <SectionWrapper 
        title="Acerca de Banesco Seguros"
        description="Nuestra trayectoria y compromiso con Venezuela."
      >
        <Card className="bg-card">
          <CardContent className="p-6 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-muted-foreground leading-relaxed">
                En Banesco Seguros, nos dedicamos a ofrecer soluciones de protección innovadoras y confiables, adaptadas a las necesidades de nuestros clientes en Venezuela. Con una sólida trayectoria en el mercado asegurador, nuestro principal objetivo es brindar tranquilidad y respaldo a individuos, familias y empresas.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Nos esforzamos por mantener los más altos estándares de servicio, con un equipo de profesionales comprometidos con la excelencia y la atención personalizada. Creemos en la importancia de construir relaciones a largo plazo basadas en la confianza y la transparencia.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Nuestra visión es ser la aseguradora líder en el país, reconocida por nuestra solidez financiera, innovación constante y profundo compromiso social con el desarrollo de Venezuela.
              </p>
            </div>
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-sm">
              <Image 
                src="https://placehold.co/600x400.png"
                alt="Imagen corporativa de Banesco Seguros"
                layout="fill"
                objectFit="cover"
                data-ai-hint="corporate office"
                className="rounded-lg"
              />
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>

      <SectionWrapper 
        title="Valores y Pilares Fundamentales"
        description="Los principios que guían nuestro actuar diario."
      >
        <Card className="bg-card">
          <CardContent className="p-6 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Nuestros Valores</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Confianza:</strong> Construimos relaciones sólidas y duraderas basadas en la transparencia y el cumplimiento de nuestros compromisos.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Innovación:</strong> Buscamos constantemente nuevas y mejores formas de proteger lo que más valoran nuestros clientes.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Excelencia en el Servicio:</strong> Nos esforzamos por superar las expectativas de nuestros clientes en cada interacción.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Compromiso Social:</strong> Contribuimos activamente al desarrollo y bienestar de las comunidades donde operamos.</span>
                </li>
                 <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Integridad:</strong> Actuamos con honestidad y ética en todas nuestras operaciones.</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Nuestros Pilares</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Solidez Financiera:</strong> Garantizamos la capacidad de respuesta ante los compromisos adquiridos con nuestros asegurados.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Talento Humano:</strong> Contamos con un equipo de profesionales altamente capacitados y motivados.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Tecnología e Innovación:</strong> Invertimos en tecnología para optimizar procesos y mejorar la experiencia del cliente.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span><strong>Adaptabilidad:</strong> Nos ajustamos a los cambios del entorno y a las necesidades evolutivas del mercado.</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>

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

      <SectionWrapper title="Código de Vestimenta" description="Guía rápida sobre el código de vestimenta de la empresa.">
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex w-max space-x-4 p-4">
            {mockDressCodeItems.map((item) => (
              <DressCodeCard key={item.id} item={item} />
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
