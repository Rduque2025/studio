
'use client';

import React, a { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getTeamMembers, type TeamMember } from '@/ai/flows/get-team-members-flow';
import { EmployeeCard } from '@/components/dashboard/employee-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const teamDepartments = [
    { id: "todos", name: "Todos" },
    { id: "lideres", name: "Líderes" },
    { id: "procesos", name: "PROCESOS" },
    { id: "defensa-asegurado", name: "DEFENSA DEL ASEGURADO" },
    { id: "auditoria", name: "AUDITORÍA" },
    { id: "comercial", name: "COMERCIAL" },
    { id: "cumplimiento", name: "CUMPLIMIENTO" },
    { id: "suscripcion-operaciones", name: "SUSCRIPCIÓN Y OPERACIONES" },
    { id: "capital-humano", name: "CAPITAL HUMANO" },
    { id: "control", name: "CONTROL" },
    { id: "consultoria-juridica", name: "CONSULTORÍA JURÍDICA" },
    { id: "tecnologia", name: "TECNOLOGÍA" },
    { id: "finanzas", name: "FINANZAS" },
];

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

    const filteredEmployees = useMemo(() => {
        let employees = allMembers;

        if (activeDepartment === 'Líderes') {
            employees = employees.filter(employee => employee.Tipo === 'Líderes');
        } else if (activeDepartment !== 'Todos') {
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
                          {activeDepartment === 'Líderes' ? 'Nuestros Líderes' : 'Nuestro Equipo'}
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
                            className="pl-9 w-full sm:w-64 text-xs"
                        />
                    </div>
                </div>
                 <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2">
                    {teamDepartments.map(dept => (
                        <Button
                            key={dept.id}
                            variant={activeDepartment === dept.name ? 'default' : 'ghost'}
                            size="sm"
                            className="rounded-full flex-shrink-0 text-xs"
                            onClick={() => setActiveDepartment(dept.name)}
                        >
                            {dept.name}
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
                        <EmployeeCard key={`${employee.Correo}-${index}`} employee={employee} />
                    ))
                )}
            </div>
        </div>
    );
}
