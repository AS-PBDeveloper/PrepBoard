import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

export function Progress({ className, value = 0, indicatorClassName, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root> & { indicatorClassName?: string }) {
  const safeValue = Math.max(0, Math.min(100, value ?? 0))
  return (
    <ProgressPrimitive.Root className={cn('relative h-2.5 w-full overflow-hidden rounded-full bg-secondary', className)} value={safeValue} {...props}>
      <ProgressPrimitive.Indicator className={cn('h-full w-full flex-1 rounded-full bg-primary transition-transform duration-700 ease-out', indicatorClassName)} style={{ transform: `translateX(-${100 - safeValue}%)` }} />
    </ProgressPrimitive.Root>
  )
}
