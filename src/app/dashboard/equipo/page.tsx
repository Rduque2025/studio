'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { mockEmployees, teamDepartments } from '@/lib/placeholder-data';
import { EmployeeCard } from '@/components/dashboard/employee-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="md:col-span-1">
                    <h1 className="text-4xl font-bold text-foreground">Nuestro Equipo</h1>
                </div>
                <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-start md:justify-end gap-4">
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 w-full sm:w-64"
                        />
                    </div>
                    <Select onValueChange={setActiveDepartment} defaultValue="Todos">
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filtrar por Área" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Todos">Todas las Áreas</SelectItem>
                            {teamDepartments.map(dept => (
                                <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            <p className="text-muted-foreground max-w-2xl mb-12">
                Trabajamos con un enfoque internacional, desafiante y vital. Nuestra ambición es desafiar, desarrollar y ser un ente de consulta creíble en todas nuestras colaboraciones.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                {filteredEmployees.map(employee => (
                    <EmployeeCard key={employee.id} employee={employee} />
                ))}
            </div>
        </div>
    );
}
