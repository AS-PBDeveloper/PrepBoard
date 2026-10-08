import { ArrowRight, Check, Target } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types/question";

const trackNotes: Record<Category, string> = {
  DSA: "Patterns & problem solving",
  Git: "Version control",
  Technical: "Core concepts",
  Interview: "Stories & conversations",
  "Machine Coding": "Hands-on implementation",
};
const trackColors: Record<Category, string> = {
  DSA: "bg-blue-500",
  Git: "bg-orange-500",
  Technical: "bg-emerald-500",
  Interview: "bg-violet-500",
  "Machine Coding": "bg-amber-500",
};

interface Props {
  progress: number;
  completed: number;
  total: number;
  weeklyCompleted: number;
  weeklyGoal?: number;
  categoryCounts: Record<Category, { completed: number; total: number }>;
  onViewProgress?: () => void;
}

export function ProgressOverview({
  progress,
  completed,
  total,
  weeklyCompleted,
  weeklyGoal = 8,
  categoryCounts,
  onViewProgress,
}: Props) {
  const goalValue = Math.min(
    Math.round((weeklyCompleted / weeklyGoal) * 100),
    100,
  );
  return (
    <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <Card className="overflow-hidden">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="text-[15px]">Overall progress</CardTitle>
            <CardDescription className="mt-1">
              Your preparation, across every track
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewProgress}
            className="h-8 gap-1 px-2 text-xs text-primary"
          >
            Details
            <ArrowRight className="size-3.5" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-5 pb-5 pt-1">
            <div
              className="relative flex size-[74px] shrink-0 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#18765c ${progress * 3.6}deg, #eef2ef ${progress * 3.6}deg)`,
              }}
              role="img"
              aria-label={`${progress}% overall completion`}
            >
              <div className="flex size-[58px] items-center justify-center rounded-full bg-white">
                <span className="font-mono text-[17px] font-semibold tracking-tight">
                  {progress}%
                </span>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">
                {completed} of {total} completed
              </div>
              <p className="mt-1 max-w-[230px] text-xs leading-5 text-muted-foreground">
                Steady practice beats last-minute cramming. You’re building good
                momentum.
              </p>
            </div>
          </div>
          <div className="space-y-4 border-t border-border/70 pt-4">
            {(
              Object.entries(categoryCounts) as Array<
                [Category, { completed: number; total: number }]
              >
            ).map(([name, counts]) => {
              const percent = counts.total
                ? Math.round((counts.completed / counts.total) * 100)
                : 0;
              return (
                <div key={name} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-4 text-xs">
                    <div className="min-w-0">
                      <span className="font-medium">{name}</span>
                      <span className="ml-2 hidden text-muted-foreground sm:inline">
                        {trackNotes[name]}
                      </span>
                    </div>
                    <span className="shrink-0 text-muted-foreground">
                      {counts.completed}
                      <span className="px-0.5">/</span>
                      {counts.total}
                    </span>
                  </div>
                  <Progress
                    value={percent}
                    className="h-1.5"
                    indicatorClassName={trackColors[name]}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <Card className="relative overflow-hidden bg-[#f3f7f3]">
        <div className="pointer-events-none absolute -right-10 -top-12 size-44 rounded-full border border-primary/5" />
        <div className="pointer-events-none absolute -right-1 -top-3 size-28 rounded-full border border-primary/10" />
        <CardHeader className="relative pb-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
              <Target className="size-4" />
            </div>
            <CardTitle className="text-[15px]">This week</CardTitle>
          </div>
          <CardDescription className="mt-1">
            A little practice, often, goes a long way.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-5">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono text-4xl font-semibold tracking-[-0.06em] text-foreground">
                {weeklyCompleted}
              </span>
              <span className="ml-2 text-sm text-muted-foreground">
                of {weeklyGoal} questions
              </span>
            </div>
            <div className="mb-1 flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-primary shadow-sm">
              <Check className="size-3" />
              {goalValue}% of goal
            </div>
          </div>
          <Progress value={goalValue} className="h-2 bg-white" />
          <div className="rounded-xl border border-white/90 bg-white/75 p-3.5">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                <Check className="size-3.5" />
              </div>
              <div>
                <div className="text-xs font-semibold">One more rep counts</div>
                <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                  Keep a steady pace. Aim for short, focused sessions across
                  your week.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
