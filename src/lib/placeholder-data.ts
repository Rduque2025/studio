

import { Users, Megaphone, FolderKanban, Shield, BarChart2, Briefcase, FileText, Bot, BookOpen, Scale, FileSignature, HardHat, Plane, Cpu, PiggyBank, CreditCard, Landmark, CalendarClock, MessageCircleQuestion, Bell, Utensils, Star, Video, Presentation, Image as ImageIcon, Code, Music, AlertTriangle, CheckCircle, CalendarDays, MessageSquare as MessageSquareIcon, Music2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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
  date: string; // This can be a generic date if the specific schedule is in the description
  location: string;
  imageUrl: string;
  description: string;
  dataAiHint?: string;
  isRecommended?: boolean; // Added for recommended activities
}

export interface MenuItem {
  id: string;
  day: string;
  name: string;
  description: string;
  imageUrl: string;
  dataAiHint?: string;
  price?: string;
  type?: 'Clásico' | 'Dieta' | 'Ejecutivo';
}

export interface DepartmentRequest {
  title: string;
  link?: string; // Optional link for specific requests
  type: 'request' | 'info'; // Differentiate between requests and informational items
  icon?: React.ElementType; // Lucide icon for the specific request
}


export interface Department {
  id: string;
  name: string;
  description: string;
  requests?: DepartmentRequest[];
  icon?: React.ElementType; // Lucide icon
  imageUrl?: string;
  dataAiHint?: string;
  directLink?: string; 
  category: 'Capital Humano' | 'Comercial' | 'Legal' | 'Seguridad' | 'Proyectos' | 'Otros';
}

export interface DocumentResource {
  id: string;
  title: string;
  category: 'Recursos Visuales' | 'Herramientas' | 'Presentaciones' | 'Manuales' | 'Documentos' | 'Videos' | 'Destacados' | 'Música';
  area: 'Comercial' | 'Suscripción' | 'Legal' | 'Mercadeo' | 'Capital Humano' | 'Procesos' | 'Actuarial' | 'General' | 'Finanzas' | 'Tecnologia';
  description: string;
  imageUrl: string;
  dataAiHint: string;
  isFeatured: boolean;
  linkUrl?: string; // For playlists
}


export interface DressCodeItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  dataAiHint?: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: 'Tecnología' | 'Recursos Humanos' | 'Finanzas' | 'Operaciones' | 'Marketing';
  imageUrl: string;
  dataAiHint: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  description: string;
  albumArtUrl: string;
  linkUrl: string;
  dataAiHint: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Soporte' | 'Otros';
}

export interface NotificationItem {
  id: string;
  type: 'message' | 'event' | 'task' | 'alert' | 'update';
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
  iconColor: string;
}


export const specialRequestAreas = [
    { id: 'Finanzas', name: 'Finanzas', email: 'gcia_nacional_finanzas_ve@banescoseguros.com' },
    { id: 'Capital Humano', name: 'Capital Humano', email: 'capital_humano_ve@banescoseguros.com' },
    { id: 'Mercadeo', name: 'Mercadeo', email: 'comunicaciones@banescoseguros.com' },
    { id: 'Procesos', name: 'Procesos', email: 'procesos@banescoseguros.com' },
    { id: 'Actuarial', name: 'Actuarial', email: 'gerencia_actuarial_ve@banescoseguros.com' },
    { id: 'Legal', name: 'Legal', email: 'bsv_consultoria_juridica@banescoseguros.com' },
];

export const mockCourses: Course[] = [
  {
    id: "C001",
    title: "Gestión Efectiva del Tiempo",
    description: "Aprende técnicas para optimizar tu jornada laboral y personal.",
    imageUrl: "https://images.unsplash.com/photo-1616198814651-e71f960c3180?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8dGltZXxlbnwwfHx8fDE3NTI1ODg5NTV8MA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "time management",
    category: "Desarrollo Personal",
    duration: "4 semanas",
  },
  {
    id: "C002",
    title: "Comunicación Asertiva",
    description: "Mejora tus habilidades de comunicación en el entorno laboral.",
    imageUrl: "https://images.unsplash.com/photo-1586806974856-c55e8b9364e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxjb252ZXJzYXRpb258ZW58MHx8fHwxNzUyNTkxODc0fDA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "communication team",
    category: "Habilidades Blandas",
    duration: "6 semanas",
  },
  {
    id: "C003",
    title: "Introducción a Seguros Digitales",
    description: "Conoce las últimas tendencias en el sector asegurador.",
    imageUrl: "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8Y29tcHV0ZXJ8ZW58MHx8fHwxNzUyNDk1ODkyfDA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "digital insurance",
    category: "Tecnología",
    duration: "8 semanas",
  },
];

