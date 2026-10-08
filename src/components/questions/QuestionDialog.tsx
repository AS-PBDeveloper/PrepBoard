import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categories,
  difficulties,
  statuses,
  type Question,
  type QuestionDraft,
} from "@/types/question";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const questionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Add a question title.")
    .max(100, "Keep the title under 100 characters."),
  category: z.enum(categories),
  difficulty: z.enum(difficulties),
  status: z.enum(statuses),
  description: z
    .string()
    .trim()
    .max(240, "Keep the note under 240 characters.")
    .default(""),
});

interface QuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (draft: QuestionDraft) => void;
  question?: Question;
}

export function QuestionDialog({
  open,
  onOpenChange,
  onSave,
  question,
}: QuestionDialogProps) {
  const form = useForm<
    z.input<typeof questionSchema>,
    unknown,
    z.output<typeof questionSchema>
  >({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      category: "DSA",
      difficulty: "Medium",
      status: "Pending",
      description: "",
    },
  });

  useEffect(() => {
    if (!open) return;
    form.reset(
      question
        ? {
            title: question.title,
            category: question.category,
            difficulty: question.difficulty,
            status: question.status,
            description: question.description,
          }
        : {
            title: "",
            category: "DSA",
            difficulty: "Medium",
            status: "Pending",
            description: "",
          },
    );
  }, [form, open, question]);

  const submit = form.handleSubmit((values) => {
    onSave(values);
    onOpenChange(false);
    form.reset();
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-6 sm:max-w-125">
        <DialogHeader>
          <div className="mb-1 flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
            <span className="text-lg">✦</span>
          </div>
          <DialogTitle>
            {question ? "Edit question" : "Add a practice question"}
          </DialogTitle>
          <DialogDescription>
            {question
              ? "Keep your practice notes and status up to date."
              : "Save a prompt you want to work through this week."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={submit} className="space-y-4">
            <FormItem>
              <FormLabel htmlFor="question-title">Question</FormLabel>
              <Input
                id="question-title"
                placeholder="e.g. Reverse a linked list"
                autoFocus
                {...form.register("title")}
                aria-invalid={!!form.formState.errors.title}
              />
              <FormMessage>{form.formState.errors.title?.message}</FormMessage>
            </FormItem>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  value={form.watch("category")}
                  onValueChange={(value) =>
                    form.setValue(
                      "category",
                      value as QuestionDraft["category"],
                      { shouldValidate: true },
                    )
                  }
                >
                  <SelectTrigger aria-label="Category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select
                  value={form.watch("difficulty")}
                  onValueChange={(value) =>
                    form.setValue(
                      "difficulty",
                      value as QuestionDraft["difficulty"],
                      { shouldValidate: true },
                    )
                  }
                >
                  <SelectTrigger aria-label="Difficulty">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  value={form.watch("status")}
                  onValueChange={(value) =>
                    form.setValue("status", value as QuestionDraft["status"], {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger aria-label="Status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            </div>
            <FormItem>
              <FormLabel htmlFor="question-description">
                Notes{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </FormLabel>
              <textarea
                id="question-description"
                rows={3}
                maxLength={240}
                placeholder="Add an approach, reminder, or resource…"
                className="flex min-h-24 w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                {...form.register("description")}
              />
              <FormMessage>
                {form.formState.errors.description?.message}
              </FormMessage>
            </FormItem>
            <DialogFooter className="border-t border-border pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {question ? "Save changes" : "Add question"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
