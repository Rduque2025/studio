
'use client';

import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  PackagePlus,
  Award,
  RefreshCcw,
  Gauge,
  Network,
  Gavel,
  Users,
  Hospital,
  Car,
  Briefcase
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { mockEmployees, teamDepartments } from "@/lib/placeholder-data";


export default function NosotrosPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <SectionWrapper 
        title="Nosotros"
        description="Conozca más sobre nuestra misión, visión y los valores que nos impulsan."
        titleClassName="text-3xl font-bold"
      >
        <div className="space-y-12 mt-6">
          <Card className="overflow-hidden shadow-lg rounded-xl">
            <CardHeader className="p-0">
              <div className="relative w-full h-64 md:h-80">
                <Image 
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjb21wYW55fGVufDB8fHx8MTc1MDkwMzI3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Visión de la empresa"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="business vision"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                   <h2 className="text-4xl md:text-5xl font-bold text-white">Nuestra Visión para el 2025</h2>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 md:p-10 text-base">
                <p className="mb-6 text-muted-foreground leading-relaxed">
                    Convertirnos en una compañía con foco en el negocio masivo, con un modelo sostenible de crecimiento rentable. Desarrollando productos de bajo costo dirigidos a la población venezolana que actualmente no tiene acceso a seguros, pero cuenta con ingresos para invertir en su protección básica.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    Seguir mejorando nuestros productos para empresas, ofreciendo coberturas y tarifas competitivas que cumplan sus necesidades de protección. Además, nos enfocaremos en agilizar la entrega de nuestros servicios para satisfacer sus expectativas de tiempo.
                </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-primary">
                Nuestra Meta de Negocios
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 md:p-10">
              <p className="text-muted-foreground leading-relaxed mb-8 text-center md:text-left">
                En 2025 proyectamos un volumen total de primas suscritas de <span className="font-bold text-foreground">USD 37.40 MM</span>, lo que representa un crecimiento de <span className="font-bold text-foreground">27%</span> en relación al año pasado. Al cierre del primer trimestre, el progreso es del <span className="font-bold text-foreground">24%</span> con relación a la meta.
              </p>
              
              <div className="w-full max-w-lg mx-auto">
                <div className="flex justify-between items-end mb-1">
                  <div className="text-sm">
                     <p className="font-medium text-foreground">Progreso Q1 2025</p>
                  </div>
                  <p className="text-2xl font-bold text-primary">24%</p>
                </div>
                <Progress value={24} className="h-3" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$0 MM</span>
                  <span className="font-semibold">Meta: $37.40 MM</span>
                </div>
              </div>

            </CardContent>
          </Card>

           <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-primary text-center">
                Nuestra Trayectoria en Cifras
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 md:p-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <Award className="h-10 w-10 text-primary mb-3" />
                  <p className="text-3xl font-bold text-foreground">+32</p>
                  <p className="text-sm text-muted-foreground mt-1">Años de servicio</p>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="h-10 w-10 text-primary mb-3" />
                  <p className="text-3xl font-bold text-foreground">+200.000</p>
                  <p className="text-sm text-muted-foreground mt-1">Clientes satisfechos</p>
                </div>
                <div className="flex flex-col items-center">
                  <Hospital className="h-10 w-10 text-primary mb-3" />
                  <p className="text-3xl font-bold text-foreground">+100</p>
                  <p className="text-sm text-muted-foreground mt-1">Clínicas y centros de atención médica aliados</p>
                </div>
                <div className="flex flex-col items-center">
                  <Car className="h-10 w-10 text-primary mb-3" />
                  <p className="text-3xl font-bold text-foreground">+50</p>
                  <p className="text-sm text-muted-foreground mt-1">Proveedores para Servicios de Auto</p>
                </div>
                <div className="flex flex-col items-center col-span-2 md:col-auto">
                  <Briefcase className="h-10 w-10 text-primary mb-3" />
                  <p className="text-3xl font-bold text-foreground">+200</p>
                  <p className="text-sm text-muted-foreground mt-1">Empleados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-primary">
                Retos para el Logro de Nuestra Visión 2025
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 md:p-10">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Crecimiento Rentable y Sostenible</h4>
                    <p className="text-muted-foreground text-sm">Asegurar un crecimiento rentable y sostenible del volumen de negocios.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                    <PackagePlus className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Innovación en Productos y Tecnología</h4>
                    <p className="text-muted-foreground text-sm">Desarrollar productos, procesos y tecnología para mejorar la atención y ventas.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Cultura de Alto Desempeño</h4>
                    <p className="text-muted-foreground text-sm">Fomentar una cultura organizacional orientada a la excelencia y el alto rendimiento.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                    <RefreshCcw className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Sistemática Comercial</h4>
                    <p className="text-muted-foreground text-sm">Reimplantar y optimizar la sistemática comercial para impulsar los resultados.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                    <Gauge className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Eficiencia Operativa</h4>
                    <p className="text-muted-foreground text-sm">Aumentar la eficiencia en todos nuestros procesos operativos.</p>
                  </div>
                </li>
                 <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                    <Network className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Modernización de TI</h4>
                    <p className="text-muted-foreground text-sm">Actualizar nuestra arquitectura de tecnología de la información para soportar el crecimiento.</p>
                  </div>
                </li>
                 <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                    <Gavel className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Cumplimiento Normativo</h4>
                    <p className="text-muted-foreground text-sm">Garantizar la adecuación continua a la nueva normativa vigente en el sector.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-primary text-center">
                Nuestro Equipo
              </CardTitle>
               <CardDescription className="text-muted-foreground text-center">
                  Conozca a los profesionales que impulsan nuestra visión.
               </CardDescription>
            </CardHeader>
            <CardContent className="p-8 md:p-10">
              <Tabs defaultValue={teamDepartments[0].id} className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-auto">
                  {teamDepartments.map((dept) => (
                    <TabsTrigger key={dept.id} value={dept.id}>{dept.name}</TabsTrigger>
                  ))}
                </TabsList>
                {teamDepartments.map((dept) => (
                  <TabsContent key={dept.id} value={dept.id}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                      {mockEmployees
                        .filter((employee) => employee.department === dept.name)
                        .map((employee) => (
                          <div key={employee.id} className="flex flex-col items-center text-center p-4 border rounded-lg bg-card transition-shadow hover:shadow-md">
                            <Avatar className="h-20 w-20 mb-4">
                              <AvatarImage src={employee.imageUrl} alt={employee.name} data-ai-hint={employee.dataAiHint} />
                              <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="font-semibold text-foreground">{employee.name}</p>
                            <p className="text-sm text-muted-foreground">{employee.role}</p>
                          </div>
                        ))}
                         {mockEmployees.filter((employee) => employee.department === dept.name).length === 0 && (
                            <p className="col-span-full text-center text-muted-foreground mt-4">No hay empleados en este departamento.</p>
                        )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    </div>
  );
}
