"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";

export function AuthHydration({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Manually hydrate the auth store
    useAuthStore.persist.rehydrate();
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-b-2 border-blue-600 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
