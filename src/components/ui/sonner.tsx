import { Toaster as SonnerToaster, type ToasterProps } from 'sonner'

export function Toaster(props: ToasterProps) {
  return <SonnerToaster toastOptions={{ classNames: { toast: 'rounded-xl border-border shadow-lg', title: 'text-sm font-semibold', description: 'text-xs text-muted-foreground' } }} {...props} />
}
