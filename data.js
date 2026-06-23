// ═══════════════════════════════════════════════════════════════
//  AI ENGINEER CURRICULUM TRACKER — data.js
//  Based on the 9-Phase, 26-Week, 3-Capstone curriculum
//  Edit ROADMAP_START to your actual start date
// ═══════════════════════════════════════════════════════════════

const ROADMAP_START = new Date(2026, 5, 23); // June 23 2026 — change this!

// ── Daily Study Slots ──
const DAILY_SLOTS = [
  { id: "morning",  label: "🌅 Morning Theory",   start: "06:30", end: "07:30", days: [1,2,3,4,5] },
  { id: "evening",  label: "🌙 Evening Coding",    start: "20:00", end: "21:30", days: [1,2,3,4,5] },
  { id: "saturday", label: "🗓️ Saturday Deep Dive", start: "09:00", end: "13:00", days: [6] },
  { id: "sunday",   label: "☀️ Sunday Review",      start: "10:00", end: "13:00", days: [0] },
];

// ── Phase Config ──
const PHASE_CONFIG = {
  1: { color: "#22c55e", bg: "#052e16", label: "Phase 1 — Python Foundations",           weeks: "Week 1–3",   difficulty: "1/5 ⭐" },
  2: { color: "#38bdf8", bg: "#0c2340", label: "Phase 2 — Mental Model of an LLM",       weeks: "Week 4",     difficulty: "1/5 ⭐" },
  3: { color: "#a78bfa", bg: "#1e0a3c", label: "Phase 3 — Prompt Engineering & APIs",    weeks: "Weeks 5–7",  difficulty: "2/5 ⭐⭐" },
  4: { color: "#fb923c", bg: "#2a1200", label: "Phase 4 — RAG + Evaluation",             weeks: "Weeks 8–12", difficulty: "4/5 ⭐⭐⭐⭐", capstone: 1 },
  5: { color: "#f43f5e", bg: "#2d0a14", label: "Phase 5 — Tools, MCP & Single Agents",   weeks: "Weeks 13–16",difficulty: "4/5 ⭐⭐⭐⭐" },
  6: { color: "#e879f9", bg: "#2a0a30", label: "Phase 6 — Memory & Context Engineering", weeks: "Weeks 17–19",difficulty: "4/5 ⭐⭐⭐⭐" },
  7: { color: "#facc15", bg: "#1a1200", label: "Phase 7 — Multi-Agent Orchestration",    weeks: "Weeks 20–22",difficulty: "5/5 ⭐⭐⭐⭐⭐", capstone: 2 },
  8: { color: "#94a3b8", bg: "#0f172a", label: "Phase 8 — Guardrails & LLMOps",         weeks: "Weeks 23–24",difficulty: "3/5 ⭐⭐⭐" },
  9: { color: "#f97316", bg: "#1a0a00", label: "Phase 9 — Cloud Infra & Deployment",     weeks: "Weeks 25–26",difficulty: "3/5 ⭐⭐⭐", capstone: 3 },
};

