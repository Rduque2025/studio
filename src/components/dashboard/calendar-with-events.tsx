"use client";

import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { mockCalendarEvents } from '@/lib/placeholder-data';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface CalendarEvent {
  date: Date;
  title: string;
  description: string;
  color: string; // Tailwind background color class e.g., 'bg-blue-500'
}

export function CalendarWithEvents() {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 0, 1)); // Default to Jan 2025
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const eventDates = mockCalendarEvents.map(event => event.date);

  const modifiers = {
    highlighted: eventDates,
    ...mockCalendarEvents.reduce((acc, event) => {
      // Create a unique key for each event's modifier, e.g., 'event-2025-02-15'
      const key = `event-${format(event.date, 'yyyy-MM-dd')}`;
      acc[key] = event.date;
      return acc;
    }, {} as Record<string, Date>)
  };
  
  const modifiersClassNames = {
    highlighted: 'border-primary ring-2 ring-primary rounded-md',
    ...mockCalendarEvents.reduce((acc, event) => {
      const key = `event-${format(event.date, 'yyyy-MM-dd')}`;
      // Ensure the color class is for text or a dot, not background to avoid conflict with selection
      acc[key] = `relative text-primary-foreground ${event.color.replace('bg-', 'before:bg-')} 
                  before:content-[''] before:absolute before:rounded-full before:w-2 before:h-2 before:-bottom-1 before:left-1/2 before:-translate-x-1/2`;
      return acc;
    }, {} as Record<string, string>)
  };

  const handleDayClick = (day: Date) => {
    const eventOnDay = mockCalendarEvents.find(
      (event) => format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
    if (eventOnDay) {
      setSelectedEvent(eventOnDay);
      setDate(day); // Also select the day on calendar
    } else {
      setSelectedEvent(null);
      setDate(day);
    }
  };
  
  const currentEventForPopover = selectedEvent && date && format(selectedEvent.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') ? selectedEvent : null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate} // Keep this for general date selection
        onDayClick={handleDayClick} // Handle specific logic for event days
        className="rounded-md border shadow-lg p-4 bg-card"
        defaultMonth={new Date(2025, 0, 1)} // Start in January 2025
        locale={es}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        footer={
          currentEventForPopover ? (
             <div className="p-2 mt-2 border-t text-sm">
              <h4 className={cn("font-semibold mb-1 flex items-center gap-2", currentEventForPopover.color.replace('bg-','text-'))}>
                 <AlertCircle className="h-4 w-4" /> {currentEventForPopover.title}
              </h4>
              <p className="text-muted-foreground">{currentEventForPopover.description}</p>
             </div>
          ) : (
            <p className="p-2 mt-2 text-sm text-muted-foreground">
              {date ? `Seleccionado: ${format(date, 'PPP', { locale: es })}.` : 'Seleccione una fecha.'}
            </p>
          )
        }
      />
      <div className="lg:w-1/3 w-full">
        <h3 className="text-lg font-semibold mb-2">Eventos del Mes (2025)</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
          {mockCalendarEvents
            .filter(event => date ? event.date.getMonth() === date.getMonth() && event.date.getFullYear() === date.getFullYear() : true)
            .sort((a,b) => a.date.getTime() - b.date.getTime())
            .map(event => (
            <Button
              key={event.title}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left h-auto p-3 border",
                date && format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') && "bg-accent text-accent-foreground"
              )}
              onClick={() => handleDayClick(event.date)}
            >
              <div className="flex items-start gap-2">
                <div className={cn("mt-1 w-3 h-3 rounded-full flex-shrink-0", event.color)} />
                <div>
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{format(event.date, 'd \'de\' MMMM', { locale: es })}</p>
                </div>
              </div>
            </Button>
          ))}
          {mockCalendarEvents.filter(event => date ? event.date.getMonth() === date.getMonth() : true).length === 0 && (
            <p className="text-sm text-muted-foreground">No hay eventos este mes.</p>
          )}
        </div>
      </div>
    </div>
  );
}
