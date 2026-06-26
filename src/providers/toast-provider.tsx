"use client";

import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "16px",
            background: "#1E293B",
            color: "#fff",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}
