
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { mockEmployees, teamDepartments } from '@/lib/placeholder-data';
import { EmployeeCard } from '@/components/dashboard/employee-card';
import { SectionWrapper } from '@/components/dashboard/section-wrapper';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function EquipoPage() {
    const [activeDepartment, setActiveDepartment] = useState('Todos');

    const filteredEmployees = useMemo(() => {
        if (activeDepartment === 'Todos') {
            return mockEmployees;
        }
        return mockEmployees.filter(employee => employee.department === activeDepartment);
    }, [activeDepartment]);

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <Button asChild variant="link" className="text-muted-foreground hover:no-underline p-0 h-auto text-xs">
                    <Link href="/dashboard/mapa-clientes" className="flex items-center gap-2 group">
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">Volver a Nosotros</span>
                    </Link>
                </Button>
            </div>

            <SectionWrapper
                title="Nuestro Fantástico Equipo"
                description="Conoce a las personas que trabajan día a día para hacer de Banesco Seguros la mejor opción."
            >
                <div className="flex justify-center flex-wrap gap-2 mb-12">
                    <Button
                        variant={activeDepartment === 'Todos' ? 'default' : 'ghost'}
                        onClick={() => setActiveDepartment('Todos')}
                        className="rounded-full text-xs"
                    >
                        Todos
                    </Button>
                    {teamDepartments.map(dept => (
                        <Button
                            key={dept.id}
                            variant={activeDepartment === dept.name ? 'default' : 'ghost'}
                            onClick={() => setActiveDepartment(dept.name)}
                            className="rounded-full text-xs"
                        >
                            {dept.name}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredEmployees.map(employee => (
                        <EmployeeCard key={employee.id} employee={employee} />
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
}
