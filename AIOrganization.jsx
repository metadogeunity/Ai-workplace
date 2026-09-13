import React, { useState, useEffect, useReducer, useMemo, useRef, createContext, useContext } from "react";
import {
  Brain, Users, Network, Gauge, ListChecks, MessagesSquare, FolderKanban, BookOpen,
  BarChart3, GitBranch, Settings, Search, Bell, HelpCircle, ChevronLeft, ChevronRight,
  ChevronDown, Play, Pause, Check, X, RotateCcw, Sparkles, ArrowRight, ArrowLeft, Plus,
  Zap, Shield, Target, TrendingUp, Activity, Cpu, Crown, Scale, Lightbulb, FlaskConical,
  Megaphone, Code, Eye, Hand, Circle, Clock, Layers, Command, PanelLeft, User, ShieldCheck
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, RadialBarChart, RadialBar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

/* ============================================================ THEME / GLOBAL CSS */
const GlobalStyles = () => (
  <style>{`
  :root{
    --bg:#090A0F; --bg2:#0C0E15; --surface:#12141D; --surface2:#171A25; --raise:#1B1F2C;
    --line:rgba(255,255,255,.07); --line2:rgba(255,255,255,.13);
    --tx:#EAECF3; --tx2:#969CB1; --tx3:#616881;
    --violet:#7C5CFF; --violet2:#9C86FF; --violetSoft:rgba(124,92,255,.13);
    --cyan:#2FD4E6; --blue:#5286FB; --green:#3ECF8E; --amber:#F5B84B; --red:#F26D6D;
    --shadow:0 24px 60px -20px rgba(0,0,0,.7);
    --font:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Roboto,ui-sans-serif,sans-serif;
    --mono:"SF Mono",ui-monospace,Menlo,Consolas,monospace;
  }
  *{box-sizing:border-box}
  .aio{font-family:var(--font);color:var(--tx);background:var(--bg);-webkit-font-smoothing:antialiased;line-height:1.5}
  .aio button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}
  .aio ::-webkit-scrollbar{width:9px;height:9px}
  .aio ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.09);border-radius:8px}
  .aio ::-webkit-scrollbar-track{background:transparent}
  .aio ::selection{background:rgba(124,92,255,.35)}
  .mono{font-family:var(--mono);font-variant-numeric:tabular-nums;letter-spacing:-.02em}
  .num{font-variant-numeric:tabular-nums}

  /* buttons */
  .btn{display:inline-flex;align-items:center;gap:8px;padding:9px 15px;border-radius:11px;font-size:13.5px;font-weight:520;
    transition:.16s ease;white-space:nowrap;border:1px solid transparent}
  .btn:focus-visible{outline:2px solid var(--violet);outline-offset:2px}
  .btn-primary{background:linear-gradient(180deg,#8A6BFF,#6B49F0);color:#fff;box-shadow:0 8px 24px -10px rgba(124,92,255,.9),inset 0 1px 0 rgba(255,255,255,.25)}
  .btn-primary:hover{filter:brightness(1.08);transform:translateY(-1px)}
  .btn-ghost{background:var(--surface2);border-color:var(--line2);color:var(--tx)}
  .btn-ghost:hover{background:var(--raise);border-color:rgba(255,255,255,.22)}
  .btn-quiet{color:var(--tx2);padding:8px 12px}
  .btn-quiet:hover{color:var(--tx);background:var(--surface2)}
  .btn-sm{padding:6px 11px;font-size:12.5px;border-radius:9px}
  .btn-approve{background:rgba(62,207,142,.12);border-color:rgba(62,207,142,.4);color:#7BE3B5}
  .btn-approve:hover{background:rgba(62,207,142,.2)}
  .btn-reject{background:rgba(242,109,109,.1);border-color:rgba(242,109,109,.4);color:#F79A9A}
  .btn-reject:hover{background:rgba(242,109,109,.18)}
  .btn-rev{background:rgba(245,184,75,.1);border-color:rgba(245,184,75,.38);color:#F5CB86}
  .btn-rev:hover{background:rgba(245,184,75,.18)}

  .card{background:var(--surface);border:1px solid var(--line);border-radius:16px}
  .glass{background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.01));border:1px solid var(--line);border-radius:16px;backdrop-filter:blur(8px)}
  .hair{height:1px;background:var(--line);border:0}
  .chip{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;padding:3px 9px;border-radius:999px;border:1px solid var(--line2);color:var(--tx2)}
  .kbd{font-family:var(--mono);font-size:11px;padding:2px 6px;border-radius:6px;border:1px solid var(--line2);color:var(--tx3)}

  .dot{width:7px;height:7px;border-radius:50%;display:inline-block;flex:none}
  .pulse{position:relative}
  .pulse::after{content:"";position:absolute;inset:-4px;border-radius:50%;border:1px solid currentColor;opacity:.6;animation:ring 1.8s ease-out infinite}
  @keyframes ring{0%{transform:scale(.7);opacity:.7}100%{transform:scale(2.4);opacity:0}}

  .fade{animation:fade .5s ease both}
  @keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  .fadein{animation:fadein .4s ease both}
  @keyframes fadein{from{opacity:0}to{opacity:1}}
  .slidein{animation:slidein .35s cubic-bezier(.2,.8,.2,1) both}
  @keyframes slidein{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:none}}
  .row-in{animation:rowin .4s ease both}
  @keyframes rowin{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}

  .flow{stroke-dasharray:4 6;animation:flow 1.1s linear infinite}
  @keyframes flow{to{stroke-dashoffset:-20}}
  .nodepulse{animation:nodep 2s ease-in-out infinite}
  @keyframes nodep{0%,100%{opacity:.35}50%{opacity:.9}}

  .navitem{display:flex;align-items:center;gap:11px;padding:8px 11px;border-radius:10px;font-size:13.5px;color:var(--tx2);
    transition:.14s;width:100%;text-align:left;position:relative}
  .navitem:hover{color:var(--tx);background:var(--surface2)}
  .navitem.active{color:var(--tx);background:var(--violetSoft)}
  .navitem.active::before{content:"";position:absolute;left:-9px;top:9px;bottom:9px;width:2.5px;border-radius:2px;background:var(--violet)}

  .kcol{min-width:0}
  .drawer{position:fixed;top:0;right:0;height:100%;width:min(440px,92vw);background:var(--bg2);border-left:1px solid var(--line2);z-index:60;box-shadow:var(--shadow);animation:draw .28s cubic-bezier(.2,.8,.2,1) both;overflow-y:auto}
  @keyframes draw{from{transform:translateX(100%)}to{transform:none}}
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:55;backdrop-filter:blur(2px);animation:fadein .2s ease both}
  .modal{position:fixed;inset:0;z-index:65;display:flex;align-items:center;justify-content:center;padding:20px}
  .modalcard{width:min(520px,96vw);background:var(--bg2);border:1px solid var(--line2);border-radius:18px;box-shadow:var(--shadow);animation:fade .25s ease both}

  .input{width:100%;background:var(--surface2);border:1px solid var(--line2);border-radius:11px;padding:11px 13px;color:var(--tx);font-size:14px;font-family:inherit}
  .input:focus{outline:none;border-color:rgba(124,92,255,.6);box-shadow:0 0 0 3px rgba(124,92,255,.14)}
  .input::placeholder{color:var(--tx3)}
  textarea.input{resize:vertical;min-height:120px;line-height:1.6}

  .rolecard{text-align:left;padding:13px;border-radius:13px;border:1px solid var(--line);background:var(--surface);transition:.14s;display:flex;flex-direction:column;gap:8px}
  .rolecard:hover{border-color:var(--line2);background:var(--surface2)}
  .rolecard.sel{border-color:var(--violet);background:var(--violetSoft);box-shadow:0 0 0 1px var(--violet) inset}

  .bg-grid{background-image:radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px);background-size:26px 26px}
  .glow-violet{position:absolute;border-radius:50%;filter:blur(90px);background:rgba(124,92,255,.28);pointer-events:none}
  .glow-cyan{position:absolute;border-radius:50%;filter:blur(90px);background:rgba(47,212,230,.16);pointer-events:none}

  .scaleH{font-weight:640;letter-spacing:-.03em;line-height:1.05}
  a{color:inherit}

  @media (prefers-reduced-motion: reduce){
    .aio *{animation:none!important;transition:none!important}
  }
  @media (max-width:900px){
    .hide-sm{display:none!important}
  }
  `}</style>
);

/* ============================================================ CONSTANTS / DATA */
const MODEL_META = {
  "Claude Opus": { p: "Anthropic", c: "#C08B5C" },
  "Claude Sonnet": { p: "Anthropic", c: "#C08B5C" },
  "Gemini 2.5 Pro": { p: "Google", c: "#5286FB" },
  "GPT-5": { p: "OpenAI", c: "#3ECF8E" },
  "Grok": { p: "xAI", c: "#9AA0B4" },
};
const modelColor = (m) => (MODEL_META[m]?.c || "var(--tx3)");

const ROLE_TREES = {
  Founder: ["Founder", "Operator", "Scale-up CEO", "Serial Founder", "Industry Leader"],
  Student: ["Student", "Researcher", "Specialist", "Expert", "Leader"],
  Lawyer: ["Associate", "Senior Associate", "Counsel", "Partner", "Managing Partner"],
  Filmmaker: ["Creator", "Director", "Showrunner", "Studio Lead", "Auteur"],
  Researcher: ["Researcher", "Senior Researcher", "PI", "Lab Director", "Field Authority"],
  Designer: ["Designer", "Senior Designer", "Lead", "Design Director", "VP Design"],
  Engineer: ["Engineer", "Senior Engineer", "Staff", "Principal", "Distinguished"],
  Consultant: ["Analyst", "Consultant", "Manager", "Principal", "Partner"],
  Teacher: ["Teacher", "Lead Teacher", "Dept Head", "Curriculum Lead", "Head of School"],
  Other: ["Starting out", "Practitioner", "Specialist", "Expert", "Leader"],
};
const ROLES = Object.keys(ROLE_TREES);
const ROLE_ICON = {
  Founder: Command, Student: BookOpen, Lawyer: Scale, Filmmaker: FlaskConical, Researcher: FlaskConical,
  Designer: Layers, Engineer: Code, Consultant: TrendingUp, Teacher: BookOpen, Other: Circle,
};

const AGENT_ICON = {
  Strategy: Target, "Market Research": Search, Cybersecurity: Shield, Product: Layers,
  "Competitive Intel": Eye, Marketing: Megaphone, "Critical Review": Scale, Research: FlaskConical, Creative: Sparkles,
};
const iconForRole = (r) => AGENT_ICON[r] || Brain;

const DEMO_AGENTS = [
  { id: "a1", name: "Strategy Agent", role: "Strategy", model: "Claude Opus", status: "working", specialty: "Positioning & GTM sequencing", successRate: 94, tasksCompleted: 38, currentTask: "Define beachhead ICP",
    purpose: "Sets direction. Turns the mission into a sequenced plan and pressure-tests each move against evidence.",
    instructions: "Always tie recommendations to a testable hypothesis. Prefer the smallest experiment that could disprove the plan.",
    tools: ["Web research", "Framework library", "Financial modeling"], personality: "Decisive, contrarian, allergic to vague claims", deps: ["Market Research", "Competitive Intel"] },
  { id: "a2", name: "Market Research Agent", role: "Market Research", model: "Gemini 2.5 Pro", status: "debating", specialty: "Demand signals & sizing", successRate: 91, tasksCompleted: 44, currentTask: "Size regulated-buyer segment",
    purpose: "Finds and verifies demand. Separates real pull from noise and quantifies the opportunity.",
    instructions: "Cite a source for every number. Flag confidence level. Never present a single data point as a trend.",
    tools: ["Web research", "Survey synthesis", "Data extraction"], personality: "Skeptical, evidence-first, patient", deps: [] },
  { id: "a3", name: "Cybersecurity Agent", role: "Cybersecurity", model: "Claude Opus", status: "thinking", specialty: "Threat model & compliance", successRate: 96, tasksCompleted: 29, currentTask: "Map PQC compliance drivers",
    purpose: "Grounds the product in real security requirements and regulatory timelines.",
    instructions: "Distinguish 'must-have for compliance' from 'nice-to-have'. Reference concrete standards.",
    tools: ["Standards DB", "Threat modeling", "Web research"], personality: "Precise, cautious, standards-driven", deps: ["Product"] },
  { id: "a4", name: "Product Agent", role: "Product", model: "GPT-5", status: "waiting", specialty: "Scope & validation design", successRate: 89, tasksCompleted: 33, currentTask: "Draft two-ICP validation test",
    purpose: "Translates strategy into what to build and how to test it before building.",
    instructions: "Every feature maps to a user problem. Propose the cheapest validation before any build.",
    tools: ["Prototyping", "User-flow mapping", "Prioritization"], personality: "Pragmatic, user-obsessed", deps: ["Strategy", "Cybersecurity"] },
  { id: "a5", name: "Competitive Intel Agent", role: "Competitive Intel", model: "Gemini 2.5 Pro", status: "ready", specialty: "Landscape & moats", successRate: 88, tasksCompleted: 21, currentTask: "—",
    purpose: "Watches competitors and identifies defensible positioning.",
    instructions: "Update the landscape when new entrants appear. Focus on wedges rivals can't easily copy.",
    tools: ["Web research", "Patent search", "Comparison matrix"], personality: "Watchful, analytical", deps: [] },
  { id: "a6", name: "Marketing Agent", role: "Marketing", model: "GPT-5", status: "ready", specialty: "Narrative & channels", successRate: 82, tasksCompleted: 17, currentTask: "—",
    purpose: "Shapes how the story reaches the right buyer through the right channel.",
    instructions: "Match message to buyer sophistication. Prefer channels where the ICP already gathers.",
    tools: ["Copywriting", "Channel analysis", "Positioning"], personality: "Persuasive, tuned to audience", deps: ["Strategy"] },
  { id: "a7", name: "Critical Review Agent", role: "Critical Review", model: "Claude Opus", status: "ready", specialty: "Red-team & assumptions", successRate: 97, tasksCompleted: 40, currentTask: "—",
    purpose: "The house skeptic. Attacks every recommendation before the Manager sees it.",
    instructions: "Find the weakest assumption in any output and state how it could be tested or how it fails.",
    tools: ["Assumption mapping", "Devil's advocate", "Risk analysis"], personality: "Relentless, fair, sharp", deps: [] },
];

const DEMO_TASKS = [
  { id: "t1", title: "Define beachhead ICP", agentId: "a1", model: "Claude Opus", priority: "High", status: "working" },
  { id: "t2", title: "Size regulated-buyer segment", agentId: "a2", model: "Gemini 2.5 Pro", priority: "High", status: "working" },
  { id: "t3", title: "Map PQC compliance drivers", agentId: "a3", model: "Claude Opus", priority: "Medium", status: "working" },
  { id: "t4", title: "Draft two-ICP validation test", agentId: "a4", model: "GPT-5", priority: "High", status: "review" },
  { id: "t5", title: "Competitor moat matrix", agentId: "a5", model: "Gemini 2.5 Pro", priority: "Medium", status: "backlog" },
  { id: "t6", title: "Narrative for regulated buyers", agentId: "a6", model: "GPT-5", priority: "Low", status: "backlog" },
  { id: "t7", title: "Red-team the GTM plan", agentId: "a7", model: "Claude Opus", priority: "Medium", status: "approved" },
  { id: "t8", title: "Initial market landscape", agentId: "a5", model: "Gemini 2.5 Pro", priority: "Medium", status: "complete" },
  { id: "t9", title: "Threat model v0", agentId: "a3", model: "Claude Opus", priority: "High", status: "complete" },
];

const DEMO_DEBATE = {
  question: "Banking security teams or fintech founders — which buyer do we chase first?",
  rounds: [
    { agentId: "a2", text: "The fintech segment shows strong surface demand and moves fast." },
    { agentId: "a3", text: "I disagree. Compliance urgency is concentrated in banks' security teams. That's where the mandate lives." },
    { agentId: "a4", text: "Both matter. We shouldn't guess — design one validation test that runs against both ICPs in parallel." },
    { agentId: "a1", text: "Agreed on testing both, but weight banking. Higher contract value, clearer regulatory deadline." },
  ],
  managerNote: "Continue with both hypotheses. Product Agent, design the validation test and report confidence by Friday.",
};

const DEMO_DECISION = {
  id: "d1",
  question: "Should the organization pursue the banking or fintech buyer first?",
  consensus: { banking: 62, fintech: 38 },
  reasoning: "Banking carries stronger regulatory urgency and materially higher contract value. The compliance deadline gives a concrete reason to buy now, which fintech lacks.",
};

const DEMO_DEBATES_LIST = [
  { id: "db1", question: "Banking vs fintech buyer first?", agents: ["a1", "a2", "a3", "a4"], rounds: 4, consensus: "Banking (weighted)", decision: "Test both, weight banking", confidence: 78,
    managerNote: DEMO_DEBATE.managerNote, roundsArr: DEMO_DEBATE.rounds },
  { id: "db2", question: "Build proprietary crypto or wrap existing libraries?", agents: ["a3", "a4", "a7"], rounds: 3, consensus: "Wrap + certify", decision: "Wrap vetted libraries, invest in certification", confidence: 84,
    managerNote: "Wrapping reduces risk and time-to-trust for regulated buyers.",
    roundsArr: [
      { agentId: "a4", text: "Rolling our own crypto is a trust liability with this buyer." },
      { agentId: "a3", text: "Correct. Certification of vetted primitives is what the buyer actually checks." },
      { agentId: "a7", text: "Then the moat isn't the math — it's the integration and the audit trail. Say so." },
    ] },
  { id: "db3", question: "Freemium or design-partner-only launch?", agents: ["a1", "a6", "a2"], rounds: 3, consensus: "Design partners", decision: "5 paid design partners, no freemium", confidence: 71,
    roundsArr: [
      { agentId: "a6", text: "Freemium builds a top-of-funnel we could convert later." },
      { agentId: "a1", text: "Wrong motion for enterprise security. This buyer signs contracts, not free trials." },
      { agentId: "a2", text: "Evidence agrees — regulated buyers procure through pilots, not self-serve." },
    ] },
];

const DEMO_ACTIVITY = [
  { time: "13:52", actor: "manager", text: "Approved recommendation: weight banking ICP", type: "Manager" },
  { time: "13:51", actor: "a2", text: "Research Agent updated recommendation with sizing" , type: "Agents"},
  { time: "13:48", actor: "manager", text: "Requested additional evidence on contract value", type: "Manager" },
  { time: "13:46", actor: "system", text: "Debate started: banking vs fintech", type: "Debates" },
  { time: "13:45", actor: "a4", text: "Product Agent challenged Research Agent's framing", type: "Debates" },
  { time: "13:44", actor: "a2", text: "Research Agent submitted demand evidence", type: "Agents" },
  { time: "13:42", actor: "a1", text: "Strategy Agent started ICP analysis", type: "Agents" },
];

const DEMO_EVOLUTION = [
  { day: "Day 1", text: "Organization created around your cybersecurity mission", tone: "base" },
  { day: "Day 7", text: "Research Agent promoted — highest evidence accuracy on the team", tone: "up" },
  { day: "Day 14", text: "Marketing Agent added as the GTM question matured", tone: "add" },
  { day: "Day 21", text: "Research model switched to Gemini 2.5 Pro for faster sourcing", tone: "swap" },
  { day: "Day 30", text: "Manager moved to evidence-first collaboration after two weak debates", tone: "rule" },
];
const DEMO_RECS = [
  { id: "r1", text: "Upgrade Research Agent to a higher-context model — sourcing depth is capping quality.", sev: "med", status: "open" },
  { id: "r2", text: "Add a Customer Interview Agent. Your goal now needs primary evidence, not just desk research.", sev: "high", status: "open" },
  { id: "r3", text: "Marketing Agent is underperforming (82%). Consider re-scoping or replacing its model.", sev: "low", status: "open" },
];

const DEMO_PROJECTS = [
  { id: "p1", name: "Quantum Security Startup", goal: "Validate and design a post-quantum security company for financial institutions", progress: 46, agents: 7, tasks: 9, decision: "Weight banking ICP", activity: "12m ago" },
  { id: "p2", name: "Fundraise Narrative", goal: "Build an investor story that survives a security-savvy audience", progress: 18, agents: 3, tasks: 4, decision: "Lead with regulatory deadline", activity: "2h ago" },
];

const DEMO_KNOWLEDGE = [
  { name: "PQC migration deadlines (NIST)", kind: "Source", used: ["a3", "a1"] },
  { name: "Interview — Bank CISO, Tier-1", kind: "Research", used: ["a2", "a3"] },
  { name: "Competitor landscape v2", kind: "Note", used: ["a5", "a1"] },
  { name: "Founder mission brief", kind: "User Context", used: ["a1", "a4", "a6"] },
  { name: "Regulated procurement patterns", kind: "Research", used: ["a2", "a6"] },
];

const STATUS_META = {
  thinking: { c: "var(--blue)", l: "Thinking" }, working: { c: "var(--violet)", l: "Working" },
  debating: { c: "var(--cyan)", l: "Debating" }, waiting: { c: "var(--tx3)", l: "Waiting" },
  approved: { c: "var(--green)", l: "Approved" }, rejected: { c: "var(--red)", l: "Rejected" },
  ready: { c: "var(--green)", l: "Ready" }, paused: { c: "var(--amber)", l: "Paused" }, revising: { c: "var(--amber)", l: "Revising" },
};
const PRIORITY_C = { High: "var(--red)", Medium: "var(--amber)", Low: "var(--tx3)" };

/* ============================================================ STORE */
const initialState = {
  route: "landing",
  selectedId: null,
  onboardingDone: true,
  live: true,
  profile: { name: "Alex Morgan", role: "Founder", industry: "Cybersecurity", level: "Founder",
    aspiration: "Serial Founder", objective: "Validate the cybersecurity startup this quarter",
    goal: "Validate and design a cybersecurity startup that helps financial institutions prepare for post-quantum security.",
    strategy: "Auto" },
  manager: { name: "AI Manager", model: "GPT-5", status: "Supervising", supervising: 7 },
  agents: DEMO_AGENTS,
  tasks: DEMO_TASKS,
  debate: DEMO_DEBATE,
  debatesList: DEMO_DEBATES_LIST,
  decision: DEMO_DECISION,
  decisionHistory: [
    { q: "Wrap vetted libraries vs build crypto?", outcome: "Approved", note: "Wrap + certify", when: "Yesterday" },
    { q: "Freemium vs design partners?", outcome: "Approved", note: "5 design partners", when: "2 days ago" },
  ],
  activity: DEMO_ACTIVITY,
  evolution: DEMO_EVOLUTION,
  recs: DEMO_RECS,
  projects: DEMO_PROJECTS,
  knowledge: DEMO_KNOWLEDGE,
  metrics: { decisions: 24, debates: 3, interventions: 1 },
  rules: {
    legalReview: true, budgetApproval: true, conflictDebate: true, autoModel: true, humanApprove: false,
  },
};

const stamp = () => { const d = new Date(); return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; };

function reducer(s, a) {
  switch (a.type) {
    case "NAV": return { ...s, route: a.route, selectedId: a.id ?? null };
    case "TOGGLE_LIVE": return { ...s, live: !s.live };
    case "SET_PROFILE": return { ...s, profile: { ...s.profile, ...a.patch } };
    case "ADD_ACTIVITY": return { ...s, activity: [{ time: stamp(), ...a.entry }, ...s.activity].slice(0, 40) };
    case "APPROVE": return {
      ...s, metrics: { ...s.metrics, decisions: s.metrics.decisions + 1 },
      decisionHistory: [{ q: s.decision.question, outcome: "Approved", note: "Weight banking ICP", when: "Just now" }, ...s.decisionHistory],
      agents: s.agents.map(g => g.status === "debating" ? { ...g, status: "approved" } : g),
      tasks: s.tasks.map(t => t.status === "review" ? { ...t, status: "approved" } : t),
      activity: [{ time: stamp(), actor: "manager", text: "Approved recommendation — banking ICP", type: "Manager" }, ...s.activity].slice(0, 40),
    };
    case "REJECT": return {
      ...s, metrics: { ...s.metrics, decisions: s.metrics.decisions + 1 },
      decisionHistory: [{ q: s.decision.question, outcome: "Rejected", note: "Needs stronger evidence", when: "Just now" }, ...s.decisionHistory],
      agents: s.agents.map(g => g.id === "a2" ? { ...g, status: "working", currentTask: "Re-gather demand evidence" } : g),
      tasks: s.tasks.map(t => t.status === "review" ? { ...t, status: "working" } : t),
      activity: [{ time: stamp(), actor: "manager", text: "Rejected — sent back to Research Agent", type: "Manager" }, ...s.activity].slice(0, 40),
    };
    case "REVISION": {
      const newTask = { id: "t" + Date.now(), title: "Revision: add contract-value evidence", agentId: "a1", model: "Claude Opus", priority: "High", status: "working" };
      return {
        ...s, metrics: { ...s.metrics, decisions: s.metrics.decisions + 1 },
        tasks: [newTask, ...s.tasks],
        agents: s.agents.map(g => g.id === "a1" ? { ...g, status: "revising", currentTask: newTask.title } : g),
        activity: [{ time: stamp(), actor: "manager", text: "Requested revision from Strategy Agent", type: "Manager" }, ...s.activity].slice(0, 40),
      };
    }
    case "OVERRIDE": return {
      ...s, metrics: { ...s.metrics, decisions: s.metrics.decisions + 1 },
      decisionHistory: [{ q: s.decision.question, outcome: "Overridden", note: "Founder chose fintech", when: "Just now" }, ...s.decisionHistory],
      activity: [{ time: stamp(), actor: "user", text: "You overrode the Manager decision", type: "User" }, ...s.activity].slice(0, 40),
    };
    case "TOGGLE_PAUSE": return {
      ...s, agents: s.agents.map(g => g.id === a.id ? { ...g, status: g.status === "paused" ? "ready" : "paused" } : g),
      activity: [{ time: stamp(), actor: a.id, text: `${s.agents.find(x => x.id === a.id)?.name} ${s.agents.find(x => x.id === a.id)?.status === "paused" ? "resumed" : "paused"}`, type: "Agents" }, ...s.activity].slice(0, 40),
    };
    case "REPLACE_MODEL": return {
      ...s, agents: s.agents.map(g => g.id === a.id ? { ...g, model: a.model } : g),
      activity: [{ time: stamp(), actor: a.id, text: `Model changed to ${a.model}`, type: "Agents" }, ...s.activity].slice(0, 40),
    };
    case "REMOVE_AGENT": return {
      ...s, agents: s.agents.filter(g => g.id !== a.id), manager: { ...s.manager, supervising: Math.max(0, s.manager.supervising - 1) },
      activity: [{ time: stamp(), actor: "user", text: `Removed ${s.agents.find(x => x.id === a.id)?.name}`, type: "User" }, ...s.activity].slice(0, 40),
    };
    case "TOGGLE_RULE": return { ...s, rules: { ...s.rules, [a.key]: !s.rules[a.key] } };
    case "MOVE_TASK": {
      const order = ["backlog", "working", "review", "approved", "complete"];
      return { ...s, tasks: s.tasks.map(t => t.id === a.id ? { ...t, status: order[Math.min(order.length - 1, Math.max(0, order.indexOf(t.status) + a.dir))] } : t) };
    }
    case "RESOLVE_REC": return {
      ...s, recs: s.recs.map(r => r.id === a.id ? { ...r, status: a.status } : r),
      activity: a.status === "accepted" ? [{ time: stamp(), actor: "system", text: "Applied evolution recommendation", type: "User" }, ...s.activity].slice(0, 40) : s.activity,
    };
    case "GENERATE": {
      // build an org from profile (kept simple: reuse demo but relabel manager count)
      return { ...s, onboardingDone: true, manager: { ...s.manager, supervising: s.agents.length } };
    }
    case "TICK": {
      if (!s.live) return s;
      const rotate = ["thinking", "working", "debating", "waiting", "ready"];
      const agents = s.agents.map(g => {
        if (g.status === "paused" || g.status === "revising") return g;
        if (Math.random() < 0.34) { const i = rotate.indexOf(g.status); return { ...g, status: rotate[(i + 1 + Math.floor(Math.random() * 2)) % rotate.length] }; }
        return g;
      });
      let activity = s.activity;
      if (Math.random() < 0.5) {
        const g = agents[Math.floor(Math.random() * agents.length)];
        const verbs = ["is analyzing evidence", "submitted an update", "challenged a peer", "requested a source", "refined its recommendation"];
        activity = [{ time: stamp(), actor: g.id, text: `${g.name} ${verbs[Math.floor(Math.random() * verbs.length)]}`, type: "Agents" }, ...s.activity].slice(0, 40);
      }
      return { ...s, agents, activity };
    }
    default: return s;
  }
}

const Ctx = createContext(null);
const useStore = () => useContext(Ctx);

/* ============================================================ SMALL UI */
const Btn = ({ variant = "ghost", size, icon: Icon, children, className = "", ...p }) => (
  <button className={`btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`} {...p}>
    {Icon && <Icon size={size === "sm" ? 14 : 15.5} />}{children}
  </button>
);
const StatusDot = ({ status, pulse }) => {
  const m = STATUS_META[status] || { c: "var(--tx3)", l: status };
  const active = ["thinking", "working", "debating", "revising"].includes(status);
  return <span className={`dot ${pulse && active ? "pulse" : ""}`} style={{ background: m.c, color: m.c }} />;
};
const StatusText = ({ status }) => {
  const m = STATUS_META[status] || { c: "var(--tx3)", l: status };
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, color: m.c }}>
    <StatusDot status={status} pulse />{m.l}</span>;
};
const ModelTag = ({ model }) => (
  <span className="chip" style={{ borderColor: "var(--line2)" }}>
    <span className="dot" style={{ background: modelColor(model) }} />{model}
  </span>
);
const Metric = ({ icon: Icon, label, value, accent, sub }) => (
  <div className="card" style={{ padding: "15px 16px", display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 9, color: "var(--tx2)", fontSize: 12.5 }}>
      <Icon size={15} style={{ color: accent || "var(--violet)" }} />{label}</div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
      <span className="num" style={{ fontSize: 26, fontWeight: 640, letterSpacing: "-.02em" }}>{value}</span>
      {sub && <span style={{ fontSize: 12, color: "var(--tx3)" }}>{sub}</span>}
    </div>
  </div>
);
const SectionTitle = ({ children, right }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
    <h2 style={{ fontSize: 16.5, fontWeight: 600, letterSpacing: "-.01em", margin: 0 }}>{children}</h2>{right}
  </div>
);
const Toggle = ({ on, onClick }) => (
  <button onClick={onClick} aria-pressed={on} style={{
    width: 38, height: 22, borderRadius: 99, padding: 2, transition: ".16s",
    background: on ? "var(--violet)" : "var(--surface2)", border: "1px solid var(--line2)", flex: "none",
  }}>
    <span style={{ display: "block", width: 16, height: 16, borderRadius: 99, background: "#fff", transform: on ? "translateX(16px)" : "none", transition: ".16s" }} />
  </button>
);