export const mockActivities: Activity[] = [
  {
    id: "A001",
    title: "Yoga",
    date: "2025-07-01",
    location: "Triadas - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx5b2dhfGVufDB8fHx8MTc1MDk0NDg2M3ww&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "yoga fitness",
    description: "¡Conecta tu cuerpo y mente!\nAcompáñanos en la clase de yoga, conformada por una serie de ejercicios físicos y de respiración diseñados para disminuir el estrés y las dolencias corporales, con el propósito de mejorar la salud, tanto física como mental.\nPara asistir a las clases solo necesitas:\n- Un mat o esterilla de yoga.\n- Ropa deportiva y cómoda, preferiblemente licras o monos largos y camisas cómodas.\n- Una botella de agua para tu hidratación.\n\nDónde y cuándo son las clases:\nLunes y miércoles, 5:00 P.M."
  },
  {
    id: "A002",
    title: "Ejercicios funcionales",
    date: "2025-07-01",
    location: "Terraza - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1591291621164-2c6367723315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxleGNlcmNpc2V8ZW58MHx8fHwxNzUwOTQ0OTE1fDA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "functional training",
    description: "¡Mejora tu rendimiento físico y cuida tu salud!\n\nTe invitamos a participar en la actividad de entrenamiento funcional y en circuito, la cual ayuda a mejorar las capacidades físicas como  fuerza, resistencia, velocidad, coordinación y flexibilidad. Se puede realizar con o sin implementos.\nPara asistir a las clases solo necesitas:\n- Ropa deportiva y cómoda, preferiblemente licras o monos largos y camisas cómodas.\n- Una botella de agua para tu hidratación.\n\nDónde y cuándo son las clases:\nLunes y miércoles, 5:00 P.M.",
    isRecommended: true,
  },
  {
    id: "A003",
    title: "Clases de cuatro",
    date: "2025-07-01",
    location: "Triadas - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1518190171695-bbbb69c4a901?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx1a2VsZWxlfGVufDB8fHx8MTc1MDk0NTA2MXww&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "music lessons",
    description: "Si tienes talento para tocar un instrumento musical o quieres aprender, es tú momento.\nÚnete al grupo, no necesitas experiencia previa para formar parte de la actividad.\nPara asistir a las clases solo necesitas:\n- Una botella de agua para tu hidratación.\n\nDónde y cuándo son las clases:\nLunes o jueves, 5:00 P.M."
  },
  {
    id: "A004",
    title: "Clases de bailoterapia",
    date: "2025-07-01",
    location: "Terraza - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1495791185843-c73f2269f669?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8ZGFuY2V8ZW58MHx8fHwxNzUwOTQ1MTc0fDA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "dance therapy",
    description: "Sorpréndete con la variedad de estilos y ritmos en nuestra clase de bailoterapia y disfruta de los múltiples beneficios de esta técnica:\n- Fortalece el corazón y la circulación de la sangre.\n- Reduce el estrés, la ansiedad y la tristeza.\n- Combate los dolores musculares.\nPara asistir a las clases solo necesitas:\n- Ropa deportiva y cómoda, preferiblemente licras o monos largos y camisas cómodas.\n- Una botella de agua para tu hidratación.\nDónde y cuándo son las clases:\nJueves, 5:00 P.M."
  },
  {
    id: "A005",
    title: "Cross combat",
    date: "2025-07-01",
    location: "Terraza - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1590556409324-aa1d726e5c3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8Qk9YSU5HfGVufDB8fHx8MTc1MDk1NDMyOXww&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "combat fitness",
    description: "Te invitamos a esta emocionante actividad física musicalizada, donde de forma equilibrada y en conjunto se estimulan capacidades, como la aérobica o cardiovascular, la resistencia muscular, flexibilidad y otra habilidades y destrezas de ejercicios tomados del Boxeo, las Artes marciales y la Danza aeróbica o gimnasia aeróbica.\n\nDónde y cuándo son las clases:\nMartes, 5:00 P.M."
  },
  {
    id: "A006",
    title: "Teatro",
    date: "2025-07-01",
    location: "Tríadas - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxBQ1RPUnxlbnwwfHx8fDE3NTA5NTkwODh8MA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "theater workshop",
    description: "Te invitamos a esta maravillosa actividad, en la que desarrollarás competencias para romper el hielo, desenvolverte en diversos contextos con tranquilidad, mejorarás la dicción y oratoria para comunicarte asertivamente.  A partir del 12 de marzo.\n\nDónde y cuándo son las clases:\nMartes y Jueves, 5:00 P.M."
  },
];


