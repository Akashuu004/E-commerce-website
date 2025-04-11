
import React from "react";
import { Toaster as Sonner } from "sonner";

const Toaster = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <Sonner
        ref={ref}
        className={className}
        toastOptions={{
          style: {
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
          },
        }}
        {...props}
      />
    );
  }
);
Toaster.displayName = "Toaster";

export { Toaster };