/* ============================================================ ORG GRAPH (signature) */
function OrgGraph({ mode = "hierarchy", height = 380, activeIds = [], onNode }) {
  const { state } = useStore();
  const agents = state.agents;
  const W = 900, H = height;
  const ref = useRef(null);
  const [w, setW] = useState(W);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el); setW(el.clientWidth); return () => ro.disconnect();
  }, []);
  const scale = w / W;

  // layout
  const mgr = { x: W / 2, y: 58 };
  const human = { x: W / 2, y: 18 };
  const hubY = H - 70;
  const cols = agents.length;
  const pad = 90;
  const nodes = agents.map((g, i) => ({
    ...g, x: cols === 1 ? W / 2 : pad + (i * (W - pad * 2)) / (cols - 1), y: 172,
  }));
  const hub = { x: W / 2, y: hubY };

  const NodeCircle = ({ n, r = 26, color, glow, icon: Icon, label, sub, dashed, onClick, status }) => {
    const active = activeIds.includes(n?.id) || glow;
    return (
      <g style={{ cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
        {active && <circle cx={n.x} cy={n.y} r={r + 12} fill="none" stroke={color} strokeWidth="1" opacity="0.25" className="nodepulse" />}
        <circle cx={n.x} cy={n.y} r={r} fill="var(--surface2)" stroke={active ? color : "var(--line2)"} strokeWidth={active ? 1.6 : 1}
          strokeDasharray={dashed ? "3 4" : "0"} style={{ filter: active ? `drop-shadow(0 0 10px ${color})` : "none", transition: ".3s" }} />
        <foreignObject x={n.x - r} y={n.y - r} width={r * 2} height={r * 2}>
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color }}>
            <Icon size={r * 0.72} />
          </div>
        </foreignObject>
        <text x={n.x} y={n.y + r + 16} textAnchor="middle" fill="var(--tx)" fontSize="12.5" fontWeight="560" style={{ letterSpacing: "-.01em" }}>{label}</text>
        {sub && <text x={n.x} y={n.y + r + 31} textAnchor="middle" fill="var(--tx3)" fontSize="10.5">{sub}</text>}
      </g>
    );
  };

  const edge = (x1, y1, x2, y2, active, color = "var(--violet)") => (
    <path d={`M${x1},${y1} C ${x1},${(y1 + y2) / 2} ${x2},${(y1 + y2) / 2} ${x2},${y2}`}
      fill="none" stroke={active ? color : "var(--line2)"} strokeWidth={active ? 1.7 : 1}
      opacity={active ? 0.95 : 0.5} className={active ? "flow" : ""} style={{ transition: ".3s" }} />
  );

  return (
    <div ref={ref} style={{ width: "100%" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H * scale} style={{ overflow: "visible" }}>
        {/* human -> manager */}
        {edge(human.x, human.y + 12, mgr.x, mgr.y - 26, true, "var(--cyan)")}
        {/* manager -> agents */}
        {nodes.map(n => <g key={"e" + n.id}>{edge(mgr.x, mgr.y + 26, n.x, n.y - 26, activeIds.includes(n.id) || ["debating", "working", "thinking"].includes(n.status), activeIds.includes(n.id) ? "var(--cyan)" : "var(--violet)")}</g>)}
        {/* agents -> hub */}
        {nodes.map(n => <g key={"h" + n.id}>{edge(n.x, n.y + 26, hub.x, hub.y - 20, activeIds.includes(n.id), "var(--cyan)")}</g>)}

        {/* human */}
        <g>
          <circle cx={human.x} cy={human.y} r={13} fill="var(--raise)" stroke="var(--cyan)" strokeWidth="1.4" />
          <foreignObject x={human.x - 13} y={human.y - 13} width={26} height={26}>
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cyan)" }}><User size={13} /></div>
          </foreignObject>
        </g>
        {/* manager */}
        <NodeCircle n={mgr} r={30} color="var(--violet2)" glow icon={Crown} label="AI Manager"
          sub={`Supervising ${nodes.length}`} onClick={onNode ? () => onNode("manager") : undefined} />
        {/* agents */}
        {nodes.map(n => (
          <NodeCircle key={n.id} n={n} r={26} color={STATUS_META[n.status]?.c || "var(--violet)"}
            icon={iconForRole(n.role)} label={n.role} sub={n.model.split(" ")[0]}
            status={n.status} onClick={onNode ? () => onNode(n.id) : undefined} />
        ))}
        {/* hub */}
        <g>
          <circle cx={hub.x} cy={hub.y} r={16} fill="var(--surface2)" stroke="var(--cyan)" strokeWidth="1" strokeDasharray="3 4" className="nodepulse" />
          <text x={hub.x} y={hub.y + 34} textAnchor="middle" fill="var(--cyan)" fontSize="11" fontWeight="560">Collaboration</text>
        </g>
      </svg>
    </div>
  );
}

