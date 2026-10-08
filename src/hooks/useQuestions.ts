import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createSeedQuestions,
  readQuestions,
  writeQuestions,
} from "@/lib/storage";
import { categories } from "@/types/question";
import type { Question, QuestionDraft, QuestionStatus } from "@/types/question";

function beginningOfWeek(reference = new Date()) {
  const date = new Date(reference);
  const day = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>(() => readQuestions());
  useEffect(() => {
    writeQuestions(questions);
  }, [questions]);

  const stats = useMemo(() => {
    const completed = questions.filter((q) => q.status === "Completed");
    const weekStart = beginningOfWeek();
    const completedThisWeek = completed.filter(
      (q) => new Date(q.updatedAt) >= weekStart,
    );
    const dsa = questions.filter((q) => q.category === "DSA");
    const interview = questions.filter((q) => q.category === "Interview");
    const machine = questions.filter((q) => q.category === "Machine Coding");
    return {
      total: questions.length,
      completed: completed.length,
      progress: questions.length
        ? Math.round((completed.length / questions.length) * 100)
        : 0,
      dsaCompleted: dsa.filter((q) => q.status === "Completed").length,
      dsaTotal: dsa.length,
      interviewCompleted: interview.filter((q) => q.status === "Completed")
        .length,
      interviewTotal: interview.length,
      machineCompleted: machine.filter((q) => q.status === "Completed").length,
      machineTotal: machine.length,
      completedThisWeek: completedThisWeek.length,
      weekStart,
      categoryCounts: Object.fromEntries(
        categories.map((category) => {
          const track = questions.filter(
            (question) => question.category === category,
          );
          return [
            category,
            {
              completed: track.filter(
                (question) => question.status === "Completed",
              ).length,
              total: track.length,
            },
          ];
        }),
      ) as Record<
        (typeof categories)[number],
        { completed: number; total: number }
      >,
    };
  }, [questions]);

  const addQuestion = useCallback((draft: QuestionDraft) => {
    const now = new Date().toISOString();
    const newQuestion: Question = {
      ...draft,
      id: globalThis.crypto?.randomUUID?.() ?? `question-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setQuestions((current) => [newQuestion, ...current]);
    return newQuestion;
  }, []);

  const updateQuestion = useCallback((id: string, updates: QuestionDraft) => {
    setQuestions((current) =>
      current.map((q) =>
        q.id === id
          ? { ...q, ...updates, updatedAt: new Date().toISOString() }
          : q,
      ),
    );
  }, []);

  const updateStatus = useCallback((id: string, status: QuestionStatus) => {
    setQuestions((current) =>
      current.map((q) =>
        q.id === id ? { ...q, status, updatedAt: new Date().toISOString() } : q,
      ),
    );
  }, []);

  const deleteQuestion = useCallback(
    (id: string) =>
      setQuestions((current) => current.filter((q) => q.id !== id)),
    [],
  );
  const restoreSamples = useCallback(
    () => setQuestions(createSeedQuestions()),
    [],
  );

  return {
    questions,
    stats,
    addQuestion,
    updateQuestion,
    updateStatus,
    deleteQuestion,
    restoreSamples,
  };
}