// ── Full 26-Week Curriculum ──
const ROADMAP = [

  // ═══════════════════════════════════════════
  // PHASE 1 — PYTHON FOUNDATIONS (Weeks 1–3)
  // ═══════════════════════════════════════════
  {
    phase: 1, week: 1, weekLabel: "Week 1",
    topic: "Core Python + OOP",
    modules: ["1.1 Core Python", "1.2 Object-Oriented Python", "1.3 Data Structures"],
    detail: "Variables, control flow, functions, classes, inheritance, dicts/lists/sets",
    morning: "Watch Python OOP deep-dive (Corey Schafer YouTube)",
    evening: "Code: build a class hierarchy for a tool registry system",
    saturday: "Project: CLI agent simulator — object-oriented tool dispatcher",
    sunday: "Review OOP + start 1.3 Data Structures drills",
    endState: "You can write clean, idiomatic Python classes that will host future agent logic",
    resources: ["docs.python.org", "Corey Schafer Python OOP", "realpython.com"],
    milestone: null,
  },
  {
    phase: 1, week: 2, weekLabel: "Week 2",
    topic: "Error Handling + File I/O + HTTP APIs",
    modules: ["1.4 Error & File Handling", "1.5 Working with HTTP APIs"],
    detail: "try/except, context managers, requests lib, HTTP verbs, auth, rate limits, tenacity",
    morning: "Study: HTTP protocol + Bearer tokens + API keys pattern",
    evening: "Code: multi-LLM caller with exponential backoff (tenacity) + timeout handling",
    saturday: "Project: FastAPI endpoint that calls 3 LLMs in parallel, times out the slow one",
    sunday: "Review HTTP APIs + read tenacity docs + plan Week 3",
    endState: "You can build a FastAPI endpoint that calls three different LLMs in parallel, times out the slow one, and logs the result without blocking the response.",
    resources: ["requests.readthedocs.io", "tenacity.readthedocs.io", "fastapi.tiangolo.com"],
    milestone: null,
  },
  {
    phase: 1, week: 3, weekLabel: "Week 3",
    topic: "Database Connectivity + FastAPI + Async",
    modules: ["1.6 Database Connectivity", "1.7 FastAPI", "1.8 Async Programming"],
    detail: "SQLAlchemy, asyncpg, FastAPI routes, Pydantic models, async/await, event loops",
    morning: "Watch: FastAPI + SQLAlchemy crash course + asyncio fundamentals",
    evening: "Code: async FastAPI app with PostgreSQL reads + background tasks",
    saturday: "Project: Full async FastAPI service — CRUD + background worker + health endpoint",
    sunday: "✅ PHASE 1 REVIEW — test all 8 modules · push code to GitHub",
    endState: "Clean async FastAPI app with DB, ready to host agent endpoints",
    resources: ["fastapi.tiangolo.com", "sqlalchemy.org", "docs.python.org/asyncio"],
    milestone: "✅ PHASE 1 DONE — Python engine ready. Every agent framework you touch now makes sense.",
  },

  // ═══════════════════════════════════════════
  // PHASE 2 — MENTAL MODEL OF AN LLM (Week 4)
  // ═══════════════════════════════════════════
  {
    phase: 2, week: 4, weekLabel: "Week 4",
    topic: "The Mental Model of an LLM",
    modules: ["2.1 What an LLM actually is", "2.2 How an LLM thinks", "2.3 Reasoning vs base models", "2.4 Reading model evals", "2.5 Comparing major models"],
    detail: "Fixed snapshot, probabilistic generation, knowledge cutoff, hallucination, benchmarks, model selection",
    morning: "Read: 'What is ChatGPT doing?' (Wolfram) + Anthropic model cards",
    evening: "Study: MMLU, HumanEval, LMSYS Chatbot Arena — understand benchmark math",
    saturday: "Research: compare GPT-4o vs Claude 3.5 vs Gemini 1.5 vs Llama 3 on 3 use cases",
    sunday: "✅ PHASE 2 REVIEW — write a 1-page model-selection cheatsheet for your GitHub",
    endState: "You can explain to a non-technical PM why ChatGPT made up a fact, and tell a hiring panel which model to pick for which job — backed by benchmarks, not vibes.",
    resources: ["lmarena.ai", "huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard", "anthropic.com/claude"],
    milestone: "✅ PHASE 2 DONE — You understand what you're building on top of.",
  },

  // ═══════════════════════════════════════════
  // PHASE 3 — PROMPT ENGINEERING (Weeks 5–7)
  // ═══════════════════════════════════════════
  {
    phase: 3, week: 5, weekLabel: "Week 5",
    topic: "UI vs API + Calling LLMs via API",
    modules: ["3.1 UI vs API — the hinge moment", "3.2 Calling LLMs via API"],
    detail: "System prompts, API vs chat UI differences, OpenAI/Anthropic/Gemini SDK calls, streaming",
    morning: "Read: OpenAI API docs + Anthropic API docs (system prompt section)",
    evening: "Code: same prompt via UI vs API — log the diff. Add streaming output.",
    saturday: "Project: multi-provider LLM router (pick model by task type, stream responses)",
    sunday: "Review + cost analysis: count tokens, estimate monthly bill for 10k users",
    endState: "You call LLMs like an engineer, not a user",
    resources: ["platform.openai.com/docs", "docs.anthropic.com", "ai.google.dev"],
    milestone: null,
  },
  {
    phase: 3, week: 6, weekLabel: "Week 6",
    topic: "Prompt Anatomy + Core Techniques",
    modules: ["3.3 Prompt anatomy", "3.4 Core techniques", "3.5 Applied prompt patterns"],
    detail: "Zero-shot, few-shot, CoT, ReAct prompts, role definition, output constraints",
    morning: "Read: learnprompting.org + OpenAI prompt engineering guide",
    evening: "Code: build a prompt library with 10 reusable templates (JSON output, classification, extraction)",
    saturday: "Project: systematic prompt testing harness — 5 prompts × 3 models × eval metric",
    sunday: "Review + post prompt library to GitHub with README",
    endState: "You turn flaky prompts into reliable ones",
    resources: ["learnprompting.org", "cookbook.openai.com", "promptingguide.ai"],
    milestone: null,
  },
  {
    phase: 3, week: 7, weekLabel: "Week 7",
    topic: "Advanced Reasoning + Prompt Ops",
    modules: ["3.6 Advanced reasoning techniques", "3.7 Prompt management & cost in production"],
    detail: "Chain-of-thought variants, self-consistency, LLM-as-judge, prompt versioning, caching, cost tracking",
    morning: "Study: self-consistency prompting + LLM-as-judge patterns",
    evening: "Code: prompt caching with Redis + cost logger middleware for FastAPI",
    saturday: "Project: eval harness — LLM judges 100 outputs, logs pass/fail to CSV",
    sunday: "✅ PHASE 3 REVIEW — you can make a flaky prompt reliable and cut cost 50% with caching",
    endState: "You can take a flaky prompt that works 'sometimes' and systematically make it reliable — and cut its cost in half with caching.",
    resources: ["arxiv.org/abs/2203.11171", "smith.langchain.com", "redis.io/docs/manual/client-side-caching"],
    milestone: "✅ PHASE 3 DONE — Pivot complete. You control LLMs, they don't control you.",
  },

  // ═══════════════════════════════════════════
  // PHASE 4 — RAG + EVALUATION (Weeks 8–12)
  // ═══════════════════════════════════════════
  {
    phase: 4, week: 8, weekLabel: "Week 8",
    topic: "Why RAG Exists + Embeddings",
    modules: ["4.1 Why RAG exists", "4.2 Embeddings"],
    detail: "RAG motivation, private data access, embedding models, cosine similarity, vector math",
    morning: "Read: Pinecone 'What is RAG?' guide + OpenAI embeddings docs",
    evening: "Code: embed 100 sentences, plot t-SNE, find nearest neighbours",
    saturday: "Project: semantic search over your own notes using OpenAI embeddings + cosine sim",
    sunday: "Review + compare embedding models (text-embedding-3 vs ada-002 vs Cohere)",
    endState: "You understand what a vector is and why it matters for retrieval",
    resources: ["pinecone.io/learn/retrieval-augmented-generation", "openai.com/blog/new-and-improved-embedding-model"],
    milestone: null,
  },
  {
    phase: 4, week: 9, weekLabel: "Week 9",
    topic: "Document Ingestion + Chunking",
    modules: ["4.3 Document ingestion pipeline", "4.4 Chunking strategies", "4.5 Chunk enrichment"],
    detail: "Docling, PDF parsing, fixed/semantic/recursive chunking, metadata injection, PII redaction",
    morning: "Watch: LangChain document loaders + Docling demo",
    evening: "Code: ingest a PDF → Docling → chunk → add metadata → embed",
    saturday: "Project: ingestion pipeline for 50 PDFs — parallel workers, retry on fail",
    sunday: "Review chunking strategies: compare fixed vs semantic on retrieval quality",
    endState: "You can ingest any document and make it retrievable",
    resources: ["ds4sd.github.io/docling", "python.langchain.com/docs/modules/data_connection"],
    milestone: null,
  },
  {
    phase: 4, week: 10, weekLabel: "Week 10",
    topic: "Vector Databases + Hybrid Retrieval",
    modules: ["4.6 Vector databases", "4.7 Hybrid retrieval & next-gen retrievers"],
    detail: "Pinecone, ChromaDB, FAISS, BM25, hybrid search, reranking, ColBERT, HyDE",
    morning: "Watch: Pinecone + Weaviate architecture deep dives",
    evening: "Code: Pinecone index + hybrid BM25+vector search + Cohere reranker",
    saturday: "Project: compare pure vector vs hybrid vs reranked retrieval on same dataset — measure Precision@k",
    sunday: "Review: read RAG-Fusion and HyDE papers",
    endState: "You retrieve with precision, not just similarity",
    resources: ["pinecone.io/docs", "docs.trychroma.com", "docs.cohere.com/reference/rerank"],
    milestone: null,
  },
  {
    phase: 4, week: 11, weekLabel: "Week 11",
    topic: "Graph RAG + RAG Evaluation",
    modules: ["4.8 Graph-augmented RAG", "4.9 RAG evaluation — the part most courses skip"],
    detail: "Neo4j knowledge graphs, Cypher queries, RAG Triad (faithfulness/relevance/context), golden datasets, RAGAS",
    morning: "Study: Microsoft GraphRAG paper + Neo4j LangChain integration",
    evening: "Code: Neo4j graph + vector hybrid retrieval + RAGAS eval on 20 Q&A pairs",
    saturday: "Project: full RAG eval harness — golden dataset, Precision@k, Recall@k, RAG Triad scores",
    sunday: "Review: identify the top 3 failure modes in your RAG system",
    endState: "You can measure why your RAG is wrong and fix it with data",
    resources: ["neo4j.com/developer/graph-data-science/", "docs.ragas.io", "arxiv.org/abs/2404.16130"],
    milestone: null,
  },
  {
    phase: 4, week: 12, weekLabel: "Week 12 — 🏆 CAPSTONE 1",
    topic: "🏆 CAPSTONE 1 — Distributed RAG Pipeline",
    modules: ["Capstone 1: Distributed Document Ingestion + RAG Pipeline"],
    detail: "Docling → PII redaction → Pinecone + Neo4j → ECS Fargate workers → DynamoDB state → FastAPI Q&A endpoint",
    morning: "Architecture review: diagram the full system, identify bottlenecks",
    evening: "Build: async ECS worker + DynamoDB state tracker (queued/processing/done/failed)",
    saturday: "Build: FastAPI Q&A endpoint with citation-backed answers + eval harness",
    sunday: "✅ CAPSTONE 1 COMPLETE — deploy + write README + record 90s Loom demo",
    endState: "You can build production RAG, not a Streamlit demo.",
    resources: ["Docling", "Pinecone", "Neo4j", "ECS Fargate", "DynamoDB", "S3", "Bedrock embeddings", "LangSmith"],
    milestone: "✅ CAPSTONE 1 SHIPPED — Production RAG pipeline with eval. This is your first portfolio piece.",
    isCapstone: true,
  },

  // ═══════════════════════════════════════════
  // PHASE 5 — TOOLS, MCP, AGENTS (Weeks 13–16)
  // ═══════════════════════════════════════════
  {
    phase: 5, week: 13, weekLabel: "Week 13",
    topic: "Function Calling + Tool Design",
    modules: ["5.1 Function calling / tool use", "5.2 Tool design principles"],
    detail: "JSON Schema, Pydantic tool schemas, how LLM picks tools, parsing tool-call responses, error handling",
    morning: "Read: OpenAI function calling guide + Anthropic tool use docs",
    evening: "Code: 5 tools (web search, calculator, DB query, email sender, file reader) with proper schemas",
    saturday: "Project: tool registry — dynamic tool loading, schema validation, call logging",
    sunday: "Review: test each tool in isolation, measure error rate",
    endState: "You design tools the LLM can actually use reliably",
    resources: ["platform.openai.com/docs/guides/function-calling", "docs.anthropic.com/en/docs/tool-use"],
    milestone: null,
  },
  {
    phase: 5, week: 14, weekLabel: "Week 14",
    topic: "MCP + ReAct Pattern",
    modules: ["5.3 MCP — Model Context Protocol", "5.4 The ReAct pattern"],
    detail: "MCP architecture, MCP servers, ReAct (Reason + Act) loop, scratchpad traces, loop detection",
    morning: "Read: Anthropic MCP spec + ReAct paper (Yao et al. 2022)",
    evening: "Code: ReAct agent from scratch — no framework, just prompt + tool loop",
    saturday: "Project: ReAct agent that searches web + reads DB + sends email summary",
    sunday: "Review: trace every ReAct step in LangSmith, find the failure points",
    endState: "You understand what an agent loop actually is before using a framework",
    resources: ["modelcontextprotocol.io", "arxiv.org/abs/2210.03629", "smith.langchain.com"],
    milestone: null,
  },
  {
    phase: 5, week: 15, weekLabel: "Week 15",
    topic: "LangChain Agents + Human-in-the-Loop",
    modules: ["5.5 LangChain agents", "5.6 Human in the loop", "5.7 Tool security"],
    detail: "LangChain agent executor, interrupt patterns, approval gates, tool permission model, injection defense",
    morning: "Watch: LangChain agent executor deep dive + HITL pattern video",
    evening: "Code: LangChain agent with HITL approval gate before destructive actions",
    saturday: "Project: agent that queries internal docs + requests human approval before sending emails",
    sunday: "Review: prompt injection attacks — test your agent, document vulnerabilities",
    endState: "Your agent asks permission before doing something dumb",
    resources: ["python.langchain.com/docs/modules/agents", "owasp.org/www-project-top-10-for-large-language-model-applications"],
    milestone: null,
  },
  {
    phase: 5, week: 16, weekLabel: "Week 16",
    topic: "Computer Use + App SDKs",
    modules: ["5.8 Computer use & app SDKs — agents with eyes and a mouse"],
    detail: "Anthropic Computer Use, browser automation, screenshot → action loops, SDK-based app control",
    morning: "Watch: Anthropic Computer Use demo + browser-use library overview",
    evening: "Code: agent that navigates a website, extracts data, fills a form",
    saturday: "Project: agent that searches web, reads internal docs, queries DB, emails summary — with stop-if-dumb logic",
    sunday: "✅ PHASE 5 REVIEW — single agent with full tool suite, security tested",
    endState: "You can build a single agent that searches the web, reads internal docs, queries a DB, and emails you a summary — and stops if it tries to do something dumb.",
    resources: ["docs.anthropic.com/en/docs/agents-and-tools/computer-use", "browser-use.com"],
    milestone: "✅ PHASE 5 DONE — The brain has hands and legs. It knows when to stop.",
  },

  // ═══════════════════════════════════════════
  // PHASE 6 — MEMORY & CONTEXT (Weeks 17–19)
  // ═══════════════════════════════════════════
  {
    phase: 6, week: 17, weekLabel: "Week 17",
    topic: "Context Window + Short-Term Memory",
    modules: ["6.1 The context window as working memory", "6.2 Context structure (SYSTEM/CONTEXT/USER)", "6.3 Short-term memory — session history"],
    detail: "Token budgeting, lost-in-middle problem, recency bias, message history management, sliding window",
    morning: "Read: 'Lost in the Middle' paper + Anthropic context engineering guide",
    evening: "Code: session history manager with token budget + sliding window + importance scoring",
    saturday: "Project: multi-turn chatbot that never exceeds 8k tokens — test with 50-turn conversation",
    sunday: "Review: graph token usage per turn, find the cliff",
    endState: "You understand why your agent forgets mid-conversation",
    resources: ["arxiv.org/abs/2307.03172", "docs.anthropic.com/context-windows", "tiktoken"],
    milestone: null,
  },
  {
    phase: 6, week: 18, weekLabel: "Week 18",
    topic: "Semantic Caching + Episodic Memory",
    modules: ["6.4 Semantic caching", "6.5 Episodic memory"],
    detail: "Semantic cache with Redis + vector similarity, episodic memory stores, retrieval from past sessions",
    morning: "Watch: semantic caching architecture deep dive (LangSmith blog)",
    evening: "Code: Redis semantic cache — if new query is 95% similar to cached, return cached",
    saturday: "Project: agent with episodic memory — remembers what user asked 3 sessions ago",
    sunday: "Review: measure cache hit rate + cost savings on 1000 simulated queries",
    endState: "Your agent is cheaper to run and remembers what matters",
    resources: ["redis.io/docs", "gptcache.readthedocs.io", "mem0.ai"],
    milestone: null,
  },
  {
    phase: 6, week: 19, weekLabel: "Week 19",
    topic: "Context Compression + Long-Term Memory",
    modules: ["6.6 Context compression", "6.7 Long-term memory"],
    detail: "Summarisation-based compression, selective retention, vector-backed long-term stores, mem0, Zep",
    morning: "Read: mem0 docs + Zep memory framework overview",
    evening: "Code: context compressor — summarise oldest 30% of context when budget is 80% full",
    saturday: "Project: agent with full memory stack — short-term sliding + semantic cache + long-term mem0",
    sunday: "✅ PHASE 6 REVIEW — explain why agent forgot + fix with right memory layer",
    endState: "You can explain why your agent forgot what you said three turns ago, and fix it with the right memory layer instead of throwing more tokens at it.",
    resources: ["mem0.ai/docs", "getzep.com/docs", "python.langchain.com/docs/modules/memory"],
    milestone: "✅ PHASE 6 DONE — Advanced · highest-leverage skill in the curriculum.",
  },

  // ═══════════════════════════════════════════
  // PHASE 7 — MULTI-AGENT (Weeks 20–22)
  // ═══════════════════════════════════════════
  {
    phase: 7, week: 20, weekLabel: "Week 20",
    topic: "When to Go Multi-Agent + LangGraph",
    modules: ["7.1 When to go multi-agent (and when not to)", "7.2 LangGraph fundamentals"],
    detail: "Single-agent-with-tools covers 80% of cases, StateGraph, nodes, edges, conditional routing",
    morning: "Read: LangGraph intro + 'when not to use multi-agent' decision tree",
    evening: "Code: first LangGraph StateGraph — 3 nodes, conditional edge, shared state",
    saturday: "Project: LangGraph pipeline: Planner → Worker → Reviewer with retry loop",
    sunday: "Review: trace every node in LangSmith, find where state gets corrupted",
    endState: "You can build and trace a basic LangGraph workflow",
    resources: ["langchain-ai.github.io/langgraph", "python.langchain.com/langgraph"],
    milestone: null,
  },
  {
    phase: 7, week: 21, weekLabel: "Week 21",
    topic: "Multi-Agent Patterns + Agent-as-Tool",
    modules: ["7.3 Common patterns", "7.4 Agent-as-tool — the lightweight alternative", "7.5 State management"],
    detail: "Supervisor-worker, map-reduce, agent-as-tool shortcut, shared vs private state, state serialisation",
    morning: "Study: LangGraph patterns cookbook (supervisor, parallel, reflection)",
    evening: "Code: supervisor agent routing to specialist sub-agents based on task type",
    saturday: "Project: NL→SQL multi-agent — Planner + SQL Writer + Validator + Executor + Explainer",
    sunday: "Review: benchmark NL→SQL on 20 test queries, measure accuracy",
    endState: "You can orchestrate multiple specialised agents safely",
    resources: ["langchain-ai.github.io/langgraph/concepts/multi_agent", "agentcore.aws"],
    milestone: null,
  },
  {
    phase: 7, week: 22, weekLabel: "Week 22 — 🏆 CAPSTONE 2",
    topic: "🏆 CAPSTONE 2 — Multi-Agent NL→SQL",
    modules: ["7.6 A2A — Agent-to-Agent Protocol", "7.7 Frameworks compared", "7.8 Debugging multi-agent systems", "Capstone 2"],
    detail: "Full multi-agent NL→SQL on e-commerce data · LangGraph + LangSmith + AgentCore + RDS + Streamlit",
    morning: "Build: schema-aware context injection — only relevant tables sent to SQL writer",
    evening: "Build: read-only DB enforcement + query timeout + max-row caps + A2A tracing",
    saturday: "Build: Streamlit frontend + FastAPI backend + benchmark on golden NLQ test set (target 85%+)",
    sunday: "✅ CAPSTONE 2 COMPLETE — deploy + README + 90s Loom + LangSmith trace screenshot",
    endState: "You can orchestrate multiple specialised agents safely against real production data.",
    resources: ["LangChain", "LangGraph", "LangSmith", "AgentCore", "RDS PostgreSQL", "FastAPI", "Streamlit", "Bedrock"],
    milestone: "✅ CAPSTONE 2 SHIPPED — Multi-agent NL→SQL. Portfolio piece #2.",
    isCapstone: true,
  },

  // ═══════════════════════════════════════════
  // PHASE 8 — GUARDRAILS & LLMOPS (Weeks 23–24)
  // ═══════════════════════════════════════════
  {
    phase: 8, week: 23, weekLabel: "Week 23",
    topic: "Three-Layer Guardrail Architecture + AWS Bedrock Guardrails",
    modules: ["8.1 Three-layer guardrail architecture", "8.2 AWS Bedrock Guardrails"],
    detail: "Input guardrails (regex, PII, injection, toxic filter), output guardrails (faithfulness, contradiction), action guardrails (max retries, read-only DB), Bedrock config",
    morning: "Read: Anthropic guardrails guide + AWS Bedrock Guardrails docs",
    evening: "Code: input guardrail middleware (prompt injection regex + PII redactor + topic filter)",
    saturday: "Project: full 3-layer guardrail stack on your Phase 5 agent — test with 20 adversarial inputs",
    sunday: "Review: measure false positive rate on guardrails — tune thresholds",
    endState: "You can put a guardrail on every attack surface",
    resources: ["docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html", "owasp.org/www-project-top-10-for-large-language-model-applications"],
    milestone: null,
  },
  {
    phase: 8, week: 24, weekLabel: "Week 24",
    topic: "LLMOps — Observability + Production Eval",
    modules: ["8.3 LLMOps — observability", "8.4 LLMOps — evaluation in production"],
    detail: "LangSmith tracing, Arize Phoenix, regression test CI, automated eval release gates, drift detection",
    morning: "Watch: LangSmith production monitoring tutorial + Arize Phoenix overview",
    evening: "Code: LangSmith auto-eval — every deployment runs 50-question regression suite",
    saturday: "Project: GitHub Actions CI pipeline — auto-eval on PR, block merge if accuracy drops > 5%",
    sunday: "✅ PHASE 8 REVIEW — you can put a number on how often your agent fails",
    endState: "You can put a number on how often your agent fails, and ship it anyway with confidence.",
    resources: ["smith.langchain.com", "phoenix.arize.com", "mlflow.org"],
    milestone: "✅ PHASE 8 DONE — Your agents are observable and safe in production.",
  },

  // ═══════════════════════════════════════════
  // PHASE 9 — CLOUD INFRA + DEPLOYMENT (Weeks 25–26)
  // ═══════════════════════════════════════════
  {
    phase: 9, week: 25, weekLabel: "Week 25",
    topic: "Cloud Infrastructure (AWS Focus)",
    modules: ["9.1 Storage & data", "9.2 Compute", "9.3 Networking & access", "9.4 AI-specific services"],
    detail: "S3, RDS PostgreSQL, DynamoDB, ECS Fargate, ECR, VPC, API Gateway, Lambda, Bedrock, SageMaker",
    morning: "Study: AWS AI architecture patterns — what goes where and why",
    evening: "Code: Dockerize your Capstone 1 RAG pipeline + push to ECR + deploy to ECS Fargate",
    saturday: "Project: full AWS stack — ECS Fargate + API Gateway + RDS + S3 + Bedrock + Secrets Manager",
    sunday: "Review: VPC security groups, IAM least-privilege, cost estimate for 1000 users/day",
    endState: "You can dockerize and deploy any system from earlier phases to AWS",
    resources: ["docs.aws.amazon.com/ecs/", "docs.aws.amazon.com/apigateway/", "aws.amazon.com/bedrock"],
    milestone: null,
  },
  {
    phase: 9, week: 26, weekLabel: "Week 26 — 🏆 CAPSTONE 3",
    topic: "🏆 CAPSTONE 3 — Clinical Trials Knowledge Base",
    modules: ["9.5 Deployment & realtime delivery", "9.6 Cost & capacity control", "Capstone 3"],
    detail: "ClinicalTrials.gov ingestion → Pinecone + Neo4j → 3-layer guardrails → Bedrock + AgentCore → Lambda → LangSmith + MLflow + cost dashboard",
    morning: "Build: ClinicalTrials.gov ingestion + hybrid Pinecone + Neo4j knowledge layer",
    evening: "Build: full guardrails (disclaimer injection, contradiction check, action limits) + evidence-backed answers",
    saturday: "Deploy: AWS Lambda + monitoring + regression CI + semantic cache + cost dashboard",
    sunday: "✅ CAPSTONE 3 COMPLETE — The curriculum is done. You're an AI engineer. Start the job hunt.",
    endState: "You can take any system you built in earlier phases, dockerize it, deploy to ECS Fargate behind API Gateway, manage secrets, stream tokens to a chat UI, load-test it, and watch the cost dashboard move only when it should.",
    resources: ["LangChain", "LangGraph", "Neo4j + Cypher", "Pinecone", "Bedrock + AgentCore + Lambda", "S3", "LangSmith", "MLflow"],
    milestone: "✅ CAPSTONE 3 SHIPPED — Regulated-domain AI agent. Portfolio complete. Begin job hunt. 🎯",
    isCapstone: true,
  },
];

