import { useEffect, useState } from "react";
import {
  CheckCheck,
  RotateCcw,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SettingsPage({
  name,
  onNameChange,
  onRestore,
}: {
  name: string;
  onNameChange: (value: string) => void;
  onRestore: () => void;
}) {
  const [draftName, setDraftName] = useState(name);
  const [confirmRestore, setConfirmRestore] = useState(false);
  useEffect(() => setDraftName(name), [name]);
  const save = () => {
    const trimmed = draftName.trim();
    if (trimmed.length < 2) {
      toast.error("Add a name with at least two characters.");
      return;
    }
    onNameChange(trimmed);
    toast.success("Preferences saved", {
      description: "Your profile name is updated on this device.",
    });
  };
  return (
    <div className="mx-auto max-w-230 animate-appear space-y-7 px-4 py-7 sm:px-7 sm:py-9 lg:px-10 lg:py-10">
      <div>
        <div className="mb-2 text-[11px] font-medium text-muted-foreground">
          YOUR WORKSPACE
        </div>
        <h1 className="text-[27px] font-semibold tracking-[-0.055em] sm:text-[32px]">
          A workspace that feels like yours.
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Simple preferences for your personal practice space.
        </p>
      </div>
      <Card>
        <CardHeader className="flex-row items-center gap-3 space-y-0">
          <div className="flex size-9 items-center justify-center rounded-xl bg-accent text-primary">
            <UserRound className="size-4.5" />
          </div>
          <div>
            <CardTitle className="text-base">Your profile</CardTitle>
            <CardDescription className="mt-1">
              A name for your local workspace.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-md space-y-2">
            <Label htmlFor="profile-name">Display name</Label>
            <Input
              id="profile-name"
              value={draftName}
              onChange={(event) => setDraftName(event.target.value)}
              maxLength={50}
              placeholder="Your name"
              onKeyDown={(event) => {
                if (event.key === "Enter") save();
              }}
            />
          </div>
          <Button onClick={save} size="sm">
            <Save className="size-3.5" />
            Save preferences
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex-row items-center gap-3 space-y-0">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <ShieldCheck className="size-4.5" />
          </div>
          <div>
            <CardTitle className="text-base">Private by design</CardTitle>
            <CardDescription className="mt-1">
              No account, no server, no surprises.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 text-xs leading-5 text-muted-foreground sm:grid-cols-2">
            <div className="rounded-lg bg-muted/65 p-3.5">
              <div className="mb-1 font-semibold text-foreground">
                Saved in your browser
              </div>
              Your questions and preferences stay in LocalStorage on this
              device.
            </div>
            <div className="rounded-lg bg-muted/65 p-3.5">
              <div className="mb-1 font-semibold text-foreground">
                This device only
              </div>
              Use the same browser to keep your practice list across sessions.
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-[#f0e8e3]">
        <CardHeader>
          <CardTitle className="text-base">Restore sample questions</CardTitle>
          <CardDescription>
            Replace your current question list with the original practice
            examples. This will overwrite local changes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setConfirmRestore(true)}
          >
            <RotateCcw className="size-3.5" />
            Restore sample data
          </Button>
        </CardContent>
      </Card>
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <CheckCheck className="size-3.5 text-primary" />
        Prepboard · your practice, in one place.
      </div>
      <AlertDialog open={confirmRestore} onOpenChange={setConfirmRestore}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore sample questions?</AlertDialogTitle>
            <AlertDialogDescription>
              This replaces your current list with the example questions. Your
              profile name will stay as-is.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onRestore();
                setConfirmRestore(false);
                toast.success("Sample questions restored");
              }}
            >
              Restore samples
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
