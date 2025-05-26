
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { InteractiveVenezuelaMap } from "@/components/dashboard/venezuela-map";

export default function MapaClientesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <SectionWrapper 
        title="Mapa Interactivo de Clientes"
        description="Visualice la distribución de clientes a nivel nacional y por estado."
      >
        <InteractiveVenezuelaMap />
      </SectionWrapper>
    </div>
  );
}
