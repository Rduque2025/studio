
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardCheck } from "lucide-react";

export default function SiniestrosPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <SectionWrapper 
        title="Dashboard de Siniestros"
        description="Seguimiento y análisis de los siniestros reportados."
      >
        <Card className="border-dashed border-2">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
                <ClipboardCheck className="h-16 w-16 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Dashboard en Construcción</h3>
            <p className="text-muted-foreground">
              Actualmente estamos trabajando en el desarrollo completo de esta sección. 
              <br />
              Próximamente podrá visualizar el estado y análisis de siniestros aquí.
              <br />
              Agradecemos su paciencia.
            </p>
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
