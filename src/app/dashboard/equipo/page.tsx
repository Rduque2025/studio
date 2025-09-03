
'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { mockEmployees, teamDepartments } from '@/lib/placeholder-data';
import { EmployeeCard } from '@/components/dashboard/employee-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function EquipoPage() {
    const [activeDepartment, setActiveDepartment] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEmployees = useMemo(() => {
        let employees = mockEmployees;

        if (activeDepartment !== 'Todos') {
            employees = employees.filter(employee => employee.department === activeDepartment);
        }

        if (searchTerm) {
            employees = employees.filter(employee =>
                employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.role.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        return employees;
    }, [activeDepartment, searchTerm]);

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
                    <div className="max-w-xl">
                        <h1 className="text-5xl font-bold text-foreground">Nuestro Equipo</h1>
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
                    <Button
                        variant={activeDepartment === 'Todos' ? 'default' : 'ghost'}
                        size="sm"
                        className="rounded-full flex-shrink-0 text-xs"
                        onClick={() => setActiveDepartment('Todos')}
                    >
                        Todos
                    </Button>
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
                {filteredEmployees.map(employee => (
                    <EmployeeCard key={employee.id} employee={employee} />
                ))}
            </div>
        </div>
    );
}
