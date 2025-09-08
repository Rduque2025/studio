
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { CourseCard } from "@/components/dashboard/course-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { mockCourses, mockActivities, mockDepartments, mockPlaylist, faqData } from "@/lib/placeholder-data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
  LifeBuoy,
  Mail,
  BookCheck,
  TrendingUp as TrendingUpIcon,
  Award,
  CalendarCheck,
  HeartHandshake,
  Dumbbell,
  Music,
  Drama,
  Music2,
  Home,
  User,
  Cog
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
import type { MenuItem } from '@/ai/flows/get-menu-items-flow';
import { getMenuItems } from '@/ai/flows/get-menu-items-flow';
import { MenuItemCard } from '@/components/dashboard/menu-item-card';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlaylistCard } from '@/components/dashboard/playlist-card';
import { Skeleton } from '@/components/ui/skeleton';


const pilaresData = [
    { number: "01", title: "Solidez", text: "Garantizamos la capacidad de respuesta ante compromisos.", icon: Landmark, color: "bg-primary" },
    { number: "02", title: "Talento", text: "Equipo de profesionales capacitados y motivados.", icon: "bg-secondary" },
    { number: "03", title: "Tecnología", text: "Invertimos para optimizar procesos y mejorar experiencia.", icon: Cpu, color: "bg-blue-400" },
    { number: "04", title: "Adaptabilidad", text: "Nos ajustamos a los cambios del entorno y del mercado.", icon: GitFork, color: "bg-sky-400" },
];

const AnimatedContactButton = ({ href, type, label, number, icon: Icon, className, iconClassName }: {
  href: string;
  type: 'whatsapp' | 'phone' | 'email';
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
        "relative flex w-[340px] items-center justify-start rounded-full p-2 text-white shadow-lg transition-colors duration-300 hover:brightness-110 overflow-hidden h-[56px]",
        className
      )}
    >
      <div className={cn("pl-4 transition-opacity duration-200", isClicked ? "opacity-0" : "opacity-100")}>
        <p className="text-xs">{label}</p>
        <p className="text-sm font-semibold">{number}</p>
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

const activityHighlights = [
    {
      icon: HeartHandshake,
      title: "Clases de Yoga",
      description: "Conecta cuerpo y mente para reducir el estrés y mejorar tu salud.",
    },
    {
      icon: Dumbbell,
      title: "Ejercicios Funcionales",
      description: "Mejora tu fuerza, resistencia y coordinación con entrenamientos dinámicos.",
    },
    {
      icon: Music,
      title: "Clases de Cuatro",
      description: "Aprende a tocar un instrumento tradicional y únete al ensamble musical.",
    },
    {
      icon: Drama,
      title: "Taller de Teatro",
      description: "Desarrolla tus habilidades de comunicación, oratoria y expresión corporal.",
    },
  ];

// Helper function to normalize day names for comparison
const normalizeDayName = (name: string) => {
  return name
    .toLowerCase()
    .normalize("NFD") // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, ""); // Remove diacritical marks
};


