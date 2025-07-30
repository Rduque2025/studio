
'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  Download,
  Eye,
  Briefcase,
  Scale,
  Megaphone,
  Users,
  GitFork,
  FileCheck2,
} from "lucide-react";
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';


const categories: { id: DocumentResource['category'], label: string, icon: LucideIcon }[] = [
    { id: "Destacados", label: "Destacados", icon: Star },
    { id: "Recursos Visuales", label: "Recursos Visuales", icon: ImageIcon },
    { id: "Herramientas", label: "Herramientas", icon: Code },
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
    const [activeCategory, setActiveCategory] = useState<DocumentResource['category']>('Destacados');
    const [activeArea, setActiveArea] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDocuments = useMemo(() => {
        let documents = mockDocuments;

        if (activeCategory !== 'Destacados') {
            documents = documents.filter(doc => doc.category === activeCategory);
        } else {
             documents = documents.filter(doc => doc.isFeatured);
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
        <div className="flex min-h-[calc(100vh-6rem)] bg-muted/50">
            {/* Left Sidebar - Categories */}
            <aside className="w-64 flex-shrink-0 p-4 hidden md:block">
                <nav className="flex flex-col space-y-1">
                    {categories.map(cat => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={cn(
                                    "flex items-center justify-between w-full p-3 rounded-lg text-left transition-colors relative",
                                    "hover:bg-muted"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                        isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                    )}>
                                        <Icon className="h-5 w-5 flex-shrink-0" />
                                    </div>
                                    <span className={cn(
                                        "font-medium text-xs",
                                        isActive ? "text-primary font-semibold" : "text-muted-foreground"
                                    )}>{cat.label}</span>
                                </div>
                                {isActive && <div className="absolute right-0 h-5 w-1 bg-primary rounded-full" />}
                            </button>
                        )
                    })}
                </nav>
            </aside>
            <Separator orientation="vertical" className="h-auto hidden md:block" />
            {/* Main Content */}
            <main className="flex-1 p-4 flex flex-col">
                <div className="pb-4">
                   <h1 className="text-2xl font-bold text-foreground">Biblioteca de Recursos</h1>
                   <p className="text-muted-foreground text-sm mt-1">Encuentre manuales, presentaciones y más, utilice los filtros para navegar por el contenido.</p>
                </div>

                <div className="py-4">
                    <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                        {areas.map(area => (
                            <Button
                                key={area.id}
                                variant={activeArea === area.id ? "secondary" : "ghost"}
                                size="sm"
                                className="rounded-full flex-shrink-0"
                                onClick={() => setActiveArea(area.id)}
                            >
                                <span className="text-xs">{area.label}</span>
                            </Button>
                        ))}
                    </div>
                </div>

                <Card className="flex-grow rounded-2xl shadow-sm p-6 flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
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
                            <span className="text-xs">Exportar</span>
                        </Button>
                    </div>

                    <div className="flex-grow overflow-auto -mx-2 px-2">
                         {filteredDocuments.length > 0 ? (
                           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                              {filteredDocuments.map(doc => {
                                  const categoryInfo = categories.find(c => c.id === doc.category) || categories.find(c => c.id === "Documentos");
                                  const Icon = categoryInfo!.icon;
                                  return (
                                    <Card key={doc.id} className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 shadow-sm hover:shadow-lg transition-shadow duration-300 border-none">
                                        <CardContent className="p-4">
                                            <div className="absolute top-4 right-4 p-2 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-lg">
                                                <Icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <h3 className="text-base font-semibold text-foreground pr-10">{doc.title}</h3>
                                        </CardContent>
                                        <CardContent className="p-4 pt-0">
                                            <div className="flex gap-2">
                                                <Badge variant="outline" className="text-xs">{doc.area}</Badge>
                                                <Badge variant="secondary" className="text-xs">{doc.category}</Badge>
                                            </div>
                                        </CardContent>
                                        <CardContent className="p-4 flex gap-2">
                                            <Button variant="outline" size="sm" className="w-full text-xs">
                                                <Eye className="mr-2 h-4 w-4" />
                                                Consultar
                                            </Button>
                                            <Button size="sm" className="w-full text-xs">
                                                <Download className="mr-2 h-4 w-4" />
                                                Descargar
                                            </Button>
                                        </CardContent>
                                    </Card>
                                  );
                              })}
                           </div>
                         ) : (
                            <div className="text-center py-16 text-muted-foreground">
                                <p>No se encontraron documentos para los filtros seleccionados.</p>
                            </div>
                         )}
                    </div>
                </Card>
            </main>
        </div>
    );
}
