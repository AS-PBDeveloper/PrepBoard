import { BookOpen, Plus, Sparkles } from "lucide-react";
import { QuestionLibrary } from "@/components/questions/QuestionLibrary";
import { Button } from "@/components/ui/button";
import type { Question, QuestionDraft, QuestionStatus } from "@/types/question";

interface Props {
  questions: Question[];
  onAdd: (draft: QuestionDraft) => void;
  onEdit: (id: string, updates: QuestionDraft) => void;
  onStatusChange: (id: string, status: QuestionStatus) => void;
  onDelete: (id: string) => void;
  onNewQuestion: () => void;
}

export function QuestionsPage({
  questions,
  onAdd,
  onEdit,
  onStatusChange,
  onDelete,
  onNewQuestion,
}: Props) {
  const pending = questions.filter(
    (question) => question.status === "Pending",
  ).length;
  return (
    <div className="mx-auto max-w-[1330px] animate-appear space-y-6 px-4 py-7 sm:px-7 sm:py-9 lg:px-10 lg:py-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
            <BookOpen className="size-3.5" />
            YOUR PRACTICE LIBRARY
          </div>
          <h1 className="text-[27px] font-semibold tracking-[-0.055em] sm:text-[32px]">
            Question bank
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            One place for every problem, prompt, and coding exercise.
          </p>
        </div>
        <Button className="self-start sm:self-auto" onClick={onNewQuestion}>
          <Plus className="size-4" />
          Add question
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border/80 bg-white/70 px-4 py-3 text-xs text-muted-foreground">
        <Sparkles className="size-3.5 text-primary" />
        <span>
          <span className="font-semibold text-foreground">
            {questions.length} questions
          </span>{" "}
          in your library
        </span>
        <span className="mx-1 hidden size-1 rounded-full bg-border sm:block" />
        <span>
          <span className="font-semibold text-foreground">
            {pending} to pick up
          </span>{" "}
          when you’re ready
        </span>
      </div>
      <QuestionLibrary
        questions={questions}
        onAdd={onAdd}
        onEdit={onEdit}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />
    </div>
  );
}
