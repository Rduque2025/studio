"use client";

import type { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useAuthListener() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => listener();
  }, []);

  return { user, loading };
}