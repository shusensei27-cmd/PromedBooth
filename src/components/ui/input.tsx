"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-semibold text-foreground"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "input-metal",
            error && "border-destructive focus:border-destructive focus:shadow-destructive/10",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-destructive mt-1">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
