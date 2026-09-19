import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#e4e4e7] hover:bg-white text-zinc-900 font-medium shadow-sm active:scale-[0.98]",
        brand:
          "bg-[#372C5F] text-white hover:bg-[#372C5F]/90 shadow-sm active:scale-[0.98]",
        destructive:
          "bg-red-600 text-white hover:bg-red-600/90 shadow-sm active:scale-[0.98]",
        outline:
          "border border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-100 active:scale-[0.98]",
        secondary:
          "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 active:scale-[0.98]",
        ghost: "hover:bg-zinc-800 text-zinc-100",
        link: "text-white underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-5 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
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