/* ============================================================ LANDING */
function Landing() {
  const { dispatch } = useStore();
  const nav = (route) => dispatch({ type: "NAV", route });
  const steps = [
    { i: Command, t: "Define yourself", d: "Your role, level and where you're headed." },
    { i: Target, t: "Set the objective", d: "Say the goal in your own words." },
    { i: Network, t: "Build the organization", d: "We assemble the specialists you need." },
    { i: MessagesSquare, t: "Agents collaborate", d: "They work, challenge and debate." },
    { i: Crown, t: "Manager reviews", d: "Evaluates, approves, requests revisions." },
    { i: GitBranch, t: "It evolves", d: "The org adapts to outcomes and feedback." },
  ];
  return (
    <div className="aio bg-grid" style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <div className="glow-violet" style={{ width: 520, height: 520, top: -180, left: "20%" }} />
      <div className="glow-cyan" style={{ width: 460, height: 460, top: 40, right: "5%" }} />
      {/* top */}
      <header style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 620, letterSpacing: "-.02em" }}>
          <Logo /> AI Organization
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="quiet" onClick={() => nav("dashboard")} className="hide-sm">See the demo</Btn>
          <Btn variant="primary" onClick={() => nav("onboard-profile")}>Build my organization</Btn>
        </div>
      </header>

      {/* hero */}
      <section style={{ position: "relative", maxWidth: 1160, margin: "0 auto", padding: "44px 28px 20px", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 40, alignItems: "center" }}>
        <div className="fade">
          <div className="chip" style={{ marginBottom: 20 }}><Sparkles size={13} style={{ color: "var(--violet)" }} /> The AI organization operating system</div>
          <h1 className="scaleH" style={{ fontSize: "clamp(34px,4.6vw,56px)", margin: "0 0 18px" }}>
            Build the AI organization that works for you.
          </h1>
          <p style={{ color: "var(--tx2)", fontSize: 17, maxWidth: 500, margin: "0 0 28px", lineHeight: 1.6 }}>
            Tell us who you are, where you're going, and what you're trying to achieve. We'll assemble,
            orchestrate and manage the AI specialists you need — with a Manager keeping them honest.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Btn variant="primary" onClick={() => nav("onboard-profile")} icon={ArrowRight}>Build my AI organization</Btn>
            <Btn variant="ghost" onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>See how it works</Btn>
          </div>
          <div style={{ display: "flex", gap: 22, marginTop: 34, color: "var(--tx3)", fontSize: 13 }}>
            <span>Works for any field</span><span>·</span><span>Multi-model</span><span>·</span><span>You stay in control</span>
          </div>
        </div>
        <div className="glass fade" style={{ padding: "20px 8px 10px", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0 14px 6px", fontSize: 12, color: "var(--tx2)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}><span className="dot pulse" style={{ background: "var(--cyan)", color: "var(--cyan)" }} /> Live organization</span>
            <span className="mono">Alex Morgan · Founder</span>
          </div>
          <OrgGraph mode="hierarchy" height={340} activeIds={["a1", "a2", "a3"]} />
        </div>
      </section>

      {/* how it works */}
      <section id="how" style={{ position: "relative", maxWidth: 1160, margin: "40px auto 0", padding: "40px 28px 20px" }}>
        <h2 className="scaleH" style={{ fontSize: 26, margin: "0 0 6px" }}>From a sentence about you to a working team.</h2>
        <p style={{ color: "var(--tx2)", margin: "0 0 28px" }}>Six moves. The platform does the assembly — you do the deciding.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 14 }}>
          {steps.map((s, i) => (
            <div key={i} className="card" style={{ padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--violetSoft)", display: "grid", placeItems: "center", color: "var(--violet2)" }}><s.i size={17} /></span>
                <span className="mono" style={{ color: "var(--tx3)", fontSize: 12 }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div style={{ fontWeight: 570, marginBottom: 5 }}>{s.t}</div>
              <div style={{ color: "var(--tx2)", fontSize: 13.5, lineHeight: 1.55 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ position: "relative", maxWidth: 900, margin: "50px auto", padding: "40px 28px", textAlign: "center" }}>
        <h2 className="scaleH" style={{ fontSize: 30, margin: "0 0 14px" }}>You're the CEO. The AI is the workforce.</h2>
        <p style={{ color: "var(--tx2)", maxWidth: 560, margin: "0 auto 26px" }}>Stop picking agents off a shelf. Describe the outcome you want and get an organization designed around it.</p>
        <Btn variant="primary" onClick={() => nav("onboard-profile")} icon={ArrowRight}>Create your organization</Btn>
      </section>

      <footer style={{ borderTop: "1px solid var(--line)", padding: "22px 28px", color: "var(--tx3)", fontSize: 13, textAlign: "center" }}>
        AI Organization — a prototype. Your AI organization, built around you.
      </footer>
    </div>
  );
}
const Logo = () => (
  <span style={{ width: 26, height: 26, borderRadius: 8, background: "linear-gradient(145deg,#8A6BFF,#5286FB)", display: "grid", placeItems: "center", boxShadow: "0 6px 18px -6px rgba(124,92,255,.9)" }}>
    <Network size={15} color="#fff" />
  </span>
);

/* ============================================================ ONBOARDING */
const STEPS = [
  { key: "onboard-profile", n: "01", t: "Profile" },
  { key: "onboard-role", n: "02", t: "Role" },
  { key: "onboard-goal", n: "03", t: "Goal" },
  { key: "onboard-models", n: "04", t: "Models" },
  { key: "generating", n: "05", t: "Organization" },
];
function ProgressRail({ active }) {
  const idx = STEPS.findIndex(s => s.key === active);
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 34, flexWrap: "wrap" }}>
      {STEPS.map((s, i) => (
        <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 9, padding: "6px 12px", borderRadius: 99,
          border: "1px solid " + (i <= idx ? "var(--line2)" : "var(--line)"), color: i <= idx ? "var(--tx)" : "var(--tx3)",
          background: i === idx ? "var(--violetSoft)" : "transparent", fontSize: 12.5 }}>
          <span className="mono" style={{ color: i < idx ? "var(--green)" : i === idx ? "var(--violet2)" : "var(--tx3)" }}>{i < idx ? "✓" : s.n}</span>{s.t}
        </div>
      ))}
    </div>
  );
}
function OnboardShell({ active, title, sub, children, onBack, onNext, nextLabel = "Continue", nextIcon = ArrowRight, canNext = true }) {
  return (
    <div className="aio bg-grid" style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <div className="glow-violet" style={{ width: 460, height: 460, top: -160, right: "12%" }} />
      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", padding: "34px 24px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, marginBottom: 34 }}><Logo /> AI Organization</div>
        <ProgressRail active={active} />
        <h1 className="scaleH" style={{ fontSize: 30, margin: "0 0 8px" }}>{title}</h1>
        {sub && <p style={{ color: "var(--tx2)", margin: "0 0 26px", fontSize: 15.5 }}>{sub}</p>}
        <div className="fade">{children}</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
          <Btn variant="quiet" icon={ArrowLeft} onClick={onBack}>Back</Btn>
          <Btn variant="primary" icon={nextIcon} onClick={onNext} disabled={!canNext} style={{ opacity: canNext ? 1 : 0.5 }}>{nextLabel}</Btn>
        </div>
      </div>
    </div>
  );
}
const Field = ({ label, children }) => (
  <label style={{ display: "block", marginBottom: 16 }}>
    <span style={{ display: "block", fontSize: 13, color: "var(--tx2)", marginBottom: 7 }}>{label}</span>{children}
  </label>
);

