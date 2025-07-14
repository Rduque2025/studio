
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { CourseCard } from "@/components/dashboard/course-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { mockCourses, mockActivities, mockMenuItems, mockDietMenuItems, mockExecutiveMenuItems, mockDepartments } from "@/lib/placeholder-data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Landmark,
  UsersRound,
  Cpu,
  GitFork,
  ArrowRight,
  Plane,
  ShieldCheck,
  FileText,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Sun,
  Umbrella,
  Ship,
  Bike,
  Clock,
  Hospital,
  MessageSquare,
  Phone,
  Star,
  Check,
  ArrowUpRight,
  Users,
  DollarSign,
  Megaphone,
  Settings,
  LifeBuoy
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { MenuItem } from '@/lib/placeholder-data';
import { MenuItemCard } from '@/components/dashboard/menu-item-card';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const faqData = [
  {
    id: "faq1",
    question: "¿Cómo puedo consultar la cobertura de mi póliza HCM?",
    answer: "Puedes consultar todos los detalles de tu póliza, incluyendo coberturas, red de clínicas y estatus de reembolsos, accediendo a la sección 'Póliza HCM' desde el menú de Accesos Rápidos en esta misma página."
  },
  {
    id: "faq2",
    question: "¿Cuál es el procedimiento para solicitar vacaciones?",
    answer: "Para solicitar tus días libres, dirígete a 'Gestión de Vacaciones' en los Accesos Rápidos. Allí podrás ver tu saldo de días disponibles, seleccionar las fechas deseadas y enviar la solicitud para su aprobación."
  },
  {
    id: "faq3",
    question: "¿A quién debo contactar para soporte técnico?",
    answer: "Si tienes algún inconveniente técnico con tu equipo o con alguna de las plataformas, puedes generar un ticket de soporte dirigiéndote al 'Portal de Requerimientos' y seleccionando el departamento de 'Tecnología de Información'."
  },
  {
    id: "faq4",
    question: "¿Dónde puedo ver el menú del comedor de esta semana?",
    answer: "El menú semanal del comedor está disponible en la página principal del portal, justo debajo de los Accesos Rápidos. Puedes navegar entre las opciones de Menú General, Dieta y Ejecutivo usando las pestañas."
  },
  {
    id: "faq5",
    question: "¿Cómo me inscribo en un curso o actividad de bienestar?",
    answer: "Tanto los cursos como las actividades de bienestar se encuentran en la sección 'Bienestar' accesible desde el menú de navegación principal. Dentro de cada sección, podrás ver los detalles y encontrar los botones para inscribirte o confirmar tu asistencia."
  }
];

const pilaresData = [
    { number: "01", title: "Solidez", text: "Garantizamos la capacidad de respuesta ante compromisos.", icon: Landmark },
    { number: "02", title: "Talento", text: "Equipo de profesionales capacitados y motivados.", icon: UsersRound },
    { number: "03", title: "Tecnología", text: "Invertimos para optimizar procesos y mejorar experiencia.", icon: Cpu },
    { number: "04", title: "Adaptabilidad", text: "Nos ajustamos a los cambios del entorno y del mercado.", icon: GitFork },
];

const AnimatedContactButton = ({ href, type, label, number, icon: Icon, className, iconClassName }: {
  href: string;
  type: 'whatsapp' | 'phone';
  label: string;
  number: string;
  icon: React.ElementType;
  className: string;
  iconClassName: string;
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isClicked) return;

    setIsClicked(true);

    setTimeout(() => {
      window.location.href = href;
      setTimeout(() => {
         setIsClicked(false);
      }, 300);
    }, 500);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "relative flex w-[280px] items-center justify-start rounded-full p-2 text-white shadow-lg transition-colors duration-300 hover:brightness-110 overflow-hidden h-[56px]",
        className
      )}
    >
      <div className={cn("pl-4 transition-opacity duration-200", isClicked ? "opacity-0" : "opacity-100")}>
        <p className="text-xs">{label}</p>
        <p className="font-semibold">{number}</p>
      </div>

      <div
        className={cn(
          "absolute top-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform duration-300 ease-in-out",
          "transform -translate-y-1/2",
          isClicked ? "left-2" : "right-2",
        )}
      >
         {isClicked ? <Check className="h-6 w-6 text-green-500" /> : <Icon className={cn("h-5 w-5", iconClassName)} />}
      </div>
    </Link>
  );
};

