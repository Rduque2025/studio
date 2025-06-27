

import { CalendarWithEvents } from "@/components/dashboard/calendar-with-events";

export default function CalendarioPage({ searchParams }: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="container mx-auto py-8 px-4">
        <CalendarWithEvents />
    </div>
  );
}


