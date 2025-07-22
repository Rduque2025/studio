
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { FileCheck2 } from "lucide-react";

export default function SuscripcionPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <SectionWrapper 
        title="Dashboard de Suscripción"
        description="Métricas y estado del proceso de suscripción de pólizas."
      >
        <Card className="border-dashed border-2">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
                <FileCheck2 className="h-16 w-16 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Dashboard en Construcción</h3>
            <p className="text-muted-foreground">
              Actualmente estamos trabajando en el desarrollo completo de esta sección. 
              <br />
              Próximamente podrá visualizar todas las métricas de suscripción aquí.
              <br />
              Agradecemos su paciencia.
            </p>
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
