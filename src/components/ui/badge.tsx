"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "destructive" | "info" | "vintage";
  children: React.ReactNode;
  className?: string;
}

const variants = {
  default: "bg-metal/30 text-foreground border border-metal/50",
  success: "bg-green-100 text-green-800 border border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  destructive: "bg-red-100 text-red-800 border border-red-200",
  info: "bg-accent text-primary border border-primary/20",
  vintage: "scrapbook-tag",
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-[var(--radius-sm)] text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
