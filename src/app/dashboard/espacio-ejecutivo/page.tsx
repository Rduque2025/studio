
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockExecutiveCalendarEvents, mockExecutiveMenuItems } from '@/lib/placeholder-data';
import { Calendar } from "@/components/ui/calendar";
import { format, isToday, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronLeft, ChevronRight, Info, Heart, Award, CheckCircle, Lightbulb, Bell, ArrowRight } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from '@/components/ui/badge';
import type { CalendarEvent } from '@/contexts/events-context';
import type { MenuItem } from '@/lib/placeholder-data';

const SPECIFIC_EVENT_STYLES: { [title: string]: { bg: string; text: string } } = {
  "Bono Gerencial": { bg: 'bg-primary', text: 'text-primary-foreground' },
  "Pago Quincena": { bg: 'bg-emerald-500', text: 'text-white' },
  "Reunión de Directorio": { bg: 'bg-rose-500', text: 'text-white' },
  "Presentación Resultados Q3": { bg: 'bg-sky-500', text: 'text-white' },
};

export default function EspacioEjecutivoPage() {
    const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 1));
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [todaysMenu, setTodaysMenu] = useState<MenuItem | null>(null);

    useEffect(() => {
        const dayName = new Date().toLocaleString('es-ES', { weekday: 'long' });
        const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
        const menuItem = mockExecutiveMenuItems.find(item => item.day === capitalizedDayName) || null;
        setTodaysMenu(menuItem);
    }, []);


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
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">Volver al Inicio</span>
                    </Link>
                </Button>
            </div>

            <Card className="relative rounded-2xl overflow-hidden shadow-lg min-h-[500px] flex items-center justify-center">
                <Image
                    src="https://images.unsplash.com/photo-1504119089809-1d5100a33f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxidWlsZGluZ3N8ZW58MHx8fHwxNzU2ODQ1MzAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Espacio Ejecutivo"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="modern buildings"
                    className="brightness-[0.4]"
                />
                <div className="relative z-10 text-center text-white p-8 max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-extrabold">Bienvenido al Espacio Ejecutivo</h2>
                    <p className="mt-4 text-base text-white/90">
                        Un portal exclusivo con recursos y herramientas para el liderazgo y la toma de decisiones.
                    </p>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="group relative rounded-2xl overflow-hidden shadow-lg h-[450px] flex flex-col justify-end">
                    <Image src="https://images.unsplash.com/photo-1704423846283-f92ff6badea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMXx8Y29ycG9yYXRpdmV8ZW58MHx8fHwxNzU2ODQ1NDIyfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Actividades Exclusivas" layout="fill" objectFit="cover" data-ai-hint="exclusive workshop" className="transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
                    <CardContent className="relative z-10 p-6 text-white">
                        <h3 className="text-2xl font-bold">Actividades Exclusivas</h3>
                        <p className="text-sm text-white/80 mt-2">Participe en workshops y eventos de networking diseñados para el liderazgo.</p>
                        <Button variant="secondary" className="mt-4 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">Ver más <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </CardContent>
                </Card>
                <Card className="group relative rounded-2xl overflow-hidden shadow-lg h-[450px] flex flex-col justify-end">
                    <Image src="https://images.unsplash.com/photo-1553729784-e91953dec042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxMRUNUVVJBfGVufDB8fHx8MTc1Njg1MDc0OXww&ixlib=rb-4.1.0&q=80&w=1080" alt="Artículos de Liderazgo" layout="fill" objectFit="cover" data-ai-hint="leadership articles" className="transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
                    <CardContent className="relative z-10 p-6 text-white">
                        <h3 className="text-2xl font-bold">Artículos de Liderazgo</h3>
                        <p className="text-sm text-white/80 mt-2">Acceda a contenido seleccionado sobre gestión de equipos y estrategia.</p>
                        <Button variant="secondary" className="mt-4 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">Explorar <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </CardContent>
                </Card>
                <Card className="group relative rounded-2xl overflow-hidden shadow-lg h-[450px] flex flex-col justify-end">
                    <Image src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxDSEFSVFN8ZW58MHx8fHwxNzU2ODUwOTU3fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Recordatorios Clave" layout="fill" objectFit="cover" data-ai-hint="calendar reminders" className="transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
                    <CardContent className="relative z-10 p-6 text-white">
                        <h3 className="text-2xl font-bold">Recordatorios Clave</h3>
                        <p className="text-sm text-white/80 mt-2">Reunión de Directorio: <strong>15 de Julio, 9:00 AM</strong>. No olvide revisar la agenda.</p>
                        <Button variant="secondary" className="mt-4 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">Ver agenda <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </CardContent>
                </Card>
            </div>

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
                     <Card className="flex-1 flex flex-col overflow-hidden">
                        <CardContent className="flex-grow p-0">
                           {todaysMenu ? (
                                <div className="relative h-full w-full">
                                    <Image 
                                        src={todaysMenu.imageUrl}
                                        alt={todaysMenu.name}
                                        layout="fill"
                                        objectFit="cover"
                                        data-ai-hint={todaysMenu.dataAiHint}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                                    <div className="absolute top-0 left-0 p-6 text-white">
                                        <CardTitle className="text-lg">Menú del Día</CardTitle>
                                        <CardDescription className="text-white/80 text-xs">Opción ejecutiva para hoy.</CardDescription>
                                    </div>
                                    <div className="absolute bottom-0 left-0 p-6 text-white">
                                        <Badge variant="secondary" className="mb-2 bg-white/20 backdrop-blur-sm">{todaysMenu.price}</Badge>
                                        <h3 className="text-xl font-bold">{todaysMenu.name}</h3>
                                        <p className="text-xs text-white/80 mt-1">{todaysMenu.description}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                                    <CardTitle>Menú del Día</CardTitle>
                                    <CardDescription>Opción ejecutiva para hoy.</CardDescription>
                                    <div className="flex-grow flex items-center justify-center">
                                      <div>
                                        <p className="font-semibold">No hay menú ejecutivo disponible hoy.</p>
                                        <p className="text-sm">Por favor, revise mañana.</p>
                                      </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
