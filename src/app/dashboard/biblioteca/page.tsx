

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
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
  Send,
  ArrowLeft,
  User,
  Info,
  MessageSquare,
  CheckCircle,
  Check,
  Music
} from "lucide-react";
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Music2 } from 'lucide-react';

const categories: { id: DocumentResource['category'], label: string, icon: LucideIcon }[] = [
    { id: "Destacados", label: "Destacados", icon: Star },
    { id: "Recursos Visuales", label: "Recursos Visuales", icon: ImageIcon },
    { id: "Herramientas", label: "Herramientas", icon: Code },
    { id: "Presentaciones", label: "Presentaciones", icon: Presentation },
    { id: "Manuales", label: "Manuales", icon: BookOpen },
    { id: "Documentos", label: "Documentos", icon: FileText },
    { id: "Videos", label: "Videos", icon: Video },
    { id: "Música", label: "Música", icon: Music },
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
    { id: "Bienestar", label: "Bienestar" },
];

const specialRequestAreas = [
    { id: 'Finanzas', name: 'Finanzas', email: 'gcia_nacional_finanzas_ve@banescoseguros.com' },
    { id: 'Capital Humano', name: 'Capital Humano', email: 'capital_humano_ve@banescoseguros.com' },
    { id: 'Mercadeo', name: 'Mercadeo', email: 'comunicaciones@banescoseguros.com' },
    { id: 'Procesos', name: 'Procesos', email: 'procesos@banescoseguros.com' },
    { id: 'Actuarial', name: 'Actuarial', email: 'gerencia_actuarial_ve@banescoseguros.com' },
    { id: 'Legal', name: 'Legal', email: 'bsv_consultoria_juridica@banescoseguros.com' },
];

