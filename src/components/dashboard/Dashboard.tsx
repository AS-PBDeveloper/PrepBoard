import {
  BookOpen,
  Braces,
  Code2,
  Flame,
  MessageSquareText,
  Plus,
  Sparkles,
} from "lucide-react";
import { QuestionLibrary } from "@/components/questions/QuestionLibrary";
import { ProgressOverview } from "@/components/dashboard/ProgressOverview";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuestions } from "@/hooks/useQuestions";
import type {
  Question,
  QuestionDraft,
  QuestionStatus,
  View,
} from "@/types/question";

interface Props {
  questions: Question[];
  stats: ReturnType<typeof useQuestions>["stats"];
  loading: boolean;
  onViewChange: (view: View) => void;
  onAdd: (draft: QuestionDraft) => void;
  onEdit: (id: string, updates: QuestionDraft) => void;
  onStatusChange: (id: string, status: QuestionStatus) => void;
  onDelete: (id: string) => void;
  name: string;
  onNewQuestion: () => void;
}

const greeting = () => {
  const hour = new Date().getHours();
  return hour < 12
    ? "Good morning"
    : hour < 18
      ? "Good afternoon"
      : "Good evening";
};

export function Dashboard({
  questions,
  stats,
  loading,
  onViewChange,
  onAdd,
  onEdit,
  onStatusChange,
  onDelete,
  name,
  onNewQuestion,
}: Props) {
  const dateLabel = new Date().toLocaleDateString("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="mx-auto max-w-332.5 animate-appear space-y-7 px-4 py-7 sm:px-7 sm:py-9 lg:px-10 lg:py-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            {dateLabel}
          </div>
          <h1 className="text-[27px] font-semibold tracking-[-0.055em] sm:text-[32px]">
            {greeting()}, {name.trim().split(/\s+/)[0] || "there"}{" "}
            <span className="inline-block origin-bottom text-[24px]">✦</span>
          </h1>
          <p className="mt-1.5 text-[13px] text-muted-foreground sm:text-sm">
            A little practice today goes a long way tomorrow.
          </p>
        </div>
        <Button
          onClick={onNewQuestion}
          className="h-10 self-start px-4 sm:self-auto"
        >
          <Plus className="size-4" />
          Add a question
        </Button>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="space-y-3 p-5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-16" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <StatCard
            label="Total questions"
            value={stats.total}
            caption="in your practice library"
            icon={BookOpen}
            iconTone="bg-slate-100 text-slate-600"
          />
          <StatCard
            label="DSA completed"
            value={`${stats.dsaCompleted}/${stats.dsaTotal}`}
            caption="patterns getting stronger"
            icon={Code2}
            iconTone="bg-blue-50 text-blue-600"
          />
          <StatCard
            label="Interview questions"
            value={`${stats.interviewCompleted}/${stats.interviewTotal}`}
            caption="stories ready to tell"
            icon={MessageSquareText}
            iconTone="bg-violet-50 text-violet-600"
          />
          <StatCard
            label="Machine coding"
            value={`${stats.machineCompleted}/${stats.machineTotal}`}
            caption="hands-on reps completed"
            icon={Braces}
            iconTone="bg-amber-50 text-amber-700"
          />
        </div>
      )}
      {!loading && (
        <ProgressOverview
          progress={stats.progress}
          completed={stats.completed}
          total={stats.total}
          weeklyCompleted={stats.completedThisWeek}
          categoryCounts={stats.categoryCounts}
          onViewProgress={() => onViewChange("progress")}
        />
      )}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_260px]">
        <section className="min-w-0 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-[17px] font-semibold tracking-tight">
                Pick up where you left off
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                A few recent questions from your practice list.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewChange("questions")}
              className="shrink-0 text-xs text-primary"
            >
              View all
              <Plus className="ml-1 size-3.5" />
            </Button>
          </div>
          <QuestionLibrary
            questions={questions}
            onAdd={onAdd}
            onEdit={onEdit}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            compact
          />
        </section>
        <aside className="space-y-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <div className="flex size-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <Flame className="size-4" />
                </div>
                Weekly focus
              </div>
              <div className="mt-4">
                <div className="text-[13px] font-medium">
                  Make room for a little practice.
                </div>
                <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                  You’ve completed{" "}
                  <span className="font-semibold text-foreground">
                    {stats.completedThisWeek}
                  </span>{" "}
                  questions this week. Aim for eight at your own pace.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/70 p-2.5 text-[11px] text-muted-foreground">
                <Sparkles className="size-3.5 shrink-0 text-primary" />
                Short, focused sessions add up.
              </div>
            </CardContent>
          </Card>
          <Card className="bg-muted/60 shadow-none">
            <CardContent className="p-5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-card text-primary shadow-sm">
                <BookOpen className="size-4" />
              </div>
              <p className="mt-3 text-xs font-semibold">
                Three tracks, one goal.
              </p>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                Switch between problem solving, interview stories, and hands-on
                coding.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