function OnboardProfile() {
  const { state, dispatch } = useStore();
  const [p, setP] = useState(state.profile);
  const set = (k, v) => setP({ ...p, [k]: v });
  return (
    <OnboardShell active="onboard-profile" title="First, tell us about yourself."
      sub="This shapes who your organization is built for."
      onBack={() => dispatch({ type: "NAV", route: "landing" })}
      onNext={() => { dispatch({ type: "SET_PROFILE", patch: p }); dispatch({ type: "NAV", route: "onboard-role" }); }}
      canNext={p.name && p.role}>
      <Field label="Your name"><input className="input" value={p.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Alex Morgan" /></Field>
      <Field label="Industry or area"><input className="input" value={p.industry} onChange={e => set("industry", e.target.value)} placeholder="e.g. Cybersecurity, film, education" /></Field>
      <div style={{ fontSize: 13, color: "var(--tx2)", marginBottom: 10 }}>What best describes your current role?</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 10 }}>
        {ROLES.map(r => { const I = ROLE_ICON[r]; return (
          <button key={r} className={`rolecard ${p.role === r ? "sel" : ""}`} onClick={() => set("role", r)}>
            <I size={17} style={{ color: p.role === r ? "var(--violet2)" : "var(--tx2)" }} />
            <span style={{ fontSize: 13.5, fontWeight: 520 }}>{r}</span>
          </button>
        ); })}
      </div>
    </OnboardShell>
  );
}

