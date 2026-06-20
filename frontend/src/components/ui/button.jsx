import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const buttonVariants = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  
  let variantClasses = ""
  if (variant === "default") variantClasses = "bg-primary text-primary-foreground shadow hover:bg-primary/90"
  if (variant === "ghost") variantClasses = "hover:bg-accent hover:text-accent-foreground"
  if (variant === "outline") variantClasses = "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
  
  let sizeClasses = ""
  if (size === "default") sizeClasses = "h-9 px-4 py-2"
  if (size === "icon") sizeClasses = "h-9 w-9"

  return (
    <Comp
      className={cn(buttonVariants, variantClasses, sizeClasses, className)}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
