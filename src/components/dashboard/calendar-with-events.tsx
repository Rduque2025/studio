
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import { mockCalendarEvents } from '@/lib/placeholder-data';
import { format, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { AlertCircle, PlusCircle, Trash2 } from 'lucide-react'; // Added Trash2
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';


interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  color: string; 
  isUserEvent?: boolean;
}

// Helper to process mock events and ensure they have IDs
const processMockEvents = (events: Omit<CalendarEvent, 'id' | 'isUserEvent'>[]): CalendarEvent[] => {
  return events.map((event, index) => ({
    ...event,
    id: `mock-${index}-${event.title.replace(/\s+/g, '-')}`,
    isUserEvent: false,
  }));
};

export function CalendarWithEvents() {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 0, 1));
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  
  const [processedMockEvents] = useState(() => processMockEvents(mockCalendarEvents));
  const [userEvents, setUserEvents] = useState<CalendarEvent[]>([]);
  
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  
  const { toast } = useToast();

  const allEvents = useMemo(() => [...processedMockEvents, ...userEvents], [processedMockEvents, userEvents]);

  useEffect(() => {
    // Show toast for events scheduled for today when component mounts
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const todaysEvents = allEvents.filter(event => format(event.date, 'yyyy-MM-dd') === todayStr);

    if (todaysEvents.length > 0) {
      todaysEvents.forEach(event => {
        toast({
          title: `Recordatorio Hoy: ${event.title}`,
          description: event.description || `Evento programado para hoy.`,
          duration: 7000,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processedMockEvents]); // Check only when mock events are processed (effectively on mount)


  const eventDates = allEvents.map(event => event.date);

  const modifiers = {
    highlighted: eventDates,
    ...allEvents.reduce((acc, event) => {
      const key = `event-${event.id}`;
      acc[key] = event.date;
      return acc;
    }, {} as Record<string, Date>)
  };
  
  const modifiersClassNames = {
    highlighted: 'border-primary ring-1 ring-primary rounded-md',
    ...allEvents.reduce((acc, event) => {
      const key = `event-${event.id}`;
      acc[key] = `relative ${event.isUserEvent ? 'text-green-foreground' : 'text-primary-foreground'} ${event.color.replace('bg-', 'before:bg-')} 
                  before:content-[''] before:absolute before:rounded-full before:w-2 before:h-2 before:-bottom-1 before:left-1/2 before:-translate-x-1/2`;
      return acc;
    }, {} as Record<string, string>)
  };

  const handleDayClick = (day: Date) => {
    const eventsOnDay = allEvents.filter(
      (event) => format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
    // If multiple events, show the first one for now. Could be enhanced to show a list in popover.
    // Prioritize user events if multiple on the same day for the popover
    const userEventOnDay = eventsOnDay.find(e => e.isUserEvent);
    setSelectedEvent(userEventOnDay || eventsOnDay[0] || null);
    setDate(day);
  };
  
  const currentEventForPopover = selectedEvent && date && format(selectedEvent.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') ? selectedEvent : null;

  const handleAddEvent = () => {
    if (!date || !newEventTitle) {
      toast({ title: "Error", description: "Por favor, seleccione una fecha e ingrese un título para el evento.", variant: "destructive" });
      return;
    }
    const newEventToAdd: CalendarEvent = {
      id: `user-${Date.now()}`,
      date,
      title: newEventTitle,
      description: newEventDescription,
      color: 'bg-green-600', // Default color for user events
      isUserEvent: true,
    };
    setUserEvents(prev => [...prev, newEventToAdd]);

    if (isToday(newEventToAdd.date)) {
      toast({
        title: `Evento añadido para hoy: ${newEventToAdd.title}`,
        description: newEventToAdd.description,
        duration: 7000,
      });
    }

    setNewEventTitle('');
    setNewEventDescription('');
    setIsAddEventDialogOpen(false);
    toast({ title: "Éxito", description: `Evento "${newEventToAdd.title}" añadido al calendario.` });
    setSelectedEvent(newEventToAdd); // Select the newly added event
  };

  const handleDeleteEvent = (eventId: string) => {
    const eventToDelete = userEvents.find(e => e.id === eventId);
    if (!eventToDelete) return;

    setUserEvents(prev => prev.filter(event => event.id !== eventId));
    toast({
      title: "Evento Eliminado",
      description: `El evento "${eventToDelete.title}" ha sido eliminado.`,
    });
    if (selectedEvent && selectedEvent.id === eventId) {
      setSelectedEvent(null); // Clear selection if the deleted event was selected
    }
  };


  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <div className="flex-shrink-0 w-full lg:w-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          onDayClick={handleDayClick}
          className="rounded-md border p-4 bg-card shadow-none"
          defaultMonth={new Date(2025, 0, 1)}
          locale={es}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          footer={
            <div className="p-2 mt-2 border-t text-sm space-y-2">
              {currentEventForPopover ? (
               <div>
                <h4 className={cn("font-semibold mb-1 flex items-center justify-between gap-2", currentEventForPopover.isUserEvent ? 'text-green-700' : currentEventForPopover.color.replace('bg-','text-'))}>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> {currentEventForPopover.title}
                        {currentEventForPopover.isUserEvent && <Badge variant="secondary" className="bg-green-100 text-green-700">Personal</Badge>}
                    </div>
                    {currentEventForPopover.isUserEvent && (
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDeleteEvent(currentEventForPopover!.id)}
                            aria-label="Eliminar evento"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </h4>
                <p className="text-muted-foreground">{currentEventForPopover.description}</p>
               </div>
              ) : (
                <p className="text-muted-foreground">
                  {date ? `Seleccionado: ${format(date, 'PPP', { locale: es })}.` : 'Seleccione una fecha.'}
                </p>
              )}
              <div className="flex items-center justify-end pt-1">
                {date && (
                  <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" aria-label={`Añadir evento el ${format(date, 'PPP', { locale: es })}`}>
                        <PlusCircle className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Añadir Nuevo Evento</DialogTitle>
                        <DialogDescription>
                          Añada un título y descripción para su evento en {format(date, 'PPP', { locale: es })}.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="event-title" className="text-right">Título</label>
                          <Input 
                            id="event-title" 
                            value={newEventTitle} 
                            onChange={(e) => setNewEventTitle(e.target.value)} 
                            className="col-span-3" 
                            placeholder="Título del evento"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="event-description" className="text-right">Descripción</label>
                          <Textarea 
                            id="event-description" 
                            value={newEventDescription} 
                            onChange={(e) => setNewEventDescription(e.target.value)} 
                            className="col-span-3" 
                            placeholder="Descripción (opcional)"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsAddEventDialogOpen(false)}>Cancelar</Button>
                        <Button type="submit" onClick={handleAddEvent}>Guardar Evento</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          }
        />
      </div>
      
      <div className="lg:w-2/5 w-full mt-6 lg:mt-0">
        <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">
                Eventos del Mes ({date ? format(date, 'MMMM yyyy', { locale: es }) : '2025'})
            </h3>
        </div>
        <div className="space-y-2 max-h-96 lg:max-h-[calc(theme(spacing.96)_+_theme(spacing.12))] overflow-y-auto pr-2">
          {allEvents
            .filter(event => date ? event.date.getMonth() === date.getMonth() && event.date.getFullYear() === date.getFullYear() : true)
            .sort((a,b) => a.date.getTime() - b.date.getTime())
            .map(event => (
            <Button
              key={event.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left h-auto p-3 border",
                date && format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') && "bg-accent text-accent-foreground"
              )}
              onClick={() => handleDayClick(event.date)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className={cn("mt-1 w-3 h-3 rounded-full flex-shrink-0", event.isUserEvent ? 'bg-green-500' : event.color)} />
                <div className="flex-grow">
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{format(event.date, 'd \'de\' MMMM', { locale: es })}</p>
                </div>
                {event.isUserEvent && <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-300">Personal</Badge>}
              </div>
            </Button>
          ))}
          {allEvents.filter(event => date ? event.date.getMonth() === date.getMonth() && event.date.getFullYear() === date.getFullYear() : true).length === 0 && (
            <p className="text-sm text-muted-foreground p-3 border rounded-md">No hay eventos este mes.</p>
          )}
        </div>
      </div>
    </div>
  );
}