export const mockMenuItems: MenuItem[] = [
  {
    id: "M001",
    day: "Lunes",
    name: "Pollo al Curry con Arroz Jazmín",
    description: "Delicioso pollo en salsa de curry acompañado de arroz jazmín y vegetales al vapor.",
    imageUrl: "https://images.unsplash.com/photo-1628294895933-4360614f39dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjdXJyeSUyMGNoaWNrZW58ZW58MHx8fHwxNzUyMTUzMDI5fDA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "curry chicken",
    price: "100 Bs.",
    type: "Clásico",
  },
  {
    id: "M002",
    day: "Martes",
    name: "Lasaña de Carne Clásica",
    description: "Capas de pasta, carne molida, salsa bechamel y queso parmesano, horneada a la perfección.",
    imageUrl: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxsYXNhZ25hJTIwcGFzdGF8ZW58MHx8fHwxNzUyMTUzMDI5fDA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "lasagna pasta",
    price: "100 Bs.",
    type: "Clásico",
  },
  {
    id: "M003",
    day: "Miércoles",
    name: "Salmón a la Plancha con Puré de Batata",
    description: "Filete de salmón fresco a la plancha, servido con un suave puré de batata y espárragos.",
    imageUrl: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBkaXNofGVufDB8fHx8MTc1MjE1MzAyOXww&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "salmon dish",
    price: "100 Bs.",
    type: "Clásico",
  },
  {
    id: "M004",
    day: "Jueves",
    name: "Tacos de Carnitas con Guarniciones",
    description: "Auténticos tacos de carnitas con tortillas de maíz, cebolla, cilantro y salsa.",
    imageUrl: "https://images.unsplash.com/photo-1633271306917-a668495ba567?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHx0YWNvcyUyMG1leGljYW58ZW58MHx8fHwxNzUyMTUzMDI5fDA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "tacos mexican",
    price: "100 Bs.",
    type: "Clásico",
  },
  {
    id: "M005",
    day: "Viernes",
    name: "Pizza Artesanal de Pepperoni",
    description: "Pizza con masa casera, salsa de tomate natural, mozzarella fresca y pepperoni.",
    imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHBlcHBlcm9uaXxlbnwwfHx8fDE3NTIxNTMwMjl8MA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "pizza pepperoni",
    price: "100 Bs.",
    type: "Clásico",
  },
];

export const mockDietMenuItems: MenuItem[] = [
  {
    id: "DM001",
    day: "Lunes",
    name: "Ensalada César con Pollo a la Parrilla",
    description: "Lechuga romana fresca, crutones, queso parmesano, aderezo César ligero y pechuga de pollo a la parrilla.",
    imageUrl: "https://images.unsplash.com/photo-1604909052743-94e838986d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjaGlja2VuJTIwc2FsYWR8ZW58MHx8fHwxNzUyMTcwNjUzfDA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "chicken salad",
    price: "100 Bs.",
    type: "Dieta",
  },
  {
    id: "DM002",
    day: "Martes",
    name: "Wrap de Vegetales con Hummus",
    description: "Tortilla integral rellena de hummus, pimientos, pepino, zanahoria y espinacas.",
    imageUrl: "https://images.unsplash.com/photo-1630914441316-6d95bbd00caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx2ZWdnaWUlMjB3cmFwfGVufDB8fHx8MTc1MjE3MDY1NHww&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "veggie wrap",
    price: "100 Bs.",
    type: "Dieta",
  },
  {
    id: "DM003",
    day: "Miércoles",
    name: "Bowl de Quinoa con Tofu y Aguacate",
    description: "Quinoa, tofu marinado y salteado, aguacate, edamame y aderezo de sésamo y jengibre.",
    imageUrl: "https://images.unsplash.com/photo-1525790428446-ad5140bdd234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8cXVpbm9hJTIwYm93bHxlbnwwfHx8fDE3NTIxNzA2NTR8MA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "quinoa bowl",
    price: "100 Bs.",
    type: "Dieta",
  },
  {
    id: "DM004",
    day: "Jueves",
    name: "Pescado Blanco al Horno con Brócoli",
    description: "Filete de pescado blanco (merluza o similar) horneado con hierbas, acompañado de brócoli al vapor.",
    imageUrl: "https://images.unsplash.com/photo-1575835638288-74138ce93c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiYWtlZCUyMGZpc2h8ZW58MHx8fHwxNzUyMTcwNjU0fDA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "baked fish",
    price: "100 Bs.",
    type: "Dieta",
  },
  {
    id: "DM005",
    day: "Viernes",
    name: "Sopa de Lentejas y Vegetales",
    description: "Contundente sopa de lentejas con zanahoria, apio, cebolla y un toque de pimentón.",
    imageUrl: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxsZW50aWwlMjBzb3VwfGVufDB8fHx8MTc1MjE3MDY1NHww&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "lentil soup",
    price: "100 Bs.",
    type: "Dieta",
  }
];

