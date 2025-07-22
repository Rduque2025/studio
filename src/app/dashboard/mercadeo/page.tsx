
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Megaphone } from "lucide-react";

export default function MercadeoPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <SectionWrapper 
        title="Dashboard de Mercadeo"
        description="Indicadores clave y rendimiento de las campañas de marketing."
      >
        <Card className="border-dashed border-2">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
                <Megaphone className="h-16 w-16 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Dashboard en Construcción</h3>
            <p className="text-muted-foreground">
              Actualmente estamos trabajando en el desarrollo completo de esta sección. 
              <br />
              Próximamente podrá visualizar todos los KPIs de marketing aquí.
              <br />
              Agradecemos su paciencia.
            </p>
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
