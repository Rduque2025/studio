
'use client';

import React, { useState, useMemo } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { mockDepartments, specialRequestAreas } from "@/lib/placeholder-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, PlusCircle, Mail, Phone, ArrowLeft, User, Info, MessageSquare, CheckCircle, Check, ExternalLink, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface DepartmentPageProps {
  params: { slug: string };
}

const requestSteps = [
    { id: 1, title: 'Datos del Solicitante', description: 'Información personal', icon: User },
    { id: 2, title: 'Detalles del Recurso', description: 'Tipo y razón', icon: Info },
    { id: 3, title: 'Descripción Detallada', description: 'Explica lo que necesitas', icon: MessageSquare },
    { id: 4, title: 'Confirmación', description: 'Revisa y envía', icon: CheckCircle },
];

const renderDepartmentContent = (department: (typeof mockDepartments)[0]) => {
  const defaultIcon = department.icon || AlertTriangle;
  switch (department.id) {
    case 'capital-humano':
      return (
        <>
          {department.requests?.map((req, index) => {
             const RequestIcon = req.icon || defaultIcon;
             return (
              <Card 
                  key={index} 
                  className="bg-card shadow-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 group cursor-pointer flex flex-col h-full"
                >
                <CardContent className="p-4 flex items-center justify-between flex-grow">
                  <div className="flex items-center gap-4 flex-grow min-w-0">
                      <div className="p-2 bg-muted rounded-md group-hover:bg-primary-foreground/10 flex-shrink-0">
                          <RequestIcon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div className="min-w-0">
                          <h3 className="font-semibold text-sm truncate">{req.title}</h3>
                          <p className="text-muted-foreground text-xs group-hover:text-primary-foreground/80 truncate">Haga clic para iniciar su gestión.</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      <span className="text-xs font-medium text-primary group-hover:text-primary-foreground">
                         {req.type === 'info' ? 'Consultar' : 'Solicitar'}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary-foreground transition-opacity" />
                  </div>
                </CardContent>
              </Card>
             )
          })}
        </>
      );
    case 'mercadeo':
        return (
            <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                <CardHeader>
                     <div className="p-2 bg-muted rounded-md w-fit">
                        <defaultIcon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Unidad de Mercadeo y Experiencia del Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground text-sm">
                    <p>
                        La Unidad de Mercadeo es el área encargada de difundir comunicaciones a toda la Organización y clientes externos, por ello la información de carácter masivo debe ser canalizada a través de este departamento.
                    </p>
                    <p>Dentro de las actividades que realiza el área se encuentran:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>SMS</li>
                        <li>Mailing</li>
                        <li>Comunicados</li>
                        <li>Entre Líneas</li>
                        <li>Redes Sociales</li>
                    </ul>
                    <p className="font-semibold text-foreground pt-4">Para hacer una solicitud, por favor llene el siguiente formulario:</p>
                     <Card className="border-dashed border-2 mt-4">
                        <CardContent className="p-6 text-center">
                            <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Formulario en Construcción</h3>
                            <p className="text-muted-foreground">
                            Estamos trabajando en el formulario de solicitud para esta unidad.
                            </p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        );
    case 'pmo':
        return (
            <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                <CardHeader>
                     <div className="p-2 bg-muted rounded-md w-fit">
                        <defaultIcon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Nivel de Prioridad - Unidad de Gestión de Proyectos (PMO)</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Prioridad</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Detalle / Observaciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-bold text-2xl text-center">1</TableCell>
                                <TableCell><Badge>Regulatorio</Badge></TableCell>
                                <TableCell>Presentar copia del oficio, gaceta o ley al que hace referencia.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold text-2xl text-center" rowSpan={2}>2</TableCell>
                                <TableCell><Badge variant="secondary">Aumento de volumen rentable</Badge></TableCell>
                                <TableCell>Exponer el cálculo de la cantidad de dinero que ingresa actualmente vs la que ingresará posterior a la puesta en producción de la solución tecnológica.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Badge variant="secondary">Mejor calidad de servicio</Badge></TableCell>
                                <TableCell>Descripción de la promesa de valor relacionado a la mejora de experiencia al cliente ofrecida con la implementación de la solución.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold text-2xl text-center">3</TableCell>
                                <TableCell><Badge variant="outline">Mitigar Riesgo</Badge></TableCell>
                                <TableCell>Número de hallazgo operativo identificado en la Matriz de Riesgo Operativo de la Organización asociado al requerimiento.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold text-2xl text-center" rowSpan={2}>4</TableCell>
                                <TableCell><Badge variant="destructive">Disminución de costos</Badge></TableCell>
                                <TableCell>Mostrar la proporción en que se beneficia el banco, con el desarrollo de la solución tecnológica.</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell><Badge variant="destructive">Mejora proceso interno</Badge></TableCell>
                                <TableCell>Descripción de la promesa de valor ofrecida en la mejora del proceso (reducción HH, mejoras operativas) con la implementación de la solución.</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )
    default:
      return (
        <Card className="border-dashed border-2 col-span-1 md:col-span-2 lg:col-span-3">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Página en Construcción</h3>
            <p className="text-muted-foreground">
              El contenido específico para <span className="font-medium text-foreground">{department.name}</span> está actualmente en desarrollo.
              <br />
              Por favor, vuelva más tarde.
            </p>
          </CardContent>
        </Card>
      );
  }
};


export default function DepartmentRequestPage({ params }: DepartmentPageProps) {
  const department = mockDepartments.find(d => d.id === params.slug);
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

  if (!department) {
    return (
      <div className="container mx-auto py-8 px-4">
        <SectionWrapper title="Departamento no encontrado">
          <p>El departamento que busca no existe.</p>
           <Button asChild variant="link" className="mt-4 text-muted-foreground hover:no-underline p-0 h-auto text-xs">
            <Link href="/dashboard/requerimientos" className="flex items-center gap-2 group">
               <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">Volver al portal</span>
            </Link>
          </Button>
        </SectionWrapper>
      </div>
    );
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
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div>
        <Button asChild variant="link" className="mb-6 text-muted-foreground hover:no-underline p-0 h-auto text-xs">
          <Link href="/dashboard/requerimientos" className="flex items-center gap-2 group">
            <span className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">Volver al portal de requerimientos</span>
          </Link>
        </Button>
      </div>

      <Card className="bg-foreground text-background rounded-2xl overflow-hidden">
         <div className="p-8 md:p-12 relative">
             <div className="absolute inset-0 bg-gradient-to-br from-foreground to-neutral-800 opacity-50"></div>
             <div className="relative">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{department.name}</h1>
                <p className="max-w-2xl text-background/80 mb-6 text-sm">{department.description}</p>
                 <div className="flex gap-4 items-center">
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
                                <PlusCircle className="mr-2 h-4 w-4" />
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
                    {department.id === 'capital-humano' && (
                       <>
                        <Button asChild variant="ghost" size="icon" className="text-background/80 hover:text-background hover:bg-white/10">
                          <Link href="mailto:capital_humano_ve@banescoseguros.com">
                              <Mail className="h-5 w-5" />
                              <span className="sr-only">Enviar correo a Capital Humano</span>
                          </Link>
                        </Button>
                        <Button asChild variant="ghost" size="icon" className="text-background/80 hover:text-background hover:bg-white/10">
                          <Link href="tel:+582125011111">
                              <Phone className="h-5 w-5" />
                              <span className="sr-only">Llamar a Capital Humano</span>
                          </Link>
                        </Button>
                      </>
                    )}
                </div>
             </div>
         </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderDepartmentContent(department)}
      </div>

    </div>
  );
}
