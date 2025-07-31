"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { Chrome } from "lucide-react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { toast } = useToast();

  const handleAuthAction = async (action: "login" | "signup") => {
    setIsLoading(true);
    try {
      if (action === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: "Cuenta creada", description: "¡Bienvenido!" });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Inicio de sesión exitoso", description: "¡Bienvenido de vuelta!" });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        toast({ title: "Inicio de sesión con Google exitoso" });
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Error de autenticación con Google",
            description: error.message,
        });
    } finally {
        setIsGoogleLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Correo
          </Label>
          <Input
            id="email"
            placeholder="nombre@ejemplo.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading || isGoogleLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="password">
            Contraseña
          </Label>
          <Input
            id="password"
            placeholder="Contraseña"
            type="password"
            disabled={isLoading || isGoogleLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button disabled={isLoading || isGoogleLoading} onClick={() => handleAuthAction("login")}>
            {isLoading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            Iniciar Sesión
          </Button>
          <Button variant="outline" disabled={isLoading || isGoogleLoading} onClick={() => handleAuthAction("signup")}>
            Registrarse
          </Button>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-popover px-2 text-muted-foreground">
            O continuar con
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading || isGoogleLoading} onClick={handleGoogleSignIn}>
        {isGoogleLoading ? (
           <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <Chrome className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}
