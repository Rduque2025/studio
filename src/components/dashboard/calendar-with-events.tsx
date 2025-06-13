
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import { format, isToday, parseISO, differenceInMinutes, formatDistanceStrict, isPast, intervalToDuration } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { PlusCircle, Trash2, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useEvents, type CalendarEvent } from '@/contexts/events-context'; 

// Define colors for categories to be used as capsules in day cells
const EVENT_ITEM_STYLES = {
  PAGO: { bg: 'bg-green-500', text: 'text-white', label: 'Pago' },
  ESPECIAL: { bg: 'bg-purple-500', text: 'text-white', label: 'Especial' },
  REUNION: { bg: 'bg-red-500', text: 'text-white', label: 'Reunión' },
  TRABAJO: { bg: 'bg-blue-600', text: 'text-white', label: 'Trabajo' }, // User event - trabajo
  PERSONAL: { bg: 'bg-teal-600', text: 'text-white', label: 'Personal' }, // User event - personal
  DEFAULT: { bg: 'bg-gray-200', text: 'text-gray-700', label: ''} // Fallback
};

// Keywords for categorization
const PAGO_KEYWORDS = ['pago', 'beneficio', 'asignación', 'quincena', 'transporte', 'alimentación', 'sociales'];
const ESPECIAL_KEYWORDS = ['día de', 'feriado', 'conmemorativo', 'aniversario', 'independencia', 'mujer', 'trabajador', 'resistencia', 'navidad', 'noche buena', 'festivo', 'resultados anuales'];
const REUNION_KEYWORDS = ['reunión', 'comité', 'presentación', 'cierre', 'trimestral', 'planificación', 'sprint', 'review', 'taller', 'charla', 'workshop', 'q2', 'q1', 'q3', 'q4'];


