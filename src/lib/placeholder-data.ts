
export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  duration: string;
  dataAiHint?: string;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  description: string;
  dataAiHint?: string;
}

export interface MenuItem {
  id: string;
  day: string;
  name: string;
  description: string;
  imageUrl: string;
  dataAiHint?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon?: React.ElementType; // Lucide icon
}

export interface DressCodeItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  dataAiHint?: string;
}

export const mockCourses: Course[] = [
  {
    id: "C001",
    title: "Gestión Efectiva del Tiempo",
    description: "Aprende técnicas para optimizar tu jornada laboral y personal.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "time management",
    category: "Desarrollo Personal",
    duration: "4 semanas",
  },
  {
    id: "C002",
    title: "Comunicación Asertiva",
    description: "Mejora tus habilidades de comunicación en el entorno laboral.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "communication team",
    category: "Habilidades Blandas",
    duration: "6 semanas",
  },
  {
    id: "C003",
    title: "Introducción a Seguros Digitales",
    description: "Conoce las últimas tendencias en el sector asegurador.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "digital insurance",
    category: "Tecnología",
    duration: "8 semanas",
  },
];

export const mockActivities: Activity[] = [
  {
    id: "A001",
    title: "Charla sobre Bienestar Financiero",
    date: "2025-03-15",
    location: "Auditorio Principal",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "financial wellness",
    description: "Expertos compartirán consejos para una mejor salud financiera."
  },
  {
    id: "A002",
    title: "Jornada de Voluntariado",
    date: "2025-04-22",
    location: "Comunidad Local",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "volunteering community",
    description: "Participa en nuestra jornada de apoyo a la comunidad."
  },
  {
    id: "A003",
    title: "Taller de Mindfulness",
    date: "2025-05-10",
    location: "Sala de Conferencias B",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "mindfulness workshop",
    description: "Aprende técnicas de relajación y manejo del estrés."
  },
];

export const mockMenuItems: MenuItem[] = [
  {
    id: "M001",
    day: "Lunes",
    name: "Pollo al Curry con Arroz Jazmín",
    description: "Delicioso pollo en salsa de curry acompañado de arroz jazmín y vegetales al vapor.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "curry chicken"
  },
  {
    id: "M002",
    day: "Martes",
    name: "Lasaña de Carne Clásica",
    description: "Capas de pasta, carne molida, salsa bechamel y queso parmesano, horneada a la perfección.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "lasagna pasta"
  },
  {
    id: "M003",
    day: "Miércoles",
    name: "Salmón a la Plancha con Puré de Batata",
    description: "Filete de salmón fresco a la plancha, servido con un suave puré de batata y espárragos.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "salmon dish"
  },
  {
    id: "M004",
    day: "Jueves",
    name: "Tacos de Carnitas con Guarniciones",
    description: "Auténticos tacos de carnitas con tortillas de maíz, cebolla, cilantro y salsa.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "tacos mexican"
  },
  {
    id: "M005",
    day: "Viernes",
    name: "Pizza Artesanal de Pepperoni",
    description: "Pizza con masa casera, salsa de tomate natural, mozzarella fresca y pepperoni.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "pizza pepperoni"
  },
];

export const mockDepartments: Department[] = [
  { id: "rh", name: "Recursos Humanos", description: "Gestión de talento, nómina y bienestar del empleado." },
  { id: "it", name: "Tecnología de Información", description: "Soporte técnico, infraestructura y desarrollo de sistemas." },
  { id: "finanzas", name: "Finanzas y Contabilidad", description: "Presupuestos, reportes financieros y contabilidad general." },
  { id: "marketing", name: "Marketing y Ventas", description: "Estrategias de mercado, publicidad y gestión de ventas." },
  { id: "operaciones", name: "Operaciones", description: "Procesos internos, logística y gestión de calidad." },
];

export const mockCalendarEvents = [
  { date: new Date(2025, 2, 8), title: "Día Internacional de la Mujer", description: "Actividades especiales y reconocimientos.", color: "bg-pink-500" },
  { date: new Date(2025, 3, 1), title: "Inicio Trimestre Q2", description: "Reunión de planificación trimestral.", color: "bg-blue-500" },
  { date: new Date(2025, 4, 1), title: "Día del Trabajador", description: "Feriado nacional.", color: "bg-red-500" },
  { date: new Date(2025, 6, 5), title: "Día de la Independencia", description: "Feriado nacional.", color: "bg-yellow-500" },
  { date: new Date(2025, 9, 12), title: "Día de la Resistencia Indígena", description: "Actos conmemorativos.", color: "bg-orange-500" },
  { date: new Date(2025, 11, 24), title: "Noche Buena", description: "Medio día laborable.", color: "bg-green-500" },
  { date: new Date(2025, 11, 25), title: "Navidad", description: "Feriado nacional.", color: "bg-red-500" },
  { date: new Date(2025, 0, 15), title: "Presentación Resultados Anuales", description: "Presentación de resultados del año anterior.", color: "bg-purple-500" },
];

export const mockDressCodeItems: DressCodeItem[] = [
  {
    id: "DC001",
    title: "Formal de Negocios",
    description: "Traje completo (saco y pantalón o falda), camisa de vestir, corbata (opcional para mujeres). Zapatos de vestir.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "business formal"
  },
  {
    id: "DC002",
    title: "Casual de Negocios",
    description: "Pantalones de vestir o chinos, camisa o blusa, blazer o suéter opcional. Zapatos cerrados.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "business casual"
  },
  {
    id: "DC003",
    title: "Smart Casual",
    description: "Vaqueros oscuros (sin roturas), camisa o polo, blusa elegante. Chaqueta deportiva o cárdigan. Zapatos limpios y cuidados.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "smart casual"
  },
  {
    id: "DC004",
    title: "Viernes Casual",
    description: "Vestimenta más relajada, pero manteniendo profesionalismo. Vaqueros permitidos (limpios), camisetas tipo polo o blusas casuales.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "casual friday"
  },
];
