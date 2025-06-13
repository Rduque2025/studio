
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { CalendarWithEvents } from "@/components/dashboard/calendar-with-events";

export default function CalendarioPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <SectionWrapper 
        title="Calendario Interactivo 2025" 
        description="Consulte los eventos, feriados y fechas importantes del próximo año."
        cardClassName="bg-transparent shadow-none border-none p-0" // Allow calendar to expand
        contentClassName="p-0" // Allow calendar to expand
      >
        <CalendarWithEvents />
      </SectionWrapper>
    </div>
  );
}

