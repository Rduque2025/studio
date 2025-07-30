
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
  Check,
  FileSignature
} from "lucide-react";


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
    { id: "Comercial", label: "Comercial", icon: Briefcase },
    { id: "Suscripción", label: "Suscripción", icon: FileSignature },
    { id: "Legal", label: "Legal", icon: Scale },
    { id: "Mercadeo", label: "Mercadeo", icon: Megaphone },
    { id: "Capital Humano", label: "Capital Humano", icon: Users },
    { id: "Procesos", label: "Procesos", icon: Workflow },
    { id: "Actuarial", label: "Actuarial", icon: Calculator },
];


const FeaturedCard = ({ doc }: { doc: DocumentResource }) => (
    <Card className="relative w-full rounded-2xl overflow-hidden group text-white shadow-lg border-none col-span-1 md:col-span-1">
        <Image 
            src={doc.imageUrl}
            alt={doc.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={doc.dataAiHint}
            className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80">{doc.category}</p>
            <h3 className="text-lg font-bold mt-1">{doc.title}</h3>
        </div>
    </Card>
);

const ResourceCard = ({ doc }: { doc: DocumentResource }) => (
     <Card className="bg-card shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-2xl flex flex-col">
        <CardHeader className="p-0">
             <div className="relative w-full aspect-[16/9] rounded-t-2xl overflow-hidden">
                <Image 
                    src={doc.imageUrl}
                    alt={doc.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={doc.dataAiHint}
                />
            </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
            <p className="text-xs text-muted-foreground">{doc.area}</p>
            <h3 className="font-semibold text-sm mt-1">{doc.title}</h3>
        </CardContent>
    </Card>
);


export default function BibliotecaPage() {
    const [activeCategory, setActiveCategory] = useState('Destacados');
    const [activeArea, setActiveArea] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDocuments = useMemo(() => {
        let documents = mockDocuments;

        if (searchTerm) {
            documents = documents.filter(doc => 
                doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (activeCategory !== 'Destacados') {
            documents = documents.filter(doc => doc.category === activeCategory);
        } else {
             documents = documents.filter(doc => doc.isFeatured);
        }

        if (activeArea) {
            documents = documents.filter(doc => doc.area === activeArea);
        }

        return documents;

    }, [activeCategory, activeArea, searchTerm]);

    const featuredForHeader = mockDocuments.filter(doc => doc.isFeatured).slice(0, 3);

    return (
        <div className="min-h-screen bg-muted/50">
            <div className="grid lg:grid-cols-12 gap-6 p-4 lg:p-6 h-full">
                {/* Left Sidebar - Categories */}
                <aside className="lg:col-span-2 hidden lg:block">
                    <Card className="p-4 h-full shadow-sm">
                        <h3 className="font-semibold text-sm mb-4 px-2">Categorías</h3>
                        <nav className="space-y-1">
                            {categories.map(cat => {
                                const Icon = cat.icon;
                                const isActive = activeCategory === cat.id;
                                return (
                                    <Button 
                                        key={cat.id} 
                                        variant={isActive ? "secondary" : "ghost"}
                                        className="w-full justify-start gap-2 whitespace-normal h-auto text-sm"
                                        onClick={() => setActiveCategory(cat.id)}
                                    >
                                        <Icon className="h-4 w-4 flex-shrink-0" />
                                        <span>{cat.label}</span>
                                    </Button>
                                )
                            })}
                        </nav>
                    </Card>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-7">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-foreground">Biblioteca de Recursos</h1>
                        </div>
                        
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-lg font-semibold mb-2">Guía Rápida de la Biblioteca</h2>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Encuentra manuales, presentaciones y más. Usa los filtros para navegar por el contenido.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {featuredForHeader.map((doc, index) => (
                                        <div key={doc.id} className="flex items-start gap-4">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                0{index + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm">{doc.title}</h4>
                                                <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                                                    Ver ahora
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div>
                           <div className="mb-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                        placeholder="Buscar en la biblioteca..." 
                                        className="pl-9"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                           </div>
                           {filteredDocuments.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {filteredDocuments.map(doc => (
                                        <ResourceCard key={doc.id} doc={doc} />
                                    ))}
                                </div>
                           ) : (
                                <div className="text-center py-16 text-muted-foreground">
                                    <p>No se encontraron documentos para los filtros seleccionados.</p>
                                </div>
                           )}
                        </div>
                    </div>
                </main>

                {/* Right Sidebar - Areas */}
                <aside className="lg:col-span-3 hidden lg:block">
                    <Card className="p-4 h-full shadow-sm">
                        <h3 className="font-semibold text-sm mb-4 px-2">Áreas</h3>
                        <div className="space-y-2">
                           {areas.map(area => {
                               const isActive = activeArea === area.id;
                               return (
                                <div 
                                    key={area.id}
                                    onClick={() => setActiveArea(prev => prev === area.id ? null : area.id)}
                                    className={cn(
                                        "flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors",
                                        isActive ? "bg-primary/10" : "hover:bg-muted"
                                    )}
                                >
                                    <span className="text-sm font-medium text-foreground">{area.label}</span>
                                    {isActive && <Check className="h-4 w-4 text-primary" />}
                                </div>
                               )
                           })}
                        </div>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