function OnboardRole() {
  const { state, dispatch } = useStore();
  const [p, setP] = useState(state.profile);
  const set = (k, v) => setP({ ...p, [k]: v });
  const tree = ROLE_TREES[p.role] || ROLE_TREES.Other;
  return (
    <OnboardShell active="onboard-role" title="Where are you now — and where do you want to go?"
      sub="Your organization will evolve along this path with you."
      onBack={() => dispatch({ type: "NAV", route: "onboard-profile" })}
      onNext={() => { dispatch({ type: "SET_PROFILE", patch: p }); dispatch({ type: "NAV", route: "onboard-goal" }); }}>
      <Field label="Current level"><input className="input" value={p.level} onChange={e => set("level", e.target.value)} placeholder="e.g. Early-stage founder" /></Field>
      <Field label="Long-term aspiration"><input className="input" value={p.aspiration} onChange={e => set("aspiration", e.target.value)} placeholder="Where you want to end up" /></Field>
      <Field label="Short-term objective"><input className="input" value={p.objective} onChange={e => set("objective", e.target.value)} placeholder="What success looks like this quarter" /></Field>
      <div className="card" style={{ padding: 18, marginTop: 6 }}>
        <div style={{ fontSize: 13, color: "var(--tx2)", marginBottom: 16 }}>Your progression path</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
          {tree.map((n, i) => (
            <React.Fragment key={n}>
              <span style={{ padding: "7px 13px", borderRadius: 99, fontSize: 12.5, border: "1px solid " + (i === 0 ? "var(--violet)" : "var(--line2)"),
                background: i === 0 ? "var(--violetSoft)" : "var(--surface2)", color: i === 0 ? "var(--tx)" : "var(--tx2)" }}>{n}</span>
              {i < tree.length - 1 && <ArrowRight size={13} style={{ color: "var(--tx3)" }} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </OnboardShell>
  );
}

function OnboardGoal() {
  const { state, dispatch } = useStore();
  const [goal, setGoal] = useState(state.profile.goal);
  const suggestions = ["Validate an idea", "Build a product", "Research a topic", "Prepare for an exam", "Create a film", "Analyze a legal case", "Build a curriculum", "Launch a business"];
  return (
    <OnboardShell active="onboard-goal" title="What are you trying to accomplish?"
      sub="Describe it in your own words. The Manager will translate this into a mission."
      onBack={() => dispatch({ type: "NAV", route: "onboard-role" })}
      nextLabel="Design my AI organization" nextIcon={Sparkles} canNext={goal.trim().length > 6}
      onNext={() => { dispatch({ type: "SET_PROFILE", patch: { goal } }); dispatch({ type: "NAV", route: "onboard-models" }); }}>
      <textarea className="input" value={goal} onChange={e => setGoal(e.target.value)}
        placeholder="e.g. I want to build a cybersecurity startup that helps financial institutions prepare for post-quantum security." />
      <div style={{ fontSize: 13, color: "var(--tx2)", margin: "18px 0 10px" }}>Or start from one of these</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {suggestions.map(s => (
          <button key={s} className="chip" style={{ cursor: "pointer" }} onClick={() => setGoal(g => g ? g : s + " — ")}>{s}</button>
        ))}
      </div>
    </OnboardShell>
  );
}

function OnboardModels() {
  const { state, dispatch } = useStore();
  const [auto, setAuto] = useState(state.rules.autoModel);
  const [strategy, setStrategy] = useState(state.profile.strategy || "Auto");
  const [matrix, setMatrix] = useState({ Research: "Gemini 2.5 Pro", Strategy: "Claude Opus", Creative: "GPT-5", Coding: "Claude Sonnet", Analysis: "Gemini 2.5 Pro" });
  const models = Object.keys(MODEL_META);
  const rows = Object.keys(matrix);
  const strategies = ["Auto", "Balanced", "Maximum quality", "Lowest cost", "Fastest"];
  return (
    <OnboardShell active="onboard-models" title="Choose the intelligence behind your organization."
      sub="Different models are better at different jobs. Leave it on auto and we'll assign the strongest fit per role."
      onBack={() => dispatch({ type: "NAV", route: "onboard-goal" })}
      nextLabel="Generate my AI team" nextIcon={Sparkles}
      onNext={() => { dispatch({ type: "SET_PROFILE", patch: { strategy } }); dispatch({ type: "GENERATE" }); dispatch({ type: "NAV", route: "generating" }); }}>
      <div className="card" style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div><div style={{ fontWeight: 540, fontSize: 14 }}>Auto-select the best model per role</div>
          <div style={{ fontSize: 12.5, color: "var(--tx2)" }}>Recommended. You can still override any assignment.</div></div>
        <Toggle on={auto} onClick={() => setAuto(a => !a)} />
      </div>
      <div className="card" style={{ overflow: "hidden", opacity: auto ? 0.5 : 1, pointerEvents: auto ? "none" : "auto", transition: ".2s" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr repeat(" + models.length + ",1fr)", fontSize: 12.5, color: "var(--tx2)", padding: "12px 16px", borderBottom: "1px solid var(--line)" }}>
          <span>Role</span>{models.map(m => <span key={m} style={{ textAlign: "center" }}>{m.split(" ")[0]}</span>)}
        </div>
        {rows.map(role => (
          <div key={role} style={{ display: "grid", gridTemplateColumns: "1.1fr repeat(" + models.length + ",1fr)", alignItems: "center", padding: "10px 16px", borderBottom: "1px solid var(--line)" }}>
            <span style={{ fontSize: 13.5 }}>{role}</span>
            {models.map(m => (
              <div key={m} style={{ display: "grid", placeItems: "center" }}>
                <button onClick={() => setMatrix({ ...matrix, [role]: m })} style={{ width: 18, height: 18, borderRadius: 99,
                  border: "1.5px solid " + (matrix[role] === m ? modelColor(m) : "var(--line2)"),
                  background: matrix[role] === m ? modelColor(m) : "transparent" }} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 13, color: "var(--tx2)", margin: "20px 0 10px" }}>Model selection strategy</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {strategies.map(s => (
          <button key={s} className={`chip ${strategy === s ? "sel" : ""}`} onClick={() => setStrategy(s)}
            style={{ cursor: "pointer", borderColor: strategy === s ? "var(--violet)" : "var(--line2)", color: strategy === s ? "var(--tx)" : "var(--tx2)", background: strategy === s ? "var(--violetSoft)" : "transparent" }}>{s}</button>
        ))}
      </div>
    </OnboardShell>
  );
}

function Generating() {
  const { state, dispatch } = useStore();
  const items = ["Understanding your role", "Understanding your goal", "Identifying required capabilities", "Selecting specialist agents", "Assigning models", "Designing collaboration rules", "Creating your AI Manager"];
  const [done, setDone] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (done < items.length) { const t = setTimeout(() => setDone(d => d + 1), 520); return () => clearTimeout(t); }
    else { const t = setTimeout(() => setReady(true), 500); return () => clearTimeout(t); }
  }, [done]);
  return (
    <div className="aio bg-grid" style={{ minHeight: "100vh", display: "grid", placeItems: "center", position: "relative", overflow: "hidden" }}>
      <div className="glow-violet" style={{ width: 500, height: 500, top: "20%", left: "30%" }} />
      <div style={{ position: "relative", textAlign: "center", maxWidth: 460, padding: 24 }}>
        <div style={{ margin: "0 auto 26px", width: 62, height: 62, borderRadius: 18, background: "var(--violetSoft)", display: "grid", placeItems: "center", color: "var(--violet2)", boxShadow: "0 0 40px -6px rgba(124,92,255,.6)" }}>
          <Network size={30} className="nodepulse" />
        </div>
        <h1 className="scaleH" style={{ fontSize: 26, margin: "0 0 6px" }}>{ready ? "Your organization is ready." : "Designing your AI organization…"}</h1>
        <p style={{ color: "var(--tx2)", margin: "0 0 26px" }}>{ready ? `${state.agents.length} specialists and one Manager, built around your goal.` : "Assembling specialists around your mission."}</p>
        <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 10, marginBottom: 26 }}>
          {items.map((t, i) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 11, opacity: i < done ? 1 : i === done ? 0.9 : 0.3, transition: ".3s" }}>
              <span style={{ width: 20, height: 20, borderRadius: 99, display: "grid", placeItems: "center",
                background: i < done ? "rgba(62,207,142,.15)" : "var(--surface2)", color: i < done ? "var(--green)" : "var(--tx3)", border: "1px solid var(--line2)" }}>
                {i < done ? <Check size={12} /> : i === done ? <span className="dot pulse" style={{ background: "var(--violet)", color: "var(--violet)" }} /> : ""}
              </span>
              <span style={{ fontSize: 14, color: i <= done ? "var(--tx)" : "var(--tx3)" }}>{t}</span>
            </div>
          ))}
        </div>
        {ready && <Btn variant="primary" icon={ArrowRight} onClick={() => dispatch({ type: "NAV", route: "review" })}>Review organization</Btn>}
      </div>
    </div>
  );
}

/* ============================================================ ORG REVIEW */
function OrgReview() {
  const { state, dispatch } = useStore();
  const [sel, setSel] = useState(null);
  return (
    <div className="aio" style={{ minHeight: "100vh", position: "relative" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "30px 24px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, marginBottom: 26 }}><Logo /> AI Organization</div>
        <h1 className="scaleH" style={{ fontSize: 30, margin: "0 0 6px" }}>Meet your AI organization.</h1>
        <p style={{ color: "var(--tx2)", margin: "0 0 24px" }}>Tap any node to inspect it. The Manager coordinates the whole team.</p>
        <div className="glass" style={{ padding: "18px 8px 8px" }}>
          <OrgGraph mode="hierarchy" height={400} activeIds={[]} onNode={(id) => setSel(id)} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
          <Btn variant="primary" icon={Zap} onClick={() => dispatch({ type: "NAV", route: "dashboard" })}>Launch organization</Btn>
        </div>
      </div>
      {sel && <AgentDrawer id={sel} onClose={() => setSel(null)} />}
    </div>
  );
}

/* ============================================================ APP SHELL */
const NAV_ITEMS = [
  { key: "dashboard", label: "Overview", icon: Gauge },
  { key: "org-review", label: "My organization", icon: Network },
  { key: "agents", label: "Agents", icon: Users },
  { key: "manager", label: "Manager", icon: Crown },
  { key: "tasks", label: "Tasks", icon: ListChecks },
  { key: "debates", label: "Debates", icon: MessagesSquare },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "knowledge", label: "Knowledge", icon: BookOpen },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
  { key: "evolution", label: "Evolution", icon: GitBranch },
  { key: "settings", label: "Settings", icon: Settings },
];
function Shell({ children }) {
  const { state, dispatch } = useStore();
  const [collapsed, setCollapsed] = useState(false);
  const routeKey = ["agent-detail"].includes(state.route) ? "agents" : ["debate-detail"].includes(state.route) ? "debates" : state.route;
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="aio" style={{ minHeight: "100vh", display: "flex", background: "var(--bg)" }}>
      {/* sidebar */}
      <aside className="hide-sm" style={{ width: collapsed ? 66 : 232, flex: "none", borderRight: "1px solid var(--line)", background: "var(--bg2)", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", transition: "width .18s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "18px 16px", fontWeight: 620, letterSpacing: "-.02em" }}>
          <Logo />{!collapsed && "AI Organization"}
        </div>
        <nav style={{ padding: "6px 12px", display: "flex", flexDirection: "column", gap: 3, flex: 1, overflowY: "auto" }}>
          {NAV_ITEMS.map(n => (
            <button key={n.key} className={`navitem ${routeKey === n.key ? "active" : ""}`} onClick={() => dispatch({ type: "NAV", route: n.key })} title={n.label}>
              <n.icon size={16.5} style={{ flex: "none" }} />{!collapsed && <span>{n.label}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding: 12, borderTop: "1px solid var(--line)" }}>
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 8px 12px" }}>
              <span style={{ width: 30, height: 30, borderRadius: 99, background: "linear-gradient(145deg,#5286FB,#8A6BFF)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 600, flex: "none" }}>{state.profile.name.split(" ").map(x => x[0]).join("").slice(0, 2)}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 540, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{state.profile.name}</div>
                <div style={{ fontSize: 11.5, color: "var(--tx3)" }}>{state.profile.role}</div>
              </div>
            </div>
          )}
          <button className="navitem" onClick={() => setCollapsed(c => !c)}>
            <PanelLeft size={16} />{!collapsed && "Collapse"}
          </button>
        </div>
      </aside>

      {/* main */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <header style={{ position: "sticky", top: 0, zIndex: 30, display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 20px", borderBottom: "1px solid var(--line)", background: "rgba(9,10,15,.8)", backdropFilter: "blur(10px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="btn btn-ghost btn-sm" style={{ display: "none" }} onClick={() => setMobileOpen(true)}><PanelLeft size={15} /></button>
            <button className="chip" style={{ cursor: "pointer" }}>
              <span className="dot" style={{ background: "var(--violet)" }} />Quantum Security Startup<ChevronDown size={13} />
            </button>
            <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: state.live ? "var(--green)" : "var(--tx3)" }}>
              <span className={`dot ${state.live ? "pulse" : ""}`} style={{ background: state.live ? "var(--green)" : "var(--tx3)", color: "var(--green)" }} />
              {state.live ? "Organization active" : "Paused"}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div className="hide-sm" style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--surface2)", border: "1px solid var(--line2)", borderRadius: 10, padding: "7px 11px", color: "var(--tx3)", fontSize: 13 }}>
              <Search size={14} />Search<span className="kbd" style={{ marginLeft: 24 }}>⌘K</span>
            </div>
            <Btn variant="quiet" size="sm" onClick={() => dispatch({ type: "TOGGLE_LIVE" })} icon={state.live ? Pause : Play}>{state.live ? "Pause" : "Resume"}</Btn>
            <button className="btn btn-quiet btn-sm"><Bell size={16} /></button>
            <button className="btn btn-quiet btn-sm hide-sm"><HelpCircle size={16} /></button>
            <span style={{ width: 30, height: 30, borderRadius: 99, background: "linear-gradient(145deg,#5286FB,#8A6BFF)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 600 }}>{state.profile.name.split(" ").map(x => x[0]).join("").slice(0, 2)}</span>
          </div>
        </header>
        <main style={{ padding: "22px 22px 60px", maxWidth: 1360, width: "100%", margin: "0 auto" }} className="fadein" key={state.route + state.selectedId}>
          {children}
        </main>
      </div>
    </div>
  );
}

/* ============================================================ DASHBOARD */
function Dashboard() {
  const { state, dispatch } = useStore();
  const active = state.agents.filter(a => ["thinking", "working", "debating", "revising"].includes(a.status)).length;
  const running = state.tasks.filter(t => t.status === "working").length;
  const activeIds = state.agents.filter(a => a.status === "debating").map(a => a.id);
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const [intervene, setIntervene] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <h1 className="scaleH" style={{ fontSize: 25, margin: "0 0 6px" }}>{greet}, {state.profile.name.split(" ")[0]}.</h1>
        <p style={{ color: "var(--tx2)", margin: 0 }}>Current mission — <span style={{ color: "var(--tx)" }}>{state.profile.goal}</span></p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
        <Metric icon={Users} label="Agents active" value={active} sub={`of ${state.agents.length}`} />
        <Metric icon={ListChecks} label="Tasks running" value={running} accent="var(--cyan)" />
        <Metric icon={MessagesSquare} label="Debates today" value={state.metrics.debates} accent="var(--cyan)" />
        <Metric icon={Crown} label="Manager decisions" value={state.metrics.decisions} accent="var(--violet)" />
        <Metric icon={Activity} label="Org health" value="Good" accent="var(--green)" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, alignItems: "start" }} className="dash-grid">
        {/* live org */}
        <div className="glass" style={{ padding: "16px 10px 6px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px 4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="dot pulse" style={{ background: "var(--cyan)", color: "var(--cyan)" }} />
              <span style={{ fontWeight: 560, fontSize: 14 }}>Live organization</span>
            </div>
            <span style={{ fontSize: 12, color: "var(--tx3)" }}>{state.live ? "Streaming" : "Paused"}</span>
          </div>
          <OrgGraph mode="hierarchy" height={360} activeIds={activeIds} onNode={(id) => dispatch({ type: "NAV", route: id === "manager" ? "manager" : "agent-detail", id })} />
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", padding: "0 12px 10px", fontSize: 11.5, color: "var(--tx3)" }}>
            {Object.entries(STATUS_META).filter(([k]) => ["thinking", "working", "debating", "waiting", "approved"].includes(k)).map(([k, v]) => (
              <span key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}><span className="dot" style={{ background: v.c }} />{v.l}</span>
            ))}
          </div>
        </div>

        {/* manager panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--violetSoft)", display: "grid", placeItems: "center", color: "var(--violet2)" }}><Crown size={17} /></span>
              <div><div style={{ fontWeight: 570 }}>AI Manager</div><div style={{ fontSize: 12, color: "var(--tx2)" }}>Supervising {state.agents.length} agents</div></div>
            </div>
            <div style={{ fontSize: 13, color: "var(--tx2)", marginBottom: 8 }}>Pending decision</div>
            <div style={{ fontSize: 14.5, fontWeight: 520, marginBottom: 14, lineHeight: 1.5 }}>{state.decision.question}</div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--tx2)", marginBottom: 6 }}>
                <span>Banking {state.decision.consensus.banking}%</span><span>Fintech {state.decision.consensus.fintech}%</span>
              </div>
              <div style={{ height: 7, borderRadius: 99, background: "var(--surface2)", overflow: "hidden", display: "flex" }}>
                <span style={{ width: state.decision.consensus.banking + "%", background: "var(--violet)" }} />
                <span style={{ width: state.decision.consensus.fintech + "%", background: "var(--cyan)" }} />
              </div>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--tx2)", background: "var(--surface2)", borderRadius: 10, padding: "10px 12px", marginBottom: 14, lineHeight: 1.55 }}>
              <span style={{ color: "var(--tx3)" }}>Reasoning — </span>{state.decision.reasoning}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <Btn variant="approve" icon={Check} onClick={() => dispatch({ type: "APPROVE" })}>Approve</Btn>
              <Btn variant="reject" icon={X} onClick={() => dispatch({ type: "REJECT" })}>Reject</Btn>
              <Btn variant="rev" icon={RotateCcw} onClick={() => dispatch({ type: "REVISION" })}>Request revision</Btn>
              <Btn variant="ghost" icon={Hand} onClick={() => dispatch({ type: "OVERRIDE" })}>Override</Btn>
            </div>
          </div>
        </div>
      </div>

      {/* debate + activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, alignItems: "start" }} className="dash-grid">
        <DebatePanel onIntervene={() => setIntervene(true)} />
        <ActivityFeed />
      </div>

      {intervene && <InterveneModal onClose={() => setIntervene(false)} />}
      <style>{`@media (max-width:960px){.dash-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}

function DebatePanel({ onIntervene }) {
  const { state, dispatch } = useStore();
  const [shown, setShown] = useState(2);
  useEffect(() => { setShown(2); const t = setInterval(() => setShown(s => Math.min(state.debate.rounds.length, s + 1)), 1400); return () => clearInterval(t); }, []);
  const agent = (id) => state.agents.find(a => a.id === id) || { name: "AI Manager", model: "GPT-5" };
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span className="dot pulse" style={{ background: "var(--cyan)", color: "var(--cyan)" }} />
          <span style={{ fontWeight: 560, fontSize: 14 }}>Live AI debate</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Btn size="sm" variant="ghost" onClick={() => dispatch({ type: "NAV", route: "debates" })}>View debate</Btn>
          <Btn size="sm" variant="ghost" icon={Hand} onClick={onIntervene}>Intervene</Btn>
        </div>
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 13.5, fontWeight: 520, color: "var(--tx)", paddingBottom: 4 }}>{state.debate.question}</div>
        {state.debate.rounds.slice(0, shown).map((r, i) => {
          const a = agent(r.agentId);
          return (
            <div key={i} className="row-in" style={{ display: "flex", gap: 11 }}>
              <span style={{ width: 28, height: 28, flex: "none", borderRadius: 8, background: "var(--surface2)", display: "grid", placeItems: "center", color: modelColor(a.model) }}>
                {React.createElement(iconForRole(a.role || ""), { size: 14 })}
              </span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, marginBottom: 2 }}><span style={{ fontWeight: 550 }}>{a.name}</span> <span style={{ color: "var(--tx3)" }}>· {a.model}</span></div>
                <div style={{ fontSize: 13.5, color: "var(--tx2)", lineHeight: 1.5 }}>{r.text}</div>
              </div>
            </div>
          );
        })}
        {shown >= state.debate.rounds.length && (
          <div className="row-in" style={{ display: "flex", gap: 11, background: "var(--violetSoft)", padding: 12, borderRadius: 11, border: "1px solid rgba(124,92,255,.25)" }}>
            <span style={{ width: 28, height: 28, flex: "none", borderRadius: 8, background: "var(--surface)", display: "grid", placeItems: "center", color: "var(--violet2)" }}><Crown size={14} /></span>
            <div><div style={{ fontSize: 12.5, marginBottom: 2, fontWeight: 550 }}>AI Manager</div>
              <div style={{ fontSize: 13.5, color: "var(--tx)", lineHeight: 1.5 }}>{state.debate.managerNote}</div></div>
          </div>
        )}
      </div>
    </div>
  );
}

function ActivityFeed() {
  const { state } = useStore();
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Agents", "Manager", "Debates", "User"];
  const rows = state.activity.filter(a => filter === "All" || a.type === filter);
  const actorName = (id) => state.agents.find(a => a.id === id)?.name || (id === "manager" ? "AI Manager" : id === "user" ? "You" : "System");
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", maxHeight: 470, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid var(--line)" }}>
        <div style={{ fontWeight: 560, fontSize: 14, marginBottom: 10 }}>Activity</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 99, border: "1px solid " + (filter === f ? "var(--violet)" : "var(--line2)"), color: filter === f ? "var(--tx)" : "var(--tx2)", background: filter === f ? "var(--violetSoft)" : "transparent" }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ overflowY: "auto", padding: "6px 0" }}>
        {rows.map((a, i) => (
          <div key={i} className="row-in" style={{ display: "flex", gap: 11, padding: "9px 16px" }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--tx3)", flex: "none", paddingTop: 1 }}>{a.time}</span>
            <div style={{ fontSize: 13, color: "var(--tx2)", lineHeight: 1.45 }}>{a.text}</div>
          </div>
        ))}
        {!rows.length && <div style={{ padding: 24, textAlign: "center", color: "var(--tx3)", fontSize: 13 }}>Nothing here yet.</div>}
      </div>
    </div>
  );
}

function InterveneModal({ onClose }) {
  const { dispatch } = useStore();
  const [msg, setMsg] = useState("");
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="modal"><div className="modalcard" style={{ padding: 22 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 570 }}><Hand size={17} style={{ color: "var(--violet2)" }} /> Step into the room</div>
          <button className="btn btn-quiet btn-sm" onClick={onClose}><X size={16} /></button>
        </div>
        <p style={{ color: "var(--tx2)", fontSize: 13.5, margin: "0 0 14px" }}>Send guidance directly to the Manager. It will redirect the agents accordingly.</p>
        <textarea className="input" value={msg} onChange={e => setMsg(e.target.value)} placeholder="e.g. Prioritize the banking ICP and drop the freemium idea." style={{ minHeight: 100 }} />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" icon={ArrowRight} onClick={() => { dispatch({ type: "ADD_ACTIVITY", entry: { actor: "user", text: "You gave the Manager new direction", type: "User" } }); onClose(); }}>Send to Manager</Btn>
        </div>
      </div></div>
    </>
  );
}

/* ============================================================ AGENTS */
function AgentsPage() {
  const { state, dispatch } = useStore();
  const [role, setRole] = useState("All");
  const [model, setModel] = useState("All");
  const [statusF, setStatusF] = useState("All");
  const [optimizing, setOptimizing] = useState(false);
  const roles = ["All", ...new Set(state.agents.map(a => a.role))];
  const models = ["All", ...new Set(state.agents.map(a => a.model))];
  const statuses = ["All", "working", "ready", "paused"];
  const list = state.agents.filter(a => (role === "All" || a.role === role) && (model === "All" || a.model === model) && (statusF === "All" || a.status === statusF));
  return (
    <div>
      <SectionTitle right={
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="ghost" icon={Sparkles} onClick={() => { setOptimizing(true); setTimeout(() => setOptimizing(false), 1800); }}>Optimize team</Btn>
          <Btn variant="primary" icon={Plus}>Add agent</Btn>
        </div>
      }>Agents</SectionTitle>

      {optimizing && (
        <div className="card fade" style={{ padding: 16, marginBottom: 16, display: "flex", alignItems: "center", gap: 12, background: "var(--violetSoft)", borderColor: "rgba(124,92,255,.3)" }}>
          <Sparkles size={17} className="nodepulse" style={{ color: "var(--violet2)" }} />
          <span style={{ fontSize: 13.5 }}>Analyzing performance, model fit and workload to recommend changes…</span>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <Dropdown label="Role" value={role} options={roles} onChange={setRole} />
        <Dropdown label="Model" value={model} options={models.map(m => m === "All" ? "All" : m)} onChange={setModel} />
        <Dropdown label="Status" value={statusF} options={statuses} onChange={setStatusF} render={(s) => STATUS_META[s]?.l || s} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
        {list.map(a => (
          <button key={a.id} className="card" style={{ padding: 16, textAlign: "left", transition: ".14s" }}
            onClick={() => dispatch({ type: "NAV", route: "agent-detail", id: a.id })}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--line2)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--line)"}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ width: 38, height: 38, borderRadius: 11, background: "var(--surface2)", display: "grid", placeItems: "center", color: modelColor(a.model) }}>
                {React.createElement(iconForRole(a.role), { size: 18 })}
              </span>
              <StatusText status={a.status} />
            </div>
            <div style={{ fontWeight: 560, marginBottom: 3 }}>{a.name}</div>
            <div style={{ fontSize: 12.5, color: "var(--tx2)", marginBottom: 12 }}>{a.specialty}</div>
            <div style={{ marginBottom: 12 }}><ModelTag model={a.model} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--tx3)", borderTop: "1px solid var(--line)", paddingTop: 11 }}>
              <span>Success <span className="num" style={{ color: "var(--tx)" }}>{a.successRate}%</span></span>
              <span>Done <span className="num" style={{ color: "var(--tx)" }}>{a.tasksCompleted}</span></span>
            </div>
            {a.currentTask !== "—" && <div style={{ fontSize: 12, color: "var(--tx2)", marginTop: 10 }}>Now: {a.currentTask}</div>}
          </button>
        ))}
      </div>
    </div>
  );
}
function Dropdown({ label, value, options, onChange, render = (x) => x }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button className="btn btn-ghost btn-sm" onClick={() => setOpen(o => !o)}>
        <span style={{ color: "var(--tx3)" }}>{label}:</span> {render(value)} <ChevronDown size={13} />
      </button>
      {open && <>
        <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setOpen(false)} />
        <div className="card" style={{ position: "absolute", top: "110%", left: 0, zIndex: 41, minWidth: 150, padding: 5, boxShadow: "var(--shadow)" }}>
          {options.map(o => (
            <button key={o} onClick={() => { onChange(o); setOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "7px 10px", borderRadius: 8, fontSize: 13, color: o === value ? "var(--tx)" : "var(--tx2)", background: o === value ? "var(--surface2)" : "transparent" }}>{render(o)}</button>
          ))}
        </div>
      </>}
    </div>
  );
}

function AgentDrawer({ id, onClose }) {
  const { state, dispatch } = useStore();
  const a = state.agents.find(x => x.id === id);
  const [modelOpen, setModelOpen] = useState(false);
  if (id === "manager") return <ManagerDrawer onClose={onClose} />;
  if (!a) return null;
  const models = Object.keys(MODEL_META);
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="drawer">
        <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "sticky", top: 0, background: "var(--bg2)", zIndex: 2 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ width: 42, height: 42, borderRadius: 12, background: "var(--surface2)", display: "grid", placeItems: "center", color: modelColor(a.model) }}>{React.createElement(iconForRole(a.role), { size: 20 })}</span>
            <div><div style={{ fontWeight: 600, fontSize: 16 }}>{a.name}</div><div style={{ fontSize: 12.5, color: "var(--tx2)" }}>{a.role} specialist</div>
              <div style={{ marginTop: 8 }}><StatusText status={a.status} /></div></div>
          </div>
          <button className="btn btn-quiet btn-sm" onClick={onClose}><X size={17} /></button>
        </div>
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>
          <DrawSection title="Purpose">{a.purpose}</DrawSection>
          <DrawSection title="Instructions">{a.instructions}</DrawSection>
          <div>
            <DrawLabel>Model</DrawLabel>
            <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
              <ModelTag model={a.model} />
              <button className="btn btn-ghost btn-sm" onClick={() => setModelOpen(o => !o)}>Replace <ChevronDown size={12} /></button>
              {modelOpen && <>
                <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setModelOpen(false)} />
                <div className="card" style={{ position: "absolute", top: "115%", left: 90, zIndex: 41, padding: 5, minWidth: 160, boxShadow: "var(--shadow)" }}>
                  {models.map(m => <button key={m} onClick={() => { dispatch({ type: "REPLACE_MODEL", id: a.id, model: m }); setModelOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "7px 10px", borderRadius: 8, fontSize: 13, color: "var(--tx2)" }}><span className="dot" style={{ background: modelColor(m) }} />{m}</button>)}
                </div>
              </>}
            </div>
          </div>
          <div>
            <DrawLabel>Tools</DrawLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>{a.tools.map(t => <span key={t} className="chip">{t}</span>)}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="card" style={{ padding: 13 }}><DrawLabel>Success rate</DrawLabel><span className="num" style={{ fontSize: 22, fontWeight: 620 }}>{a.successRate}%</span></div>
            <div className="card" style={{ padding: 13 }}><DrawLabel>Tasks completed</DrawLabel><span className="num" style={{ fontSize: 22, fontWeight: 620 }}>{a.tasksCompleted}</span></div>
          </div>
          <DrawSection title="Personality">{a.personality}</DrawSection>
          {a.deps.length > 0 && <div><DrawLabel>Dependencies</DrawLabel><div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>{a.deps.map(d => <span key={d} className="chip"><Network size={11} />{d}</span>)}</div></div>}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, borderTop: "1px solid var(--line)", paddingTop: 16 }}>
            <Btn variant="ghost" icon={a.status === "paused" ? Play : Pause} onClick={() => dispatch({ type: "TOGGLE_PAUSE", id: a.id })}>{a.status === "paused" ? "Resume" : "Pause"}</Btn>
            <Btn variant="reject" icon={X} onClick={() => { dispatch({ type: "REMOVE_AGENT", id: a.id }); onClose(); }}>Remove agent</Btn>
          </div>
        </div>
      </div>
    </>
  );
}
const DrawLabel = ({ children }) => <div style={{ fontSize: 12, color: "var(--tx3)", marginBottom: 7 }}>{children}</div>;
const DrawSection = ({ title, children }) => <div><DrawLabel>{title}</DrawLabel><div style={{ fontSize: 13.5, color: "var(--tx2)", lineHeight: 1.6 }}>{children}</div></div>;