export const mockExecutiveMenuItems: MenuItem[] = [
  {
    id: "EM001",
    day: "Lunes",
    name: "Lomo Saltado Peruano",
    description: "Trozos de lomo fino salteados con cebolla, tomate, ají amarillo, servido con papas fritas y arroz.",
    imageUrl: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYXJuZXxlbnwwfHx8fDE3NTIxNzEyODN8MA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "lomo saltado",
    price: "13 $",
    type: "Ejecutivo",
  },
  {
    id: "EM002",
    day: "Martes",
    name: "Risotto de Champiñones y Trufa",
    description: "Cremoso risotto Arborio con variedad de champiñones frescos y un toque de aceite de trufa.",
    imageUrl: "https://images.unsplash.com/photo-1723476654474-77baaeb27012?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxtdXNocm9vbSUyMHJpc290dG98ZW58MHx8fHwxNzUyMTcwODg0fDA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "mushroom risotto",
    price: "13 $",
    type: "Ejecutivo",
  },
  {
    id: "EM003",
    day: "Miércoles",
    name: "Paella de Mariscos Individual",
    description: "Arroz bomba cocinado en caldo de pescado con camarones, calamares, mejillones y almejas.",
    imageUrl: "https://images.unsplash.com/photo-1623961990059-28356e226a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwcGFlbGxhfGVufDB8fHx8MTc1MjE3MDg4NHww&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "seafood paella",
    price: "13 $",
    type: "Ejecutivo",
  },
  {
    id: "EM004",
    day: "Jueves",
    name: "Entrecot a la Parrilla con Chimichurri",
    description: "Corte de entrecot jugoso a la parrilla, acompañado de salsa chimichurri y guarnición de papas rústicas.",
    imageUrl: "https://images.unsplash.com/photo-1657143375273-75371e23f7f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxncmlsbGVkJTIwc3RlYWt8ZW58MHx8fHwxNzUyMTcwODg0fDA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "grilled steak",
    price: "13 $",
    type: "Ejecutivo",
  },
  {
    id: "EM005",
    day: "Viernes",
    name: "Canelones de Ricota y Espinaca",
    description: "Canelones rellenos de suave ricota y espinacas frescas, bañados en salsa bechamel y gratinados.",
    imageUrl: "https://images.unsplash.com/photo-1741448682476-55786f461576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxjYW5uZWxsb25pJTIwcmljb3R0YXxlbnwwfHx8fDE3NTIxNzA4ODR8MA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "cannelloni ricotta",
    price: "13 $",
    type: "Ejecutivo",
  }
];


