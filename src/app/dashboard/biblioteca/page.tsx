
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
  Mail,
  Plus,
  ExternalLink,
  Send
} from "lucide-react";
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

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
    { id: "Finanzas", label: "Finanzas" },
    { id: "Legal", label: "Legal" },
    { id: "Mercadeo", label: "Mercadeo" },
    { id: "Capital Humano", label: "Capital Humano" },
    { id: "Procesos", label: "Procesos" },
    { id: "Actuarial", label: "Actuarial" },
];

const specialRequestAreas = [
    { id: 'Finanzas', name: 'Finanzas', email: 'gcia_nacional_finanzas_ve@banescoseguros.com' },
    { id: 'Capital Humano', name: 'Capital Humano', email: 'capital_humano_ve@banescoseguros.com' },
    { id: 'Mercadeo', name: 'Mercadeo', email: 'comunicaciones@banescoseguros.com' },
    { id: 'Procesos', name: 'Procesos', email: 'procesos@banescoseguros.com' },
    { id: 'Actuarial', name: 'Actuarial', email: 'gerencia_actuarial_ve@banescoseguros.com' },
    { id: 'Legal', name: 'Legal', email: 'bsv_consultoria_juridica@banescoseguros.com' },
];

export default function BibliotecaPage() {
    const [activeCategory, setActiveCategory] = useState<DocumentResource['category']>('Destacados');
    const [activeArea, setActiveArea] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isSendButtonExpanded, setIsSendButtonExpanded] = useState(false);
    const [isDownloadButtonExpanded, setIsDownloadButtonExpanded] = useState(false);
    const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
    const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
    const [recipientEmail, setRecipientEmail] = useState('');
    const [isSpecialRequestOpen, setIsSpecialRequestOpen] = useState(false);
    const [selectedRequestArea, setSelectedRequestArea] = useState<string | null>(null);
    const [requestType, setRequestType] = useState<'formal' | 'simple' | null>(null);

    const { toast } = useToast();

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
    
    const handleSendClick = () => {
        if (selectedDocIds.length > 0) {
            setIsSendDialogOpen(true);
        }
    };
    
    const handleSendEmail = () => {
        if (selectedDocIds.length === 0 || !recipientEmail) return;

        if (!recipientEmail.toLowerCase().endsWith('@banescoseguros.com')) {
            toast({
                title: "Correo no válido",
                description: "Por favor, utilice un correo con el dominio @banescoseguros.com",
                variant: "destructive",
            });
            return;
        }

        const selectedDocs = mockDocuments.filter(doc => selectedDocIds.includes(doc.id));
        if (selectedDocs.length > 0) {
            const subject = selectedDocs.length > 1 
                ? `Enlaces a ${selectedDocs.length} documentos`
                : `Enlace al documento: ${selectedDocs[0].title}`;
            
            const body = `Hola,\n\nAquí tienes el/los enlace(s) para ver el/los documento(s) solicitado(s):\n\n${selectedDocs.map(doc => `* "${doc.title}":\n  https://portal.banesco.com/biblioteca/${doc.id}`).join('\n\n')}\n\nSaludos.`;
            
            window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            setIsSendDialogOpen(false);
            setRecipientEmail('');
            setSelectedDocIds([]);
            
            toast({
                title: "Correo listo para enviar",
                description: `Se ha abierto tu cliente de correo para enviar ${selectedDocs.length > 1 ? `${selectedDocs.length} documentos` : `"${selectedDocs[0].title}"`}.`,
            });
        }
    };
    
    const handleCardClick = (docId: string) => {
        setSelectedDocIds(prevSelected => {
            if (prevSelected.includes(docId)) {
                return prevSelected.filter(id => id !== docId);
            } else {
                return [...prevSelected, docId];
            }
        });
    };

    const handleFormalRequest = () => {
        const area = specialRequestAreas.find(a => a.id === selectedRequestArea);
        if (area) {
            const subject = `Solicitud Formal de Recurso para ${area.name}`;
            const body = `Estimado equipo de ${area.name},\n\nEscribo para solicitar formalmente el siguiente recurso:\n\n[Describa detalladamente el recurso que necesita]\n\nGracias de antemano por su colaboración.\n\nSaludos cordiales,`;
            window.location.href = `mailto:${area.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
    };

    const handleSimpleRequestSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to a backend service that writes to Google Sheets.
        // For now, we'll just show a success message.
        toast({
            title: "Solicitud Enviada",
            description: "Tu solicitud simple ha sido registrada. La funcionalidad de guardado en Google Sheets está pendiente de implementación en el backend."
        });
        setIsSpecialRequestOpen(false);
        setSelectedRequestArea(null);
        setRequestType(null);
    };


    const selectedDocsForDialog = useMemo(() => 
        mockDocuments.filter(doc => selectedDocIds.includes(doc.id)), 
        [selectedDocIds]
    );

    const isEmailValid = recipientEmail.toLowerCase().endsWith('@banescoseguros.com');


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex min-h-[calc(100vh-6rem)]">
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
                <main className="flex-1 p-8 flex flex-col">
                    <div className="py-4">
                        <div className="flex justify-end items-center mb-4">
                            <Dialog open={isSpecialRequestOpen} onOpenChange={setIsSpecialRequestOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="destructive" size="sm" className="text-xs">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Solicitudes Especiales
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Solicitud Especial de Recurso</DialogTitle>
                                        <DialogDescription>
                                            Si no encuentras lo que buscas, puedes realizar una solicitud al área correspondiente.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4 space-y-4">
                                        <div className="space-y-2">
                                            <Label>Área a la que solicita</Label>
                                            <Select onValueChange={(value) => { setSelectedRequestArea(value); setRequestType(null); }}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione un área" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {specialRequestAreas.map(area => (
                                                        <SelectItem key={area.id} value={area.id}>{area.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {selectedRequestArea && (
                                            <div className="pt-4 space-y-4">
                                                <p className="text-sm font-medium">Elija el tipo de solicitud:</p>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Button variant="outline" onClick={() => {setRequestType('formal'); handleFormalRequest();}}>
                                                        <ExternalLink className="mr-2 h-4 w-4" />
                                                        Solicitud Formal
                                                    </Button>
                                                    <Button onClick={() => setRequestType('simple')}>
                                                        <Send className="mr-2 h-4 w-4" />
                                                        Solicitud Simple
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        {requestType === 'simple' && (
                                            <form onSubmit={handleSimpleRequestSubmit} className="pt-4 border-t mt-4 space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="fullName">Nombre y Apellido</Label>
                                                    <Input id="fullName" placeholder="Ej: Ana Pérez" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="position">Cargo</Label>
                                                    <Input id="position" placeholder="Ej: Analista de Suscripción" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="requestType">Tipo de Solicitud</Label>
                                                    <Select required>
                                                        <SelectTrigger id="requestType">
                                                            <SelectValue placeholder="Seleccione un tipo" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Documento">Documento</SelectItem>
                                                            <SelectItem value="Manual">Manual</SelectItem>
                                                            <SelectItem value="Presentacion">Presentacion</SelectItem>
                                                            <SelectItem value="Recurso Visual">Recurso Visual</SelectItem>
                                                            <SelectItem value="Video">Video</SelectItem>
                                                            <SelectItem value="Otro">Otro</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="reason">Razón de Solicitud</Label>
                                                    <Textarea id="reason" placeholder="Describa brevemente por qué necesita este recurso" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="details">Solicitud</Label>
                                                    <Textarea id="details" placeholder="Describa detalladamente el recurso que necesita" required />
                                                </div>
                                                <DialogFooter className="pt-4">
                                                    <Button type="submit">Enviar Solicitud Simple</Button>
                                                </DialogFooter>
                                            </form>
                                        )}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
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

                    <Card className="flex-grow rounded-2xl flex flex-col bg-transparent border-none">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div 
                                    className="relative flex items-center"
                                    onMouseEnter={() => setIsSearchExpanded(true)}
                                    onMouseLeave={() => setIsSearchExpanded(false)}
                                >
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                                    <Input 
                                        placeholder="Buscar..." 
                                        className={cn(
                                            "pl-9 transition-all duration-300 ease-in-out",
                                            isSearchExpanded ? "w-64 opacity-100" : "w-10 opacity-0"
                                        )}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div
                                    className="relative flex items-center"
                                    onMouseEnter={() => setIsSendButtonExpanded(true)}
                                    onMouseLeave={() => setIsSendButtonExpanded(false)}
                                >
                                    <Button
                                        variant="ghost"
                                        onClick={handleSendClick}
                                        disabled={selectedDocIds.length === 0}
                                        className={cn(
                                            "transition-all duration-300 ease-in-out flex items-center justify-start",
                                            "disabled:opacity-50",
                                            isSendButtonExpanded ? "w-28" : "w-10 px-0"
                                        )}
                                    >
                                        <Mail className={cn("h-4 w-4", isSendButtonExpanded && "mr-2")} />
                                        <span className={cn(
                                            "text-xs transition-opacity duration-200",
                                            isSendButtonExpanded ? "opacity-100" : "opacity-0"
                                        )}>
                                            Enviar
                                        </span>
                                    </Button>
                                </div>
                                <div
                                    className="relative flex items-center"
                                    onMouseEnter={() => setIsDownloadButtonExpanded(true)}
                                    onMouseLeave={() => setIsDownloadButtonExpanded(false)}
                                >
                                    <Button
                                        variant="ghost"
                                        disabled={selectedDocIds.length === 0}
                                        className={cn(
                                            "transition-all duration-300 ease-in-out flex items-center justify-start",
                                            "disabled:opacity-50",
                                            isDownloadButtonExpanded ? "w-32" : "w-10 px-0"
                                        )}
                                    >
                                        <Download className={cn("h-4 w-4", isDownloadButtonExpanded && "mr-2")} />
                                        <span className={cn(
                                            "text-xs transition-opacity duration-200",
                                            isDownloadButtonExpanded ? "opacity-100" : "opacity-0"
                                        )}>
                                            Descargar
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow overflow-auto -mx-2 px-2 py-4">
                            {filteredDocuments.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredDocuments.map(doc => {
                                    const categoryInfo = categories.find(c => c.id === doc.category) || categories.find(c => c.id === "Documentos");
                                    const Icon = categoryInfo!.icon;
                                    const isSelected = selectedDocIds.includes(doc.id);
                                    return (
                                        <Card 
                                            key={doc.id} 
                                            onClick={() => handleCardClick(doc.id)}
                                            className={cn(
                                                "group relative flex flex-col justify-between overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer text-foreground",
                                                isSelected 
                                                    ? "scale-105 bg-gradient-to-br from-primary to-blue-400 text-primary-foreground"
                                                    : "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50"
                                            )}
                                        >
                                            <CardContent className="p-3 flex flex-col flex-grow">
                                                <div className={cn(
                                                    "absolute top-4 right-4 p-2 rounded-lg",
                                                    isSelected ? "bg-white/20 backdrop-blur-sm" : "bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                                                )}>
                                                    <Icon className={cn("h-5 w-5", isSelected ? "text-primary-foreground" : "text-primary")} />
                                                </div>
                                                <h3 className="text-sm font-semibold pr-10 mb-4">{doc.title}</h3>
                                                
                                                <div className="flex-grow" />
                                                
                                                <div className="flex gap-2 mb-4">
                                                    <Badge variant={isSelected ? "secondary" : "outline"} className={cn("text-xs", isSelected && "bg-white/20 text-white")}>{doc.area}</Badge>
                                                    <Badge variant="secondary" className={cn("text-xs", isSelected && "bg-white/20 text-white")}>{doc.category}</Badge>
                                                </div>
                                                
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant={isSelected ? "secondary" : "outline"} size="sm" className="group/button flex-grow justify-center text-xs transition-all duration-300">
                                                        <Eye className="h-4 w-4" />
                                                        <span className="w-0 opacity-0 group-hover/button:w-auto group-hover/button:opacity-100 group-hover/button:ml-2 transition-all">Consultar</span>
                                                    </Button>
                                                    <Button size="sm" className={cn("group/button flex-grow justify-center text-xs transition-all duration-300", isSelected && "bg-white/90 hover:bg-white text-primary")}>
                                                        <Download className="h-4 w-4" />
                                                        <span className="w-0 opacity-0 group-hover/button:w-auto group-hover/button:opacity-100 group-hover/button:ml-2 transition-all">Descargar</span>
                                                    </Button>
                                                </div>
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

                <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Enviar Documento(s) por Correo</DialogTitle>
                            <DialogDescription>
                            Se enviará(n) enlace(s) al/los siguiente(s) documento(s):{' '}
                            {selectedDocsForDialog.map((doc, index) => (
                                    <span key={doc.id} className="font-semibold">
                                        "{doc.title}"{index < selectedDocsForDialog.length - 1 ? ', ' : ''}
                                    </span>
                                ))}.
                            Por favor, introduzca el correo del destinatario. Solo se permiten correos del dominio @banescoseguros.com.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Correo
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="destinatario@banescoseguros.com"
                                    className="col-span-3"
                                    value={recipientEmail}
                                    onChange={(e) => setRecipientEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsSendDialogOpen(false)}>Cancelar</Button>
                            <Button onClick={handleSendEmail} disabled={!isEmailValid}>Enviar Correo</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );

    