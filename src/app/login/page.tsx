
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email.toLowerCase().endsWith('@banescoseguros.com')) {
      toast({
        title: "Correo no válido",
        description: "Por favor, utilice un correo con el dominio @banescoseguros.com",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      if (isLoginView) {
        await login(email, password);
        toast({ title: "Inicio de sesión exitoso", description: "Bienvenido de nuevo." });
      } else {
        if (password !== confirmPassword) {
          throw new Error("Las contraseñas no coinciden.");
        }
        await register(email, password);
        toast({ title: "Registro exitoso", description: "Ahora puedes iniciar sesión." });
        setIsLoginView(true);
      }
    } catch (error) {
      toast({
        title: "Error de autenticación",
        description: error instanceof Error ? error.message : "Ocurrió un error inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">
              {isLoginView ? "Iniciar Sesión" : "Crear Cuenta"}
            </h1>
            <p className="text-balance text-muted-foreground">
              {isLoginView
                ? "Introduce tu correo y contraseña para acceder al portal."
                : "Introduce tus datos para registrarte."}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                type="email"
                placeholder="nombre@banescoseguros.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {!isLoginView && (
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoginView ? "Iniciar Sesión" : "Registrarse"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {isLoginView ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
            <button
              onClick={() => setIsLoginView(!isLoginView)}
              className="underline"
            >
              {isLoginView ? "Regístrate" : "Inicia sesión"}
            </button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://images.unsplash.com/photo-1542349314-b0ceb4d90f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxudWJlc3xlbnwwfHx8fDE3NTI2MDU1MDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Imagen de fondo del portal Banesco"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.3]"
          data-ai-hint="clear sky"
        />
      </div>
    </div>
  );
}
