
"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { mockCalendarEvents as rawMockCalendarEvents } from '@/lib/placeholder-data'; // Assuming this is the raw array
import { format, parseISO } from 'date-fns';

// Define the event structure, ensuring it's comprehensive for both mock and user events
export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  color: string; // For mock events, or category-derived for user events
  isUserEvent?: boolean;
  category?: 'personal' | 'trabajo'; // For user events
  time?: string;
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


// Process raw mock events to fit the CalendarEvent interface
const processRawEvents = (events: any[]): CalendarEvent[] => {
  return events.map((event, index) => ({
    ...event,
    date: typeof event.date === 'string' ? parseISO(event.date) : event.date, // Ensure date is a Date object
    id: event.id || `mock-${index}-${event.title.replace(/\s+/g, '-')}`,
    isUserEvent: event.isUserEvent || false,
    // Ensure color is present, provide a default if necessary
    color: event.color || 'bg-gray-500', 
  }));
};


const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const initialProcessedMockEvents = useMemo(() => processRawEvents(rawMockCalendarEvents), []);
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>(initialProcessedMockEvents);

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
