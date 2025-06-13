
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, type CalendarProps } from "@/components/ui/calendar"; // Assuming CalendarProps is exported
import { Button } from '@/components/ui/button';
import { format, isToday, parseISO, differenceInMinutes, formatDistanceStrict, isPast, intervalToDuration } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { PlusCircle, Trash2, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';
import { useEvents, type CalendarEvent } from '@/contexts/events-context'; 
import { ScrollArea } from '@/components/ui/scroll-area';


export function CalendarWithEvents() {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 1)); 
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  
  const { allEvents, addUserEvent, deleteUserEvent, categorizeEvent, getCategoryDisplayStyles } = useEvents(); 
  
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventTime, setNewEventTime] = useState(''); 
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [remindedEventIds, setRemindedEventIds] = useState<Set<string>>(new Set());
  
  const { toast } = useToast();

  const getInitialCountdownString = (eventDate: Date, eventTime?: string): string => {
    if (!eventTime) return '';
    const now = new Date();
    const [hours, minutes] = eventTime.split(':').map(Number);
    const eventDateTime = new Date(eventDate);
    eventDateTime.setHours(hours, minutes, 0, 0);

    if (isPast(eventDateTime)) return ' (Comenzó)';
    
    const duration = intervalToDuration({ start: now, end: eventDateTime });
    const parts = [];
    if (duration.days && duration.days > 0) parts.push(`${duration.days}d`);
    if (duration.hours && duration.hours > 0) parts.push(`${duration.hours}h`);
    if (duration.minutes && duration.minutes > 0) parts.push(`${duration.minutes}m`);
    if (parts.length === 0 && duration.seconds && duration.seconds > 0) parts.push(`${duration.seconds}s`);
    
    return parts.length > 0 ? ` (en ${parts.join(' ')})` : ' (Ahora)';
  };

  useEffect(() => {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const todaysEvents = allEvents.filter(event => format(event.date, 'yyyy-MM-dd') === todayStr);
    const newTodaysEvents = todaysEvents.filter(event => !remindedEventIds.has(`today-${event.id}`));

    if (newTodaysEvents.length > 0) {
      newTodaysEvents.forEach(event => {
        const countdown = getInitialCountdownString(event.date, event.time);
        toast({
          title: `Recordatorio Hoy: ${event.title}`,
          description: `${event.description || 'Evento programado.'}${event.time ? ` Hora: ${format(new Date(`1970-01-01T${event.time}`), 'p', { locale: es })}` : ''}${countdown}`,
          duration: 7000,
        });
        setRemindedEventIds(prev => new Set(prev).add(`today-${event.id}`));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allEvents]);

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
              const countdown = formatDistanceStrict(eventDateTime, now, { addSuffix: true, locale: es, unit: 'minute' });
              toast({
                title: `Recordatorio Próximo: ${event.title}`,
                description: `El evento comienza ${countdown}.`,
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
  }, [allEvents, remindedEventIds]);


  const handleDayClick = (day: Date) => {
    // If events are shown in cells, clicking a day might just set the 'selected' visual state
    // and prepare for adding a new event to this day.
    setDate(day);
    setSelectedEvent(null); // Clear previously selected specific event, if any
  };
  
  const handleAddEvent = () => {
    if (!date || !newEventTitle) {
      toast({ title: "Error", description: "Por favor, seleccione una fecha e ingrese un título para el evento.", variant: "destructive" });
      return;
    }
    
    const mainCategory = categorizeEvent(newEventTitle, newEventDescription);
    const styles = getCategoryDisplayStyles(mainCategory);

    const newEventToAdd: CalendarEvent = {
      id: `user-${Date.now()}`,
      date,
      title: newEventTitle,
      description: newEventDescription,
      color: styles.dotColor, 
      isUserEvent: true,
      category: mainCategory, 
      time: newEventTime || undefined,
    };
    addUserEvent(newEventToAdd); 

    if (isToday(newEventToAdd.date)) {
      const countdown = getInitialCountdownString(newEventToAdd.date, newEventToAdd.time);
      toast({
        title: `Evento ${styles.badgeText} añadido para hoy: ${newEventToAdd.title}`,
        description: `${newEventToAdd.description}${newEventToAdd.time ? ` Hora: ${format(new Date(`1970-01-01T${newEventToAdd.time}`), 'p', { locale: es })}` : ''}${countdown}`,
        duration: 7000,
      });
      setRemindedEventIds(prev => new Set(prev).add(`today-${newEventToAdd.id}`));
    }

    setNewEventTitle('');
    setNewEventDescription('');
    setNewEventTime(''); 
    setIsAddEventDialogOpen(false);
    toast({ title: "Éxito", description: `Evento "${newEventToAdd.title}" (${styles.badgeText}) añadido al calendario.` });
    setSelectedEvent(newEventToAdd); // Optionally select the newly added event
  };

  const handleDeleteEvent = (eventId: string) => {
    const eventToDelete = allEvents.find(e => e.id === eventId); 
    if (!eventToDelete || !eventToDelete.isUserEvent) return; 

    deleteUserEvent(eventId); 
    
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


  const renderDayEventsContent = (day: Date): React.ReactNode => {
    const eventsOnDay = allEvents
      .filter(event => format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
      .sort((a,b) => {
          if (a.time && b.time) return a.time.localeCompare(b.time);
          if (a.time) return -1;
          if (b.time) return 1;
          return 0;
      });
  
    if (eventsOnDay.length === 0) {
      return <div className="flex-grow min-h-[4rem]"></div>; // Placeholder for consistent cell height
    }
  
    const maxEventsToShow = 3; 
  
    return (
      <div className="flex-grow overflow-y-auto space-y-0.5 text-[10px] leading-tight pr-0.5 pt-1">
        {eventsOnDay.slice(0, maxEventsToShow).map(event => {
          const categoryStyles = event.isUserEvent && event.category ? getCategoryDisplayStyles(event.category) : null;
          const displayColor = categoryStyles ? categoryStyles.dotColor : event.color;
          const isSelected = selectedEvent?.id === event.id && date && format(date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
          
          return (
            <div 
              key={event.id} 
              className={cn(
                "p-1 rounded-sm flex items-start gap-1.5 group/event-item cursor-pointer hover:bg-accent/20",
                isSelected && "bg-accent/30 ring-1 ring-accent"
              )}
              style={{ 
                // Use a very light, almost transparent version of the event color for background
                backgroundColor: `${displayColor.replace('bg-','').replace('-500','').replace('-600','').replace('-700','')}1A` 
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent day click if clicking on event
                setSelectedEvent(event);
                setDate(day); // Ensure calendar selection follows
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setSelectedEvent(event); setDate(day);}}}
            >
              <div className={cn("mt-[3px] w-1.5 h-1.5 rounded-full flex-shrink-0", displayColor)} />
              <div className="flex-grow">
                <p className={cn("font-medium truncate", isSelected ? "text-accent-foreground font-semibold" : "text-foreground/90")}>{event.title}</p>
                 {event.time && <p className={cn("text-xs", isSelected? "text-accent-foreground/80" : "text-muted-foreground/80")}>{format(new Date(`1970-01-01T${event.time}`), 'p', { locale: es })}</p>}
              </div>
            </div>
          );
        })}
        {eventsOnDay.length > maxEventsToShow && (
          <div className="text-center text-muted-foreground text-[9px] mt-1">
            + {eventsOnDay.length - maxEventsToShow} más
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full"> 
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate} 
          onDayClick={handleDayClick} // Sets the main selected date
          className="w-full" 
          defaultMonth={new Date(2025, 5, 1)} // June 2025
          locale={es} 
          renderDayContent={renderDayEventsContent} // Pass the function to render events in cells
          footer={
            <div className="p-2 mt-2 text-sm space-y-2 border-t"> 
              <div className="flex items-center justify-between">
                <div>
                  {selectedEvent && date && format(selectedEvent.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') ? (
                    <div className="text-xs">
                      <p className="font-semibold text-primary">{selectedEvent.title}</p>
                      <p className="text-muted-foreground">{selectedEvent.description}</p>
                      {selectedEvent.time && (
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {format(new Date(`1970-01-01T${selectedEvent.time}`), 'p', { locale: es })}
                        </p>
                      )}
                       {selectedEvent.isUserEvent && (
                          <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-destructive hover:bg-destructive/10 hover:text-destructive mt-1" 
                              onClick={() => handleDeleteEvent(selectedEvent!.id)}
                              aria-label="Eliminar evento"
                          >
                              <Trash2 className="h-3.5 w-3.5" /> 
                          </Button>
                      )}
                    </div>
                  ) : (
                     <p className="text-xs text-muted-foreground">
                      {date ? `Día seleccionado: ${format(date, 'PPP', { locale: es })}.` : 'Seleccione una fecha.'}
                    </p>
                  )}
                </div>

                {date && (
                  <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
                    <DialogTrigger asChild>
                       <Button variant="outline" size="icon" className="h-8 w-8" aria-label={`Añadir evento el ${format(date, 'PPP', { locale: es })}`}> 
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Añadir Nuevo Evento</DialogTitle>
                        <DialogDescription>
                          Añada un título, descripción y hora (opcional) para su evento en {format(date, 'PPP', { locale: es })}. Se categorizará automáticamente como 'Personal' o 'Trabajo'.
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
    </div>
  );
}

    
