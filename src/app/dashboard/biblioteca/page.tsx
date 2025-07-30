
'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockDocuments, type DocumentResource } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { 
  Star, 
  Video, 
  Presentation, 
  ImageIcon, 
  FileText, 
  BookOpen,
  Code,
  Search,
  Users,
  Briefcase,
  Scale,
  Megaphone,
  Workflow,
  Calculator,
  FileSignature,
  Download
} from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const categories = [
    { id: "Destacados", label: "Destacados", icon: Star },
    { id: "Recursos Visuales", label: "Recursos Visuales", icon: ImageIcon },
    { id: "Herramientas de Código", label: "Herramientas de Código", icon: Code },
    { id: "Presentaciones", label: "Presentaciones", icon: Presentation },
    { id: "Manuales", label: "Manuales", icon: BookOpen },
    { id: "Documentos", label: "Documentos", icon: FileText },
    { id: "Videos", label: "Videos", icon: Video },
];

const areas = [
    { id: "ALL", label: "Todos" },
    { id: "Comercial", label: "Comercial" },
    { id: "Suscripción", label: "Suscripción" },
    { id: "Legal", label: "Legal" },
    { id: "Mercadeo", label: "Mercadeo" },
    { id: "Capital Humano", label: "Capital Humano" },
    { id: "Procesos", label: "Procesos" },
    { id: "Actuarial", label: "Actuarial" },
];

export default function BibliotecaPage() {
    const [activeCategory, setActiveCategory] = useState('Destacados');
    const [activeArea, setActiveArea] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDocuments = useMemo(() => {
        let documents = mockDocuments;

        if (activeCategory === 'Destacados') {
            documents = documents.filter(doc => doc.isFeatured);
        } else {
            documents = documents.filter(doc => doc.category === activeCategory);
        }

        if (activeArea !== 'ALL') {
            documents = documents.filter(doc => doc.area === activeArea);
        }
        
        if (searchTerm) {
            documents = documents.filter(doc => 
                doc.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return documents;

    }, [activeCategory, activeArea, searchTerm]);


    return (
        <div className="flex min-h-[calc(100vh-6rem)] bg-muted/40">
            {/* Left Sidebar - Categories */}
            <aside className="w-64 flex-shrink-0 p-4">
                <div className="bg-card h-full rounded-2xl p-4 flex flex-col shadow-sm">
                    <h2 className="text-lg font-bold px-2 mb-4">Biblioteca</h2>
                    <nav className="space-y-2">
                        {categories.map(cat => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.id;
                            return (
                                <Button 
                                    key={cat.id} 
                                    variant={isActive ? "default" : "ghost"}
                                    className={cn(
                                      "w-full justify-start gap-3 text-sm",
                                      isActive && "shadow"
                                    )}
                                    onClick={() => setActiveCategory(cat.id)}
                                >
                                    <Icon className="h-4 w-4 flex-shrink-0" />
                                    <span>{cat.label}</span>
                                </Button>
                            )
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4">
                <Card className="h-full rounded-2xl shadow-sm p-6">
                    <div className="flex flex-col h-full">
                        <div className="border-b pb-4">
                           <h1 className="text-2xl font-bold text-foreground">Biblioteca de Recursos</h1>
                           <p className="text-muted-foreground text-sm mt-1">Encuentre manuales, presentaciones y más, utilice los filtros para navegar por el contenido.</p>
                        </div>
                        
                        <div className="py-4">
                            <div className="flex items-center gap-2 mb-4">
                                {areas.map(area => (
                                    <Button
                                        key={area.id}
                                        variant={activeArea === area.id ? "secondary" : "ghost"}
                                        size="sm"
                                        className="rounded-full"
                                        onClick={() => setActiveArea(area.id)}
                                    >
                                        {area.label}
                                    </Button>
                                ))}
                            </div>
                             <div className="flex items-center gap-4">
                                <div className="relative w-full">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                        placeholder="Buscar por nombre..." 
                                        className="pl-9"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Exportar
                                </Button>
                            </div>
                        </div>

                        <div className="flex-grow overflow-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nombre del Recurso</TableHead>
                                        <TableHead>Área</TableHead>
                                        <TableHead>Categoría</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredDocuments.map(doc => (
                                        <TableRow key={doc.id}>
                                            <TableCell className="font-medium">{doc.title}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{doc.area}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{doc.category}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">Ver</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {filteredDocuments.length === 0 && (
                               <div className="text-center py-16 text-muted-foreground">
                                    <p>No se encontraron documentos para los filtros seleccionados.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    );
}
