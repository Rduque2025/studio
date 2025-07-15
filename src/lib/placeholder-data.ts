
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

export interface Department {
  id: string;
  name: string;
  description: string;
  icon?: React.ElementType; // Lucide icon
  imageUrl?: string;
  dataAiHint?: string;
  directLink?: string; // Added for direct links like /dashboard/vacaciones
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

export const mockCourses: Course[] = [
  {
    id: "C001",
    title: "Gestión Efectiva del Tiempo",
    description: "Aprende técnicas para optimizar tu jornada laboral y personal.",
    imageUrl: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx0aW1lfGVufDB8fHx8MTc1MjU4ODk1NXww&ixlib=rb-4.1.0&q=80&w=1080",
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
    title: "Yoga",
    date: "2025-07-01",
    location: "Triadas - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx5b2dhfGVufDB8fHx8MTc1MDk0NDg2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "yoga fitness",
    description: "¡Conecta tu cuerpo y mente!\nAcompáñanos en la clase de yoga, conformada por una serie de ejercicios físicos y de respiración diseñados para disminuir el estrés y las dolencias corporales, con el propósito de mejorar la salud, tanto física como mental.\nPara asistir a las clases solo necesitas:\n- Un mat o esterilla de yoga.\n- Ropa deportiva y cómoda, preferiblemente licras o monos largos y camisas cómodas.\n- Una botella de agua para tu hidratación.\n\nDónde y cuándo son las clases:\nLunes y miércoles, 5:00 P.M."
  },
  {
    id: "A002",
    title: "Ejercicios funcionales",
    date: "2025-07-01",
    location: "Terraza - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1591291621164-2c6367723315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxleGNlcmNpc2V8ZW58MHx8fHwxNzUwOTQ0OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "functional training",
    description: "¡Mejora tu rendimiento físico y cuida tu salud!\n\nTe invitamos a participar en la actividad de entrenamiento funcional y en circuito, la cual ayuda a mejorar las capacidades físicas como  fuerza, resistencia, velocidad, coordinación y flexibilidad. Se puede realizar con o sin implementos.\nPara asistir a las clases solo necesitas:\n- Ropa deportiva y cómoda, preferiblemente licras o monos largos y camisas cómodas.\n- Una botella de agua para tu hidratación.\n\nDónde y cuándo son las clases:\nLunes y miércoles, 5:00 P.M.",
    isRecommended: true,
  },
  {
    id: "A003",
    title: "Clases de cuatro",
    date: "2025-07-01",
    location: "Triadas - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1518190171695-bbbb69c4a901?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx1a2VsZWxlfGVufDB8fHx8MTc1MDk0NTA2MXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "music lessons",
    description: "Si tienes talento para tocar un instrumento musical o quieres aprender, es tú momento.\nÚnete al grupo, no necesitas experiencia previa para formar parte de la actividad.\nPara asistir a las clases solo necesitas:\n- Una botella de agua para tu hidratación.\n\nDónde y cuándo son las clases:\nLunes o jueves, 5:00 P.M."
  },
  {
    id: "A004",
    title: "Clases de bailoterapia",
    date: "2025-07-01",
    location: "Terraza - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1495791185843-c73f2269f669?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8ZGFuY2V8ZW58MHx8fHwxNzUwOTQ1MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "dance therapy",
    description: "Sorpréndete con la variedad de estilos y ritmos en nuestra clase de bailoterapia y disfruta de los múltiples beneficios de esta técnica:\n- Fortalece el corazón y la circulación de la sangre.\n- Reduce el estrés, la ansiedad y la tristeza.\n- Combate los dolores musculares.\nPara asistir a las clases solo necesitas:\n- Ropa deportiva y cómoda, preferiblemente licras o monos largos y camisas cómodas.\n- Una botella de agua para tu hidratación.\nDónde y cuándo son las clases:\nJueves, 5:00 P.M."
  },
  {
    id: "A005",
    title: "Cross combat",
    date: "2025-07-01",
    location: "Terraza - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1590556409324-aa1d726e5c3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8Qk9YSU5HfGVufDB8fHx8MTc1MDk1NDMyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "combat fitness",
    description: "Te invitamos a esta emocionante actividad física musicalizada, donde de forma equilibrada y en conjunto se estimulan capacidades, como la aérobica o cardiovascular, la resistencia muscular, flexibilidad y otra habilidades y destrezas de ejercicios tomados del Boxeo, las Artes marciales y la Danza aeróbica o gimnasia aeróbica.\n\nDónde y cuándo son las clases:\nMartes, 5:00 P.M."
  },
  {
    id: "A006",
    title: "Teatro",
    date: "2025-07-01",
    location: "Tríadas - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxBQ1RPUnxlbnwwfHx8fDE3NTA5NTkwODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
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
    imageUrl: "https://images.unsplash.com/photo-1628294895933-4360614f39dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjdXJyeSUyMGNoaWNrZW58ZW58MHx8fHwxNzUyMTUzMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "curry chicken",
    price: "100 Bs.",
    type: "Clásico",
  },
  {
    id: "M002",
    day: "Martes",
    name: "Lasaña de Carne Clásica",
    description: "Capas de pasta, carne molida, salsa bechamel y queso parmesano, horneada a la perfección.",
    imageUrl: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxsYXNhZ25hJTIwcGFzdGF8ZW58MHx8fHwxNzUyMTUzMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "lasagna pasta",
    price: "100 Bs.",
    type: "Clásico",
  },
  {
    id: "M003",
    day: "Miércoles",
    name: "Salmón a la Plancha con Puré de Batata",
    description: "Filete de salmón fresco a la plancha, servido con un suave puré de batata y espárragos.",
    imageUrl: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBkaXNofGVufDB8fHx8MTc1MjE1MzAyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "salmon dish",
    price: "100 Bs.",
    type: "Clásico",
  },
  {
    id: "M004",
    day: "Jueves",
    name: "Tacos de Carnitas con Guarniciones",
    description: "Auténticos tacos de carnitas con tortillas de maíz, cebolla, cilantro y salsa.",
    imageUrl: "https://images.unsplash.com/photo-1633271306917-a668495ba567?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHx0YWNvcyUyMG1leGljYW58ZW58MHx8fHwxNzUyMTUzMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "tacos mexican",
    price: "100 Bs.",
    type: "Clásico",
  },
  {
    id: "M005",
    day: "Viernes",
    name: "Pizza Artesanal de Pepperoni",
    description: "Pizza con masa casera, salsa de tomate natural, mozzarella fresca y pepperoni.",
    imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHBlcHBlcm9uaXxlbnwwfHx8fDE3NTIxNTMwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
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
    imageUrl: "https://images.unsplash.com/photo-1604909052743-94e838986d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjaGlja2VuJTIwc2FsYWR8ZW58MHx8fHwxNzUyMTcwNjUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "chicken salad",
    price: "100 Bs.",
    type: "Dieta",
  },
  {
    id: "DM002",
    day: "Martes",
    name: "Wrap de Vegetales con Hummus",
    description: "Tortilla integral rellena de hummus, pimientos, pepino, zanahoria y espinacas.",
    imageUrl: "https://images.unsplash.com/photo-1630914441316-6d95bbd00caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx2ZWdnaWUlMjB3cmFwfGVufDB8fHx8MTc1MjE3MDY1NHww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "veggie wrap",
    price: "100 Bs.",
    type: "Dieta",
  },
  {
    id: "DM003",
    day: "Miércoles",
    name: "Bowl de Quinoa con Tofu y Aguacate",
    description: "Quinoa, tofu marinado y salteado, aguacate, edamame y aderezo de sésamo y jengibre.",
    imageUrl: "https://images.unsplash.com/photo-1525790428446-ad5140bdd234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8cXVpbm9hJTIwYm93bHxlbnwwfHx8fDE3NTIxNzA2NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "quinoa bowl",
    price: "100 Bs.",
    type: "Dieta",
  },
  {
    id: "DM004",
    day: "Jueves",
    name: "Pescado Blanco al Horno con Brócoli",
    description: "Filete de pescado blanco (merluza o similar) horneado con hierbas, acompañado de brócoli al vapor.",
    imageUrl: "https://images.unsplash.com/photo-1575835638288-74138ce93c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiYWtlZCUyMGZpc2h8ZW58MHx8fHwxNzUyMTcwNjU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "baked fish",
    price: "100 Bs.",
    type: "Dieta",
  },
  {
    id: "DM005",
    day: "Viernes",
    name: "Sopa de Lentejas y Vegetales",
    description: "Contundente sopa de lentejas con zanahoria, apio, cebolla y un toque de pimentón.",
    imageUrl: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxsZW50aWwlMjBzb3VwfGVufDB8fHx8MTc1MjE3MDY1NHww&ixlib=rb-4.1.0&q=80&w=1080",
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
    imageUrl: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYXJuZXxlbnwwfHx8fDE3NTIxNzEyODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "lomo saltado",
    price: "13 $",
    type: "Ejecutivo",
  },
  {
    id: "EM002",
    day: "Martes",
    name: "Risotto de Champiñones y Trufa",
    description: "Cremoso risotto Arborio con variedad de champiñones frescos y un toque de aceite de trufa.",
    imageUrl: "https://images.unsplash.com/photo-1723476654474-77baaeb27012?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxtdXNocm9vbSUyMHJpc290dG98ZW58MHx8fHwxNzUyMTcwODg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "mushroom risotto",
    price: "13 $",
    type: "Ejecutivo",
  },
  {
    id: "EM003",
    day: "Miércoles",
    name: "Paella de Mariscos Individual",
    description: "Arroz bomba cocinado en caldo de pescado con camarones, calamares, mejillones y almejas.",
    imageUrl: "https://images.unsplash.com/photo-1623961990059-28356e226a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwcGFlbGxhfGVufDB8fHx8MTc1MjE3MDg4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "seafood paella",
    price: "13 $",
    type: "Ejecutivo",
  },
  {
    id: "EM004",
    day: "Jueves",
    name: "Entrecot a la Parrilla con Chimichurri",
    description: "Corte de entrecot jugoso a la parrilla, acompañado de salsa chimichurri y guarnición de papas rústicas.",
    imageUrl: "https://images.unsplash.com/photo-1657143375273-75371e23f7f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxncmlsbGVkJTIwc3RlYWt8ZW58MHx8fHwxNzUyMTcwODg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "grilled steak",
    price: "13 $",
    type: "Ejecutivo",
  },
  {
    id: "EM005",
    day: "Viernes",
    name: "Canelones de Ricota y Espinaca",
    description: "Canelones rellenos de suave ricota y espinacas frescas, bañados en salsa bechamel y gratinados.",
    imageUrl: "https://images.unsplash.com/photo-1741448682476-55786f461576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxjYW5uZWxsb25pJTIwcmljb3R0YXxlbnwwfHx8fDE3NTIxNzA4ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "cannelloni ricotta",
    price: "13 $",
    type: "Ejecutivo",
  }
];


export const mockDepartments: Department[] = [
  { 
    id: "rh", 
    name: "Recursos Humanos", 
    description: "Gestión de talento, nómina y bienestar del empleado.",
    imageUrl: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxlbXByZXNhfGVufDB8fHx8MTc1MDI3NzU0OHww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "human resources" 
  },
  { 
    id: "it", 
    name: "Tecnología de Información", 
    description: "Soporte técnico, infraestructura y desarrollo de sistemas.",
    imageUrl: "https://images.unsplash.com/photo-1579403124614-197f69d8187b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxzb2Z0d2FyZXxlbnwwfHx8fDE3NTAzNDM0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "technology infrastructure"
  },
  {
    id: "hcm",
    name: "Póliza HCM",
    description: "Consultas, reembolsos y gestión de la póliza de salud.",
    directLink: "/dashboard/page-hcm" // Example link
  },
  { 
    id: "servicios", 
    name: "Servicios Generales", 
    description: "Mantenimiento, limpieza y gestión de instalaciones.",
  },
  { 
    id: "finanzas", 
    name: "Finanzas y Contabilidad", 
    description: "Presupuestos, reportes financieros y contabilidad general.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxmaW5hbmNlfGVufDB8fHx8MTc1MDM0MzYzMnww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "financial planning"
  },
  { 
    id: "marketing", 
    name: "Marketing y Ventas", 
    description: "Estrategias de mercado, publicidad y gestión de ventas.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "marketing strategy"
  },
  { 
    id: "operaciones", 
    name: "Operaciones", 
    description: "Procesos internos, logística y gestión de calidad.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "operational efficiency"
  },
  { 
    id: "vacaciones", 
    name: "Gestión de Vacaciones", 
    description: "Solicite sus vacaciones, verifique días acumulados y planifique su próximo descanso.",
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxiZWFjaHxlbnwwfHx8fDE3NTAzNDI5NDR8MA&ixlib=rb-4.1.0&q=80&w=1080", 
    dataAiHint: "travel vacation", 
    directLink: "/dashboard/vacaciones"
  }
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
    
    
    
