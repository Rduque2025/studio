
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function PolizaHcmPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="container mx-auto py-8 px-4">
      <SectionWrapper 
        title="Nuestra Póliza HCM"
        description="Información detallada sobre su Póliza de Hospitalización, Cirugía y Maternidad."
      >
        <Card className="border-dashed border-2">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
                <ShieldCheck className="h-16 w-16 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Información de Póliza HCM en Desarrollo</h3>
            <p className="text-muted-foreground">
              Actualmente estamos trabajando en el desarrollo completo de esta sección. 
              <br />
              Próximamente podrá consultar aquí todos los detalles de su cobertura, red de clínicas,
              procedimientos para reembolsos, claves de emergencia y más.
              <br />
              Agradecemos su paciencia.
            </p>
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
