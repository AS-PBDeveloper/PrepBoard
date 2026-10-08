import { useMemo } from 'react'
import { CalendarDays, CheckCircle2, Circle, Goal, Sparkles, TrendingUp } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Category, Question } from '@/types/question'

const categoryColors: Record<Category, string> = { DSA: 'bg-blue-500', Git: 'bg-orange-500', Technical: 'bg-emerald-500', Interview: 'bg-violet-500', 'Machine Coding': 'bg-amber-500' }
const categoryTextColors: Record<Category, string> = { DSA: 'text-blue-600', Git: 'text-orange-700', Technical: 'text-emerald-700', Interview: 'text-violet-600', 'Machine Coding': 'text-amber-700' }

interface Props {
  questions: Question[]
  stats: { completed: number; total: number; progress: number; completedThisWeek: number; weekStart: Date; categoryCounts: Record<Category, { completed: number; total: number }> }
}

export function ProgressPage({ questions, stats }: Props) {
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, index) => {
    const date = new Date(stats.weekStart)
    date.setDate(date.getDate() + index)
    const completed = questions.filter((question) => question.status === 'Completed' && new Date(question.updatedAt).toDateString() === date.toDateString()).length
    return { date, completed }
  }), [questions, stats.weekStart])
  const weekEnd = new Date(stats.weekStart)
  weekEnd.setDate(weekEnd.getDate() + 6)
  const formatter = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' })
  const maxDaily = Math.max(1, ...weekDays.map((day) => day.completed))
  const weeklyPercent = Math.min(Math.round(stats.completedThisWeek / 8 * 100), 100)

  return <div className="mx-auto max-w-[1330px] animate-appear space-y-7 px-4 py-7 sm:px-7 sm:py-9 lg:px-10 lg:py-10">
    <div><div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-muted-foreground"><CalendarDays className="size-3.5" />Week of {formatter.format(stats.weekStart)} – {formatter.format(weekEnd)}</div><h1 className="text-[27px] font-semibold tracking-[-0.055em] sm:text-[32px]">Your progress, at a glance.</h1><p className="mt-1.5 text-sm text-muted-foreground">Every completed rep makes the next one easier.</p></div>
    <Tabs defaultValue="week" className="space-y-5">
      <TabsList className="grid h-10 w-fit grid-cols-2"><TabsTrigger value="week" className="px-4">This week</TabsTrigger><TabsTrigger value="tracks" className="px-4">By track</TabsTrigger></TabsList>
      <TabsContent value="week" className="mt-0 space-y-5">
        <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
          <Card><CardHeader className="flex-row items-start justify-between"><div><CardTitle className="text-base">Weekly activity</CardTitle><CardDescription className="mt-1.5">Completed questions, day by day</CardDescription></div><Badge variant="secondary" className="gap-1 bg-accent text-primary"><TrendingUp className="size-3" />{stats.completedThisWeek} this week</Badge></CardHeader><CardContent><div className="flex h-48 items-end justify-between gap-2 pt-3 sm:h-56 sm:gap-4">{weekDays.map(({ date, completed }) => {
            const height = completed ? Math.max(18, (completed / maxDaily) * 100) : 5
            const isToday = date.toDateString() === new Date().toDateString()
            return <div key={date.toISOString()} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><div className="flex w-full flex-1 items-end justify-center"><div title={`${completed} completed`} className={`relative w-full max-w-[58px] rounded-t-lg transition-all ${completed ? 'bg-primary/75 hover:bg-primary' : 'bg-secondary'} ${isToday ? 'ring-2 ring-primary/15 ring-offset-2' : ''}`} style={{ height: `${height}%`, minHeight: 5 }}><span className={`absolute inset-x-0 -top-6 text-center text-[10px] font-medium ${completed ? 'text-foreground' : 'text-transparent'}`}>{completed || ''}</span></div></div><div className={`text-[10px] font-medium ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>{date.toLocaleDateString('en', { weekday: 'short' })}</div></div>
          })}</div><p className="mt-5 text-center text-[11px] text-muted-foreground">{formatter.format(stats.weekStart)} – {formatter.format(weekEnd)} · local time</p></CardContent></Card>
          <Card className="bg-[#f3f7f3]"><CardHeader><div className="flex size-8 items-center justify-center rounded-lg bg-white text-primary shadow-sm"><Goal className="size-4" /></div><CardTitle className="mt-3 text-base">Weekly goal</CardTitle><CardDescription>Keep a rhythm that works for you.</CardDescription></CardHeader><CardContent><div className="flex items-baseline justify-between"><span className="font-mono text-4xl font-semibold tracking-tight">{stats.completedThisWeek}<span className="ml-1 text-lg text-muted-foreground">/ 8</span></span><span className="text-xs font-medium text-primary">{weeklyPercent}% there</span></div><Progress value={weeklyPercent} className="mt-3 h-2 bg-white" /><div className="mt-5 flex items-start gap-2.5 rounded-xl border border-white bg-white/70 p-3.5"><Sparkles className="mt-0.5 size-4 shrink-0 text-primary" /><p className="text-xs leading-5 text-muted-foreground">A steady routine is more useful than a perfect streak. Each question you complete counts.</p></div></CardContent></Card>
        </div>
      </TabsContent>
      <TabsContent value="tracks" className="mt-0 space-y-4">
        <Card><CardContent className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"><div><div className="text-sm font-semibold">Your overall preparation</div><div className="mt-1 text-xs text-muted-foreground">{stats.completed} of {stats.total} questions completed across all tracks.</div></div><div className="flex items-center gap-3 sm:w-[45%]"><Progress value={stats.progress} className="h-2" /><span className="w-10 text-right font-mono text-sm font-semibold">{stats.progress}%</span></div></CardContent></Card>
        <div className="grid gap-3 lg:grid-cols-3">{(Object.entries(stats.categoryCounts) as Array<[Category, { completed: number; total: number }]>).map(([name, counts]) => {
          const percent = counts.total ? Math.round(counts.completed / counts.total * 100) : 0
          const inProgress = questions.filter((question) => question.category === name && question.status === 'In Progress').length
          return <Card key={name}><CardContent className="p-5"><div className="flex items-start justify-between"><div><div className="text-sm font-semibold">{name}</div><div className="mt-1 text-xs text-muted-foreground">{counts.completed} completed of {counts.total}</div></div><div className={`flex size-8 items-center justify-center rounded-lg bg-secondary ${categoryTextColors[name]}`}>{counts.total > 0 && counts.completed === counts.total ? <CheckCircle2 className="size-4" /> : <Circle className="size-4" />}</div></div><Progress value={percent} className="mt-5 h-1.5" indicatorClassName={categoryColors[name]} /><div className="mt-3 flex justify-between text-[11px] text-muted-foreground"><span>{percent}% complete</span><span>{inProgress} in progress</span></div></CardContent></Card>
        })}</div>
      </TabsContent>
    </Tabs>
    <Card><CardHeader><CardTitle className="text-base">A note on your data</CardTitle><CardDescription>Your activity is personal — it stays on this device.</CardDescription></CardHeader><CardContent className="text-xs leading-5 text-muted-foreground">Weekly activity is based on the date you last updated a question’s status. Your question list and progress are stored privately in your browser, with no account or backend required.</CardContent></Card>
  </div>
}