export const mockDepartments: Department[] = [
  {
    id: "capital-humano",
    name: "Capital Humano",
    description: "Pensando en tu comodidad y bienestar, hemos creado este portal para que realices tus gestiones de forma simple, directa y accesible.",
    category: "Capital Humano",
    icon: Users,
    requests: [
      { title: "Solicitud de Prestaciones Sociales", type: 'request', icon: PiggyBank },
      { title: "Solicitud de Carta de Trabajo", type: 'request', icon: FileText },
      { title: "Solicitud de Carnet y Tarjeta Todoticket", type: 'request', icon: CreditCard },
      { title: "Solicitud de IVSS y FAOV", type: 'request', icon: Landmark },
      { title: "Solicitud de Vacaciones y Permisos", type: 'request', icon: Plane },
      { title: "Inquietudes o Sugerencias", type: 'request', icon: MessageCircleQuestion },
      { title: "Actividades de Clima e Integración", type: 'info', icon: Bell },
      { title: "Postúlate", type: 'request', icon: Briefcase },
      { title: "Encuesta de Satisfacción", type: 'request', icon: Users },
      { title: "Horario del Comedor", type: 'info', icon: Utensils },
    ]
  },
  {
    id: "vacaciones",
    name: "Gestión de Vacaciones",
    description: "Planifica y solicita tus días libres y consulta tu saldo disponible.",
    category: "Capital Humano",
    icon: Plane,
    directLink: "/dashboard/vacaciones"
  },
  {
    id: "mercadeo",
    name: "Mercadeo",
    description: "Canaliza comunicados masivos, SMS, mailings y gestiona redes sociales.",
    category: "Comercial",
    icon: Megaphone,
  },
  {
    id: "pmo",
    name: "Gestión de Proyectos",
    description: "Gestiona y prioriza los proyectos tecnológicos de la organización.",
    category: "Proyectos",
    icon: FolderKanban,
  },
  {
    id: "seguridad-informacion",
    name: "Seguridad de la Información",
    description: "Portal de peticiones y gestión de la seguridad de la información.",
    category: "Seguridad",
    icon: Shield,
  },
   {
    id: "ti",
    name: "Tecnología de la Información",
    description: "Soporte técnico, gestión de equipos y software.",
    category: "Seguridad",
    icon: Cpu,
  },
  {
    id: "control",
    name: "Control",
    description: "Procesos de control y auditoría interna.",
    category: "Seguridad",
    icon: BarChart2,
  },
  {
    id: "procura",
    name: "Procura",
    description: "Gestión de compras y proveedores.",
    category: "Legal",
    icon: Briefcase,
  },
  {
    id: "inteligencia-comercial",
    name: "Inteligencia Comercial",
    description: "Análisis de datos y estrategias para el desarrollo comercial.",
    category: "Comercial",
    icon: FileText,
  },
  {
    id: "biblioteca-digital",
    name: "Biblioteca Digital",
    description: "Acceso a documentos y recursos digitales de la empresa.",
    directLink: "/dashboard/biblioteca",
    category: "Otros",
    icon: BookOpen,
  },
  {
    id: "consultoria-juridica",
    name: "Consultoría Jurídica",
    description: "Asesoramiento y gestión de asuntos legales.",
    category: "Legal",
    icon: Scale,
  },
  {
    id: "sistematica-comercial",
    name: "Sistemática Comercial",
    description: "Recursos y herramientas para el equipo comercial.",
    category: "Comercial",
    icon: HardHat,
  },
  {
    id: "suscripcion",
    name: "Suscripción",
    description: "Procesos de suscripción y emisión de pólizas.",
    directLink: "/dashboard/suscripcion",
    category: "Otros",
    icon: FileSignature,
  },
  {
    id: "robotizacion",
    name: "Robotización",
    description: "Información y estado de los proyectos de automatización (RPA).",
    category: "Proyectos",
    icon: Bot,
  }
];

