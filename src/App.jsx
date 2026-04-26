import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

function Card({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function Button({ className = "", children, ...props }) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

function Tooltip({ text }) {
  return (
    <span className="relative group ml-2 inline-flex cursor-help text-zinc-400">
      ⓘ
      <span className="absolute left-1/2 top-full z-50 mt-2 hidden w-72 -translate-x-1/2 rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-xs leading-relaxed text-zinc-100 shadow-xl group-hover:block">
        {text}
      </span>
    </span>
  );
}

const STORAGE_KEY = "ai_engineer_training_app_v1";

function Icon({ name, className = "w-5 h-5" }) {
  const icons = {
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    ),
    circle: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
    book: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M4 4v15.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </svg>
    ),
    target: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    plus: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    ),
    trash: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
      </svg>
    ),
    external: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
      </svg>
    )
  };

  return icons[name] || null;
}

const resetAppData = () => {
  const confirmed = window.confirm(
    "Reset all training progress, notes, and GitHub project tracking? This cannot be undone."
  );
  if (!confirmed) return;

  window.localStorage.removeItem(STORAGE_KEY);

  setActiveWeek(1);
  setCompleted({});
  setNotes({});
  setProjects(starterProjects);
};

const defaultCourse = [
  {
    week: 1,
    title: "Rebuild Core Confidence",
    focus: "Engineer warm-up: syntax, debugging, Git, API basics, AI-assisted coding.",
    goals: [
      "Code every weekday for at least 45 minutes",
      "Fix one intentionally broken function or component per day",
      "Commit progress to GitHub at least 4 times",
      "Write one short technical note explaining what you fixed"
    ],
    lessons: [
      "JavaScript/TypeScript refresher: variables, functions, arrays, objects",
      "Git basics: branch, commit, push, pull request",
      "Debugging workflow: reproduce, isolate, inspect, fix, explain",
      "AI pair-programming loop: ask, inspect, verify, improve"
    ],
    codeExample: `// Debugging drill: fix the logic\nfunction isPassing(score) {\n  if (score > 70) {\n    return true;\n  }\n  return false;\n}\n\n// Improve: should 70 count as passing?\nconsole.log(isPassing(70));`,
    deliverable: "Small working app or utility with a README."
  },
  {
    week: 2,
    title: "Core Reps + First Mini Build",
    focus: "Turn scattered knowledge into repeatable confidence.",
    goals: [
      "Build one small app from scratch",
      "Practice reading generated code before running it",
      "Write a README with setup instructions",
      "Create a personal code-notes file"
    ],
    lessons: ["Components and props", "State and events", "API fetch basics", "Basic error handling"],
    codeExample: `async function getData(url) {\n  try {\n    const res = await fetch(url);\n    if (!res.ok) throw new Error("Request failed");\n    return await res.json();\n  } catch (error) {\n    console.error(error.message);\n    return null;\n  }\n}`,
    deliverable: "GitHub repo cleaned up with one polished mini project."
  },
  {
    week: 3,
    title: "Full-Stack Product Rep I",
    focus: "Start Project 1: AI Knowledge Extractor.",
    goals: ["Create UI for text input", "Create summary/action item output area", "Design the basic user flow", "Write the first prompt template"],
    lessons: ["User flow mapping", "Frontend form handling", "Structured AI prompts", "JSON-shaped outputs"],
    codeExample: "const prompt = `Summarize this text into:\\n1. Key points\\n2. Action items\\n3. Tags\\n4. Follow-up questions\\n\\nText:\\n{{USER_TEXT}}`;",
    deliverable: "Working frontend prototype for AI Knowledge Extractor."
  },
  {
    week: 4,
    title: "Full-Stack Product Rep II",
    focus: "Add backend/API layer and error handling.",
    goals: ["Create backend endpoint", "Connect UI to API", "Handle loading/error states", "Log edge cases and failures"],
    lessons: ["REST endpoint basics", "Request/response lifecycle", "Environment variables", "Validation and fallback states"],
    codeExample: `app.post("/api/analyze", async (req, res) => {\n  const { text } = req.body;\n  if (!text) return res.status(400).json({ error: "Text is required" });\n\n  // Call AI service here\n  return res.json({ summary: "Generated summary goes here" });\n});`,
    deliverable: "End-to-end working AI Knowledge Extractor."
  },
  {
    week: 5,
    title: "Polish + Explain",
    focus: "Make Project 1 portfolio-worthy.",
    goals: ["Improve UI clarity", "Write final README", "Add screenshots or demo notes", "Document tradeoffs and next steps"],
    lessons: ["Technical writing for projects", "Feature prioritization", "Clean repo structure", "Demo storytelling"],
    codeExample: `# README Structure\n\n## Problem\nWhat does this solve?\n\n## Tech Stack\nWhat did you use?\n\n## AI Workflow\nHow does AI process the input?\n\n## Tradeoffs\nWhat would you improve next?`,
    deliverable: "Deployed Project 1 + polished GitHub writeup."
  },
  {
    week: 6,
    title: "System Design: APIs + Auth",
    focus: "Learn to think above the code.",
    goals: ["Diagram one API flow", "Explain auth at a high level", "Design request/response objects", "Identify failure points"],
    lessons: ["API contracts", "Authentication vs authorization", "Status codes", "Rate limits"],
    codeExample: `// Example API response shape\n{\n  "userId": "123",\n  "status": "success",\n  "data": {\n    "projects": []\n  },\n  "errors": []\n}`,
    deliverable: "One-page system design note for Project 1."
  },
  {
    week: 7,
    title: "System Design: Data + Databases",
    focus: "Understand how data shapes systems.",
    goals: ["Design a simple schema", "Explain relationships between tables", "Practice basic SQL queries", "Identify what should/should not be stored"],
    lessons: ["Tables, rows, columns", "Primary and foreign keys", "Indexes conceptually", "Data privacy basics"],
    codeExample: `CREATE TABLE projects (\n  id SERIAL PRIMARY KEY,\n  title TEXT NOT NULL,\n  github_url TEXT,\n  created_at TIMESTAMP DEFAULT NOW()\n);`,
    deliverable: "Database schema for Project 2."
  },
  {
    week: 8,
    title: "System Design: Queues, Caching, Cost",
    focus: "Think like an engineer who understands tradeoffs.",
    goals: ["Explain when to use a queue", "Explain when to cache", "Estimate cost-sensitive AI usage", "Identify bottlenecks"],
    lessons: ["Background jobs", "Caching basics", "AI token cost awareness", "System bottlenecks"],
    codeExample: `// Pseudo-flow for expensive AI task\nsubmitTask() -> save pending job -> queue worker -> call AI -> save result -> notify user`,
    deliverable: "Architecture plan for Workflow Automation Dashboard."
  },
  {
    week: 9,
    title: "AI Engineering I",
    focus: "Move from using AI to designing AI workflows.",
    goals: ["Create reusable prompt templates", "Force structured output", "Add validation rules", "Compare AI responses for quality"],
    lessons: ["Prompt templates", "Structured outputs", "Evaluation criteria", "Guardrails"],
    codeExample: `const expectedShape = {\n  summary: "string",\n  actionItems: ["string"],\n  confidence: "low | medium | high"\n};`,
    deliverable: "Prompt library with 5 reusable prompts."
  },
  {
    week: 10,
    title: "AI Engineering II",
    focus: "Build Project 3: AI Portfolio Assistant.",
    goals: ["Create project/resume data source", "Build Q&A interface", "Return structured answers", "Add links to GitHub projects"],
    lessons: ["RAG conceptually", "Embeddings conceptually", "Context windows", "Answer quality checks"],
    codeExample: `const portfolioContext = [\n  { title: "AI Knowledge Extractor", skills: ["React", "API", "AI"] },\n  { title: "Workflow Dashboard", skills: ["System Design", "Database"] }\n];`,
    deliverable: "Working AI Portfolio Assistant prototype."
  },
  {
    week: 11,
    title: "Market Positioning",
    focus: "Package the new skillset clearly.",
    goals: ["Rewrite resume summary", "Update LinkedIn headline", "Clean GitHub pinned repos", "Write project case studies"],
    lessons: ["Resume positioning", "Technical storytelling", "Portfolio hierarchy", "Interview narrative"],
    codeExample: `Positioning line:\nAI-augmented software engineer building practical tools across full-stack systems, automation, and intelligent workflows.`,
    deliverable: "Updated resume, LinkedIn, GitHub, and portfolio copy."
  },
  {
    week: 12,
    title: "Proof + Interview Readiness",
    focus: "Turn training into evidence.",
    goals: ["Practice explaining all 3 projects", "Prepare 5 technical stories", "Do 3 mock system design prompts", "Create next 30-day continuation plan"],
    lessons: ["STAR stories", "System design interviews", "Debugging interviews", "Confidence through proof"],
    codeExample: `Interview story structure:\nSituation -> Problem -> Technical Decision -> Tradeoff -> Result -> What I learned`,
    deliverable: "Interview-ready portfolio and next-step plan."
  }
];

