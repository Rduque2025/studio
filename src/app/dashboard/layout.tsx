"use client";

import React from "react";
import { Header } from "@/components/layout/header";
// import { Skeleton } from "@/components/ui/skeleton"; // No longer needed for auth loading

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Removed useAuth and related useEffect logic

  // Removed loading skeleton related to auth

  return (
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
  );
}