const iconMap: { [key: string]: React.ElementType } = {
  rh: Users,
  it: Cpu,
  finanzas: DollarSign,
  marketing: Megaphone,
  operaciones: Settings,
  vacaciones: Plane,
  hcm: ShieldCheck,
  servicios: LifeBuoy
};

const departmentGridConfig = [
  { 
    id: 'rh', 
    className: "bg-neutral-800 text-white row-span-2 col-span-2", 
    title: "Recursos Humanos", 
    description: "Constancias, recibos y más." 
  },
  { 
    id: 'it', 
    className: "bg-sky-500 text-white col-span-1", 
    title: "Soporte TI", 
    description: "Equipos y software." 
  },
  { 
    id: 'servicios', 
    className: "bg-amber-400 text-neutral-900 col-span-1", 
    title: "Servicios Generales", 
    description: "Mantenimiento." 
  },
  { 
    id: 'hcm', 
    className: "bg-lime-400 text-neutral-900 col-span-2", 
    title: "Póliza HCM", 
    description: "Consultas y reembolsos." 
  }
];


export default function DashboardPage() {
  const menuScrollAreaRef = useRef<HTMLDivElement>(null);
  const [selectedMenu, setSelectedMenu] = useState<'Clásico' | 'Dieta' | 'Ejecutivo'>('Clásico');
  const [currentDayName, setCurrentDayName] = useState('');
  
  useEffect(() => {
    const today = new Date();
    const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' });
    setCurrentDayName(dayName.charAt(0).toUpperCase() + dayName.slice(1));
  }, []);

  const handleMenuScroll = (direction: 'left' | 'right') => {
    const viewport = menuScrollAreaRef.current?.querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]');
    if (viewport) {
      const scrollAmount = 320; // Approximately the width of one card plus gap
      viewport.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const allMenuItems: MenuItem[] = [
    ...mockMenuItems,
    ...mockDietMenuItems,
    ...mockExecutiveMenuItems,
  ];

  const filteredMenuItems = allMenuItems.filter(item => item.type === selectedMenu);
  
  const getDepartmentDetails = (id: string) => {
      const dept = mockDepartments.find(d => d.id === id);
      const config = departmentGridConfig.find(c => c.id === id);
      return { ...dept, ...config };
  };

  const services = ['rh', 'it', 'servicios', 'hcm'];

  return (
    <div className="bg-background">
        
        {/* Hero Section */}
        <section className="relative h-screen w-full bg-card">
            <Image
                src="https://images.unsplash.com/photo-1570483358100-6d222cdea6ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOXx8Q0lFTE98ZW58MHx8fHwxNzUxNjYxMjM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Fondo abstracto del portal"
                layout="fill"
                objectFit="cover"
                data-ai-hint="sky abstract"
                className="opacity-20"
                priority
            />
            <div className="container mx-auto h-full flex flex-col justify-center items-start text-left p-4 z-10 relative">
                <h1 className="text-4xl md:text-6xl font-extrabold max-w-2xl text-foreground">
                    Tu Ecosistema Digital Banesco Seguros
                </h1>
                <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                    Bienvenido al espacio donde encontrarás todas las herramientas, recursos y actividades para tu día a día en Banesco Seguros.
                </p>
                <Button asChild size="lg" className="mt-8">
                    <Link href="/dashboard/bienestar">
                        Explorar Bienestar
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </section>

        {/* Pilares Section */}
        <SectionWrapper>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex items-center justify-center">
              <span className="text-[250px] font-black text-primary/10 leading-none">4</span>
              <span className="text-7xl font-bold text-foreground -ml-4" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                PILARES
              </span>
            </div>
            
            <div className="space-y-4">
              {pilaresData.map((pilar) => (
                <div 
                  key={pilar.number}
                  className="group p-6 rounded-2xl transition-all duration-300 ease-in-out hover:bg-card hover:shadow-xl hover:scale-105"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-muted text-muted-foreground text-lg font-bold transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                      {pilar.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{pilar.title}</h3>
                      <p className="text-sm text-muted-foreground">{pilar.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      
        {/* Portal de Requerimientos Section */}
        <SectionWrapper className="min-h-screen flex flex-col justify-center py-0 md:py-0">
          <Card className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-primary p-8 md:p-12 text-primary-foreground shadow-2xl">
              <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5"></div>
              <div className="absolute -right-10 -top-10 w-60 h-60 rounded-full bg-white/5"></div>
              <div className="absolute right-0 top-0 w-40 h-40 rounded-full bg-white/5"></div>
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                      <h2 className="text-4xl md:text-5xl font-bold">Portal de Requerimientos</h2>
                      <p className="max-w-md text-primary-foreground/80">
                          Centraliza tus solicitudes y gestiona tus necesidades en un solo lugar.
                      </p>
                  </div>
                  <div className="space-y-3">
                      <Link href="/dashboard/requerimientos/rh" className="group flex items-center justify-between p-3 pl-4 bg-black/20 rounded-full hover:bg-black/30 transition-colors">
                          <span className="text-sm font-medium">Recursos Humanos</span>
                          <div className="h-6 w-6 rounded-full bg-primary-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <ArrowRight className="h-4 w-4 text-white" />
                          </div>
                      </Link>
                       <Link href="/dashboard/requerimientos/it" className="group flex items-center justify-between p-3 pl-4 bg-black/20 rounded-full hover:bg-black/30 transition-colors">
                          <span className="text-sm font-medium">Soporte TI</span>
                          <div className="h-6 w-6 rounded-full bg-primary-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <ArrowRight className="h-4 w-4 text-white" />
                          </div>
                      </Link>
                      <Link href="/dashboard/requerimientos/servicios" className="group flex items-center justify-between p-3 pl-4 bg-black/20 rounded-full hover:bg-black/30 transition-colors">
                          <span className="text-sm font-medium">Servicios Generales</span>
                          <div className="h-6 w-6 rounded-full bg-primary-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <ArrowRight className="h-4 w-4 text-white" />
                          </div>
                      </Link>
                       <Link href="/dashboard/requerimientos" className="group flex items-center justify-between p-3 pl-4 bg-black/20 rounded-full hover:bg-black/30 transition-colors">
                          <span className="text-sm font-medium">Ver todos</span>
                          <div className="h-6 w-6 rounded-full bg-primary-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <ArrowRight className="h-4 w-4 text-white" />
                          </div>
                      </Link>
                  </div>
              </div>
          </Card>
        </SectionWrapper>


        {/* Gestión de Vacaciones Section */}
        <SectionWrapper>
          <div className="bg-card shadow-lg rounded-2xl overflow-hidden min-h-[700px] flex flex-col md:flex-row">
            {/* Left Panel */}
            <div className="w-full md:w-2/3 relative min-h-[400px] md:min-h-full">
              <Image 
                src="https://images.unsplash.com/photo-1613425653628-23fd58c3c2b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxiZWFjaCUyMHZhY2F0aW9ufGVufDB8fHx8MTc1MjE3OTE3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Playa tropical para representar vacaciones"
                layout="fill"
                objectFit="cover"
                data-ai-hint="beach vacation"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12 text-white">
                <h2 className="text-5xl font-bold leading-tight">Gestión de Vacaciones</h2>
                <p className="mt-4 max-w-md text-white/90">
                  Planifica tu viaje con las mejores recomendaciones y gestiona tus solicitudes de forma sencilla.
                </p>
                <Button asChild className="mt-6 w-fit">
                  <Link href="/dashboard/vacaciones">Explorar</Link>
                </Button>
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-full md:w-1/3 bg-background p-8 flex flex-col">
              <div className="space-y-6 mt-auto mb-auto">
                <div className="relative h-48 w-full rounded-2xl overflow-hidden group">
                  <Image 
                    src="https://images.unsplash.com/photo-1676042349618-9f8c85d76b7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxyZXF1ZXN0JTIwZm9ybXxlbnwwfHx8fDE3NTIxNzkxNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Solicitudes de vacaciones"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="request form"
                    className="group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-bold text-lg">Mis Solicitudes</h4>
                    <p className="text-xs">Consulta el estado de tus solicitudes de vacaciones.</p>
                  </div>
                </div>
                <div className="relative h-48 w-full rounded-2xl overflow-hidden group">
                  <Image 
                    src="https://images.unsplash.com/photo-1564689510742-4e9c7584181d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxhaXJwbGFuZSUyMHNreXxlbnwwfHx8fDE3NTIxNzk2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Fechas Disponibles"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="airplane sky"
                    className="group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                   <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-bold text-lg">Fechas Disponibles</h4>
                    <p className="text-xs">Consulta el calendario y planifica tu próximo viaje.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>


        {/* Póliza HCM Section */}
        <SectionWrapper>
          <Card className="overflow-hidden bg-card shadow-lg border-none">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">ESTAMOS AQUÍ PARA AYUDARTE</p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
                  Consulte su Póliza HCM
                </h2>
                <p className="text-muted-foreground mb-8">
                  ¿Busca información detallada sobre su cobertura o necesita asistencia? Navegue por nuestras opciones o contáctenos directamente.
                </p>
                <div className="space-y-4">
                   <AnimatedContactButton 
                     href="https://wa.me/584141234567"
                     type="whatsapp"
                     label="WhatsApp"
                     number="+58 414 123 4567"
                     icon={MessageSquare}
                     className="bg-green-500"
                     iconClassName="text-green-500"
                   />
                  <AnimatedContactButton 
                     href="tel:+582125011111"
                     type="phone"
                     label="Teléfono"
                     number="+58 212 501 1111"
                     icon={Phone}
                     className="bg-blue-500"
                     iconClassName="text-blue-500"
                   />
                </div>
              </div>
              <div className="bg-muted/50 p-8 md:p-12 flex items-center">
                 <div className="w-full grid grid-cols-2 gap-4">
                    <Card className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                      <Image src="https://images.unsplash.com/photo-1509909756405-be0199881695?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoYXBwaW5lc3N8ZW58MHx8fHwxNzUyNzA5MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Beneficios" layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint="happiness joy" />
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center text-white">
                        <h4 className="text-xl font-bold">Beneficios</h4>
                        <p className="text-xs mt-1 text-white/90">Descubra todas sus ventajas.</p>
                        <Button variant="secondary" size="sm" className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                          Consultar
                        </Button>
                      </div>
                    </Card>
                     <Card className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                      <Image src="https://images.unsplash.com/photo-1619037318263-5899a359e504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxzZWN1cml0eSUyMGxvY2t8ZW58MHx8fHwxNzUyNTAyNTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Cobertura" layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint="security lock" />
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center text-white">
                        <h4 className="text-xl font-bold">Cobertura</h4>
                        <p className="text-xs mt-1 text-white/90">Conozca el alcance de su póliza.</p>
                        <Button variant="secondary" size="sm" className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                          Consultar
                        </Button>
                      </div>
                    </Card>
                     <Card className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                      <Image src="https://images.unsplash.com/photo-1600851555921-d280ba3f019a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxob3NwaXRhbCUyMGJ1aWxkaW5nfGVufDB8fHx8MTc1MjUwMjU0OXww&ixlib=rb-4.1.0&q=80&w=1080" alt="Centros de Atención" layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint="hospital building" />
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center text-white">
                        <h4 className="text-xl font-bold">Centros de Atención</h4>
                        <p className="text-xs mt-1 text-white/90">Encuentre la clínica más cercana.</p>
                        <Button variant="secondary" size="sm" className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                          Consultar
                        </Button>
                      </div>
                    </Card>
                     <Card className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                      <Image src="https://images.unsplash.com/photo-1563493987075-d5ec194675d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwcm9jZXNzJTIwd29ya2Zsb3d8ZW58MHx8fHwxNzUyNTAyNTUwfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Protocolos" layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint="process workflow" />
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center text-white">
                        <h4 className="text-xl font-bold">Protocolos</h4>
                        <p className="text-xs mt-1 text-white/90">Siga los pasos para cada caso.</p>
                        <Button variant="secondary" size="sm" className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                          Consultar
                        </Button>
                      </div>
                    </Card>
                </div>
              </div>
            </div>
          </Card>
        </SectionWrapper>

        {/* Menus Section */}
        <SectionWrapper className="min-h-screen flex flex-col justify-center py-0 md:py-0">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-4">
              <h2 className="text-4xl font-bold text-foreground">Menú Semanal</h2>
              <p className="text-muted-foreground mt-4">
                Opciones de almuerzo disponibles para toda la semana en el comedor.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                 <div className="flex items-center gap-2 flex-wrap">
                    <Button size="sm" variant={selectedMenu === 'Clásico' ? 'default' : 'outline'} onClick={() => setSelectedMenu('Clásico')}>Clásico</Button>
                    <Button size="sm" variant={selectedMenu === 'Dieta' ? 'default' : 'outline'} onClick={() => setSelectedMenu('Dieta')}>Dieta</Button>
                    <Button size="sm" variant={selectedMenu === 'Ejecutivo' ? 'default' : 'outline'} onClick={() => setSelectedMenu('Ejecutivo')}>Ejecutivo</Button>
                  </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleMenuScroll('left')}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleMenuScroll('right')}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
              </div>
              <div ref={menuScrollAreaRef}>
                <ScrollArea className="w-full">
                  <div className="flex w-max space-x-8 py-4">
                    {filteredMenuItems.map((item) => (
                      <MenuItemCard key={item.id} item={item} isCurrentDay={currentDayName === item.day} />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
          </div>
        </SectionWrapper>


        {/* Cursos Section */}
        <SectionWrapper 
            title="Cursos Disponibles" 
            description="Amplíe sus conocimientos y habilidades con nuestra oferta formativa."
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            <div className="text-center mt-8">
                <Button asChild variant="outline">
                    <Link href="/dashboard/bienestar#cursos">
                    Ver todos los Cursos <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </SectionWrapper>

        {/* Actividades Section */}
        <SectionWrapper 
            title="Actividades y Bienestar" 
            description="Participe en nuestras próximas actividades y programas de bienestar."
        >
            <ScrollArea className="w-full">
              <div className="flex space-x-4 pb-4">
                {mockActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
             <div className="text-center mt-8">
                <Button asChild variant="outline">
                    <Link href="/dashboard/bienestar#actividades">
                    Ver todas las Actividades <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </SectionWrapper>
      
        {/* Mision y Valores Section */}
        <SectionWrapper>
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="relative aspect-square w-full rounded-lg overflow-hidden">
                     <Image
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtZWV0aW5nfGVufDB8fHx8MTc1MDI3NzU0OHww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Reunión de equipo Banesco Seguros"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="meeting team"
                     />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-foreground tracking-tight">Nuestra Misión y Oferta de Valor</h2>
                    <p className="text-muted-foreground">
                       Somos una empresa de seguros reconocida por su excelencia y calidad, orientada a satisfacer las necesidades de nuestros clientes, intermediarios y organización, brindando asesoría y protección con soluciones ágiles y oportunas.
                    </p>
                     <p className="font-semibold text-foreground">
                        ¡Cumplimos lo que prometemos!
                    </p>
                    <Button asChild>
                        <Link href="/dashboard/mapa-clientes">
                            Conocer más sobre nosotros
                        </Link>
                    </Button>
                </div>
            </div>
        </SectionWrapper>

        {/* FAQ Section */}
        <SectionWrapper>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div className="space-y-4 text-center md:text-left">
              <div className="flex justify-center md:justify-start">
                <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Preguntas Frecuentes
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Preguntas Frecuentes</h2>
              <p className="text-muted-foreground text-lg">
                Respuestas a las dudas más comunes. Si no encuentras lo que buscas, no dudes en contactarnos a través del portal de requerimientos.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqData.map((faq) => (
                <AccordionItem value={faq.id} key={faq.id} className="bg-card border-0 rounded-lg shadow-sm data-[state=open]:shadow-md transition-shadow">
                  <AccordionTrigger className="p-6 text-left font-semibold text-base hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SectionWrapper>

    </div>
  );
}
    


    



























