
'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { mockDepartments, specialRequestAreas } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, LayoutGrid, Users, Megaphone, FolderKanban, MoreHorizontal, MoreVertical, Flag, ArrowRight, Briefcase, Shield, Scale, User, Info, MessageSquare, CheckCircle, Check, ExternalLink, Send } from "lucide-react";
import type { Department } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const categories = [
    { id: "ALL", name: "ALL", icon: LayoutGrid },
    { id: "Capital Humano", name: "Capital Humano", icon: Users },
    { id: "Comercial", name: "Comercial", icon: Briefcase },
    { id: "Legal", name: "Legal", icon: Scale },
    { id: "Seguridad", name: "Seguridad", icon: Shield },
    { id: "Proyectos", name: "Proyectos", icon: FolderKanban },
    { id: "Otros", name: "Otros", icon: MoreHorizontal }
];

const requestSteps = [
    { id: 1, title: 'Datos del Solicitante', description: 'Información personal', icon: User },
    { id: 2, title: 'Detalles del Recurso', description: 'Tipo y razón', icon: Info },
    { id: 3, title: 'Descripción Detallada', description: 'Explica lo que necesitas', icon: MessageSquare },
    { id: 4, title: 'Confirmación', description: 'Revisa y envía', icon: CheckCircle },
];

interface DepartmentCardProps {
  department: Department;
  isActive: boolean;
  onReportError: () => void;
}

const DepartmentCard = ({ department, isActive, onReportError }: DepartmentCardProps) => {
  const Icon = department.icon || MoreHorizontal;
  
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 flex flex-col text-left rounded-2xl h-full relative",
        "bg-card shadow-sm hover:shadow-xl hover:-translate-y-1",
        "hover:bg-primary hover:text-primary-foreground",
        isActive ? "shadow-xl ring-2 ring-primary" : "shadow-sm"
      )}
    >
      <CardContent className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-muted group-hover:bg-primary-foreground/20">
                  <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full group-hover:text-primary-foreground group-hover:hover:bg-primary-foreground/20"
                    onClick={handleDropdownClick}
                    >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" onClick={handleDropdownClick}>
                  <DropdownMenuItem onClick={onReportError}>
                    <Flag className="mr-2 h-4 w-4" />
                    <span>Reportar Error</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
          <div className="flex-grow">
            <p className="font-semibold mb-1">{department.name}</p>
            <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/80">{department.description}</p>
          </div>
          <div className="mt-4 text-right">
              <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary-foreground transition-opacity" />
          </div>
      </CardContent>
    </Card>
  );
};


export default function RequerimientosPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
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

  const filteredDepartments = activeCategory === 'ALL'
    ? mockDepartments
    : mockDepartments.filter(dept => dept.category === activeCategory);
    
  const handleReportError = () => {
    setIsReportDialogOpen(true);
  };

  const handleSendReport = () => {
    setIsReportDialogOpen(false);
    toast({
        title: "Reporte Enviado",
        description: "Gracias por tu feedback. Hemos recibido tu reporte y lo revisaremos pronto.",
    });
  }

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
    <div className="min-h-screen bg-transparent p-4 sm:p-6 md:p-8">
      <Card className="w-full rounded-3xl bg-transparent p-6 sm:p-8 flex flex-col border-none shadow-none">
        
        <header className="flex justify-end items-center mb-8">
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
        </header>

        <div className="flex-grow grid md:grid-cols-12 gap-8">
          
          <nav className="md:col-span-3 lg:col-span-2">
            <div className="flex flex-col space-y-1">
              {categories.map((category) => {
                const isActive = activeCategory === category.id;
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
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
                      )}>{category.name}</span>
                    </div>
                     {isActive && <div className="absolute right-0 h-5 w-1 bg-primary rounded-full" />}
                  </button>
                );
              })}
            </div>
          </nav>

          <Separator orientation="vertical" className="hidden md:block h-auto" />

           <div className="md:col-span-8 lg:col-span-9">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDepartments.map((dept) => {
                    const departmentDetails = mockDepartments.find(d => d.id === dept.id);
                    if (!departmentDetails) return null;
                    
                    const href = departmentDetails.directLink ? departmentDetails.directLink : `/dashboard/requerimientos/${departmentDetails.id}`;

                    return (
                        <Link href={href} key={dept.id} className="block h-full">
                           <DepartmentCard 
                                department={dept} 
                                isActive={activeCategory === dept.category}
                                onReportError={handleReportError}
                            />
                        </Link>
                    );
                })}
            </div>
          </div>
        </div>
      </Card>
      
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reportar un Error</DialogTitle>
            <DialogDescription>
              Ayúdanos a mejorar. Por favor, describe el problema que encontraste con esta tarjeta o sección.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea placeholder="Describe el error aquí..." rows={4} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSendReport}>Enviar Reporte</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
