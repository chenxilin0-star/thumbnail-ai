import * as React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs))
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "outline"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
    const variants: Record<string, string> = {
      default: "bg-purple-600 text-white hover:bg-purple-700",
      secondary: "bg-white text-gray-900 hover:bg-gray-100",
      ghost: "hover:bg-gray-100",
      outline: "border border-gray-300 hover:bg-gray-50",
    }
    const sizes: Record<string, string> = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 text-xs",
      lg: "h-12 px-6 text-base",
    }
    return (
      <button className={cn(base, variants[variant], sizes[size], className)} ref={ref} {...props} />
    )
  }
)
Button.displayName = "Button"
export { Button }