export const mockDocuments: DocumentResource[] = [
  { 
    id: "doc1", 
    title: "Comprendiendo la Brecha de Entrega Móvil", 
    category: "Manuales", 
    area: "Procesos",
    description: "Un análisis profundo de los desafíos en la entrega de servicios móviles y cómo superarlos.", 
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxicmlkZ2V8ZW58MHx8fHwxNzUzMzA2NzM1fDA&ixlib-rb-4.1.0&q=80&w=1080", 
    dataAiHint: "bridge landscape",
    isFeatured: true,
  },
  { 
    id: "doc2", 
    title: "Nuestro Código de Ética", 
    category: "Documentos", 
    area: "Legal",
    description: "Principios y valores que guían nuestro comportamiento y toma de decisiones.", 
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d5795b4e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMGZyb20lMjBzcGFjZXxlbnwwfHx8fDE3NTMzMDY4MTZ8MA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "earth from space",
    isFeatured: true,
  },
  { 
    id: "doc3", 
    title: "Guiones de Atención al Cliente", 
    category: "Manuales", 
    area: "Comercial",
    description: "Guía para ofrecer un servicio de excelencia y estandarizado a nuestros clientes.",
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtZWV0aW5nfGVufDB8fHx8fDE3NTMzMDY4NzN8MA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "team meeting",
    isFeatured: true
  },
  { 
    id: "doc4", 
    title: "Manual de Marca", 
    category: "Recursos Visuales", 
    area: "Mercadeo",
    description: "Directrices para el uso correcto de nuestra identidad visual y verbal.",
    imageUrl: "https://images.unsplash.com/photo-1598289431512-b970a521d892?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxncmFwZXN8ZW58MHx8fHwxNzUzMzA2OTI4fDA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "grapes fruit",
    isFeatured: false,
  },
  { 
    id: "doc5", 
    title: "Guía de Inspección Digital de Autos", 
    category: "Documentos", 
    area: "Suscripción",
    description: "Procedimiento para realizar inspecciones de vehículos de forma remota y eficiente.",
    imageUrl: "https://images.unsplash.com/photo-1532384749327-1453d1225585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHhydW5uaW5nfGVufDB8fHx8fDE3NTMzMDcwMDd8MA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "woman running",
    isFeatured: false,
  },
  { 
    id: "doc6", 
    title: "Procesos de Suscripción", 
    category: "Manuales", 
    area: "Suscripción",
    description: "Documentación detallada sobre los flujos y políticas de suscripción de pólizas.",
    imageUrl: "https://images.unsplash.com/photo-1575478422368-2793b2e35b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyfGVufDB8fHx8fDE3NTMzMDcwNjN8MA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "helicopter sky",
    isFeatured: false,
  },
  { 
    id: "doc7", 
    title: "Hemeroteca de Cumplimiento", 
    category: "Documentos", 
    area: "Legal",
    description: "Archivo de noticias y documentos relevantes para el cumplimiento normativo.",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb2Rpbmd8ZW58MHx8fHwxNzUzMzA3MTIwfDA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "coding programming",
    isFeatured: false,
  },
  {
    id: "doc8",
    title: "Guía de Inducción para Nuevos Empleados",
    category: "Documentos",
    area: "Capital Humano",
    description: "Todo lo que necesitas saber para empezar con buen pie en nuestra organización.",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxvbmJvYXJkaW5nfGVufDB8fHx8fDE3NTMzMDczNjJ8MA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "onboarding meeting",
    isFeatured: false,
  },
  {
    id: "doc9",
    title: "Presentación Corporativa Q1 2025",
    category: "Presentaciones",
    area: "General",
    description: "Resumen de los resultados y objetivos del primer trimestre del año.",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwcmVzZW50YXRpb258ZW58MHx8fHwxNzUzMzA3NDEzfDA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "business presentation",
    isFeatured: false,
  },
  {
    id: "doc10",
    title: "Plan de Cuentas Contable",
    category: "Documentos",
    area: "Finanzas",
    description: "Estructura detallada de las cuentas contables de la empresa.",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04421cd6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhY2NvdW50aW5nfGVufDB8fHx8fDE3NTMzMDc1MDF8MA&ixlib-rb-4.1.0&q=80&w=1080",
    dataAiHint: "accounting calculator",
    isFeatured: true,
  },
  // Playlists as DocumentResources
  { 
    id: "P001", 
    title: "Clásicos en Inglés", 
    category: "Música", 
    area: "Mercadeo",
    description: "Los éxitos que marcaron una época.",
    imageUrl: "https://images.unsplash.com/photo-1519677584237-752f8853252e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxkaXNjfGVufDB8fHx8MTc1MjYwNzA5MXww&ixlib-rb-4.1.0&q=80&w=1080", 
    linkUrl: "#", 
    dataAiHint: "classic rock",
    isFeatured: false,
  },
  { 
    id: "P002", 
    title: "Rock Suave", 
    category: "Música", 
    area: "Mercadeo",
    description: "La selección perfecta para concentrarse.",
    imageUrl: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxndWl0YXJ8ZW58MHx8fHwxNzUyNjA3MjEwfDA&ixlib-rb-4.1.0&q=80&w=1080", 
    linkUrl: "#", 
    dataAiHint: "soft rock",
    isFeatured: false,
  },
  { 
    id: "P003", 
    title: "Salsa y Merengue", 
    category: "Música", 
    area: "Mercadeo",
    description: "Ritmos latinos para subir el ánimo.",
    imageUrl: "https://images.unsplash.com/photo-1570299437488-d430e1e677c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjdWJhfGVufDB8fHx8MTc1MjYwNzI5Mnww&ixlib-rb-4.1.0&q=80&w=1080", 
    linkUrl: "#", 
    dataAiHint: "latin dance",
    isFeatured: false,
  },
  { 
    id: "P004", 
    title: "Solo Éxitos Pop", 
    category: "Música", 
    area: "Mercadeo",
    description: "Las canciones más populares del momento.",
    imageUrl: "https://images.unsplash.com/photo-1729338043193-3a8464eb20c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOHx8Y29tZXR8ZW58MHx8fHwxNzUyNjAwMDI4fDA&ixlib-rb-4.1.0&q=80&w=1080", 
    linkUrl: "#", 
    dataAiHint: "pop music",
    isFeatured: false,
  },
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
  // Eventos de Pago Junio 2025
  { id: "payment-jun-05-transporte", date: new Date(2025, 5, 5), title: "Beneficio de Transporte", description: "Pago de beneficio de transporte.", color: "bg-teal-500", isUserEvent: false },
  { id: "payment-jun-06-sociales", date: new Date(2025, 5, 6), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "payment-jun-11-especial", date: new Date(2025, 5, 11), title: "Asignación Especial", description: "Pago de asignación especial.", color: "bg-sky-500", isUserEvent: false },
  { id: "payment-jun-11-quincena", date: new Date(2025, 5, 11), title: "Pago Quincena", description: "Pago de quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "payment-jun-13-sociales", date: new Date(2025, 5, 13), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "payment-jun-20-alimentacion-comp", date: new Date(2025, 5, 20), title: "Complemento Alimentación", description: "Pago de complemento de alimentación.", color: "bg-lime-500", isUserEvent: false },
  { id: "payment-jun-20-sociales", date: new Date(2025, 5, 20), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "payment-jun-26-alimentacion-benef",date: new Date(2025, 5, 26), title: "Beneficio Alimentación", description: "Pago de beneficio de alimentación.", color: "bg-green-600", isUserEvent: false },
  { id: "payment-jun-26-quincena", date: new Date(2025, 5, 26), title: "Pago Quincena", description: "Pago de quincena.", color: "bg-emerald-500", isUserEvent: false },
  // Feriados Bancarios Junio 2025
  { id: "bank-holiday-jun-02", date: new Date(2025, 5, 2), title: "Feriado Bancario", description: "Día no laborable para el sector bancario.", color: "bg-slate-700", isUserEvent: false },
  { id: "bank-holiday-jun-16", date: new Date(2025, 5, 16), title: "Feriado Bancario", description: "Día no laborable para el sector bancario.", color: "bg-slate-700", isUserEvent: false },
  { id: "bank-holiday-jun-23", date: new Date(2025, 5, 23), title: "Feriado Bancario", description: "Día no laborable para el sector bancario.", color: "bg-slate-700", isUserEvent: false },
  { id: "bank-holiday-jun-24", date: new Date(2025, 5, 24), title: "Feriado Bancario", description: "Día no laborable para el sector bancario (Coincide con Batalla de Carabobo).", color: "bg-slate-700", isUserEvent: false },
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

export const mockEmployees: Employee[] = [
  { id: 'E001', name: 'Carlos Rodríguez', role: 'Desarrollador Senior', department: 'Tecnología', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'person portrait' },
  { id: 'E002', name: 'Ana Martínez', role: 'Analista de Sistemas', department: 'Tecnología', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'woman portrait' },
  { id: 'E003', name: 'Luis Pérez', role: 'Soporte Técnico', department: 'Tecnología', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'man portrait' },
  { id: 'E004', name: 'Sofía Gómez', role: 'Gerente de RRHH', department: 'Recursos Humanos', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'woman portrait' },
  { id: 'E005', name: 'Javier Hernández', role: 'Reclutador', department: 'Recursos Humanos', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'person portrait' },
  { id: 'E006', name: 'Elena Torres', role: 'Contadora Principal', department: 'Finanzas', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'woman portrait' },
  { id: 'E007', name: 'David Ramírez', role: 'Analista Financiero', department: 'Finanzas', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'man portrait' },
  { id: 'E008', name: 'Laura Díaz', role: 'Jefe de Operaciones', department: 'Operaciones', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'person portrait' },
  { id: 'E009', name: 'Miguel Vargas', role: 'Especialista en Marketing', department: 'Marketing', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'man portrait' },
];

export const teamDepartments = [
  { id: 'tecnologia', name: 'Tecnología' },
  { id: 'recursos-humanos', name: 'Recursos Humanos' },
  { id: 'finanzas', name: 'Finanzas' },
  { id: 'operaciones', name: 'Operaciones' },
  { id: 'marketing', name: 'Marketing' },
];

export const faqData: FaqItem[] = [
  {
    id: "faq1",
    question: "¿Cómo puedo consultar la cobertura de mi póliza HCM?",
    answer: "Puedes consultar todos los detalles de tu póliza, incluyendo coberturas, red de clínicas y estatus de reembolsos, accediendo a la sección 'Póliza HCM' desde el menú de Accesos Rápidos en esta misma página.",
    category: "General",
  },
  {
    id: "faq2",
    question: "¿Cuál es el procedimiento para solicitar vacaciones?",
    answer: "Para solicitar tus días libres, dirígete a 'Gestión de Vacaciones' en los Accesos Rápidos. Allí podrás ver tu saldo de días disponibles, seleccionar las fechas deseadas y enviar la solicitud para su aprobación.",
    category: "General",
  },
  {
    id: "faq3",
    question: "¿A quién debo contactar para soporte técnico?",
    answer: "Si tienes algún inconveniente técnico con tu equipo o con alguna de las plataformas, puedes generar un ticket de soporte dirigiéndote al 'Portal de Requerimientos' y seleccionando el departamento de 'Tecnología de Información'.",
    category: "Soporte",
  },
  {
    id: "faq4",
    question: "¿Dónde puedo ver el menú del comedor de esta semana?",
    answer: "El menú semanal del comedor está disponible en la página principal del portal, justo debajo de los Accesos Rápidos. Puedes navegar entre las opciones de Menú General, Dieta y Ejecutivo usando las pestañas.",
    category: "General",
  },
  {
    id: "faq5",
    question: "¿Cómo me inscribo en un curso o actividad de bienestar?",
    answer: "Tanto los cursos como las actividades de bienestar se encuentran en la sección 'Bienestar' accesible desde el menú de navegación principal. Dentro de cada sección, podrás ver los detalles y encontrar los botones para inscribirte o confirmar tu asistencia.",
    category: "Otros",
  }
];

export const mockPlaylist: PlaylistItem[] = [
  { 
    id: "P001", 
    title: "Clásicos en Inglés", 
    description: "Los éxitos que marcaron una época.",
    albumArtUrl: "https://images.unsplash.com/photo-1519677584237-752f8853252e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxkaXNjfGVufDB8fHx8MTc1MjYwNzA5MXww&ixlib-rb-4.1.0&q=80&w=1080", 
    linkUrl: "#", 
    dataAiHint: "classic rock" 
  },
  { 
    id: "P002", 
    title: "Rock Suave", 
    description: "La selección perfecta para concentrarse.",
    albumArtUrl: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxndWl0YXJ8ZW58MHx8fHwxNzUyNjA3MjEwfDA&ixlib-rb-4.1.0&q=80&w=1080", 
    linkUrl: "#", 
    dataAiHint: "soft rock" 
  },
  { 
    id: "P003", 
    title: "Salsa y Merengue", 
    description: "Ritmos latinos para subir el ánimo.",
    albumArtUrl: "https://images.unsplash.com/photo-1570299437488-d430e1e677c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjdWJhfGVufDB8fHx8MTc1MjYwNzI5Mnww&ixlib-rb-4.1.0&q=80&w=1080", 
    linkUrl: "#", 
    dataAiHint: "latin dance" 
  },
  { 
    id: "P004", 
    title: "Solo Éxitos Pop", 
    description: "Las canciones más populares del momento.",
    albumArtUrl: "https://images.unsplash.com/photo-1729338043193-3a8464eb20c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOHx8Y29tZXR8ZW58MHx8fHwxNzUyNjAwMDI4fDA&ixlib-rb-4.1.0&q=80&w=1080", 
    linkUrl: "#", 
    dataAiHint: "pop music"
  },
];
    
    
export const mockNotifications: NotificationItem[] = [
  {
    id: 'update-music',
    type: 'update',
    title: '¡Nueva Música en la Biblioteca!',
    description: 'Hemos añadido nuevas playlists para que disfrutes mientras trabajas.',
    time: 'Reciente',
    icon: Music2,
    iconColor: 'bg-purple-100 text-purple-500'
  }
];
    
    
















    

