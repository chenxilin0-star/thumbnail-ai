'use client'

import * as React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs))
}

interface TabsProps {
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  children: React.ReactNode
}

function Tabs({ value, onValueChange, className, children }: TabsProps) {
  return (
    <div className={cn("", className)} data-value={value}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { _value: value, _onValueChange: onValueChange })
        }
        return child
      })}
    </div>
  )
}

function TabsList({ className, children, _value, _onValueChange, ...props }: any) {
  return (
    <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 gap-1", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { _value, _onValueChange })
        }
        return child
      })}
    </div>
  )
}

function TabsTrigger({ className, value, children, _value, _onValueChange, ...props }: any) {
  const isActive = _value === value
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
        isActive ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900",
        className
      )}
      onClick={() => _onValueChange?.(value)}
      {...props}
    >
      {children}
    </button>
  )
}

export { Tabs, TabsList, TabsTrigger }
