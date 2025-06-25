import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const bienestarNews = [
  {
    id: "news-1",
    title: "Celebramos el Día del Padre",
    description: "Un almuerzo especial para todos los padres de nuestra familia Banesco.",
    imageUrl: "https://images.unsplash.com/photo-1598365145240-3b04e283c83e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmYXRoZXJzJTIwZGF5JTIwbHVuY2h8ZW58MHx8fHwxNzUwODg5MTU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "fathers day",
    gridClass: "md:col-span-2 md:row-span-2",
    link: "#",
    badge: "Evento Pasado",
  },
  {
    id: "news-2",
    title: "Viernes de Pasticho",
    description: "¡No te pierdas el menú especial de esta semana!",
    imageUrl: "https://images.unsplash.com/photo-1563372224-c837581292c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsYXNhZ25hfGVufDB8fHx8MTc1MDg4OTIxOHww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "lasagna food",
    gridClass: "md:col-span-1 md:row-span-1",
    link: "/dashboard#menu-semanal",
    badge: "Menú",
  },
  {
    id: "news-3",
    title: "Nuevo Programa: Conecta2",
    description: "Fomentando la colaboración y el bienestar entre equipos.",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8fDE3NTA4ODkyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "team collaboration",
    gridClass: "md:col-span-1 md:row-span-1",
    link: "#",
    badge: "Nuevo",
  },
  {
    id: "news-4",
    title: "Clases de Yoga Semanales",
    description: "Encuentra tu equilibrio y reduce el estrés cada lunes y miércoles.",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx5b2dhfGVufDB8fHx8MTc1MDg4OTI4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "yoga fitness",
    gridClass: "md:col-span-1 md:row-span-1",
    link: "/dashboard/actividades/A001",
    badge: "Actividad",
  },
  {
    id: "news-5",
    title: "Curso de Liderazgo Efectivo",
    description: "Inscríbete ahora y potencia tus habilidades de gestión.",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwbWVldGluZ3xlbnwwfHx8fDE3NTA4ODkzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "leadership meeting",
    gridClass: "md:col-span-2 md:row-span-1",
    link: "/dashboard/cursos/C001",
    badge: "Formación",
  },
   {
    id: "news-6",
    title: "Tips de Alimentación Saludable",
    description: "Descubre cómo mejorar tu dieta en la oficina.",
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZHxlbnwwfHx8fDE3NTA4ODkzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "healthy food",
    gridClass: "md:col-span-1 md:row-span-1",
    link: "/dashboard/biblioteca",
    badge: "Artículo",
  },
];


export default function BienestarPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <SectionWrapper 
        title="Lobby de Bienestar"
        description="Noticias, eventos y recursos para tu desarrollo y bienestar integral en Banesco Seguros."
        titleClassName="text-3xl font-bold text-primary"
        descriptionClassName="text-secondary"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px]">
          {bienestarNews.map(item => (
            <Link key={item.id} href={item.link} className={`relative rounded-xl overflow-hidden group block shadow-lg hover:shadow-2xl transition-shadow duration-300 ${item.gridClass}`}>
              <Image 
                src={item.imageUrl}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={item.dataAiHint}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent backdrop-blur-[2px] transition-all duration-300 group-hover:from-black/80 group-hover:backdrop-blur-md" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                {item.badge && (
                  <span className="mb-2 text-xs font-semibold uppercase tracking-wider bg-primary/80 text-primary-foreground px-2 py-1 rounded-full self-start">
                    {item.badge}
                  </span>
                )}
                <h3 className="text-xl lg:text-2xl font-bold">{item.title}</h3>
                <p className="text-sm mt-1 text-white/90 hidden md:block">{item.description}</p>
                 <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-sm font-semibold">
                  Ver más <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
