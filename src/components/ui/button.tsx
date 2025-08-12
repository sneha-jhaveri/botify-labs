import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple to-purple-light text-white hover:shadow-glow hover:scale-105 transition-all duration-300",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 hover:shadow-red-500/20",
        outline:
          "border-2 border-purple/20 bg-white/5 backdrop-blur-sm text-purple hover:bg-purple/5 hover:border-purple/40 hover:shadow-purple/20",
        secondary:
          "bg-gradient-to-r from-teal to-mint text-white hover:shadow-glow hover:scale-105 transition-all duration-300",
        ghost: "hover:bg-purple/10 hover:text-purple",
        link: "text-purple underline-offset-4 hover:underline hover:text-purple-light",
        // Premium AI variants
        ai: "bg-gradient-to-br from-purple via-purple-light to-teal backdrop-blur-sm border border-teal/20 text-white hover:border-teal/40 hover:shadow-teal/20 transition-all duration-500",
        cta: "bg-purple text-white font-bold hover:shadow-purple/30 hover:scale-105 transform transition-all duration-300",
        hero: "bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 hover:shadow-white/20 transition-all duration-300",
        demo: "bg-mint text-purple hover:bg-teal hover:shadow-mint/30 hover:scale-105 transition-all duration-300",
        minimal:
          "bg-transparent text-purple/60 hover:text-purple hover:bg-purple/5 transition-all duration-300",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-14 rounded-xl px-8 text-base",
        xl: "h-16 rounded-xl px-10 text-lg font-bold",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
