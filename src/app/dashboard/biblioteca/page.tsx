
'use client';

import React, { useState } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Search, Star, Book, Video, Presentation, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockDocuments, type DocumentResource } from '@/lib/placeholder-data';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const featuredDocuments = mockDocuments.filter(doc => doc.isFeatured);

const categories = [
    { id: "destacados", label: "Destacados", icon: Star },
    { id: "manuales", label: "Manuales", icon: Book },
    { id: "presentaciones", label: "Presentaciones", icon: Presentation },
    { id: "documentos", label: "Documentos", icon: FileText },
    { id: "videos", label: "Videos", icon: Video },
    { id: "recursos-visuales", label: "Recursos Visuales", icon: ImageIcon },
];

const FeaturedCard = ({ doc }: { doc: DocumentResource }) => (
    <Card className="relative w-full h-80 rounded-2xl overflow-hidden group text-white shadow-lg border-none">
        <Image 
            src={doc.imageUrl}
            alt={doc.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={doc.dataAiHint}
            className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80">{doc.category}</p>
            <h3 className="text-2xl font-bold mt-1">{doc.title}</h3>
            <Button variant="outline" className="mt-4 w-fit bg-white/10 text-white backdrop-blur-sm border-white/20 hover:bg-white/20">
                Ver Documento
            </Button>
        </div>
    </Card>
);

const ResourceCard = ({ doc }: { doc: DocumentResource }) => (
     <Card className="relative w-full h-80 rounded-2xl overflow-hidden group text-white shadow-lg border-none">
        <Image 
            src={doc.imageUrl}
            alt={doc.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={doc.dataAiHint}
            className="transition-transform duration-300 group-hover:scale-105"
        />
         <div 
            className="absolute inset-0" 
            style={{backgroundColor: doc.bgColor, mixBlendMode: 'multiply', opacity: 0.8}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/90">{doc.category}</p>
            <h3 className="text-xl font-bold mt-1">{doc.title}</h3>
            <p className="mt-4 text-sm font-semibold text-white/90">
                Leer ahora
            </p>
        </div>
    </Card>
)


export default function BibliotecaPage() {
    const [activeTab, setActiveTab] = useState('destacados');

    const getFilteredDocuments = () => {
        if (activeTab === 'destacados') {
            return mockDocuments.filter(doc => doc.isFeaturedInGrid);
        }
        if (activeTab === 'recursos-visuales') {
            // Special case for visual resources which might include multiple categories
            return mockDocuments.filter(doc => ['Video', 'Presentación'].includes(doc.category));
        }
        const formattedTab = activeTab.slice(0, -1); // manuales -> manual
        return mockDocuments.filter(doc => doc.category.toLowerCase().startsWith(formattedTab));
    };

    const filteredDocuments = getFilteredDocuments();

  return (
    <div className="container mx-auto py-8 px-4">
      <SectionWrapper 
        title="Biblioteca de Recursos"
        description="Aprende de todo, desde historias de éxito de clientes hasta información de productos y puntos de vista del equipo."
        headerClassName="text-left items-start"
        titleClassName="text-4xl md:text-5xl"
        descriptionClassName="text-left max-w-2xl mx-0"
      >
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredDocuments.map(doc => (
                <FeaturedCard key={doc.id} doc={doc} />
            ))}
        </div>
      </SectionWrapper>

      <div className="my-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 bg-transparent p-0">
            {categories.map(cat => {
                const Icon = cat.icon;
                return (
                    <TabsTrigger 
                        key={cat.id} 
                        value={cat.id}
                        className="flex items-center gap-2 text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent relative"
                    >
                         <Icon className="h-4 w-4" />
                        <span>{cat.label}</span>
                        {activeTab === cat.id && (
                            <div className="absolute bottom-[-10px] left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </TabsTrigger>
                )
            })}
          </TabsList>
           <div className="mt-12">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredDocuments.map(doc => (
                    <ResourceCard key={doc.id} doc={doc} />
                  ))}
                </div>
           </div>
        </Tabs>
      </div>
    </div>
  );
}