function AgentDetail() {
  const { state, dispatch } = useStore();
  const a = state.agents.find(x => x.id === state.selectedId);
  if (!a) { return <EmptyBack label="Agent not found" to="agents" />; }
  return (
    <div>
      <Btn variant="quiet" size="sm" icon={ArrowLeft} onClick={() => dispatch({ type: "NAV", route: "agents" })} className="fade">All agents</Btn>
      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 16, alignItems: "start" }} className="dash-grid">
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
            <span style={{ width: 52, height: 52, borderRadius: 14, background: "var(--surface2)", display: "grid", placeItems: "center", color: modelColor(a.model) }}>{React.createElement(iconForRole(a.role), { size: 25 })}</span>
            <div><h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 620 }}>{a.name}</h1>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}><StatusText status={a.status} /><ModelTag model={a.model} /></div></div>
          </div>
          <DrawSection title="Purpose">{a.purpose}</DrawSection>
          <div style={{ height: 16 }} />
          <DrawSection title="Instructions">{a.instructions}</DrawSection>
          <div style={{ height: 16 }} />
          <DrawSection title="Personality">{a.personality}</DrawSection>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div><DrawLabel>Success rate</DrawLabel><span className="num" style={{ fontSize: 24, fontWeight: 640 }}>{a.successRate}%</span></div>
              <div><DrawLabel>Tasks completed</DrawLabel><span className="num" style={{ fontSize: 24, fontWeight: 640 }}>{a.tasksCompleted}</span></div>
            </div>
            <div style={{ height: 16 }} />
            <DrawLabel>Current task</DrawLabel><div style={{ fontSize: 14 }}>{a.currentTask}</div>
          </div>
          <div className="card" style={{ padding: 18 }}>
            <DrawLabel>Tools</DrawLabel><div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 14 }}>{a.tools.map(t => <span key={t} className="chip">{t}</span>)}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <Btn variant="ghost" icon={a.status === "paused" ? Play : Pause} onClick={() => dispatch({ type: "TOGGLE_PAUSE", id: a.id })}>{a.status === "paused" ? "Resume" : "Pause"}</Btn>
              <Btn variant="reject" icon={X} onClick={() => { dispatch({ type: "REMOVE_AGENT", id: a.id }); dispatch({ type: "NAV", route: "agents" }); }}>Remove</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ MANAGER */
