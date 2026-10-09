import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { QuestionDialog } from "@/components/questions/QuestionDialog";
import { ProgressPage } from "@/pages/ProgressPage";
import { QuestionsPage } from "@/pages/QuestionsPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { useQuestions } from "@/hooks/useQuestions";
import type { QuestionDraft, QuestionStatus, View } from "@/types/question";

const PROFILE_KEY = "prepboard.profile.v1";
const THEME_KEY = "prepboard.theme.v1";

type Theme = "light" | "dark";

function loadName() {
  try {
    return window.localStorage.getItem(PROFILE_KEY) || "Alex Morgan";
  } catch {
    return "Alex Morgan";
  }
}

function loadTheme(): Theme {
  try {
    return window.localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export default function App() {
  const tracker = useQuestions();
  const [view, setView] = useState<View>("dashboard");
  const [newOpen, setNewOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [name, setName] = useState(loadName);
  const [theme, setTheme] = useState<Theme>(loadTheme);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      theme === "dark" ? "#171d1a" : "#f7f8f7",
    );
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // The theme still applies for this session when storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  const navigate = (next: View) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const addQuestion = (draft: QuestionDraft) => {
    tracker.addQuestion(draft);
    toast.success("Question added", {
      description: "It’s in your practice list, ready when you are.",
    });
  };
  const editQuestion = (id: string, draft: QuestionDraft) => {
    tracker.updateQuestion(id, draft);
    toast.success("Question updated");
  };
  const changeStatus = (id: string, status: QuestionStatus) => {
    tracker.updateStatus(id, status);
    toast.success(
      status === "Completed"
        ? "Nice work — marked complete"
        : `Moved to ${status.toLowerCase()}`,
    );
  };
  const deleteQuestion = (id: string) => {
    tracker.deleteQuestion(id);
    toast.success("Question removed");
  };
  const updateName = (nextName: string) => {
    setName(nextName);
    window.localStorage.setItem(PROFILE_KEY, nextName);
  };

  return (
    <TooltipProvider delayDuration={350}>
      <div className="min-h-screen bg-background">
        <AppSidebar
          view={view}
          onViewChange={navigate}
          onNewQuestion={() => setNewOpen(true)}
          mobileOpen={mobileOpen}
          onMobileOpenChange={setMobileOpen}
          name={name}
        />
        <div className="min-h-screen lg:pl-62.5">
          <Header
            view={view}
            name={name}
            theme={theme}
            onThemeChange={setTheme}
            onMenuClick={() => setMobileOpen(true)}
            onNewQuestion={() => setNewOpen(true)}
          />
          <main>
            {view === "dashboard" && (
              <Dashboard
                questions={tracker.questions}
                stats={tracker.stats}
                loading={loading}
                onViewChange={navigate}
                onAdd={addQuestion}
                onEdit={editQuestion}
                onStatusChange={changeStatus}
                onDelete={deleteQuestion}
                name={name}
                onNewQuestion={() => setNewOpen(true)}
              />
            )}
            {view === "questions" && (
              <QuestionsPage
                questions={tracker.questions}
                onAdd={addQuestion}
                onEdit={editQuestion}
                onStatusChange={changeStatus}
                onDelete={deleteQuestion}
                onNewQuestion={() => setNewOpen(true)}
              />
            )}
            {view === "progress" && (
              <ProgressPage
                questions={tracker.questions}
                stats={tracker.stats}
              />
            )}
            {view === "settings" && (
              <SettingsPage
                name={name}
                onNameChange={updateName}
                onRestore={tracker.restoreSamples}
                theme={theme}
                onThemeChange={setTheme}
              />
            )}
          </main>
        </div>
        <QuestionDialog
          open={newOpen}
          onOpenChange={setNewOpen}
          onSave={addQuestion}
        />
        <Toaster position="bottom-right" closeButton richColors theme={theme} />
      </div>
    </TooltipProvider>
  );
}
