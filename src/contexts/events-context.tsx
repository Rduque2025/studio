
"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
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
  addUserEvent: (event: CalendarEvent) => void;
  deleteUserEvent: (eventId: string) => void;
  // Helper to categorize events, can be moved here if needed by other components
  categorizeEvent: (title: string, description: string) => 'personal' | 'trabajo';
  getCategoryDisplayStyles: (category: 'personal' | 'trabajo') => { dotColor: string; textColor: string; badgeClass: string; badgeText: string};
}

// Keywords for work-related events - keep it within context or import if shared
const workKeywords = [
  "reunión", "reunion", "comité", "comite", "entrega", "cierre", "proyecto", 
  "tarea", "laboral", "trabajo", "presentación", "presentacion", "capacitación", 
  "capacitacion", "informe", "deadline", "sprint", "planning", "review"
];

// Function to categorize events
function categorizeEvent(title: string, description: string): 'personal' | 'trabajo' {
  const textToSearch = `${title.toLowerCase()} ${description.toLowerCase()}`;
  for (const keyword of workKeywords) {
    if (textToSearch.includes(keyword)) {
      return 'trabajo';
    }
  }
  return 'personal';
}

const categoryDisplayStyles = {
  personal: { 
    dotColor: 'bg-green-600', 
    textColor: 'text-green-700',
    badgeClass: 'bg-green-100 text-green-700 border-green-300',
    badgeText: 'Personal'
  },
  trabajo: { 
    dotColor: 'bg-blue-600', 
    textColor: 'text-blue-700',
    badgeClass: 'bg-blue-100 text-blue-700 border-blue-300',
    badgeText: 'Trabajo'
   },
};

function getCategoryDisplayStyles(category: 'personal' | 'trabajo') {
    return categoryDisplayStyles[category];
}


const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchAndProcessEvents = async () => {
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
              color: 'bg-purple-500', // Default color, can be categorized later
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
        // Keep user-added events and combine with fetched events
        const userEvents = prevEvents.filter(e => e.isUserEvent);
        return [...processedEvents, ...userEvents];
      });
    };

    fetchAndProcessEvents();
  }, []);


  const addUserEvent = (event: CalendarEvent) => {
    setAllEvents(prevEvents => [...prevEvents, event]);
  };

  const deleteUserEvent = (eventId: string) => {
    setAllEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  return (
    <EventsContext.Provider value={{ allEvents, addUserEvent, deleteUserEvent, categorizeEvent, getCategoryDisplayStyles }}>
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