function getEventRenderProps(event: CalendarEvent): { bg: string; text: string; label: string } {
  const title = event.title.toLowerCase();
  const description = event.description.toLowerCase();
  const fullText = `${title} ${description}`;

  if (PAGO_KEYWORDS.some(kw => fullText.includes(kw))) {
    return EVENT_ITEM_STYLES.PAGO;
  }
  if (ESPECIAL_KEYWORDS.some(kw => fullText.includes(kw))) {
    return EVENT_ITEM_STYLES.ESPECIAL;
  }
  if (REUNION_KEYWORDS.some(kw => fullText.includes(kw))) {
    return EVENT_ITEM_STYLES.REUNION;
  }

  if (event.isUserEvent && event.category) {
    if (event.category === 'trabajo') return EVENT_ITEM_STYLES.TRABAJO;
    if (event.category === 'personal') return EVENT_ITEM_STYLES.PERSONAL;
  }
  
  // Fallback for mock events that don't fit above categories, using their predefined color if it's a bg class
  if (event.color && event.color.startsWith('bg-')) {
     const isDarkBg = ['pink-500', 'red-500', 'purple-500', 'green-500', 'blue-500', 'orange-500', 'yellow-500', 'teal-500', 'cyan-500', 'sky-500', 'emerald-500', 'lime-500', 
                       'pink-600', 'red-600', 'purple-600', 'green-600', 'blue-600', 'orange-600', 'yellow-600', 'teal-600', 'cyan-600', 'sky-600', 'emerald-600', 'lime-600' // adding -600 variants
                      ].some(c => event.color.includes(c));
     return { bg: event.color, text: isDarkBg ? 'text-white' : 'text-gray-800', label: '' };
  }

  return EVENT_ITEM_STYLES.DEFAULT;
}


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
  }, [allEvents, toast]); 

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
  }, [allEvents, remindedEventIds, toast]); 


  const handleDayClick = (day: Date) => {
    setDate(day);
    setSelectedEvent(null); 
  };
  
  const handleAddEvent = () => {
    if (!date || !newEventTitle) {
      toast({ title: "Error", description: "Por favor, seleccione una fecha e ingrese un título para el evento.", variant: "destructive" });
      return;
    }
    
    const mainCategory = categorizeEvent(newEventTitle, newEventDescription); // This is 'personal' or 'trabajo'
    const userEventStyles = getCategoryDisplayStyles(mainCategory); // Gets dotColor, badgeText etc. for user events

    const newEventToAdd: CalendarEvent = {
      id: `user-${Date.now()}`,
      date,
      title: newEventTitle,
      description: newEventDescription,
      color: userEventStyles.dotColor, // Use dotColor for consistency, though capsule style will be from EVENT_ITEM_STYLES
      isUserEvent: true,
      category: mainCategory, 
      time: newEventTime || undefined,
    };
    addUserEvent(newEventToAdd); 

    if (isToday(newEventToAdd.date)) {
      const countdown = getInitialCountdownString(newEventToAdd.date, newEventToAdd.time);
      toast({
        title: `Evento ${userEventStyles.badgeText} añadido para hoy: ${newEventToAdd.title}`,
        description: `${newEventToAdd.description}${newEventToAdd.time ? ` Hora: ${format(new Date(`1970-01-01T${newEventToAdd.time}`), 'p', { locale: es })}` : ''}${countdown}`,
        duration: 7000,
      });
      setRemindedEventIds(prev => new Set(prev).add(`today-${newEventToAdd.id}`));
    }

    setNewEventTitle('');
    setNewEventDescription('');
    setNewEventTime(''); 
    setIsAddEventDialogOpen(false);
    toast({ title: "Éxito", description: `Evento "${newEventToAdd.title}" (${userEventStyles.badgeText}) añadido al calendario.` });
    setSelectedEvent(newEventToAdd); 
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

  const renderDayEventsContent = (dayCellDate: Date): React.ReactNode => {
    const eventsOnDay = allEvents
      .filter(event => format(event.date, 'yyyy-MM-dd') === format(dayCellDate, 'yyyy-MM-dd'))
      .sort((a,b) => {
          if (a.time && b.time) return a.time.localeCompare(b.time);
          if (a.time) return -1;
          if (b.time) return 1;
          return 0;
      });
  
    if (eventsOnDay.length === 0) {
      return <div className="flex-grow min-h-[4rem]"></div>;
    }
  
    const maxEventsToShowInCell = 3; 
    const isCellCurrentlySelected = date && format(date, 'yyyy-MM-dd') === format(dayCellDate, 'yyyy-MM-dd');

    return (
      <div className="flex-grow overflow-y-auto space-y-0.5 text-[10px] leading-tight pr-0.5 pt-1">
        {eventsOnDay.slice(0, maxEventsToShowInCell).map(event => {
          const renderProps = getEventRenderProps(event);
          const isClickedEventItem = selectedEvent?.id === event.id && isCellCurrentlySelected;
          
          return (
            <div 
              key={event.id} 
              className={cn(
                "px-1 py-0.5 rounded text-xs leading-tight flex items-start gap-1.5 cursor-pointer",
                renderProps.bg,
                renderProps.text,
                isClickedEventItem && "ring-2 ring-offset-1 ring-white/70" // Highlight for clicked item within selected cell
              )}
              onClick={(e) => {
                e.stopPropagation(); 
                setSelectedEvent(event);
                setDate(dayCellDate); 
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setSelectedEvent(event); setDate(dayCellDate);}}}
            >
              {/* Dot removed, capsule color is the indicator */}
              <div className="flex-grow">
                <p className={cn(
                  "font-medium truncate",
                   // Text color is now part of renderProps.text and applied to the parent div
                )}>{event.title}</p>
                 {event.time && <p className={cn(
                   "text-xs opacity-80", // Inherits text color, slightly dimmed
                  )}>{format(new Date(`1970-01-01T${event.time}`), 'p', { locale: es })}</p>}
              </div>
            </div>
          );
        })}
        {eventsOnDay.length > maxEventsToShowInCell && (
          <div className={cn(
            "text-center text-[9px] mt-1",
            isCellCurrentlySelected ? "text-primary-foreground/70" : "text-muted-foreground"
            )}>
            + {eventsOnDay.length - maxEventsToShowInCell} más
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
          onDayClick={handleDayClick}
          className="w-full" 
          defaultMonth={new Date(2025, 5, 1)}
          locale={es} 
          renderDayContent={renderDayEventsContent}
          footer={
            <div className="p-2 mt-2 text-sm space-y-2 border-t"> 
              <div className="flex items-center justify-between">
                <div className="min-h-[60px] flex-grow"> {/* Ensure footer has some min height and can grow */}
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
                      { date && !selectedEvent && <span className="ml-1">Seleccione un evento para ver detalles.</span>}
                    </p>
                  )}
                </div>

                {date && (
                  <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
                    <DialogTrigger asChild>
                       <Button variant="outline" size="icon" className="h-8 w-8 flex-shrink-0" aria-label={`Añadir evento el ${format(date, 'PPP', { locale: es })}`}> 
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

