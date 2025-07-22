import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground hover:shadow-glow hover:scale-105 transition-all duration-300",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary/20 bg-background/50 backdrop-blur-sm text-foreground hover:bg-primary/5 hover:border-primary/40 hover:shadow-ai",
        secondary: "bg-gradient-secondary text-secondary-foreground hover:shadow-glow hover:scale-105 transition-all duration-300",
        ghost: "hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-glow",
        // Premium BotWot AI variants
        ai: "bg-gradient-ai backdrop-blur-sm border border-primary/20 text-foreground hover:border-primary/40 hover:bg-primary/5 hover:shadow-ai transition-all duration-500",
        cta: "bg-gradient-hero text-white font-bold hover:shadow-glow hover:scale-105 transform transition-all duration-300 shadow-ai",
        hero: "bg-background/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 hover:shadow-glow transition-all duration-300",
        demo: "bg-accent text-accent-foreground hover:bg-accent-glow hover:shadow-glow hover:scale-105 transition-all duration-300",
        minimal: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
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
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
