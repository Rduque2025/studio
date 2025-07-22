
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Workflow } from "lucide-react";

export default function ProcesosPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <SectionWrapper 
        title="Dashboard de Procesos"
        description="Análisis y optimización de los flujos de trabajo."
      >
        <Card className="border-dashed border-2">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
                <Workflow className="h-16 w-16 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Dashboard en Construcción</h3>
            <p className="text-muted-foreground">
              Actualmente estamos trabajando en el desarrollo completo de esta sección. 
              <br />
              Próximamente podrá visualizar los indicadores de procesos aquí.
              <br />
              Agradecemos su paciencia.
            </p>
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
