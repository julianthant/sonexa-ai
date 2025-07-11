"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";

export function AuthHydration({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const { setHydrated } = useAuthStore();

  useEffect(() => {
    // Manually trigger hydration
    useAuthStore.persist.rehydrate();
    setHydrated();
    setIsHydrated(true);
  }, [setHydrated]);

  if (!isHydrated) {
    return (
      <div className="flex justify-center items-center bg-gray-50 min-h-screen">
        <div className="border-b-2 border-blue-600 rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
