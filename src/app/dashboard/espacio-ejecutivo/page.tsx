
'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockExecutiveCalendarEvents, mockExecutiveMenuItems } from '@/lib/placeholder-data';
import { Calendar } from "@/components/ui/calendar";
import { format, isToday, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronLeft, ChevronRight, Utensils, Info } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MenuItemCard } from '@/components/dashboard/menu-item-card';
import { Badge } from '@/components/ui/badge';
import type { CalendarEvent } from '@/contexts/events-context';

const SPECIFIC_EVENT_STYLES: { [title: string]: { bg: string; text: string } } = {
  "Bono Gerencial": { bg: 'bg-primary', text: 'text-primary-foreground' },
  "Pago Quincena": { bg: 'bg-emerald-500', text: 'text-white' },
  "Reunión de Directorio": { bg: 'bg-rose-500', text: 'text-white' },
  "Presentación Resultados Q3": { bg: 'bg-sky-500', text: 'text-white' },
};

export default function EspacioEjecutivoPage() {
    const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 1));
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const menuScrollAreaRef = useRef<HTMLDivElement>(null);
    const currentDayName = new Date().toLocaleString('es-ES', { weekday: 'long' });

    const handleMenuScroll = (direction: 'left' | 'right') => {
        const viewport = menuScrollAreaRef.current?.querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]');
        if (viewport) {
            const scrollAmount = 320;
            viewport.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const renderDayEventsContent = (dayCellDate: Date): React.ReactNode => {
        const eventsOnDay = mockExecutiveCalendarEvents.filter(event => format(parseISO(event.date as unknown as string), 'yyyy-MM-dd') === format(dayCellDate, 'yyyy-MM-dd'));
        const isSelected = date && format(date, 'yyyy-MM-dd') === format(dayCellDate, 'yyyy-MM-dd');
        
        return (
            <div className="flex flex-col h-full w-full">
                <div className="flex items-start justify-between">
                    <div className={cn("text-lg font-bold", isSelected && "text-primary-foreground")}>
                        {format(dayCellDate, "d")}
                    </div>
                     {isToday(dayCellDate) && !isSelected && <Badge variant="secondary" className="text-xs">HOY</Badge>}
                </div>
                 <div className="flex-grow space-y-1 text-[10px] leading-tight mt-2 overflow-y-auto">
                  {eventsOnDay.map(event => {
                    const styles = SPECIFIC_EVENT_STYLES[event.title] || { bg: 'bg-muted', text: 'text-muted-foreground' };
                    return (
                        <div key={event.id} className={cn("px-1.5 py-0.5 rounded-sm cursor-pointer", styles.bg, styles.text)}>
                            <p className={cn("font-medium truncate", styles.text)}>{event.title}</p>
                        </div>
                    )
                  })}
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto py-8 px-4 space-y-8">
            <div className="mb-8">
                <Button asChild variant="link" className="text-muted-foreground hover:no-underline p-0 h-auto text-xs">
                    <Link href="/dashboard/bienestar" className="flex items-center gap-2 group">
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">Volver a Bienestar</span>
                    </Link>
                </Button>
            </div>

            <Card className="bg-foreground text-background rounded-2xl overflow-hidden shadow-lg">
                <div className="p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Portal para Gerentes</h1>
                    <p className="max-w-3xl text-background/80">
                        Bienvenido a su espacio exclusivo con información relevante, calendarios de pago y herramientas para la gestión de alto nivel.
                    </p>
                </div>
            </Card>

            {/* Banner Informativo */}
             <Card className="bg-primary text-primary-foreground">
              <CardHeader className="flex flex-row items-center gap-4">
                <Info className="h-6 w-6" />
                <CardTitle className="text-lg">Próxima Reunión de Directorio</CardTitle>
              </CardHeader>
              <CardContent>
                <p>La próxima reunión de directorio está programada para el <strong>15 de Julio de 2025 a las 9:00 AM</strong> en la Sala de Juntas Principal. La agenda será enviada por correo electrónico.</p>
              </CardContent>
            </Card>

            {/* Calendario de Pagos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Calendario de Pagos para Gerentes</CardTitle>
                            <CardDescription>Fechas clave de pagos y reuniones importantes.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="p-0"
                                defaultMonth={new Date(2025, 6, 1)}
                                locale={es}
                                renderDayContent={renderDayEventsContent}
                                classNames={{
                                  day: "h-32 w-full p-2 text-left align-top font-normal flex flex-col",
                                  head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
                                }}
                              />
                        </CardContent>
                    </Card>
                </div>

                {/* Menú Ejecutivo */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                     <Card className="flex-1 flex flex-col">
                        <CardHeader>
                           <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Menú Ejecutivo</CardTitle>
                                    <CardDescription>Opciones de almuerzo de la semana.</CardDescription>
                                </div>
                                <Utensils className="h-6 w-6 text-primary" />
                           </div>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col">
                           <div ref={menuScrollAreaRef} className="flex-grow">
                                <ScrollArea className="w-full h-full">
                                    <div className="flex flex-col gap-4">
                                        {mockExecutiveMenuItems.map((item) => (
                                            <MenuItemCard key={item.id} item={item} isCurrentDay={currentDayName === item.day} />
                                        ))}
                                    </div>
                                    <ScrollBar orientation="vertical" />
                                </ScrollArea>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 border-t pt-4">
                             <Button variant="outline" size="icon" onClick={() => handleMenuScroll('left')}>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleMenuScroll('right')}>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