export default function DashboardPage() {
  const [currentDayName, setCurrentDayName] = useState('');
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [heroImage, setHeroImage] = useState({
    src: "https://images.unsplash.com/photo-1542349314-b0ceb4d90f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxudWJlc3xlbnwwfHx8fDE3NTI2MDU1MDV8MA&ixlib-rb-4.1.0&q=80&w=1080",
    hint: "clear sky"
  });
  const [activeFaqCategory, setActiveFaqCategory] = useState<'General' | 'Soporte' | 'Otros'>('General');
  const [todaysMenus, setTodaysMenus] = useState<MenuItem[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);

  const faqCategories = [
    { id: 'General', label: 'General', icon: Home },
    { id: 'Soporte', label: 'Soporte', icon: User },
    { id: 'Otros', label: 'Otros', icon: Cog },
  ];
  
  const handleCourseChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentCourseIndex((prevIndex) => (prevIndex + 1) % mockCourses.length);
    } else {
      setCurrentCourseIndex((prevIndex) => (prevIndex - 1 + mockCourses.length) % mockCourses.length);
    }
  };

  const currentCourse = mockCourses[currentCourseIndex];
  
  useEffect(() => {
    const todayDate = new Date();
    const currentHour = todayDate.getHours();
    const dayName = todayDate.toLocaleDateString('es-ES', { weekday: 'long' });
    setCurrentDayName(dayName.charAt(0).toUpperCase() + dayName.slice(1));
    
    // Set hero image based on time of day
    if (currentHour >= 6 && currentHour < 14) { // Morning (6am to 1:59pm)
      setHeroImage({
        src: "https://images.unsplash.com/photo-1542349314-b0ceb4d90f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxudWJlc3xlbnwwfHx8fDE3NTI2MDU1MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        hint: "clear sky"
      });
    } else if (currentHour >= 14 && currentHour < 17) { // Afternoon (2pm to 4:59pm)
      setHeroImage({
        src: "https://images.unsplash.com/photo-1517685633466-403d6955aeab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxBVEFSREVDRVJ8ZW58MHx8fHwxNzUyNjEyMDE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        hint: "sunset sky"
      });
    } else { // Evening/Night (5pm onwards)
      setHeroImage({
        src: "https://images.unsplash.com/photo-1590418606746-018840f9cd0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxOSUdIVHxlbnwwfHx8fDE3NTM5OTY3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        hint: "night sky"
      });
    }
    
    const fetchMenu = async () => {
      setIsLoadingMenu(true);
      try {
        const allMenus = await getMenuItems();
        const capitalizedDayName = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
        const normalizedToday = normalizeDayName(capitalizedDayName);
        
        const classicMenu = allMenus.find(item => normalizeDayName(item.day) === normalizedToday && item.type === 'Clásico');
        const dietMenu = allMenus.find(item => normalizeDayName(item.day) === normalizedToday && item.type === 'Dieta');
        const executiveMenu = allMenus.find(item => normalizeDayName(item.day) === normalizedToday && item.type === 'Ejecutivo');
        
        const menusForToday = [classicMenu, dietMenu, executiveMenu].filter(Boolean) as MenuItem[];
        setTodaysMenus(menusForToday);
      } catch (error) {
        console.error("Failed to fetch menu items", error);
        setTodaysMenus([]); // Ensure it's an empty array on error
      } finally {
        setIsLoadingMenu(false);
      }
    };

    fetchMenu();

  }, [currentDayName]);

  return (
    <div className="bg-background">
        
        {/* Hero Section */}
        <section className="relative h-screen w-full bg-card">
            <Image
                src={heroImage.src}
                alt="Fondo abstracto del portal"
                layout="fill"
                objectFit="cover"
                data-ai-hint={heroImage.hint}
                className="opacity-60"
                priority
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="container mx-auto h-full flex flex-col justify-center items-start text-left p-4 z-10 relative">
                <h1 className="text-white font-extrabold">
                    <span className="block text-6xl md:text-8xl">BIENVENIDO</span>
                    <span className="block text-2xl md:text-4xl mt-2">AL ENTORNO BANESCO SEGUROS</span>
                </h1>
                <p className="mt-6 max-w-xl text-base text-white">
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

        {/* Mision y Valores Section */}
        <SectionWrapper>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Nuestra Misión y Oferta de Valor
              </h2>
              <p className="text-muted-foreground max-w-lg">
                Somos una empresa de seguros reconocida por su excelencia y calidad, orientada a satisfacer las necesidades de nuestros clientes, intermediarios y organización, brindando asesoría y protección con soluciones ágiles y oportunas.
              </p>
              <p className="font-semibold text-foreground">
                ¡Cumplimos lo que prometemos!
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/dashboard/mapa-clientes">Conocer más</Link>
                </Button>
              </div>
            </div>
            <div className="relative grid grid-cols-2 grid-rows-2 gap-4 h-[500px]">
              <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                      src="https://images.unsplash.com/photo-1599351234741-727bff276c9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxidXNzaW5lc3xlbnwwfHx8fDE3NTI2MDU4MzJ8MA&ixlib-rb-4.1.0&q=80&w=1080"
                      alt="Equipo de Banesco Seguros"
                      width={400}
                      height={600}
                      className="w-full h-full object-cover"
                      data-ai-hint="team meeting"
                  />
              </div>
              <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                      src="https://images.unsplash.com/photo-1529180979161-06b8b6d6f2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOHx8ZmFtaWx5fGVufDB8fHx8MTc1MjYwNTY2Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Cliente satisfecho"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                      data-ai-hint="happy client"
                  />
              </div>
              <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                      src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjYXJ8ZW58MHx8fHwxNzU0MzMzNjcxfDA&ixlib-rb-4.1.0&q=80&w=1080"
                      alt="Oficina de Banesco"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                      data-ai-hint="car"
                  />
              </div>
            </div>
          </div>
        </SectionWrapper>
        
        {/* Portal de Requerimientos Section */}
        <div id="requerimientos">
            <SectionWrapper className="flex flex-col justify-center py-12 md:py-16">
            <Card className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-primary p-8 md:p-12 text-primary-foreground shadow-2xl min-h-[500px] flex flex-col justify-center">
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
        </div>

        {/* Menus Section */}
        <div id="menu">
            <SectionWrapper>
                <div className="flex flex-col items-center text-center mb-8">
                    <h2 className="text-4xl font-bold text-foreground tracking-tight">Menú del Día</h2>
                </div>
                {isLoadingMenu ? (
                  <div className="flex flex-wrap justify-center gap-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Card key={index} className="w-[350px] flex-shrink-0">
                        <Skeleton className="h-48 w-full" />
                        <CardContent className="p-4 space-y-2">
                          <Skeleton className="h-4 w-1/4" />
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : todaysMenus.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-6">
                        {todaysMenus.map(item => (
                            <MenuItemCard key={item.id} item={item} isCurrentDay={true} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground">No hay menú disponible para hoy.</p>
                )}
                 <div className="text-center mt-8">
                    <Button asChild size="sm" className="rounded-full text-xs">
                        <Link href="/dashboard/bienestar">
                            Menú Semanal <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </SectionWrapper>
        </div>
      
        {/* Gestión de Vacaciones Section */}
        <div id="vacaciones">
            <SectionWrapper>
            <div className="bg-card shadow-lg rounded-2xl overflow-hidden min-h-[700px] flex flex-col md:flex-row">
                {/* Left Panel */}
                <div className="w-full md:w-2/3 relative min-h-[400px] md:min-h-full">
                <Image
                    src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOXx8QkVBQ0h8ZW58MHx8fHwxNzUyNTA3OTA0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Playa tropical para representar vacaciones"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="beach vacation"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12 text-white pointer-events-none">
                    <h2 className="text-5xl font-extrabold leading-tight">¡Gestiona tus Próximas Vacaciones!</h2>
                    <p className="mt-4 max-w-md text-white/90">
                    Planifica tu viaje con las mejores recomendaciones y gestiona tus solicitudes de forma sencilla.
                    </p>
                    <Button asChild className="mt-6 w-fit pointer-events-auto">
                    <Link href="/dashboard/vacaciones">Explorar</Link>
                    </Button>
                </div>
                </div>

                {/* Right Panel */}
                <div className="w-full md:w-1/3 bg-background p-8 flex flex-col">
                <div className="space-y-4 my-auto">
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden group">
                    <Image
                        src="https://images.unsplash.com/photo-1615317779547-2078d82c549a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwbGFuZXxlbnwwfHx8fDE3NTI1MDYxMTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Solicitudes de vacaciones"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="plane"
                        className="group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4 text-white pointer-events-none">
                        <h4 className="font-bold text-lg">Mis Solicitudes</h4>
                        <p className="text-xs">Consulta el estado de tus solicitudes de vacaciones.</p>
                    </div>
                    </div>
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden group">
                    <Image
                        src="https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8cGxhbmV8ZW58MHx8fHwxNzUyNTA2MTEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Fechas Disponibles"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="plane"
                        className="group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4 text-white pointer-events-none">
                        <h4 className="font-bold text-lg">Fechas Disponibles</h4>
                        <p className="text-xs">Consulta el calendario y planifica tu próximo viaje.</p>
                    </div>
                    </div>
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden group">
                    <Image
                        src="https://images.unsplash.com/photo-1534396579421-7c278108bf83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzYWx0byUyMGFuZ2VsfGVufDB8fHx8MTc1MjU4NzIxMHww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Recomendaciones de viaje"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="travel guide"
                        className="group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4 text-white pointer-events-none">
                        <h4 className="font-bold text-lg">Recomendaciones</h4>
                        <p className="text-xs">Descubre destinos y consejos para tu próximo viaje.</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </SectionWrapper>
        </div>
        
        {/* Cursos Section */}
        <div id="cursos">
            <SectionWrapper className="overflow-hidden bg-card rounded-2xl shadow-sm">
            <div className="grid md:grid-cols-2 gap-8 min-h-[600px]">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="space-y-4">
                    <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                        Cursos <br />
                        <span className="text-primary font-bold">Disponibles</span>
                    </h2>
                    <p className="text-muted-foreground mb-4 max-w-lg">
                        {currentCourse.description}
                    </p>
                    </div>
                </div>
                <Button asChild size="lg" className="w-fit mt-4">
                    <Link href="/dashboard/bienestar#cursos">
                    Explorar Cursos
                    </Link>
                </Button>
                </div>
                <div className="relative min-h-[400px] md:min-h-full">
                <Image
                    src={currentCourse.imageUrl}
                    alt={currentCourse.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={currentCourse.dataAiHint}
                    className="brightness-90"
                    key={currentCourse.id}
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        <Card className="w-full max-w-sm bg-background/80 backdrop-blur-lg shadow-2xl rounded-xl">
                            <CardHeader>
                            <div className="flex justify-between items-center">
                                <Badge variant="secondary" className="flex items-center gap-1">
                                <Star className="h-3 w-3" /> {currentCourse.category}
                                </Badge>
                                <div className="flex gap-1">
                                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleCourseChange('prev')}>
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleCourseChange('next')}>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <CardTitle className="text-lg pt-2">{currentCourse.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground h-10 text-ellipsis overflow-hidden">{currentCourse.description}</p>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground"><Award className="h-4 w-4 text-primary" /><span>Certificado</span></div>
                                    <div className="font-medium text-foreground">Sí</div>
                            </div>
                            <div className="flex justify-between text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4 text-primary" /><span>Duración</span></div>
                                    <div className="font-medium text-foreground">{currentCourse.duration}</div>
                            </div>
                            </CardContent>
                            <CardContent>
                            <Button asChild className="w-full">
                                <Link href={`/dashboard/cursos/${currentCourse.id}`}>Más Información</Link>
                            </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            </SectionWrapper>
        </div>

        {/* Póliza HCM Section */}
        <div id="poliza">
            <SectionWrapper>
            <Card className="overflow-hidden bg-card shadow-lg border-none">
                <div className="grid md:grid-cols-2">
                <div className="p-12 flex flex-col justify-center">
                    <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Estamos aquí para ayudarte en caso de emergencia</p>
                    <h2 className="text-4xl font-extrabold text-foreground leading-tight mb-4">
                    NUESTRA <span className="text-primary font-extrabold">PÓLIZA HCM</span>
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
                        className="bg-primary"
                        iconClassName="text-primary"
                    />
                    <AnimatedContactButton 
                        href="tel:+582125011111"
                        type="phone"
                        label="Teléfono"
                        number="+58 212 501 1111"
                        icon={Phone}
                        className="bg-secondary"
                        iconClassName="text-secondary"
                    />
                    <AnimatedContactButton 
                        href="mailto:asistencia@banescoseguros.com"
                        type="email"
                        label="Correo Electrónico"
                        number="asistencia@banescoseguros.com"
                        icon={Mail}
                        className="bg-accent"
                        iconClassName="text-accent-foreground"
                    />
                    </div>
                </div>
                <div className="bg-muted/50 p-12 flex items-center">
                    <div className="w-full grid grid-cols-2 gap-8">
                        <Card className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <Image src="https://images.unsplash.com/photo-1429305336325-b84ace7eba3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxzdGFyc3xlbnwwfHx8fDE3NTI1OTk5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Beneficios" layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint="stars" />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center text-white pointer-events-none">
                            <h4 className="text-xl font-bold">Beneficios</h4>
                            <p className="text-xs mt-1 text-white/90">Descubra todas sus ventajas.</p>
                            <Button variant="secondary" size="sm" className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm pointer-events-auto">
                            Consultar
                            </Button>
                        </div>
                        </Card>
                        <Card className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <Image src="https://images.unsplash.com/photo-1651069381046-8db0c209a5e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8c3Vuc2hhZGV8ZW58MHx8fHwxNzUyNjAwMzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Cobertura" layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint="security protection" />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center text-white pointer-events-none">
                            <h4 className="text-xl font-bold">Cobertura</h4>
                            <p className="text-xs mt-1 text-white/90">Conozca el alcance de su póliza.</p>
                            <Button variant="secondary" size="sm" className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm pointer-events-auto">
                            Consultar
                            </Button>
                        </div>
                        </Card>
                        <Card className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <Image src="https://images.unsplash.com/photo-1601588243681-2fa6a06300d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMXx8TUVESUNBTCUyMENFTlRFUnxlbnwwfHx8fDE3NTI1MDU1MjB8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Centros de Atención" layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint="hospital building" />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center text-white pointer-events-none">
                            <h4 className="text-xl font-bold">Centros de Atención</h4>
                            <p className="text-xs mt-1 text-white/90">Encuentre la clínica más cercana.</p>
                            <Button variant="secondary" size="sm" className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm pointer-events-auto">
                            Consultar
                            </Button>
                        </div>
                        </Card>
                        <Card className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <Image src="https://images.unsplash.com/photo-1502101872923-d48509bff386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzdGFpcnN8ZW58MHx8fHwxNzUyNjAwMzk4fDA&ixlib-rb-4.1.0&q=80&w=1080" alt="Protocolos" layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint="process diagram" />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center text-white pointer-events-none">
                            <h4 className="text-xl font-bold">Protocolos</h4>
                            <p className="text-xs mt-1 text-white/90">Siga los pasos para cada caso.</p>
                            <Button variant="secondary" size="sm" className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm pointer-events-auto">
                            Consultar
                            </Button>
                        </div>
                        </Card>
                    </div>
                </div>
                </div>
            </Card>
            </SectionWrapper>
        </div>

        {/* Espacio Ejecutivo Section */}
        <div id="espacio-ejecutivo" className="scroll-mt-20">
            <SectionWrapper>
                <Card className="relative w-full overflow-hidden rounded-2xl bg-foreground text-primary-foreground shadow-2xl min-h-[400px] flex flex-col justify-center items-center text-center p-8 md:p-12 group">
                <Image
                    src="https://images.unsplash.com/photo-1610374792793-f016b77ca51a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxleGVjdXRpdmV8ZW58MHx8fHwxNzU2MTM2NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Equipo ejecutivo en reunión"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="executive meeting"
                    className="brightness-50 group-hover:brightness-[0.4] transition-all duration-300"
                />
                <div className="relative z-10 flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold">Espacio Ejecutivo</h2>
                    <p className="mt-4 max-w-xl text-primary-foreground/80">
                        Recursos, calendarios y herramientas exclusivas para la gerencia.
                    </p>
                    <Button asChild size="lg" className="mt-8 bg-white text-foreground hover:bg-white/90">
                        <Link href="/dashboard/espacio-ejecutivo">
                            Acceder Ahora <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
                </Card>
            </SectionWrapper>
        </div>


        {/* Actividades Section */}
        <div id="actividades">
            <SectionWrapper>
            <div className="bg-card p-8 md:p-12 rounded-2xl shadow-sm">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    Explore Nuestras Actividades de Bienestar
                    </h2>
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-muted-foreground mb-6">
                    Descubra un mundo de bienestar con nuestras actividades exclusivas, diseñadas para apoyar su salud física y mental en cada etapa de la vida.
                    </p>
                    <div className="flex flex-wrap gap-3">
                    <Button asChild variant="default" size="lg">
                        <Link href="/dashboard/bienestar">Ver Todas las Actividades</Link>
                    </Button>
                    </div>
                </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {activityHighlights.map((activity, index) => (
                    <Card 
                    key={index} 
                    className={cn(
                        "border-0 p-6 rounded-xl flex flex-col items-start gap-4 text-left transition-colors",
                        index === 0 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted/50"
                    )}
                    >
                    <div className={cn(
                        "p-3 rounded-full",
                        index === 0 ? "bg-primary-foreground/10 text-primary-foreground" : "bg-primary/10 text-primary"
                    )}>
                        <activity.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                        <h3 className={cn(
                        "font-semibold",
                        index === 0 ? "text-primary-foreground" : "text-foreground"
                        )}>{activity.title}</h3>
                        <p className={cn(
                        "text-sm",
                        index === 0 ? "text-primary-foreground/80" : "text-muted-foreground"
                        )}>{activity.description}</p>
                    </div>
                    </Card>
                ))}
                </div>
            </div>
            </SectionWrapper>
        </div>
      
        {/* Playlist Section */}
        <div id="playlist">
            <SectionWrapper>
            <div className="flex flex-col items-center text-center mb-8">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-foreground tracking-tight">Nuestra Playlist Banesco Seguros</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">La banda sonora para un día de trabajo productivo y agradable. Haz clic en una playlist para escucharla.</p>
                </div>
                <Button asChild variant="secondary" className="mt-4 rounded-full bg-muted text-muted-foreground hover:bg-muted/90 hover:text-foreground transition-colors">
                    <Link href="/dashboard/playlist">
                    Playlists
                    </Link>
                </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockPlaylist.map(item => (
                    <PlaylistCard key={item.id} item={item} />
                ))}
                </div>
            </SectionWrapper>
        </div>
        
        {/* FAQ Section */}
        <div id="faq">
            <SectionWrapper>
            <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-1 space-y-4">
                <div>
                    <p className="font-semibold text-primary uppercase tracking-wider">¿Tienes Dudas?</p>
                    <h2 className="text-3xl font-bold text-foreground tracking-tight mt-1">Preguntas Frecuentes</h2>
                </div>
                <div className="space-y-2">
                    {faqCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <Button
                        key={cat.id}
                        variant={activeFaqCategory === cat.id ? "secondary" : "ghost"}
                        className="w-full justify-start gap-3"
                        onClick={() => setActiveFaqCategory(cat.id as any)}
                        >
                        <Icon className="h-5 w-5" />
                        <span>{cat.label}</span>
                        </Button>
                    )
                    })}
                </div>
                </div>
                <div className="md:col-span-2">
                <Accordion type="single" collapsible className="w-full space-y-3" defaultValue={faqData.find(faq => faq.category === activeFaqCategory)?.id}>
                    {faqData.filter(faq => faq.category === activeFaqCategory).map((faq) => (
                    <AccordionItem value={faq.id} key={faq.id} className="bg-muted/50 border-0 rounded-lg">
                        <AccordionTrigger className="p-4 text-left font-semibold text-base hover:no-underline">
                        {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 text-muted-foreground">
                        {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
                </div>
            </div>
            </SectionWrapper>
        </div>

        {/* Pilares Section */}
        <div id="pilares">
            <SectionWrapper>
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="flex items-center justify-center">
                <span className="text-[250px] font-black text-primary/10 leading-none">4</span>
                <span className="text-7xl font-bold text-foreground -ml-4" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                    PILARES
                </span>
                </div>
                
                <div className="space-y-4">
                {pilaresData.map((pilar, index) => {
                    const colors = ["bg-primary", "bg-secondary", "bg-[#3f94cd]", "bg-[#59d1ff]"];
                    return (
                    <div 
                        key={pilar.number}
                        className={cn("group p-6 rounded-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105", colors[index % colors.length])}
                    >
                        <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-white/20 text-white text-lg font-bold">
                            {pilar.number}
                        </div>
                        <div className="text-white">
                            <h3 className="text-lg font-bold mb-1">{pilar.title}</h3>
                            <p className="text-sm opacity-90">{pilar.text}</p>
                        </div>
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>
            </SectionWrapper>
        </div>
    </div>
  );
}
    


    









    

    




    

    

    













    

    
