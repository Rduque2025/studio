
'use client';

import React, { useState, useEffect } from 'react';
import { getTeamMembers, type TeamMember } from '@/ai/flows/get-team-members-flow';
import { EmployeeCard } from '@/components/dashboard/employee-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function EquipoPage() {
    const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
                <h1 className="text-5xl font-bold text-foreground">
                  Nuestro Equipo
                </h1>
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
                    allMembers.map((employee, index) => (
                        <EmployeeCard key={`${employee.Correo}-${index}`} employee={employee} />
                    ))
                )}
            </div>
        </div>
    );
}