const dailyCadence = [
  { label: "20 min recall", detail: "Write what you remember from yesterday without notes." },
  { label: "40 min learn", detail: "Study one focused concept only." },
  { label: "45 min build", detail: "Apply it immediately in code." },
  { label: "15 min explain", detail: "Write a short note as if teaching someone else." }
];

const starterProjects = [
  { name: "AI Knowledge Extractor", url: "", status: "Planned", progress: 0, lastUpdated: "" },
  { name: "Workflow Automation Dashboard", url: "", status: "Planned", progress: 0, lastUpdated: "" },
  { name: "AI Portfolio Assistant", url: "", status: "Planned", progress: 0, lastUpdated: "" }
];

function formatDateTime(date = new Date()) {
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function getRepoNameFromUrl(url = "") {
  const trimmed = url.trim().replace(/\/$/, "");
  if (!trimmed) return "";

  try {
    const parsed = new URL(trimmed);
    const parts = parsed.pathname.split("/").filter(Boolean);
    return parts[1]?.replace(/\.git$/, "") || "";
  } catch {
    const parts = trimmed.split("/").filter(Boolean);
    return parts.at(-1)?.replace(/\.git$/, "") || "";
  }
}

function clampProgress(value) {
  const number = Number(value);
  if (Number.isNaN(number)) return 0;
  return Math.min(100, Math.max(0, number));
}

function safeParseState(raw) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function loadState() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  return safeParseState(window.localStorage.getItem(STORAGE_KEY));
}

