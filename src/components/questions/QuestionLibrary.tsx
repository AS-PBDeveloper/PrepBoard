import { useMemo, useState } from "react";
import { BookOpen, CircleX, Search, SlidersHorizontal } from "lucide-react";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { QuestionDialog } from "@/components/questions/QuestionDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  categories,
  type Question,
  type QuestionDraft,
  type QuestionStatus,
} from "@/types/question";

interface Props {
  questions: Question[];
  onAdd: (draft: QuestionDraft) => void;
  onEdit: (id: string, updates: QuestionDraft) => void;
  onStatusChange: (id: string, status: QuestionStatus) => void;
  onDelete: (id: string) => void;
  compact?: boolean;
}

export function QuestionLibrary({
  questions,
  onAdd,
  onEdit,
  onStatusChange,
  onDelete,
  compact = false,
}: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return questions
      .filter((question) => {
        const matchesSearch =
          !term ||
          [question.title, question.description, question.category].some(
            (value) => value.toLowerCase().includes(term),
          );
        return (
          matchesSearch &&
          (category === "all" || question.category === category) &&
          (status === "all" || question.status === status) &&
          (difficulty === "all" || question.difficulty === difficulty)
        );
      })
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [category, difficulty, questions, search, status]);
  const hasFilters =
    search !== "" ||
    category !== "all" ||
    status !== "all" ||
    difficulty !== "all";
  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setStatus("all");
    setDifficulty("all");
  };

  return (
    <section className="space-y-4" aria-label="Practice questions">
      {!compact && (
        <Card className="overflow-hidden">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search questions or notes…"
                  aria-label="Search questions"
                  className="h-10 border-border/80 bg-[#fcfdfc] pl-9"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    <CircleX className="size-4" />
                  </button>
                )}
              </div>
              <div className="no-scrollbar flex gap-2 overflow-x-auto">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-10 min-w-[132px] bg-card">
                    <SlidersHorizontal className="size-3.5 text-muted-foreground" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="h-10 min-w-[126px] bg-card">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="h-10 min-w-[122px] bg-card">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All levels</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {compact && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-9 min-w-[126px] bg-card">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-9 min-w-[122px] bg-card">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="h-9 min-w-[112px] bg-card">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="flex items-center justify-between px-0.5 text-xs text-muted-foreground">
        <span>
          {filtered.length} {filtered.length === 1 ? "question" : "questions"}
        </span>
        {hasFilters && (
          <button
            type="button"
            className="font-medium text-primary hover:underline"
            onClick={resetFilters}
          >
            Clear filters
          </button>
        )}
      </div>
      {filtered.length ? (
        <div className="grid gap-3">
          {filtered.slice(0, compact ? 4 : undefined).map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onEdit={onEdit}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <Card className="border-dashed shadow-none">
          <CardContent className="flex flex-col items-center px-5 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <BookOpen className="size-5" />
            </div>
            <h3 className="mt-4 font-semibold">
              {questions.length
                ? "No questions match your search"
                : "Your practice list starts here"}
            </h3>
            <p className="mt-1 max-w-xs text-sm leading-6 text-muted-foreground">
              {questions.length
                ? "Try a different keyword or clear your filters to see more."
                : "Add a question you want to work through, then track your progress here."}
            </p>
            <Button
              className="mt-4"
              variant="outline"
              size="sm"
              onClick={() =>
                questions.length ? resetFilters() : setAddOpen(true)
              }
            >
              {questions.length ? "Clear filters" : "Add your first question"}
            </Button>
          </CardContent>
        </Card>
      )}
      <QuestionDialog open={addOpen} onOpenChange={setAddOpen} onSave={onAdd} />
    </section>
  );
}
