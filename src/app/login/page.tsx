
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/contexts/auth-context";
import { Eye, EyeOff, Mail, KeyRound } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }).refine(
    (email) => email.endsWith("@banescoseguros.com"),
    { message: "El correo debe ser del dominio @banescoseguros.com" }
  ),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

 useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleCreateUser = async (data: LoginFormInputs) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Cuenta Creada Exitosamente",
        description: "Ahora puede iniciar sesión con sus credenciales.",
      });
      // Attempt to sign in the new user automatically or redirect to login to sign in manually
      // For simplicity, we'll let them sign in on the next attempt or refresh.
      // router.push("/dashboard"); // Optionally redirect to dashboard
    } catch (creationError: any) {
      toast({
        title: "Error al Crear Cuenta",
        description: creationError.message || "No se pudo crear la cuenta. Intente de nuevo o contacte al administrador.",
        variant: "destructive",
      });
      console.error("Creation error:", creationError);
    }
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Inicio de Sesión Exitoso",
        description: "Bienvenido de vuelta!",
      });
      router.push("/dashboard");
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // User not found, try to create an account if email is valid
        toast({
          title: "Usuario no encontrado",
          description: "Intentando crear una nueva cuenta...",
        });
        await handleCreateUser(data); // This will show its own toasts
      } else if (error.code === 'auth/wrong-password') {
        toast({
          title: "Error de Autenticación",
          description: "Contraseña incorrecta.",
          variant: "destructive",
        });
      } else if (error.code === 'auth/invalid-credential') {
         toast({
          title: "Error de Autenticación",
          description: "Credenciales inválidas. Verifique su email y contraseña.",
          variant: "destructive",
        });
      }
      else {
        toast({
          title: "Error de Autenticación",
          description: error.message || "Error al iniciar sesión. Verifique sus credenciales.",
          variant: "destructive",
        });
      }
      console.error("Login/Creation error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  if (authLoading || (!authLoading && user)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center space-y-2">
          <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" className="h-10 w-auto fill-primary">
              <text x="0" y="35" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="bold">Banesco</text>
              <text x="105" y="35" fontFamily="Arial, sans-serif" fontSize="30">Seguros</text>
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold">Portal de Gestión</CardTitle>
          <CardDescription>Ingrese sus credenciales para acceder al portal.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="su.email@banescoseguros.com"
                  {...register("email")}
                  className="pl-10"
                  aria-invalid={errors.email ? "true" : "false"}
                />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="pl-10 pr-10"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? "Procesando..." : "Ingresar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-center">
           <p className="mt-4 text-xs text-muted-foreground">
            Si tiene problemas para acceder, contacte al administrador.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Banesco Seguros.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

    