// ── Milestone Checkpoints ──
const MILESTONES = [
  { week: 3,  month: "Week 3",   icon: "🐍", text: "Python engine ready for any framework",           phase: 1 },
  { week: 4,  month: "Week 4",   icon: "🧠", text: "You understand what you're building on top of",   phase: 2 },
  { week: 7,  month: "Week 7",   icon: "⚡", text: "You control LLMs — they don't control you",       phase: 3 },
  { week: 12, month: "Week 12",  icon: "📦", text: "Production RAG shipped — Portfolio Piece #1",     phase: 4 },
  { week: 16, month: "Week 16",  icon: "🤖", text: "Single agent with tools, security, HITL",        phase: 5 },
  { week: 19, month: "Week 19",  icon: "💾", text: "Full memory stack — agent actually remembers",    phase: 6 },
  { week: 22, month: "Week 22",  icon: "🕸️", text: "Multi-agent NL→SQL shipped — Portfolio Piece #2", phase: 7 },
  { week: 24, month: "Week 24",  icon: "🛡️", text: "Guardrails + LLMOps — observable & safe",         phase: 8 },
  { week: 26, month: "Week 26",  icon: "🚀", text: "Clinical Trials KB shipped — Portfolio Piece #3 · JOB HUNT 🎯", phase: 9 },
];
