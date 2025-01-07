"use client";

import { useEffect } from "react";
import { analyticsInstance } from "@/lib/analytics";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    analyticsInstance.init({
      debug: true,
      apiEndpoint: "http://localhost:3000/api",
      sessionTimeout: 30000,
      storageType: "localStorage",
      apiKey: "test121124",
      retry: {
        maxAttempts: 2,
        initialDelay: 1000,
        maxDelay: 3000,
      },
    });
  }, []);

  return <>{children}</>;
}
