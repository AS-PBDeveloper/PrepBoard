import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
  label: string
  value: string | number
  caption: string
  icon: LucideIcon
  iconTone: string
  accent?: string
}

export function StatCard({ label, value, caption, icon: Icon, iconTone, accent }: StatCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[12px] font-medium leading-5 text-muted-foreground">{label}</div>
            <div className="mt-2 flex items-baseline gap-2"><span className="font-mono text-[27px] font-semibold tracking-[-0.06em] text-foreground sm:text-[30px]">{value}</span>{accent && <span className="text-[11px] font-medium text-primary">{accent}</span>}</div>
          </div>
          <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${iconTone}`}><Icon className="size-[17px]" strokeWidth={1.8} /></div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 border-t border-border/70 pt-3 text-[11px] leading-4 text-muted-foreground"><ArrowUpRight className="size-3.5 text-primary" /><span>{caption}</span></div>
      </CardContent>
    </Card>
  )
}
