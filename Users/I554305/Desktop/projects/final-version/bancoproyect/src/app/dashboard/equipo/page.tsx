
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getTeamMembers, type TeamMember } from '@/ai/flows/get-team-members-flow';
import { Input } from '@/components/ui/input';
import { Search, Mail, Phone, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function EquipoPage() {
    const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeDepartment, setActiveDepartment] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            setIsLoading(true);
            try {
                const members = await getTeamMembers();
                setAllMembers(members);
            } catch (error) {
                console.error("Error fetching team members:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMembers();
    }, []);

    const teamDepartments = useMemo(() => {
        if (isLoading) return [];
        const departments = new Set(allMembers.map(member => member.Area));
        return ['Todos', ...Array.from(departments)];
    }, [allMembers, isLoading]);

    const filteredEmployees = useMemo(() => {
        let employees = allMembers;

        if (activeDepartment !== 'Todos') {
            employees = employees.filter(employee => employee.Area === activeDepartment);
        }

        if (searchTerm) {
            employees = employees.filter(employee =>
                employee.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.Cargo.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        return employees;
    }, [activeDepartment, searchTerm, allMembers]);

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
                    <div className="max-w-xl">
                        <h1 className="text-5xl font-bold text-foreground">
                          Nuestro Equipo
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Trabajamos con un enfoque internacional, desafiante y vital. Nuestra ambición es desafiar, desarrollar y ser un ente de consulta creíble en todas nuestras colaboraciones.
                        </p>
                    </div>
                     <div className="relative w-full sm:w-auto self-start md:self-end">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 w-full sm:w-64 text-[11px]"
                        />
                    </div>
                </div>
                 <div className="flex flex-wrap items-center gap-2 mt-8">
                    {teamDepartments.map(dept => (
                        <Button
                            key={dept}
                            variant={activeDepartment === dept ? 'default' : 'ghost'}
                            size="sm"
                            className="rounded-full flex-shrink-0 text-xs h-7 px-3"
                            onClick={() => setActiveDepartment(dept)}
                        >
                            {dept}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                {isLoading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="flex flex-col">
                            <Skeleton className="w-full aspect-[4/5] rounded-lg mb-4" />
                            <Skeleton className="h-5 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))
                ) : (
                    filteredEmployees.map((employee, index) => (
                        <div key={`${employee.Correo}-${index}`} className="group flex flex-col">
                            <div className="relative w-full aspect-[4/5] overflow-hidden mb-4 bg-muted rounded-lg">
                                <Image
                                src={employee.ImageUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbnxlbnwwfHx8fDE3NTgwMjA4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080'}
                                alt={`Portrait of ${employee.Nombre}`}
                                layout="fill"
                                objectFit="cover"
                                data-ai-hint="person portrait"
                                className="transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="mt-2">
                                <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-foreground">{employee.Nombre}</h3>
                                    <p className="text-xs text-muted-foreground">{employee.Cargo}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted">
                                    <Plus className="h-4 w-4" />
                                </Button>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    {employee.Correo && (
                                        <a 
                                            href={`mailto:${employee.Correo}`}
                                            className={cn(
                                                "inline-flex items-center justify-center h-8 w-8 rounded-full",
                                                "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                                                "text-muted-foreground"
                                            )}
                                        >
                                            <Mail className="h-4 w-4" />
                                        </a>
                                    )}
                                    {employee.UrlContacto && employee.UrlContacto.startsWith('tel:') && (
                                        <a 
                                            href={employee.UrlContacto}
                                            className={cn(
                                                "inline-flex items-center justify-center h-8 w-8 rounded-full",
                                                "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                                                "text-muted-foreground"
                                            )}
                                        >
                                            <Phone className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
