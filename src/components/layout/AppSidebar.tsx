import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CheckCheck,
  ChevronRight,
  LayoutDashboard,
  Plus,
  Settings2,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { View } from "@/types/question";

const items: Array<{ value: View; label: string; icon: LucideIcon }> = [
  { value: "dashboard", label: "Overview", icon: LayoutDashboard },
  { value: "questions", label: "Question bank", icon: BookOpen },
  { value: "progress", label: "My progress", icon: BarChart3 },
];

function Brand({ small = false }: { small?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`relative flex ${small ? "size-8" : "size-9"} items-center justify-center rounded-xl bg-primary text-white shadow-sm`}
      >
        <CheckCheck className="size-4.5" strokeWidth={2.3} />
        <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full border-2 border-card bg-[#bfdcc8]" />
      </div>
      <div className="leading-none">
        <div className="text-[15px] font-bold tracking-[-0.04em]">
          prep<span className="text-primary">board</span>
        </div>
        <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.17em] text-muted-foreground">
          INTERVIEW PRACTICE
        </div>
      </div>
    </div>
  );
}

function Navigation({
  view,
  onViewChange,
  onNewQuestion,
  onNavigate,
}: {
  view: View;
  onViewChange: (view: View) => void;
  onNewQuestion: () => void;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className="px-3 pt-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
        Workspace
      </div>
      <nav className="mt-2 space-y-1 px-2" aria-label="Main navigation">
        {items.map(({ value, label, icon: Icon }) => (
          <button
            type="button"
            key={value}
            onClick={() => {
              onViewChange(value);
              onNavigate?.();
            }}
            className={cn(
              "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors",
              view === value
                ? "bg-accent text-primary"
                : "text-[#626e66] hover:bg-muted hover:text-foreground",
            )}
            aria-current={view === value ? "page" : undefined}
          >
            <Icon
              className={cn(
                "size-4.25",
                view === value
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
              strokeWidth={1.8}
            />
            <span>{label}</span>
            {value === "questions" && (
              <ChevronRight className="ml-auto size-3.5 opacity-40" />
            )}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            onViewChange("settings");
            onNavigate?.();
          }}
          className={cn(
            "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors",
            view === "settings"
              ? "bg-accent text-primary"
              : "text-[#626e66] hover:bg-muted hover:text-foreground",
          )}
        >
          <Settings2
            className="size-4.25 text-muted-foreground"
            strokeWidth={1.8}
          />
          Preferences
        </button>
      </nav>
      <div className="mx-3 my-6 h-px bg-border/80" />
      <div className="px-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
        Make it count
      </div>
      <div className="mx-3 mt-3 rounded-xl border border-[#e7ede8] bg-[#f7faf7] p-3.5">
        <div className="flex size-7 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
          <Target className="size-3.5" />
        </div>
        <p className="mt-3 text-xs font-semibold">Your next rep is waiting.</p>
        <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
          Build a habit, one question at a time.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-3 h-8 w-full justify-between border-[#e4eae4] bg-white text-[11px]"
          onClick={onNewQuestion}
        >
          Add a question
          <Plus className="size-3.5" />
        </Button>
      </div>
      <div className="mt-auto p-3">
        <div className="rounded-lg bg-muted/70 px-3 py-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">
              Your workspace
            </span>
            <span className="size-1.5 rounded-full bg-primary" />
          </div>
          <div className="mt-1 text-xs font-medium">
            Private &amp; saved locally
          </div>
        </div>
      </div>
    </>
  );
}

export function AppSidebar({
  view,
  onViewChange,
  onNewQuestion,
  mobileOpen,
  onMobileOpenChange,
  name,
}: {
  view: View;
  onViewChange: (view: View) => void;
  onNewQuestion: () => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
  name: string;
}) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-62.5 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16.5 items-center border-b border-border/80 px-5">
          <Brand />
        </div>
        <Navigation
          view={view}
          onViewChange={onViewChange}
          onNewQuestion={onNewQuestion}
        />
        <div className="border-t border-border/80 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-[#e7efe9] text-xs font-semibold text-[#4e715d]">
              {name
                .split(/\s+/)
                .map((part) => part[0])
                .slice(0, 2)
                .join("")
                .toUpperCase() || "S"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-semibold">{name}</div>
              <div className="mt-0.5 truncate text-[10px] text-muted-foreground">
                Student account
              </div>
            </div>
            <button
              type="button"
              onClick={() => onViewChange("settings")}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
              aria-label="Open preferences"
            >
              <ArrowUpRight className="size-4" />
            </button>
          </div>
        </div>
      </aside>
      <div className="lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
          <SheetContent side="left" className="border-r p-0">
            <SheetHeader className="border-b border-border px-5 py-4.5">
              <SheetTitle>
                <Brand />
              </SheetTitle>
              <SheetDescription className="sr-only">
                Navigate your interview practice workspace
              </SheetDescription>
            </SheetHeader>
            <Navigation
              view={view}
              onViewChange={onViewChange}
              onNewQuestion={() => {
                onMobileOpenChange(false);
                onNewQuestion();
              }}
              onNavigate={() => onMobileOpenChange(false)}
            />
            <div className="mt-auto border-t border-border p-4">
              <Button
                className="w-full"
                onClick={() => {
                  onMobileOpenChange(false);
                  onNewQuestion();
                }}
              >
                <Plus className="size-4" />
                Add a question
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
export function MobileNavigationTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground lg:hidden"
      aria-label="Open navigation"
    >
      <LayoutDashboard className="size-4.5" />
    </button>
  );
}
export function AppBrand({ small = false }: { small?: boolean }) {
  return <Brand small={small} />;
}
