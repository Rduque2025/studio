
"use client";

import React from "react";
import { Header } from "@/components/layout/header";
import { EventsProvider } from "@/contexts/events-context"; // Import the provider
import { AuthProvider } from "@/contexts/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <EventsProvider> {/* Wrap with EventsProvider */}
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <footer className="py-6 md:px-8 md:py-0 border-t">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                &copy; {new Date().getFullYear()} Banesco Seguros. Todos los derechos reservados.
              </p>
            </div>
          </footer>
        </div>
      </EventsProvider>
    </AuthProvider>
  );
}
