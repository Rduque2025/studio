
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

// Simulación de una llamada a una API (Google Apps Script)
const mockApi = {
  // En un caso real, esto consultaría Google Sheets
  users: new Map<string, string>([
      // Puedes añadir usuarios de prueba aquí si lo necesitas
      // ['test@banescoseguros.com', 'password123']
  ]),

  async register(email: string, password: string): Promise<{ success: boolean; message: string }> {
    console.log(`(Simulado) Registrando usuario: ${email}`);
    // Aquí iría la llamada fetch a tu URL de Apps Script con method: 'POST' y un body con { action: 'register', email, password }
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.users.has(email)) {
          resolve({ success: false, message: 'El usuario ya existe.' });
        } else {
          this.users.set(email, password);
          console.log('(Simulado) Usuarios actuales:', this.users);
          resolve({ success: true, message: 'Usuario registrado con éxito.' });
        }
      }, 1000);
    });
  },
  
  async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    console.log(`(Simulado) Intentando iniciar sesión con: ${email}`);
    // Aquí iría la llamada fetch a tu URL de Apps Script con method: 'POST' y un body con { action: 'login', email, password }
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.users.has(email) && this.users.get(email) === password) {
          resolve({ success: true, message: 'Inicio de sesión correcto.' });
        } else {
          resolve({ success: false, message: 'Correo o contraseña incorrectos.' });
        }
      }, 1000);
    });
  },
};


interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Comprobar si hay una sesión guardada
    const sessionEmail = sessionStorage.getItem('userEmail');
    if (sessionEmail) {
      setIsAuthenticated(true);
      setUserEmail(sessionEmail);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await mockApi.login(email, password);
    if (response.success) {
      setIsAuthenticated(true);
      setUserEmail(email);
      sessionStorage.setItem('userEmail', email);
      router.push('/dashboard');
    } else {
      throw new Error(response.message);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    sessionStorage.removeItem('userEmail');
    router.push('/login');
  };

  const register = async (email: string, password: string) => {
    const response = await mockApi.register(email, password);
    if (!response.success) {
      throw new Error(response.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, userEmail, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};


export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center space-y-2">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-muted-foreground">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
