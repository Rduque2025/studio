
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
// Removed direct import of mockCalendarEvents, will get allEvents from context
import { format, isToday, parseISO, differenceInMinutes } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { AlertCircle, PlusCircle, Trash2, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';
import { useEvents, type CalendarEvent } from '@/contexts/events-context'; // Import useEvents and CalendarEvent

// Removed local CalendarEvent interface, workKeywords, categorizeEvent, categoryDisplayStyles, processMockEvents
// These are now handled or available from EventsContext

export function CalendarWithEvents() {
  const [date, setDate] = useState<Date | undefined>(new Date()); 
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  
  const { allEvents, addUserEvent, deleteUserEvent, categorizeEvent, getCategoryDisplayStyles } = useEvents(); // Use context
  
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventTime, setNewEventTime] = useState(''); 
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [remindedEventIds, setRemindedEventIds] = useState<Set<string>>(new Set());
  
  const { toast } = useToast();

  // Toast for events scheduled for today (on load or when allEvents changes)
  useEffect(() => {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const todaysEvents = allEvents.filter(event => format(event.date, 'yyyy-MM-dd') === todayStr);
    const newTodaysEvents = todaysEvents.filter(event => !remindedEventIds.has(`today-${event.id}`));


    if (newTodaysEvents.length > 0) {
      newTodaysEvents.forEach(event => {
        toast({
          title: `Recordatorio Hoy: ${event.title}`,
          description: `${event.description || 'Evento programado.'}${event.time ? ` Hora: ${format(new Date(`1970-01-01T${event.time}`), 'p', { locale: es })}` : ''}`,
          duration: 7000,
        });
        // Add to remindedEventIds to prevent re-toasting unless component reloads or events change significantly
        setRemindedEventIds(prev => new Set(prev).add(`today-${event.id}`));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allEvents, toast]); // Re-run if allEvents changes

  // Effect for 1-hour pre-reminders
  useEffect(() => {
    const checkUpcomingEvents = () => {
      const now = new Date();
      allEvents.forEach(event => {
        if (event.time && !remindedEventIds.has(`upcoming-${event.id}`)) {
          const eventDateStr = format(event.date, 'yyyy-MM-dd');
          const todayStr = format(now, 'yyyy-MM-dd');

          if (eventDateStr === todayStr) { 
            const [hours, minutes] = event.time.split(':').map(Number);
            const eventDateTime = new Date(event.date); 
            eventDateTime.setHours(hours, minutes, 0, 0); 

            const diffMins = differenceInMinutes(eventDateTime, now);

            if (diffMins > 0 && diffMins <= 60) { 
              toast({
                title: `Recordatorio Próximo: ${event.title}`,
                description: `El evento comienza en aproximadamente ${diffMins} minuto(s).`,
                duration: 10000,
              });
              setRemindedEventIds(prev => new Set(prev).add(`upcoming-${event.id}`));
            }
          }
        }
      });
    };

    checkUpcomingEvents(); 
    const intervalId = setInterval(checkUpcomingEvents, 60000); 

    return () => clearInterval(intervalId); 
  }, [allEvents, toast, remindedEventIds]);


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
      let finalColor = event.color; // Mock events use their own color
      let textColorClass = event.color.replace('bg-', 'text-');

      if (event.isUserEvent && event.category) {
        const styles = getCategoryDisplayStyles(event.category);
        finalColor = styles.dotColor; // User events use category color for dot
        textColorClass = styles.textColor;
      }
      
      acc[key] = `relative ${textColorClass} 
                  before:content-[''] before:absolute before:rounded-full before:w-2 before:h-2 
                  before:-bottom-1 before:left-1/2 before:-translate-x-1/2 
                  ${finalColor}`; 
      return acc;
    }, {} as Record<string, string>)
  };

  const handleDayClick = (day: Date) => {
    const eventsOnDay = allEvents.filter(
      (event) => format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
    const userEventOnDay = eventsOnDay.find(e => e.isUserEvent); // Prefer showing user event first
    setSelectedEvent(userEventOnDay || eventsOnDay[0] || null);
    setDate(day);
  };
  
  const currentEventForPopover = selectedEvent && date && format(selectedEvent.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') ? selectedEvent : null;

  const handleAddEvent = () => {
    if (!date || !newEventTitle) {
      toast({ title: "Error", description: "Por favor, seleccione una fecha e ingrese un título para el evento.", variant: "destructive" });
      return;
    }
    
    const category = categorizeEvent(newEventTitle, newEventDescription);
    const styles = getCategoryDisplayStyles(category);

    const newEventToAdd: CalendarEvent = {
      id: `user-${Date.now()}`,
      date,
      title: newEventTitle,
      description: newEventDescription,
      color: styles.dotColor, // Store the dotColor for consistency
      isUserEvent: true,
      category: category,
      time: newEventTime || undefined,
    };
    addUserEvent(newEventToAdd); // Use context action

    if (isToday(newEventToAdd.date)) {
      toast({
        title: `Evento ${styles.badgeText} añadido para hoy: ${newEventToAdd.title}`,
        description: `${newEventToAdd.description}${newEventToAdd.time ? ` Hora: ${format(new Date(`1970-01-01T${newEventToAdd.time}`), 'p', { locale: es })}` : ''}`,
        duration: 7000,
      });
       // Add to remindedEventIds for today's general reminder if not already handled by upcoming
      setRemindedEventIds(prev => new Set(prev).add(`today-${newEventToAdd.id}`));
    }

    setNewEventTitle('');
    setNewEventDescription('');
    setNewEventTime(''); 
    setIsAddEventDialogOpen(false);
    toast({ title: "Éxito", description: `Evento "${newEventToAdd.title}" (${styles.badgeText}) añadido al calendario.` });
    setSelectedEvent(newEventToAdd);
  };

  const handleDeleteEvent = (eventId: string) => {
    const eventToDelete = allEvents.find(e => e.id === eventId); // Find from allEvents
    if (!eventToDelete || !eventToDelete.isUserEvent) return; // Only delete user events

    deleteUserEvent(eventId); // Use context action
    
    setRemindedEventIds(prev => { 
        const newSet = new Set(prev);
        newSet.delete(`today-${eventId}`);
        newSet.delete(`upcoming-${eventId}`);
        return newSet;
    });
    toast({
      title: "Evento Eliminado",
      description: `El evento "${eventToDelete.title}" ha sido eliminado.`,
    });
    if (selectedEvent && selectedEvent.id === eventId) {
      setSelectedEvent(null);
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
          defaultMonth={new Date()} // This ensures it defaults to today's month
          locale={es}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          footer={
            <div className="p-2 mt-2 border-t text-sm space-y-2">
              {currentEventForPopover ? (
               <div>
                <h4 className={cn(
                    "font-semibold mb-1 flex items-center justify-between gap-2", 
                    currentEventForPopover.isUserEvent && currentEventForPopover.category 
                      ? getCategoryDisplayStyles(currentEventForPopover.category).textColor 
                      : currentEventForPopover.color.replace('bg-','text-') // For mock events
                  )}
                >
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> {currentEventForPopover.title}
                        {currentEventForPopover.isUserEvent && currentEventForPopover.category && (
                            <Badge variant="secondary" className={cn("text-xs", getCategoryDisplayStyles(currentEventForPopover.category).badgeClass)}>
                                {getCategoryDisplayStyles(currentEventForPopover.category).badgeText}
                            </Badge>
                        )}
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
                {currentEventForPopover.time && (
                    <p className="text-muted-foreground text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Hora: {format(new Date(`1970-01-01T${currentEventForPopover.time}`), 'p', { locale: es })}
                    </p>
                )}
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
                          Añada un título, descripción y hora (opcional) para su evento en {format(date, 'PPP', { locale: es })}. Se categorizará automáticamente.
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
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="event-time" className="text-right">Hora</label>
                          <Input 
                            id="event-time" 
                            type="time"
                            value={newEventTime} 
                            onChange={(e) => setNewEventTime(e.target.value)} 
                            className="col-span-3" 
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
                Eventos del Mes ({date ? format(date, 'MMMM yyyy', { locale: es }) : format(new Date(), 'MMMM yyyy', { locale: es })})
            </h3>
        </div>
        <div className="space-y-2 max-h-96 lg:max-h-[calc(theme(spacing.96)_+_theme(spacing.12))] overflow-y-auto pr-2">
          {allEvents
            .filter(event => date ? event.date.getMonth() === date.getMonth() && event.date.getFullYear() === date.getFullYear() : true)
            .sort((a,b) => a.date.getTime() - b.date.getTime()) // Sort events by date
            .map(event => {
              const categoryStyles = event.isUserEvent && event.category ? getCategoryDisplayStyles(event.category) : null;
              return (
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
                     {/* Use category color for user events, specific color for mock events */}
                    <div className={cn("mt-1 w-3 h-3 rounded-full flex-shrink-0", categoryStyles ? categoryStyles.dotColor : event.color)} /> 
                    <div className="flex-grow">
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(event.date, 'd \'de\' MMMM', { locale: es })}
                        {event.time && ` - ${format(new Date(`1970-01-01T${event.time}`), 'p', { locale: es })}`}
                      </p>
                    </div>
                    {categoryStyles && (
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs", categoryStyles.badgeClass)}
                      >
                        {categoryStyles.badgeText}
                      </Badge>
                    )}
                  </div>
                </Button>
              );
            })}
          {allEvents.filter(event => date ? event.date.getMonth() === date.getMonth() && event.date.getFullYear() === date.getFullYear() : true).length === 0 && (
            <p className="text-sm text-muted-foreground p-3 border rounded-md">No hay eventos este mes.</p>
          )}
        </div>
      </div>
    </div>
  );
}
