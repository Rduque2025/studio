
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

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
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxidXNpbmVzcyUyMHZpc2lvbnxlbnwwfHx8fDE3NTEyNTUzODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
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
        </div>
      </SectionWrapper>
    </div>
  );
}