const requestSteps = [
    { id: 1, title: 'Datos del Solicitante', description: 'Información personal', icon: User },
    { id: 2, title: 'Detalles del Recurso', description: 'Tipo y razón', icon: Info },
    { id: 3, title: 'Descripción Detallada', description: 'Explica lo que necesitas', icon: MessageSquare },
    { id: 4, title: 'Confirmación', description: 'Revisa y envía', icon: CheckCircle },
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
    const [selectedRequestArea, setSelectedRequestArea] = useState<(typeof specialRequestAreas)[0] | null>(null);
    const [requestType, setRequestType] = useState<'formal' | 'simple' | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        position: '',
        requestType: '',
        reason: '',
        details: '',
    });

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
    
    const handleCardClick = (docId: string, isPlaylist: boolean) => {
        if (isPlaylist) return; // Don't select playlists
        setSelectedDocIds(prevSelected => {
            if (prevSelected.includes(docId)) {
                return prevSelected.filter(id => id !== docId);
            } else {
                return [...prevSelected, docId];
            }
        });
    };

    const handleFormalRequest = () => {
        if (selectedRequestArea) {
            window.location.href = `mailto:${selectedRequestArea.email}`;
        }
    };

    const handleSimpleRequestSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Solicitud Enviada",
            description: "Tu solicitud simple ha sido registrada. La funcionalidad de guardado en Google Sheets está pendiente de implementación en el backend."
        });
        setIsSpecialRequestOpen(false);
        setSelectedRequestArea(null);
        setRequestType(null);
        setCurrentStep(1);
        setFormData({ fullName: '', position: '', requestType: '', reason: '', details: '' });
    };


    const selectedDocsForDialog = useMemo(() => 
        mockDocuments.filter(doc => selectedDocIds.includes(doc.id)), 
        [selectedDocIds]
    );

    const isEmailValid = recipientEmail.toLowerCase().endsWith('@banescoseguros.com');
    const handleStepChange = (step: number) => {
        if (step > 0 && step <= requestSteps.length) {
            setCurrentStep(step);
        }
    };
    
    const isStepComplete = (step: number) => {
        switch (step) {
            case 1: return formData.fullName !== '' && formData.position !== '';
            case 2: return formData.requestType !== '' && formData.reason !== '';
            case 3: return formData.details !== '';
            default: return false;
        }
    };


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex min-h-[calc(100vh-6rem)]">
                {/* Left Sidebar - Categories */}
                <aside className="w-64 flex-shrink-0 p-4 hidden md:block">
                    <div className="pt-20">
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
                    </div>
                </aside>
                <Separator orientation="vertical" className="h-auto hidden md:block" />
                {/* Main Content */}
                <main className="flex-1 p-8 flex flex-col">
                    <div className="py-4">
                        <div className="flex justify-end items-center mb-4">
                            <Dialog open={isSpecialRequestOpen} onOpenChange={(isOpen) => {
                                setIsSpecialRequestOpen(isOpen);
                                if (!isOpen) {
                                    setSelectedRequestArea(null);
                                    setRequestType(null);
                                    setCurrentStep(1);
                                    setFormData({ fullName: '', position: '', requestType: '', reason: '', details: '' });
                                }
                            }}>
                                <DialogTrigger asChild>
                                    <Button variant="destructive" size="sm" className="text-xs">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Solicitudes Especiales
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl p-0">
                                    <div className="grid md:grid-cols-12 min-h-[600px]">
                                        {/* Left Panel */}
                                        <div className="md:col-span-4 bg-muted/50 p-8 flex flex-col justify-between rounded-l-lg">
                                            <div>
                                                <DialogHeader className="text-left">
                                                    {selectedRequestArea ? (
                                                        <div className="flex items-start gap-3">
                                                            <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0 -ml-2" onClick={() => { setSelectedRequestArea(null); setRequestType(null); setCurrentStep(1); }}>
                                                                <ArrowLeft className="h-4 w-4"/>
                                                            </Button>
                                                            <div>
                                                                <DialogTitle>Solicitud para {selectedRequestArea.name}</DialogTitle>
                                                                <DialogDescription>
                                                                    {requestType === 'simple' 
                                                                        ? 'Siga los 4 pasos para completar su solicitud.' 
                                                                        : 'Elija el tipo de solicitud que desea realizar.'
                                                                    }
                                                                </DialogDescription>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <DialogTitle>Solicitud Especial</DialogTitle>
                                                            <DialogDescription>
                                                                Si no encuentra lo que busca, seleccione el área a la que desea realizar la solicitud.
                                                            </DialogDescription>
                                                        </div>
                                                    )}
                                                </DialogHeader>

                                                {requestType === 'simple' && (
                                                    <div className="mt-8">
                                                        {requestSteps.map((step, index) => {
                                                            const isCompleted = currentStep > step.id;
                                                            const isCurrent = currentStep === step.id;
                                                            return (
                                                                <div key={step.id} className="flex items-start gap-4 relative">
                                                                     {index < requestSteps.length - 1 && (
                                                                        <div
                                                                            className={cn(
                                                                                "absolute left-[15px] top-[32px] w-0.5 h-full transition-colors -z-10",
                                                                                isCompleted ? "bg-primary" : "bg-border"
                                                                            )}
                                                                        />
                                                                    )}
                                                                    <div className={cn(
                                                                        "relative w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0",
                                                                        isCompleted ? "bg-primary text-primary-foreground" :
                                                                        isCurrent ? "bg-primary text-primary-foreground ring-4 ring-background ring-offset-2 ring-offset-primary" :
                                                                        "bg-border text-muted-foreground"
                                                                    )}>
                                                                        {isCompleted ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{step.id}</span>}
                                                                    </div>
                                                                    <div className={cn("pb-8", index === requestSteps.length - 1 && "pb-0")}>
                                                                        <h4 className="font-semibold text-sm text-foreground">{step.title}</h4>
                                                                        <p className="text-xs text-muted-foreground">{step.description}</p>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                <p>Example with Steps UI</p>
                                            </div>
                                        </div>

                                        {/* Right Panel */}
                                        <div className="md:col-span-8 p-8 flex flex-col">
                                            {!selectedRequestArea ? (
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-auto">
                                                    {specialRequestAreas.map(area => (
                                                        <Card 
                                                            key={area.id} 
                                                            className="group flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                                                            onClick={() => setSelectedRequestArea(area)}
                                                        >
                                                            <h3 className="font-semibold text-sm">{area.name}</h3>
                                                        </Card>
                                                    ))}
                                                </div>
                                            ) : (
                                                <>
                                                    {requestType === null && (
                                                         <div className="my-auto space-y-4">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <Button variant="outline" size="lg" className="h-20" onClick={() => {setRequestType('formal'); handleFormalRequest();}}>
                                                                    <div className="flex flex-col items-center gap-2">
                                                                        <ExternalLink className="h-5 w-5" />
                                                                        <span className="text-sm">Solicitud Formal</span>
                                                                    </div>
                                                                </Button>
                                                                <Button size="lg" className="h-20" onClick={() => setRequestType('simple')}>
                                                                    <div className="flex flex-col items-center gap-2">
                                                                        <Send className="h-5 w-5" />
                                                                        <span className="text-sm">Solicitud Simple</span>
                                                                    </div>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {requestType === 'simple' && (
                                                        <form onSubmit={handleSimpleRequestSubmit} className="flex flex-col h-full">
                                                            <div className="flex-grow space-y-6">
                                                                {currentStep === 1 && (
                                                                    <div className="space-y-4">
                                                                        <h3 className="font-semibold text-lg">Datos del Solicitante</h3>
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="fullName">Nombre y Apellido</Label>
                                                                            <Input id="fullName" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="Ej: Ana Pérez" required />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="position">Cargo</Label>
                                                                            <Input id="position" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} placeholder="Ej: Analista de Suscripción" required />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {currentStep === 2 && (
                                                                    <div className="space-y-4">
                                                                        <h3 className="font-semibold text-lg">Detalles del Recurso</h3>
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="requestType">Tipo de Solicitud</Label>
                                                                            <Select required value={formData.requestType} onValueChange={value => setFormData({...formData, requestType: value})}>
                                                                                <SelectTrigger id="requestType"><SelectValue placeholder="Seleccione un tipo" /></SelectTrigger>
                                                                                <SelectContent>
                                                                                    <SelectItem value="Documento">Documento</SelectItem>
                                                                                    <SelectItem value="Manual">Manual</SelectItem>
                                                                                    <SelectItem value="Presentacion">Presentación</SelectItem>
                                                                                    <SelectItem value="Recurso Visual">Recurso Visual</SelectItem>
                                                                                    <SelectItem value="Video">Video</SelectItem>
                                                                                    <SelectItem value="Otro">Otro</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="reason">Razón de Solicitud</Label>
                                                                            <Textarea id="reason" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} placeholder="Describa brevemente por qué necesita este recurso" required />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {currentStep === 3 && (
                                                                    <div className="space-y-4">
                                                                        <h3 className="font-semibold text-lg">Descripción Detallada</h3>
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="details">Solicitud</Label>
                                                                            <Textarea id="details" value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} placeholder="Describa detalladamente el recurso que necesita" required rows={8} />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {currentStep === 4 && (
                                                                    <div className="space-y-4">
                                                                        <h3 className="font-semibold text-lg">Confirmación</h3>
                                                                        <p className="text-sm text-muted-foreground">Por favor, revise la información antes de enviar.</p>
                                                                        <Card className="bg-muted/50 p-4 space-y-2 text-sm">
                                                                            <p><strong>Área:</strong> {selectedRequestArea.name}</p>
                                                                            <p><strong>Nombre:</strong> {formData.fullName}</p>
                                                                            <p><strong>Cargo:</strong> {formData.position}</p>
                                                                            <p><strong>Tipo:</strong> {formData.requestType}</p>
                                                                            <p><strong>Razón:</strong> {formData.reason}</p>
                                                                            <p><strong>Detalles:</strong> {formData.details}</p>
                                                                        </Card>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <DialogFooter className="pt-8 mt-auto">
                                                                {currentStep > 1 && <Button type="button" variant="ghost" onClick={() => handleStepChange(currentStep - 1)}>Anterior</Button>}
                                                                {currentStep < requestSteps.length ? (
                                                                    <Button type="button" onClick={() => handleStepChange(currentStep + 1)} disabled={!isStepComplete(currentStep)}>Siguiente</Button>
                                                                ) : (
                                                                    <Button type="submit">Enviar Solicitud</Button>
                                                                )}
                                                            </DialogFooter>
                                                        </form>
                                                    )}
                                                </>
                                            )}
                                        </div>
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
                                    if (doc.category === 'Música') {
                                        return (
                                            <Link href={doc.linkUrl || '#'} key={doc.id} target="_blank" rel="noopener noreferrer" className="group block">
                                                <Card className="overflow-hidden rounded-lg border-none shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                                                    <div className="relative aspect-square w-full">
                                                        <Image
                                                            src={doc.imageUrl}
                                                            alt={`Portada de la playlist ${doc.title}`}
                                                            layout="fill"
                                                            objectFit="cover"
                                                            data-ai-hint={doc.dataAiHint}
                                                            className="transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <Button variant="ghost" size="icon" className="h-16 w-16 bg-white/20 text-white backdrop-blur-sm rounded-full hover:bg-white/30 hover:text-white">
                                                            <Music2 className="h-8 w-8" />
                                                            </Button>
                                                        </div>
                                                        <div className="absolute bottom-4 left-4 text-white">
                                                            <h3 className="font-bold text-lg">{doc.title}</h3>
                                                            <p className="text-xs text-white/90">{doc.description}</p>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Link>
                                        )
                                    }
                                    const categoryInfo = categories.find(c => c.id === doc.category) || categories.find(c => c.id === "Documentos");
                                    const Icon = categoryInfo!.icon;
                                    const isSelected = selectedDocIds.includes(doc.id);
                                    return (
                                        <Card 
                                            key={doc.id} 
                                            onClick={() => handleCardClick(doc.id, false)}
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

    
}
