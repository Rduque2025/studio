
'use client';

import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Clock, Network, Phone, Hospital } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PolizaHcmPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="lg:order-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Obtenga un Servicio Médico Rápido
            </h1>
            <p className="mt-6 text-muted-foreground text-lg max-w-lg">
              Acceda a su servicio médico con doctores certificados y profesionales a través de nuestra red.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="#">
                Consultar Póliza <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>

          <div className="lg:order-1 relative mt-12 lg:mt-0">
            <div className="relative z-10 w-full max-w-md mx-auto">
              <Image 
                src="https://images.unsplash.com/photo-1550831107-1553da8c8464?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3J8ZW58MHx8fHwxNzUyMzQ2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Doctora Profesional"
                width={500}
                height={600}
                className="rounded-lg object-cover object-top shadow-2xl"
                data-ai-hint="female doctor"
              />
            </div>

            <div className="absolute -bottom-16 left-0 right-0 z-20">
              <Card className="max-w-xl mx-auto bg-card/95 backdrop-blur-sm shadow-xl border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-grow">
                      <h4 className="font-bold text-lg">Servicio Médico Rápido</h4>
                      <p className="text-sm text-muted-foreground">Acceso a nuestra red de especialistas.</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Button variant="ghost" size="icon" className="bg-primary/10 hover:bg-primary/20">
                          <Hospital className="text-primary h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="bg-primary/10 hover:bg-primary/20">
                          <Clock className="text-primary h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button asChild className="pl-6 pr-4 h-full bg-foreground hover:bg-foreground/90 text-background">
                        <Link href="#">
                          Agendar Cita <ChevronRight className="ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
