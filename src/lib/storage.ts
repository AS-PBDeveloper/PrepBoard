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
    Omit<Question, "id" | "createdAt" | "updatedAt" | "tags"> & {
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
    {
      title: "Best Time to Buy and Sell Stock",
      category: "DSA",
      difficulty: "Easy",
      status: "Pending",
      description: "Find the maximum profit from one buy and one sell.",
      updatedDaysAgo: 2,
    },
    {
      title: "Group Anagrams",
      category: "DSA",
      difficulty: "Medium",
      status: "Pending",
      description: "Group words that contain the same letters.",
      updatedDaysAgo: 3,
    },
    {
      title: "Number of Islands",
      category: "DSA",
      difficulty: "Medium",
      status: "Pending",
      description: "Count connected land regions in a grid.",
      updatedDaysAgo: 4,
    },
    {
      title: "Implement a Trie",
      category: "DSA",
      difficulty: "Medium",
      status: "Pending",
      description: "Support efficient word insertion, search, and prefix lookup.",
      updatedDaysAgo: 5,
    },
    {
      title: "Explain the event loop",
      category: "Technical",
      difficulty: "Medium",
      status: "Pending",
      description: "Describe the call stack, task queue, and microtasks.",
      updatedDaysAgo: 2,
    },
    {
      title: "How does a browser render a page?",
      category: "Technical",
      difficulty: "Medium",
      status: "Pending",
      description: "Explain DOM/CSSOM construction, layout, paint, and compositing.",
      updatedDaysAgo: 3,
    },
    {
      title: "Cherry-pick a commit",
      category: "Git",
      difficulty: "Easy",
      status: "Pending",
      description: "Explain when and how to apply a commit to another branch.",
      updatedDaysAgo: 2,
    },
    {
      title: "Describe a challenging project",
      category: "Interview",
      difficulty: "Medium",
      status: "Pending",
      description: "Prepare a concise story about your role, trade-offs, and impact.",
      updatedDaysAgo: 2,
    },
    {
      title: "Tell me about a mistake you learned from",
      category: "Interview",
      difficulty: "Medium",
      status: "Pending",
      description: "Choose a real example and focus on what changed afterward.",
      updatedDaysAgo: 4,
    },
    {
      title: "Build a searchable data table",
      category: "Machine Coding",
      difficulty: "Medium",
      status: "Pending",
      description: "Add sorting, filtering, pagination, and accessible controls.",
      updatedDaysAgo: 2,
    },
    {
      title: "Build a multi-step form",
      category: "Machine Coding",
      difficulty: "Medium",
      status: "Pending",
      description: "Handle validation, navigation, and preserving form progress.",
      updatedDaysAgo: 3,
    },
    {
      title: "Build a file explorer",
      category: "Machine Coding",
      difficulty: "Hard",
      status: "Pending",
      description: "Support nested folders, selection, and expand/collapse actions.",
      updatedDaysAgo: 5,
    },
  ];
  return items.map(({ updatedDaysAgo, ...question }, index) => ({
    ...question,
    tags: [],
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
    if (Array.isArray(parsed) && parsed.every(isQuestion)) {
      const savedQuestions = parsed.map((question) => ({
        ...question,
        tags: question.tags ?? [],
      }));
      const hasOriginalSamples = savedQuestions.some((question) =>
        /^sample-(?:[1-9]|1[0-6])$/.test(question.id),
      );
      if (!hasOriginalSamples) return savedQuestions;

      const savedIds = new Set(savedQuestions.map((question) => question.id));
      const additionalSamples = createSeedQuestions().filter((question) => {
        const sampleNumber = Number(question.id.slice("sample-".length));
        return sampleNumber > 16 && !savedIds.has(question.id);
      });
      return [...savedQuestions, ...additionalSamples];
    }
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
    (item.tags === undefined ||
      (Array.isArray(item.tags) &&
        item.tags.every(
          (tag) =>
            typeof tag === "string" &&
            tag.trim().length > 0 &&
            tag.length <= 24,
        ))) &&
    categories.includes(item.category as (typeof categories)[number]) &&
    ["Easy", "Medium", "Hard"].includes(item.difficulty ?? "") &&
    ["Pending", "In Progress", "Completed"].includes(item.status ?? "") &&
    isIsoTimestamp(item.createdAt) &&
    isIsoTimestamp(item.updatedAt)
  );
}
