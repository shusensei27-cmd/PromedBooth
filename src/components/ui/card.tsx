"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "metal" | "elevated" | "outlined";
  withRivets?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "metal", withRivets = true, children, ...props }, ref) => {
    const variants = {
      metal:
        "card-metal",
      elevated:
        "bg-surface border-2 border-border rounded-[var(--radius-lg)] shadow-elevated",
      outlined:
        "bg-surface border-2 border-border rounded-[var(--radius-lg)]",
    };

    return (
      <div
        ref={ref}
        className={cn("relative p-6", variants[variant], className)}
        {...props}
      >
        {withRivets && variant === "metal" && (
          <>
            <div className="rivet rivet-tl animate-rivet" />
            <div className="rivet rivet-tr animate-rivet" style={{ animationDelay: "0.1s" }} />
            <div className="rivet rivet-bl animate-rivet" style={{ animationDelay: "0.2s" }} />
            <div className="rivet rivet-br animate-rivet" style={{ animationDelay: "0.3s" }} />
          </>
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-bold text-foreground font-[family-name:var(--font-heading)]",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}