function getAllChecklistIds(course = defaultCourse) {
  return course.flatMap((w) => [
    ...w.goals.map((_, i) => `w${w.week}-goal-${i}`),
    ...w.lessons.map((_, i) => `w${w.week}-lesson-${i}`),
    `w${w.week}-deliverable`
  ]);
}

function calculateProgress(completed = {}, course = defaultCourse) {
  const ids = getAllChecklistIds(course);
  if (!ids.length) return 0;
  const done = ids.filter((id) => Boolean(completed[id])).length;
  return Math.round((done / ids.length) * 100);
}

export function runTrainingAppTests() {
  console.assert(defaultCourse.length === 12, "Expected 12 weeks in the course.");
  console.assert(getAllChecklistIds().length === 108, "Expected 108 checklist items: 12 weeks x 9 items.");
  console.assert(calculateProgress({}) === 0, "Empty completion state should be 0%. ");
  console.assert(calculateProgress({ "w1-goal-0": true }) === 1, "One completed item should round to 1%. ");
  console.assert(safeParseState("not-json") === null, "Invalid saved JSON should not crash the app.");
  console.assert(safeParseState(JSON.stringify({ activeWeek: 3 }))?.activeWeek === 3, "Valid saved JSON should parse.");
  return "Training app tests completed.";
}

