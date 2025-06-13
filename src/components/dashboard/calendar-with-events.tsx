
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import { format, isToday, parseISO, differenceInMinutes, formatDistanceStrict, isPast, intervalToDuration } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { AlertCircle, PlusCircle, Trash2, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';
import { useEvents, type CalendarEvent } from '@/contexts/events-context'; 

export function CalendarWithEvents() {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 1)); // Default to June 2025
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
      let finalColor = event.color; 
      let textColorClass = event.color.replace('bg-', 'text-');

      if (event.isUserEvent && event.category) {
        const styles = getCategoryDisplayStyles(event.category);
        finalColor = styles.dotColor; 
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
    // If multiple events, prefer user event for popover, otherwise first event.
    const userEventOnDay = eventsOnDay.find(e => e.isUserEvent); 
    setSelectedEvent(userEventOnDay || eventsOnDay[0] || null); 
    setDate(day);
  };
  
  // For the popover, only show details if the selectedEvent is on the currently selected `date`
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
      color: styles.dotColor, 
      isUserEvent: true,
      category: category,
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


  return (
    <div className="flex flex-col gap-8 items-stretch"> {/* Changed to flex-col and items-stretch */}
      <div className="w-full"> {/* Calendar takes full width */}
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          onDayClick={handleDayClick}
          className="rounded-md border p-4 bg-card shadow-none w-full" // Added w-full
          defaultMonth={new Date(2025, 5, 1)} // Default to June 2025
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
                      : currentEventForPopover.color.replace('bg-','text-') // Fallback for non-categorized or mock events
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
      
      <div className="w-full mt-6"> {/* Event list also takes full width and appears below */}
        <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">
                Eventos del Mes ({date ? format(date, 'MMMM yyyy', { locale: es }) : format(new Date(2025,5,1), 'MMMM yyyy', { locale: es })})
            </h3>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto pr-2"> {/* Removed lg specific max-h */}
          {allEvents
            .filter(event => date ? event.date.getMonth() === date.getMonth() && event.date.getFullYear() === date.getFullYear() : true)
            .sort((a,b) => {
                const dateComparison = a.date.getTime() - b.date.getTime();
                if (dateComparison !== 0) return dateComparison;
                if (a.time && b.time) return a.time.localeCompare(b.time);
                if (a.time) return -1;
                if (b.time) return 1;
                return 0;
            })
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