function ManagerDrawer({ onClose }) {
  const { state } = useStore();
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="drawer">
        <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ width: 42, height: 42, borderRadius: 12, background: "var(--violetSoft)", display: "grid", placeItems: "center", color: "var(--violet2)" }}><Crown size={20} /></span>
            <div><div style={{ fontWeight: 600, fontSize: 16 }}>AI Manager</div><div style={{ fontSize: 12.5, color: "var(--tx2)" }}>Supervising {state.agents.length} agents · {state.manager.model}</div></div>
          </div>
          <button className="btn btn-quiet btn-sm" onClick={onClose}><X size={17} /></button>
        </div>
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <DrawSection title="Role">The Manager is the operating layer. It assigns work, resolves debates, evaluates outputs and escalates to you when a rule requires human sign-off.</DrawSection>
          <DrawSection title="Current mission">{state.profile.goal}</DrawSection>
        </div>
      </div>
    </>
  );
}
function ManagerPage() {
  const { state, dispatch } = useStore();
  const ruleDefs = [
    { key: "legalReview", label: "Legal output requires human review" },
    { key: "budgetApproval", label: "Budget decisions above $10,000 require approval" },
    { key: "conflictDebate", label: "Conflicting research must trigger a debate" },
    { key: "autoModel", label: "Auto-assign the best model per role" },
    { key: "humanApprove", label: "Every Manager decision requires my approval" },
  ];
  return (
    <div>
      <SectionTitle>Manager command center</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr .9fr", gap: 16, alignItems: "start" }} className="dash-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <DrawLabel>Current mission</DrawLabel>
            <div style={{ fontSize: 15, lineHeight: 1.55, marginBottom: 16 }}>{state.profile.goal}</div>
            <div style={{ display: "flex", gap: 22, fontSize: 13, color: "var(--tx2)" }}>
              <span>Team <span className="num" style={{ color: "var(--tx)" }}>{state.agents.length}</span></span>
              <span>Decisions <span className="num" style={{ color: "var(--tx)" }}>{state.metrics.decisions}</span></span>
              <span>Interventions <span className="num" style={{ color: "var(--tx)" }}>{state.metrics.interventions}</span></span>
            </div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <SectionTitle>Pending decision</SectionTitle>
            <div style={{ fontSize: 14.5, fontWeight: 520, marginBottom: 14 }}>{state.decision.question}</div>
            <div style={{ fontSize: 13, color: "var(--tx2)", lineHeight: 1.55, marginBottom: 16, background: "var(--surface2)", padding: 12, borderRadius: 10 }}>{state.decision.reasoning}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Btn variant="approve" icon={Check} onClick={() => dispatch({ type: "APPROVE" })}>Approve</Btn>
              <Btn variant="reject" icon={X} onClick={() => dispatch({ type: "REJECT" })}>Reject</Btn>
              <Btn variant="rev" icon={RotateCcw} onClick={() => dispatch({ type: "REVISION" })}>Request revision</Btn>
            </div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <SectionTitle>Decision history</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {state.decisionHistory.map((d, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "10px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
                  <div style={{ minWidth: 0 }}><div style={{ fontSize: 13.5 }}>{d.q}</div><div style={{ fontSize: 12, color: "var(--tx3)" }}>{d.note}</div></div>
                  <div style={{ textAlign: "right", flex: "none" }}>
                    <span style={{ fontSize: 12, color: d.outcome === "Approved" ? "var(--green)" : d.outcome === "Rejected" ? "var(--red)" : "var(--amber)" }}>{d.outcome}</span>
                    <div style={{ fontSize: 11, color: "var(--tx3)" }}>{d.when}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <SectionTitle>Team status</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {state.agents.map(a => (
                <div key={a.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: "var(--tx2)" }}>{a.name}</span><StatusText status={a.status} />
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <SectionTitle>Manager rules</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {ruleDefs.map((r, i) => (
                <div key={r.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
                  <span style={{ fontSize: 13, color: "var(--tx2)", lineHeight: 1.4 }}>{r.label}</span>
                  <Toggle on={state.rules[r.key]} onClick={() => dispatch({ type: "TOGGLE_RULE", key: r.key })} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ TASKS */
const KCOLS = [
  { key: "backlog", label: "Backlog" }, { key: "working", label: "Working" }, { key: "review", label: "Review" },
  { key: "approved", label: "Approved" }, { key: "complete", label: "Complete" },
];
function TasksPage() {
  const { state, dispatch } = useStore();
  const [sel, setSel] = useState(null);
  return (
    <div>
      <SectionTitle right={<Btn variant="primary" icon={Plus} size="sm">New task</Btn>}>Tasks</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${KCOLS.length},minmax(180px,1fr))`, gap: 12, overflowX: "auto", paddingBottom: 10 }}>
        {KCOLS.map(col => {
          const items = state.tasks.filter(t => t.status === col.key);
          return (
            <div key={col.key} className="kcol">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, padding: "0 2px" }}>
                <span style={{ fontSize: 12.5, color: "var(--tx2)", fontWeight: 540 }}>{col.label}</span>
                <span className="num" style={{ fontSize: 12, color: "var(--tx3)" }}>{items.length}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {items.map(t => {
                  const a = state.agents.find(x => x.id === t.agentId);
                  return (
                    <div key={t.id} className="card row-in" style={{ padding: 12, cursor: "pointer" }} onClick={() => setSel(t)}>
                      <div style={{ fontSize: 13.5, fontWeight: 510, marginBottom: 9, lineHeight: 1.4 }}>{t.title}</div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9 }}>
                        <span style={{ fontSize: 11.5, color: "var(--tx2)" }}>{a?.name?.replace(" Agent", "") || "Unassigned"}</span>
                        <span className="chip" style={{ fontSize: 10.5, padding: "2px 7px", color: PRIORITY_C[t.priority], borderColor: "var(--line2)" }}>{t.priority}</span>
                      </div>
                      <div className="mono" style={{ fontSize: 10.5, color: modelColor(t.model), display: "flex", alignItems: "center", gap: 5 }}><span className="dot" style={{ background: modelColor(t.model) }} />{t.model}</div>
                    </div>
                  );
                })}
                {!items.length && <div style={{ border: "1px dashed var(--line2)", borderRadius: 11, padding: 16, textAlign: "center", fontSize: 12, color: "var(--tx3)" }}>Empty</div>}
              </div>
            </div>
          );
        })}
      </div>
      {sel && <TaskDrawer task={sel} onClose={() => setSel(null)} />}
    </div>
  );
}
function TaskDrawer({ task, onClose }) {
  const { state, dispatch } = useStore();
  const a = state.agents.find(x => x.id === task.agentId);
  const cur = state.tasks.find(t => t.id === task.id) || task;
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="drawer">
        <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 600, fontSize: 16, maxWidth: 300 }}>{cur.title}</div>
          <button className="btn btn-quiet btn-sm" onClick={onClose}><X size={17} /></button>
        </div>
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="chip">{KCOLS.find(c => c.key === cur.status)?.label}</span>
            <span className="chip" style={{ color: PRIORITY_C[cur.priority] }}>{cur.priority} priority</span>
          </div>
          <div><DrawLabel>Assigned agent</DrawLabel><div style={{ display: "flex", alignItems: "center", gap: 9 }}>{a && React.createElement(iconForRole(a.role), { size: 16, color: modelColor(a.model) })}<span style={{ fontSize: 14 }}>{a?.name}</span></div></div>
          <div><DrawLabel>Model</DrawLabel><ModelTag model={cur.model} /></div>
          <DrawSection title="What the agent is doing">{a?.purpose}</DrawSection>
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 16, display: "flex", gap: 8 }}>
            <Btn variant="ghost" icon={ArrowLeft} onClick={() => dispatch({ type: "MOVE_TASK", id: cur.id, dir: -1 })}>Move back</Btn>
            <Btn variant="primary" icon={ArrowRight} onClick={() => dispatch({ type: "MOVE_TASK", id: cur.id, dir: 1 })}>Advance</Btn>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================ DEBATES */
function DebatesPage() {
  const { state, dispatch } = useStore();
  return (
    <div>
      <SectionTitle>Debates</SectionTitle>
      <p style={{ color: "var(--tx2)", marginTop: -6, marginBottom: 18, fontSize: 14 }}>Watching your AI employees argue it out — and how the Manager resolved each one.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 14 }}>
        {state.debatesList.map(d => (
          <button key={d.id} className="card" style={{ padding: 18, textAlign: "left" }} onClick={() => dispatch({ type: "NAV", route: "debate-detail", id: d.id })}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <MessagesSquare size={17} style={{ color: "var(--cyan)" }} />
              <span className="chip"><Gauge size={11} />{d.confidence}% confidence</span>
            </div>
            <div style={{ fontWeight: 550, marginBottom: 12, lineHeight: 1.4 }}>{d.question}</div>
            <div style={{ display: "flex", gap: -6, marginBottom: 12 }}>
              {d.agents.map((id, i) => { const a = state.agents.find(x => x.id === id); return (
                <span key={id} title={a?.name} style={{ width: 26, height: 26, borderRadius: 99, background: "var(--surface2)", border: "2px solid var(--surface)", display: "grid", placeItems: "center", color: a ? modelColor(a.model) : "var(--tx3)", marginLeft: i ? -7 : 0 }}>{a && React.createElement(iconForRole(a.role), { size: 12 })}</span>
              ); })}
            </div>
            <div style={{ fontSize: 12.5, color: "var(--tx2)", borderTop: "1px solid var(--line)", paddingTop: 11 }}>
              {d.rounds} rounds · Consensus: <span style={{ color: "var(--tx)" }}>{d.consensus}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
function DebateDetail() {
  const { state, dispatch } = useStore();
  const d = state.debatesList.find(x => x.id === state.selectedId) || state.debatesList[0];
  const rounds = d.roundsArr || d.rounds || [];
  const agent = (id) => state.agents.find(a => a.id === id) || { name: "AI Manager", model: "GPT-5", role: "" };
  return (
    <div style={{ maxWidth: 760 }}>
      <Btn variant="quiet" size="sm" icon={ArrowLeft} onClick={() => dispatch({ type: "NAV", route: "debates" })}>All debates</Btn>
      <h1 className="scaleH" style={{ fontSize: 23, margin: "16px 0 6px" }}>{d.question}</h1>
      <div style={{ display: "flex", gap: 10, marginBottom: 24, fontSize: 13, color: "var(--tx2)" }}>
        <span className="chip">{d.rounds} rounds</span><span className="chip"><Gauge size={11} />{d.confidence}% confidence</span>
      </div>
      <div style={{ position: "relative", paddingLeft: 22 }}>
        <div style={{ position: "absolute", left: 6, top: 6, bottom: 40, width: 1, background: "var(--line2)" }} />
        {rounds.map((r, i) => { const a = agent(r.agentId); return (
          <div key={i} className="fade" style={{ position: "relative", marginBottom: 18 }}>
            <span style={{ position: "absolute", left: -22, top: 4, width: 13, height: 13, borderRadius: 99, background: "var(--surface2)", border: "2px solid " + modelColor(a.model) }} />
            <div style={{ fontSize: 12.5, marginBottom: 5 }}><span style={{ fontWeight: 560 }}>{a.name}</span> <span style={{ color: "var(--tx3)" }}>· {a.model}</span></div>
            <div className="card" style={{ padding: 14, fontSize: 14, color: "var(--tx2)", lineHeight: 1.55 }}>{r.text}</div>
          </div>
        ); })}
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: -22, top: 4, width: 13, height: 13, borderRadius: 99, background: "var(--violet)", border: "2px solid var(--violet2)" }} />
          <div style={{ fontSize: 12.5, marginBottom: 5, fontWeight: 560, display: "flex", alignItems: "center", gap: 6 }}><Crown size={13} style={{ color: "var(--violet2)" }} />Manager decision</div>
          <div className="card" style={{ padding: 16, background: "var(--violetSoft)", borderColor: "rgba(124,92,255,.3)" }}>
            <div style={{ fontSize: 14, marginBottom: 8 }}>{d.managerNote}</div>
            <div style={{ fontSize: 12.5, color: "var(--tx2)" }}>Outcome: <span style={{ color: "var(--tx)" }}>{d.decision}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ PROJECTS */
function ProjectsPage() {
  const { state, dispatch } = useStore();
  return (
    <div>
      <SectionTitle right={<Btn variant="primary" icon={Plus} size="sm">New project</Btn>}>Projects</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 14 }}>
        {state.projects.map(p => (
          <div key={p.id} className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <span style={{ width: 36, height: 36, borderRadius: 10, background: "var(--violetSoft)", display: "grid", placeItems: "center", color: "var(--violet2)" }}><FolderKanban size={17} /></span>
              <span className="chip"><Clock size={11} />{p.activity}</span>
            </div>
            <div style={{ fontWeight: 570, fontSize: 15, marginBottom: 6 }}>{p.name}</div>
            <div style={{ fontSize: 13, color: "var(--tx2)", marginBottom: 16, lineHeight: 1.5 }}>{p.goal}</div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--tx2)", marginBottom: 6 }}><span>Progress</span><span className="num">{p.progress}%</span></div>
              <div style={{ height: 6, borderRadius: 99, background: "var(--surface2)", overflow: "hidden" }}><span style={{ display: "block", height: "100%", width: p.progress + "%", background: "linear-gradient(90deg,#7C5CFF,#5286FB)" }} /></div>
            </div>
            <div style={{ display: "flex", gap: 18, fontSize: 12.5, color: "var(--tx2)", borderTop: "1px solid var(--line)", paddingTop: 12 }}>
              <span>{p.agents} agents</span><span>{p.tasks} tasks</span>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--tx2)", marginTop: 8 }}>Latest: {p.decision}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================ KNOWLEDGE */
function KnowledgePage() {
  const { state } = useStore();
  const kinds = ["Files", "Research", "Notes", "Sources", "Memory", "User Context"];
  return (
    <div>
      <SectionTitle right={<Btn variant="primary" icon={Plus} size="sm">Add knowledge</Btn>}>Knowledge</SectionTitle>
      <p style={{ color: "var(--tx2)", marginTop: -6, marginBottom: 18, fontSize: 14 }}>What the organization knows, and which agents have drawn on it.</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
        {kinds.map(k => <span key={k} className="chip">{k}</span>)}
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        {state.knowledge.map((k, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderTop: i ? "1px solid var(--line)" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
              <span style={{ width: 34, height: 34, borderRadius: 9, background: "var(--surface2)", display: "grid", placeItems: "center", color: "var(--tx2)", flex: "none" }}><BookOpen size={15} /></span>
              <div style={{ minWidth: 0 }}><div style={{ fontSize: 13.5, fontWeight: 510 }}>{k.name}</div><div style={{ fontSize: 12, color: "var(--tx3)" }}>{k.kind}</div></div>
            </div>
            <div style={{ display: "flex", flex: "none" }} title="Used by">
              {k.used.map((id, j) => { const a = state.agents.find(x => x.id === id); return (
                <span key={id} title={a?.name} style={{ width: 24, height: 24, borderRadius: 99, background: "var(--surface2)", border: "2px solid var(--surface)", display: "grid", placeItems: "center", color: a ? modelColor(a.model) : "var(--tx3)", marginLeft: j ? -7 : 0 }}>{a && React.createElement(iconForRole(a.role), { size: 11 })}</span>
              ); })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================ ANALYTICS */
function AnalyticsPage() {
  const { state } = useStore();
  const taskData = [
    { d: "Mon", done: 4 }, { d: "Tue", done: 7 }, { d: "Wed", done: 5 }, { d: "Thu", done: 9 }, { d: "Fri", done: 8 }, { d: "Sat", done: 3 }, { d: "Sun", done: 6 },
  ];
  const modelUse = Object.keys(MODEL_META).map(m => ({ m: m.split(" ")[0], v: state.agents.filter(a => a.model === m).length })).filter(x => x.v);
  const perf = [...state.agents].sort((a, b) => b.successRate - a.successRate).slice(0, 6).map(a => ({ n: a.name.replace(" Agent", ""), v: a.successRate }));
  return (
    <div>
      <SectionTitle>Analytics</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 16 }}>
        <Metric icon={ListChecks} label="Tasks completed" value="42" sub="this week" accent="var(--cyan)" />
        <Metric icon={Crown} label="Manager decisions" value={state.metrics.decisions} accent="var(--violet)" />
        <Metric icon={Clock} label="Time saved" value="~31h" accent="var(--green)" />
        <Metric icon={Hand} label="Human interventions" value={state.metrics.interventions} accent="var(--amber)" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 16 }} className="dash-grid">
        <div className="card" style={{ padding: 18 }}>
          <SectionTitle>Task completion</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={taskData} margin={{ left: -22, right: 6, top: 6 }}>
              <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7C5CFF" stopOpacity={0.5} /><stop offset="100%" stopColor="#7C5CFF" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid stroke="rgba(255,255,255,.05)" vertical={false} />
              <XAxis dataKey="d" stroke="var(--tx3)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--tx3)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--bg2)", border: "1px solid var(--line2)", borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="done" stroke="#7C5CFF" strokeWidth={2} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ padding: 18 }}>
          <SectionTitle>Model utilization</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={modelUse} margin={{ left: -22, right: 6, top: 6 }}>
              <CartesianGrid stroke="rgba(255,255,255,.05)" vertical={false} />
              <XAxis dataKey="m" stroke="var(--tx3)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--tx3)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "var(--bg2)", border: "1px solid var(--line2)", borderRadius: 10, fontSize: 12 }} cursor={{ fill: "rgba(255,255,255,.03)" }} />
              <Bar dataKey="v" fill="#2FD4E6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card" style={{ padding: 18 }}>
        <SectionTitle>Agent performance</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {perf.map(p => (
            <div key={p.n} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 150, fontSize: 13, color: "var(--tx2)", flex: "none" }}>{p.n}</span>
              <div style={{ flex: 1, height: 8, borderRadius: 99, background: "var(--surface2)", overflow: "hidden" }}><span style={{ display: "block", height: "100%", width: p.v + "%", background: "linear-gradient(90deg,#3ECF8E,#2FD4E6)" }} /></div>
              <span className="num" style={{ fontSize: 13, width: 40, textAlign: "right" }}>{p.v}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ EVOLUTION */
function EvolutionPage() {
  const { state, dispatch } = useStore();
  const toneC = { base: "var(--tx3)", up: "var(--green)", add: "var(--violet)", swap: "var(--cyan)", rule: "var(--amber)" };
  const sevC = { high: "var(--red)", med: "var(--amber)", low: "var(--tx3)" };
  const open = state.recs.filter(r => r.status === "open");
  return (
    <div>
      <SectionTitle>Evolution</SectionTitle>
      <p style={{ color: "var(--tx2)", marginTop: -6, marginBottom: 22, fontSize: 14 }}>Your organization learns from outcomes, feedback and changing goals — and reshapes itself.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }} className="dash-grid">
        <div className="card" style={{ padding: 22 }}>
          <SectionTitle>Timeline</SectionTitle>
          <div style={{ position: "relative", paddingLeft: 20 }}>
            <div style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 1, background: "var(--line2)" }} />
            {state.evolution.map((e, i) => (
              <div key={i} style={{ position: "relative", marginBottom: 18 }}>
                <span style={{ position: "absolute", left: -20, top: 3, width: 11, height: 11, borderRadius: 99, background: "var(--surface2)", border: "2px solid " + toneC[e.tone] }} />
                <div className="mono" style={{ fontSize: 11.5, color: toneC[e.tone], marginBottom: 3 }}>{e.day}</div>
                <div style={{ fontSize: 13.5, color: "var(--tx2)", lineHeight: 1.5 }}>{e.text}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 22 }}>
          <SectionTitle>Recommended changes</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {open.map(r => (
              <div key={r.id} className="fade" style={{ border: "1px solid var(--line2)", borderRadius: 12, padding: 14 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}><span className="dot" style={{ background: sevC[r.sev], marginTop: 6 }} /><div style={{ fontSize: 13.5, lineHeight: 1.5 }}>{r.text}</div></div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Btn variant="approve" size="sm" icon={Check} onClick={() => dispatch({ type: "RESOLVE_REC", id: r.id, status: "accepted" })}>Accept</Btn>
                  <Btn variant="ghost" size="sm" icon={Eye}>Review</Btn>
                  <Btn variant="quiet" size="sm" onClick={() => dispatch({ type: "RESOLVE_REC", id: r.id, status: "dismissed" })}>Dismiss</Btn>
                </div>
              </div>
            ))}
            {!open.length && <div style={{ textAlign: "center", color: "var(--tx3)", fontSize: 13, padding: 20 }}>No open recommendations. The organization is running well.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ SETTINGS */
function SettingsPage() {
  const { state, dispatch } = useStore();
  const sections = ["Profile", "Organization", "Models", "Permissions", "Human approval", "Notifications", "Data", "Integrations"];
  const [active, setActive] = useState("Profile");
  return (
    <div>
      <SectionTitle>Settings</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 18, alignItems: "start" }} className="set-grid">
        <div className="card" style={{ padding: 8 }}>
          {sections.map(s => (
            <button key={s} className={`navitem ${active === s ? "active" : ""}`} onClick={() => setActive(s)}>{s}</button>
          ))}
        </div>
        <div className="card" style={{ padding: 22 }}>
          {active === "Profile" && <>
            <SectionTitle>Profile</SectionTitle>
            <Field label="Name"><input className="input" value={state.profile.name} onChange={e => dispatch({ type: "SET_PROFILE", patch: { name: e.target.value } })} /></Field>
            <Field label="Role"><input className="input" value={state.profile.role} onChange={e => dispatch({ type: "SET_PROFILE", patch: { role: e.target.value } })} /></Field>
            <Field label="Mission"><textarea className="input" value={state.profile.goal} onChange={e => dispatch({ type: "SET_PROFILE", patch: { goal: e.target.value } })} style={{ minHeight: 90 }} /></Field>
          </>}
          {active === "Human approval" && <>
            <SectionTitle>Human approval</SectionTitle>
            {[{ k: "legalReview", l: "Require review for legal outputs" }, { k: "budgetApproval", l: "Approve budget decisions over $10,000" }, { k: "humanApprove", l: "Approve every Manager decision" }].map((r, i) => (
              <div key={r.k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
                <span style={{ fontSize: 14, color: "var(--tx2)" }}>{r.l}</span><Toggle on={state.rules[r.k]} onClick={() => dispatch({ type: "TOGGLE_RULE", key: r.k })} />
              </div>
            ))}
          </>}
          {active === "Models" && <>
            <SectionTitle>Models</SectionTitle>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0" }}>
              <span style={{ fontSize: 14, color: "var(--tx2)" }}>Auto-assign the best model per role</span><Toggle on={state.rules.autoModel} onClick={() => dispatch({ type: "TOGGLE_RULE", key: "autoModel" })} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
              {Object.keys(MODEL_META).map(m => (
                <div key={m} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid var(--line)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13.5 }}><span className="dot" style={{ background: modelColor(m) }} />{m}</span>
                  <span style={{ fontSize: 12, color: "var(--tx3)" }}>{state.agents.filter(a => a.model === m).length} agents</span>
                </div>
              ))}
            </div>
          </>}
          {!["Profile", "Human approval", "Models"].includes(active) && <>
            <SectionTitle>{active}</SectionTitle>
            <div style={{ color: "var(--tx3)", fontSize: 14, padding: "20px 0" }}>Configure {active.toLowerCase()} for your organization. (Prototype section.)</div>
          </>}
        </div>
      </div>
      <style>{`@media(max-width:760px){.set-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}

const EmptyBack = ({ label, to }) => {
  const { dispatch } = useStore();
  return <div style={{ textAlign: "center", padding: 60 }}><div style={{ color: "var(--tx3)", marginBottom: 14 }}>{label}</div><Btn variant="ghost" onClick={() => dispatch({ type: "NAV", route: to })}>Go back</Btn></div>;
};

/* ============================================================ ROUTER / APP */
function Routed() {
  const { state } = useStore();
  const r = state.route;
  if (r === "landing") return <Landing />;
  if (r === "onboard-profile") return <OnboardProfile />;
  if (r === "onboard-role") return <OnboardRole />;
  if (r === "onboard-goal") return <OnboardGoal />;
  if (r === "onboard-models") return <OnboardModels />;
  if (r === "generating") return <Generating />;
  if (r === "review") return <OrgReview />;
  // shell pages
  const page = {
    dashboard: <Dashboard />, "org-review": <OrgReviewShell />, agents: <AgentsPage />, "agent-detail": <AgentDetail />,
    manager: <ManagerPage />, tasks: <TasksPage />, debates: <DebatesPage />, "debate-detail": <DebateDetail />,
    projects: <ProjectsPage />, knowledge: <KnowledgePage />, analytics: <AnalyticsPage />, evolution: <EvolutionPage />, settings: <SettingsPage />,
  }[r] || <Dashboard />;
  return <Shell>{page}</Shell>;
}
// org-review inside shell (after launch) reuses the graph
function OrgReviewShell() {
  const { state, dispatch } = useStore();
  const [sel, setSel] = useState(null);
  return (
    <div>
      <SectionTitle right={<Btn variant="ghost" icon={Plus} size="sm">Add agent</Btn>}>My organization</SectionTitle>
      <div className="glass" style={{ padding: "16px 8px 6px" }}>
        <OrgGraph mode="hierarchy" height={400} onNode={(id) => setSel(id)} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12, marginTop: 16 }}>
        {state.agents.map(a => (
          <button key={a.id} className="card" style={{ padding: 14, textAlign: "left" }} onClick={() => dispatch({ type: "NAV", route: "agent-detail", id: a.id })}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>{React.createElement(iconForRole(a.role), { size: 16, color: modelColor(a.model) })}<StatusDot status={a.status} pulse /></div>
            <div style={{ fontSize: 13.5, fontWeight: 540 }}>{a.name}</div>
            <div style={{ fontSize: 12, color: "var(--tx3)", marginTop: 2 }}>{a.model}</div>
          </button>
        ))}
      </div>
      {sel && <AgentDrawer id={sel} onClose={() => setSel(null)} />}
    </div>
  );
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // live simulation
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const isShell = !["landing", "onboard-profile", "onboard-role", "onboard-goal", "generating"].includes(state.route);
    if (!isShell || !state.live) return;
    const t = setInterval(() => dispatch({ type: "TICK" }), 3800);
    return () => clearInterval(t);
  }, [state.route, state.live]);
  // scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0); }, [state.route, state.selectedId]);

  return (
    <Ctx.Provider value={{ state, dispatch }}>
      <GlobalStyles />
      <Routed />
    </Ctx.Provider>
  );
}
