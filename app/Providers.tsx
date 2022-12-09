"use client";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";

function Providers({ children }: { children: React.ReactNode }) {
  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
}

export default Providers;
