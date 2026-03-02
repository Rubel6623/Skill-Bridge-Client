import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "secondary" | "default" | string
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className = "", children, ...props }, ref) => {
  const base = "inline-flex items-center px-2 py-1 text-xs font-medium rounded"
  return (
    <span ref={ref} className={`${base} ${className}`} {...props}>
      {children}
    </span>
  )
})
Badge.displayName = "Badge"