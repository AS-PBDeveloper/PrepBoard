import * as React from 'react'
import { FormProvider } from 'react-hook-form'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/utils'

export const Form = FormProvider
export function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('space-y-2', className)} {...props} /> }
export function FormLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) { return <LabelPrimitive.Root className={cn('text-sm font-medium leading-none', className)} {...props} /> }
export function FormDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) { return <p className={cn('text-xs leading-5 text-muted-foreground', className)} {...props} /> }
export function FormMessage({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  if (!children) return null
  return <p className={cn('text-xs font-medium text-destructive', className)} {...props}>{children}</p>
}
