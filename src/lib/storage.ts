import { categories, type Question } from "@/types/question";

const STORAGE_KEY = "prepboard.questions.v1";
const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(12, 0, 0, 0);
  return date.toISOString();
};

export function createSeedQuestions(): Question[] {
  const items: Array<
    Omit<Question, "id" | "createdAt" | "updatedAt"> & {
      updatedDaysAgo: number;
    }
  > = [
    {
      title: "Two Sum",
      category: "DSA",
      difficulty: "Easy",
      status: "Completed",
      description: "Find two numbers that add up to a target in one pass.",
      updatedDaysAgo: 0,
    },
    {
      title: "Valid Parentheses",
      category: "DSA",
      difficulty: "Easy",
      status: "Completed",
      description: "Use a stack to validate a sequence of brackets.",
      updatedDaysAgo: 1,
    },
    {
      title: "Longest Substring Without Repeating Characters",
      category: "DSA",
      difficulty: "Medium",
      status: "In Progress",
      description: "Find the longest substring with no duplicate characters.",
      updatedDaysAgo: 0,
    },
    {
      title: "Merge Intervals",
      category: "DSA",
      difficulty: "Medium",
      status: "Completed",
      description: "Merge all overlapping intervals in a collection.",
      updatedDaysAgo: 2,
    },
    {
      title: "Tell me about yourself",
      category: "Interview",
      difficulty: "Easy",
      status: "Completed",
      description: "Shape a concise story around your experience and goals.",
      updatedDaysAgo: 1,
    },
    {
      title: "A time you disagreed with a teammate",
      category: "Interview",
      difficulty: "Medium",
      status: "In Progress",
      description: "Prepare a specific example using the STAR framework.",
      updatedDaysAgo: 3,
    },
    {
      title: "Rebase vs. merge",
      category: "Git",
      difficulty: "Medium",
      status: "Pending",
      description:
        "Explain how these workflows affect project history and collaboration.",
      updatedDaysAgo: 3,
    },
    {
      title: "Resolve a merge conflict",
      category: "Git",
      difficulty: "Medium",
      status: "In Progress",
      description: "Walk through inspecting and resolving a conflict safely.",
      updatedDaysAgo: 1,
    },
    {
      title: "What happens after a URL is entered?",
      category: "Technical",
      difficulty: "Medium",
      status: "Pending",
      description: "Trace DNS, connection setup, HTTP, and browser rendering.",
      updatedDaysAgo: 4,
    },
    {
      title: "Explain HTTP caching",
      category: "Technical",
      difficulty: "Easy",
      status: "Pending",
      description: "Compare cache headers and browser cache behavior.",
      updatedDaysAgo: 6,
    },
    {
      title: "Design a rate limiter",
      category: "Machine Coding",
      difficulty: "Hard",
      status: "Pending",
      description: "Implement a token-bucket rate limiter with a clean API.",
      updatedDaysAgo: 4,
    },
    {
      title: "Build an autocomplete component",
      category: "Machine Coding",
      difficulty: "Medium",
      status: "Completed",
      description:
        "Support debounced search, keyboard navigation, and loading states.",
      updatedDaysAgo: 2,
    },
    {
      title: "Binary Tree Level Order Traversal",
      category: "DSA",
      difficulty: "Medium",
      status: "Pending",
      description: "Traverse a binary tree level by level using a queue.",
      updatedDaysAgo: 5,
    },
    {
      title: "Why do you want to join us?",
      category: "Interview",
      difficulty: "Easy",
      status: "Pending",
      description: "Connect your motivations with the team and role.",
      updatedDaysAgo: 6,
    },
    {
      title: "LRU Cache",
      category: "DSA",
      difficulty: "Hard",
      status: "Pending",
      description: "Design an LRU cache with constant-time operations.",
      updatedDaysAgo: 8,
    },
    {
      title: "Build a notification service",
      category: "Machine Coding",
      difficulty: "Hard",
      status: "Pending",
      description:
        "Model channels, retries, and delivery status in a small system.",
      updatedDaysAgo: 11,
    },
  ];
  return items.map(({ updatedDaysAgo, ...question }, index) => ({
    ...question,
    id: `sample-${index + 1}`,
    createdAt: daysAgo(updatedDaysAgo + 4),
    updatedAt: daysAgo(updatedDaysAgo),
  }));
}

export function readQuestions(): Question[] {
  if (typeof window === "undefined") return createSeedQuestions();
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = createSeedQuestions();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every(isQuestion)) return parsed;
    return createSeedQuestions();
  } catch {
    return createSeedQuestions();
  }
}

export function writeQuestions(questions: Question[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
}

function isQuestion(value: unknown): value is Question {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Question>;
  const isIsoTimestamp = (date: unknown) =>
    typeof date === "string" &&
    Number.isFinite(Date.parse(date)) &&
    new Date(date).toISOString() === date;
  return (
    typeof item.id === "string" &&
    item.id.length > 0 &&
    typeof item.title === "string" &&
    item.title.trim().length > 0 &&
    typeof item.description === "string" &&
    categories.includes(item.category as (typeof categories)[number]) &&
    ["Easy", "Medium", "Hard"].includes(item.difficulty ?? "") &&
    ["Pending", "In Progress", "Completed"].includes(item.status ?? "") &&
    isIsoTimestamp(item.createdAt) &&
    isIsoTimestamp(item.updatedAt)
  );
}
