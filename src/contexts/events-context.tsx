
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getCalendarEvents } from '@/ai/flows/get-calendar-events-flow';
import { parseISO } from 'date-fns';
import { Cake } from 'lucide-react';

// Define the event structure, ensuring it's comprehensive for both mock and user events
export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  color: string; // For mock events, or category-derived for user events
  isUserEvent?: boolean;
  category?: 'personal' | 'trabajo' | 'birthday';
  time?: string;
  icon?: React.ElementType;
}

interface EventsContextType {
  allEvents: CalendarEvent[];
  // addUserEvent is no longer needed since we are not adding events from the UI
  deleteUserEvent: (eventId: string) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndProcessEvents = async () => {
      setIsLoading(true);
      try {
        const rawEventsData = await getCalendarEvents();
        const processedEvents: CalendarEvent[] = [];

        rawEventsData.forEach(dayData => {
          const eventDate = parseISO(dayData.date);
          
          // Process regular events
          dayData.events.forEach((eventTitle, index) => {
            if (eventTitle) {
              processedEvents.push({
                id: `gs-event-${dayData.date}-${index}`,
                date: eventDate,
                title: eventTitle,
                description: `Evento programado: ${eventTitle}`,
                color: 'bg-purple-500', // Default color
                isUserEvent: false,
                time: eventDate.toTimeString().substring(0, 5) === '00:00' ? undefined : eventDate.toTimeString().substring(0, 5),
              });
            }
          });

          // Process birthdays
          dayData.birthdays.forEach((birthdayName, index) => {
            if (birthdayName) {
              processedEvents.push({
                id: `gs-bday-${dayData.date}-${index}`,
                date: eventDate,
                title: `Cumpleaños de ${birthdayName}`,
                description: `¡Felicidades a ${birthdayName}!`,
                color: 'bg-pink-500',
                isUserEvent: false,
                category: 'birthday',
                icon: Cake,
              });
            }
          });
        });
        
        setAllEvents(prevEvents => {
          const userEvents = prevEvents.filter(e => e.isUserEvent);
          return [...processedEvents, ...userEvents];
        });

      } catch (error) {
        console.error("Error fetching calendar events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessEvents();
  }, []);

  const deleteUserEvent = (eventId: string) => {
    setAllEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  return (
    <EventsContext.Provider value={{ allEvents, deleteUserEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = (): EventsContextType => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};
