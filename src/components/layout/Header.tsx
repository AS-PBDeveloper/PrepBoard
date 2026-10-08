import { Bell, Menu, Plus, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { AppBrand } from '@/components/layout/AppSidebar'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { View } from '@/types/question'

const pageInfo: Record<View, { eyebrow: string; title: string }> = {
  dashboard: { eyebrow: 'YOUR WORKSPACE', title: 'Overview' },
  questions: { eyebrow: 'YOUR PRACTICE LIBRARY', title: 'Question bank' },
  progress: { eyebrow: 'YOUR WEEKLY ACTIVITY', title: 'My progress' },
  settings: { eyebrow: 'MAKE IT YOURS', title: 'Preferences' },
}

export function Header({ view, name, onMenuClick, onNewQuestion }: { view: View; name: string; onMenuClick: () => void; onNewQuestion: () => void }) {
  const today = new Date().toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' })
  return <header className="sticky top-0 z-20 flex h-[66px] items-center justify-between border-b border-border bg-[#f7f8f7]/90 px-4 backdrop-blur-xl sm:px-7 lg:px-10">
    <div className="flex items-center gap-3">
      <button type="button" onClick={onMenuClick} className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground lg:hidden" aria-label="Open navigation"><Menu className="size-[18px]" /></button>
      <div className="lg:hidden"><AppBrand small /></div>
      <div className="hidden lg:block"><div className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">{pageInfo[view].eyebrow}</div><div className="mt-1 text-[13px] font-semibold tracking-tight">{pageInfo[view].title}</div></div>
    </div>
    <div className="flex items-center gap-2.5 sm:gap-4">
      <span className="hidden text-xs text-muted-foreground sm:inline">{today}</span>
      <div className="hidden h-5 w-px bg-border sm:block" />
      <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="relative size-9" aria-label="View notifications" onClick={() => toast('You’re all caught up', { description: 'Your practice progress is saved on this device.' })}><Bell className="size-[17px]" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary ring-2 ring-[#f7f8f7]" /></Button></TooltipTrigger><TooltipContent>Notifications</TooltipContent></Tooltip>
      <div className="hidden h-5 w-px bg-border sm:block" />
      <div className="flex items-center gap-2"><div className="hidden max-w-[130px] truncate text-xs font-medium sm:block">{name}</div><div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e7efe9] text-[10px] font-bold text-[#4e715d]">{name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase() || 'S'}</div></div>
      <div className="hidden items-center gap-1 rounded-full bg-accent px-2 py-1 text-[10px] font-semibold text-primary md:flex"><Sparkles className="size-3" />Focus mode</div>
      <Button size="sm" className="ml-1 hidden h-9 sm:inline-flex" onClick={onNewQuestion}><Plus className="size-4" /><span className="hidden md:inline">Add question</span><span className="md:hidden">Add</span></Button>
    </div>
  </header>
}
