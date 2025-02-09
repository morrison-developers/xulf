"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyledComponentsRegistry } from "./registry";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient()); // Ensure stable QueryClient

  return (
    <StyledComponentsRegistry>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </StyledComponentsRegistry>
  );
}
