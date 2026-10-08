import { useState } from "react";
import {
  Braces,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  Cpu,
  GitBranch,
  MessageSquareText,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { QuestionDialog } from "@/components/questions/QuestionDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Question, QuestionDraft, QuestionStatus } from "@/types/question";

const categoryIcon = {
  DSA: Code2,
  Git: GitBranch,
  Technical: Cpu,
  Interview: MessageSquareText,
  "Machine Coding": Braces,
};
const categoryTone = {
  DSA: "bg-blue-50 text-blue-700",
  Git: "bg-orange-50 text-orange-700",
  Technical: "bg-emerald-50 text-emerald-700",
  Interview: "bg-violet-50 text-violet-700",
  "Machine Coding": "bg-amber-50 text-amber-800",
};

function statusStyle(status: QuestionStatus) {
  if (status === "Completed")
    return "border-emerald-100 bg-emerald-50 text-emerald-700";
  if (status === "In Progress") return "border-sky-100 bg-sky-50 text-sky-700";
  return "border-border bg-muted text-muted-foreground";
}

interface QuestionCardProps {
  question: Question;
  onEdit: (id: string, updates: QuestionDraft) => void;
  onStatusChange: (id: string, status: QuestionStatus) => void;
  onDelete: (id: string) => void;
}

export function QuestionCard({
  question,
  onEdit,
  onStatusChange,
  onDelete,
}: QuestionCardProps) {
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const Icon = categoryIcon[question.category];
  const date = new Date(question.updatedAt).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <Card className="group relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d8e4dc] hover:shadow-md">
        <div className="flex min-w-0 items-start gap-3.5 p-4 sm:gap-4 sm:p-5">
          <div
            className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl ${categoryTone[question.category]}`}
          >
            <Icon className="size-4.5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-[14px] font-semibold leading-5 text-foreground sm:text-[15px]">
                  {question.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-muted-foreground">
                  {question.description || "No notes added yet."}
                </p>
              </div>
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="-mr-2 -mt-2 size-8 shrink-0 text-muted-foreground opacity-70 hover:text-foreground md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100"
                        aria-label={`Actions for ${question.title}`}
                      >
                        <MoreHorizontal className="size-4.5" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>More actions</TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => setEditing(true)}>
                    <Pencil className="text-muted-foreground" />
                    Edit question
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Clock3 className="text-muted-foreground" />
                      Change status
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {(["Pending", "In Progress", "Completed"] as const).map(
                        (status) => (
                          <DropdownMenuItem
                            key={status}
                            onSelect={() => onStatusChange(question.id, status)}
                          >
                            {question.status === status && (
                              <Check className="text-primary" />
                            )}
                            {status}
                          </DropdownMenuItem>
                        ),
                      )}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuItem
                    onSelect={() => setConfirmDelete(true)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 />
                    Delete question
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge
                className={`${categoryTone[question.category]} border-transparent`}
              >
                <Icon className="size-3" />
                {question.category}
              </Badge>
              <Badge variant="outline" className="font-medium">
                {question.difficulty}
              </Badge>
              <span className="ml-auto hidden text-[11px] text-muted-foreground sm:inline">
                Updated {date}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground sm:hidden">
                <Clock3 className="size-3" />
                {date}
              </span>
              <div className="ml-auto flex items-center gap-1.5">
                <Badge
                  variant="outline"
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${statusStyle(question.status)}`}
                >
                  <span
                    className={`size-1.5 rounded-full ${question.status === "Completed" ? "bg-emerald-500" : question.status === "In Progress" ? "bg-sky-500" : "bg-slate-400"}`}
                  />
                  {question.status}
                </Badge>
                <Select
                  value={question.status}
                  onValueChange={(value) =>
                    onStatusChange(question.id, value as QuestionStatus)
                  }
                >
                  <SelectTrigger
                    className="h-7 w-8 border-transparent bg-transparent px-1 shadow-none hover:bg-muted focus:ring-1"
                    aria-label="Quick change status"
                  >
                    <ChevronDown className="size-3.5 text-muted-foreground" />
                    <SelectValue className="sr-only" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {(["Pending", "In Progress", "Completed"] as const).map(
                      (status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <QuestionDialog
        open={editing}
        onOpenChange={setEditing}
        question={question}
        onSave={(updates) => onEdit(question.id, updates)}
      />
      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mb-1 flex size-10 items-center justify-center rounded-xl bg-red-50 text-destructive">
              <Trash2 className="size-5" />
            </div>
            <AlertDialogTitle>Delete this question?</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-semibold text-foreground">
                {question.title}
              </span>{" "}
              will be removed from your practice list. This action can’t be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep question</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(question.id);
                setConfirmDelete(false);
              }}
            >
              Delete question
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
