
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
  password: z.string().min(4, { message: "La contraseña debe tener al menos 4 caracteres" }),
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

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      // Attempt 1: Sign in
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Inicio de Sesión Exitoso",
        description: "Bienvenido de vuelta!",
      });
      router.push("/dashboard");
    } catch (signInError: any) {
      if (signInError.code === 'auth/user-not-found') {
        // User not found, try to create an account
        toast({
          title: "Usuario no encontrado",
          description: "Creando nueva cuenta e iniciando sesión...",
        });
        try {
          // Attempt to create user
          await createUserWithEmailAndPassword(auth, data.email, data.password);
          // Creation successful, now sign in the new user
          await signInWithEmailAndPassword(auth, data.email, data.password);
          toast({
            title: "Cuenta Creada e Inicio de Sesión Exitoso",
            description: "Bienvenido!",
          });
          router.push("/dashboard");
        } catch (creationOrSecondSignInError: any) {
          let errTitle = "Error en el Proceso";
          let errDesc = creationOrSecondSignInError.message || "No se pudo completar el registro o inicio de sesión.";
          
          if (creationOrSecondSignInError.code === 'auth/email-already-in-use') {
            errTitle = "Correo ya Registrado";
            errDesc = "Este correo electrónico ya está en uso. Intente iniciar sesión.";
          } else if (creationOrSecondSignInError.code === 'auth/weak-password') {
            errTitle = "Contraseña Débil";
            errDesc = "La contraseña es demasiado débil. Firebase podría requerir una contraseña más larga (ej. 6+ caracteres).";
          } else if (creationOrSecondSignInError.code === 'auth/operation-not-allowed') {
            errTitle = "Operación no Permitida";
            errDesc = "La creación de usuarios por email/contraseña no está habilitada en Firebase.";
          } else if (creationOrSecondSignInError.code === 'auth/invalid-email') {
            errTitle = "Email Inválido";
            errDesc = "El formato del correo electrónico no es válido.";
          }

          toast({
            title: errTitle,
            description: errDesc,
            variant: "destructive",
          });
          console.error("Error durante creación o segundo intento de login:", creationOrSecondSignInError);
        }
      } else if (signInError.code === 'auth/wrong-password' || signInError.code === 'auth/invalid-credential') {
        toast({
          title: "Error de Autenticación",
          description: "Email o contraseña incorrecta. Verifique sus credenciales.",
          variant: "destructive",
        });
        console.error("Login error (wrong pass/invalid cred):", signInError);
      } else {
        toast({
          title: "Error de Autenticación",
          description: signInError.message || "Ocurrió un error al intentar iniciar sesión.",
          variant: "destructive",
        });
        console.error("Generic login error:", signInError);
      }
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