export default function TrainingApp() {
  const saved = loadState();
  const [activeWeek, setActiveWeek] = useState(saved?.activeWeek || 1);
  const [completed, setCompleted] = useState(saved?.completed || {});
  const [notes, setNotes] = useState(saved?.notes || {});
  const [projects, setProjects] = useState(saved?.projects || starterProjects);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ activeWeek, completed, notes, projects }));
    } catch {
      // Storage may be unavailable in some preview environments. The app still works for the current session.
    }
  }, [activeWeek, completed, notes, projects]);

  const week = defaultCourse.find((item) => item.week === activeWeek) || defaultCourse[0];
  const progress = useMemo(() => calculateProgress(completed), [completed]);

  const toggle = (id) => setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  const addProject = () => setProjects((prev) => [...prev, { name: "New Project", url: "", status: "Planned", progress: 0, lastUpdated: formatDateTime() }]);
  const updateProject = (index, field, value) => {
    setProjects((prev) =>
      prev.map((project, i) => {
        if (i !== index) return project;

        const updated = {
          ...project,
          [field]: field === "progress" ? clampProgress(value) : value,
          lastUpdated: formatDateTime()
        };

        if (field === "url") {
          const repoName = getRepoNameFromUrl(value);
          if (repoName && (!project.name || project.name === "New Project")) {
            updated.name = repoName;
          }
        }

        return updated;
      })
    );
  };
  const deleteProject = (index) => setProjects((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.header initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 p-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">12-Week Training App</p>
              <h1 className="text-3xl md:text-5xl font-bold mt-2">AI-Augmented Software Engineer Bootcamp</h1>
              <p className="text-zinc-300 mt-3 max-w-3xl">Build the proof. Train the judgment. Become the engineer who can design, direct, validate, and ship with AI.</p>
            </div>
            <div className="rounded-2xl bg-zinc-950/70 border border-zinc-700 p-4 min-w-44">
              <p className="text-sm text-zinc-400">Total Progress</p>
              <p className="text-4xl font-bold">{progress}%</p>
              <div className="h-2 bg-zinc-800 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-zinc-100 rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>
            {/* optional reset button */}
            {/* <button
              onClick={resetAppData}
              className="mt-4 w-full rounded-xl border border-red-900/60 bg-red-950/30 px-3 py-2 text-xs text-red-200 hover:bg-red-950/60"
            >
              Reset App Data
            </button> */}
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 space-y-4">
            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-3xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4"><Icon name="calendar" /><h2 className="font-semibold">Course Weeks</h2></div>
                <div className="space-y-2">
                  {defaultCourse.map((item) => (
                    <button key={item.week} onClick={() => setActiveWeek(item.week)} className={`w-full text-left rounded-2xl p-3 transition border ${activeWeek === item.week ? "bg-zinc-100 text-zinc-950 border-zinc-100" : "bg-zinc-950 border-zinc-800 hover:border-zinc-600"}`}>
                      <p className="text-sm font-bold">Week {item.week}</p>
                      <p className="text-xs opacity-80 line-clamp-1">{item.title}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-3xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4"><Icon name="target" /><h2 className="font-semibold">Daily Cadence</h2></div>
                <div className="space-y-3">
                  {dailyCadence.map((item) => (
                    <div key={item.label} className="rounded-2xl bg-zinc-950 border border-zinc-800 p-3">
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-xs text-zinc-400 mt-1">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          <main className="lg:col-span-6 space-y-6">
            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-3xl"><CardContent className="p-6"><p className="text-sm text-zinc-400">Week {week.week}</p><h2 className="text-3xl font-bold mt-1">{week.title}</h2><p className="text-zinc-300 mt-3">{week.focus}</p></CardContent></Card>

            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4"><Icon name="check" /><h3 className="text-xl font-bold">Goals</h3></div>
                <div className="space-y-2">{week.goals.map((goal, i) => <ChecklistItem key={`w${week.week}-goal-${i}`} id={`w${week.week}-goal-${i}`} text={goal} checked={completed[`w${week.week}-goal-${i}`]} onToggle={toggle} />)}</div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4"><Icon name="book" /><h3 className="text-xl font-bold">Lessons</h3></div>
                <div className="space-y-2">{week.lessons.map((lesson, i) => <ChecklistItem key={`w${week.week}-lesson-${i}`} id={`w${week.week}-lesson-${i}`} text={lesson} checked={completed[`w${week.week}-lesson-${i}`]} onToggle={toggle} />)}</div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="code" />
                  <h3 className="text-xl font-bold flex items-center">
                    Code / Example
                    <Tooltip text="This section gives you a concrete code pattern for the week. Don’t just read it: run it, break it, fix it, then explain what changed. That loop builds real engineering judgment." />
                  </h3>
                </div>
                <pre className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 overflow-auto text-sm text-zinc-200 whitespace-pre-wrap">{week.codeExample}</pre>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-3xl"><CardContent className="p-6"><h3 className="text-xl font-bold mb-3">Deliverable</h3><ChecklistItem id={`w${week.week}-deliverable`} text={week.deliverable} checked={completed[`w${week.week}-deliverable`]} onToggle={toggle} /></CardContent></Card>
          </main>

          <section className="lg:col-span-3 space-y-6">
            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-3xl">
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-3">Week Notes</h3>
                <textarea value={notes[`week-${week.week}`] || ""} onChange={(e) => setNotes((prev) => ({ ...prev, [`week-${week.week}`]: e.target.value }))} placeholder="Write what clicked, what confused you, what you built, and what to revisit." className="w-full min-h-64 rounded-2xl bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600" />
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-3xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2"><Icon name="github" /><h3 className="text-xl font-bold">GitHub Projects</h3></div>
                  <Button size="sm" onClick={addProject} className="rounded-xl"><Icon name="plus" className="w-4 h-4" /></Button>
                </div>
                <div className="space-y-3">
                  {projects.map((project, index) => (
                    <div key={`${project.name}-${index}`} className="rounded-2xl bg-zinc-950 border border-zinc-800 p-3 space-y-3">
                      <input value={project.name} onChange={(e) => updateProject(index, "name", e.target.value)} className="w-full bg-transparent font-semibold focus:outline-none" aria-label="Project name" />
                      <input value={project.url} onChange={(e) => updateProject(index, "url", e.target.value)} placeholder="GitHub URL" className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-2 text-xs focus:outline-none focus:ring-2 focus:ring-zinc-600" aria-label="GitHub URL" />

                      <div>
                        <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                          <span>Project completion</span>
                          <span>{project.progress || 0}%</span>
                        </div>
                        <input type="range" min="0" max="100" step="5" value={project.progress || 0} onChange={(e) => updateProject(index, "progress", e.target.value)} className="w-full" aria-label="Project completion percent" />
                      </div>

                      <div className="flex gap-2">
                        <select value={project.status} onChange={(e) => updateProject(index, "status", e.target.value)} className="flex-1 rounded-xl bg-zinc-900 border border-zinc-800 p-2 text-xs focus:outline-none" aria-label="Project status">
                          <option>Planned</option><option>In Progress</option><option>Polishing</option><option>Complete</option>
                        </select>
                        {project.url && <a href={project.url} target="_blank" rel="noreferrer" className="rounded-xl bg-zinc-800 px-3 py-2 hover:bg-zinc-700 text-xs flex items-center gap-1" aria-label="Open GitHub project"><Icon name="external" className="w-4 h-4" /> Open</a>}
                        <button onClick={() => deleteProject(index)} className="rounded-xl bg-zinc-800 p-2 hover:bg-zinc-700" aria-label="Delete project"><Icon name="trash" className="w-4 h-4" /></button>
                      </div>

                      <p className="text-[11px] text-zinc-500">Last updated: {project.lastUpdated || "Not updated yet"}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

function ChecklistItem({ id, text, checked, onToggle }) {
  return (
    <button onClick={() => onToggle(id)} className={`w-full flex items-start gap-3 text-left rounded-2xl border p-3 transition ${checked ? "bg-zinc-100 text-zinc-950 border-zinc-100" : "bg-zinc-950 border-zinc-800 hover:border-zinc-600"}`}>
      {checked ? <Icon name="check" className="w-5 h-5 mt-0.5 shrink-0" /> : <Icon name="circle" className="w-5 h-5 mt-0.5 shrink-0" />}
      <span className="text-sm leading-relaxed">{text}</span>
    </button>
  );
}
