
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Plane } from "lucide-react"; // Added Plane icon

export default function VacacionesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <SectionWrapper 
        title="Gestión de Vacaciones"
        description="Planifique sus días libres, solicite vacaciones y consulte su saldo disponible."
      >
        <Card className="border-dashed border-2">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
                <Plane className="h-16 w-16 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Portal de Vacaciones en Desarrollo</h3>
            <p className="text-muted-foreground">
              Actualmente estamos trabajando en el desarrollo completo de esta sección. 
              <br />
              Próximamente podrá solicitar sus vacaciones y consultar su saldo de días directamente desde aquí.
              <br />
              Agradecemos su paciencia.
            </p>
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
