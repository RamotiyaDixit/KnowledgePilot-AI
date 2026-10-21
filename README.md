# KnowledgePilot AI

A demo-first retrieval-augmented generation (RAG) workspace built with Next.js, React, TypeScript, Express, and a PostgreSQL + pgvector schema.

## Features
- Modern knowledge dashboard with document library, RAG chat, source inspector, and basic analytics.
- Upload `.txt`, `.md`, and text-based `.pdf` files; normalize and chunk content with overlap.
- Retrieval returns source citations and excerpts so answers can be checked against their context.
- Works without API credentials using deterministic demo retrieval. Optional OpenAI-compatible chat completion and embedding hooks are available through environment variables.
- Docker Compose for web, API, and PostgreSQL; GitHub Actions typecheck/build workflow.

## Quick start
Requirements: Node.js 20+ and npm.

```bash
cp .env.example .env
npm install
npm run dev
```

Web: http://localhost:3000. API health: http://localhost:4000/health.

## Docker

```bash
docker compose up --build
```

## Environment
Set `LLM_BASE_URL`, `LLM_API_KEY`, `LLM_MODEL`, and `EMBEDDING_MODEL` to use an OpenAI-compatible provider. No key is needed for demo mode.

## API
- `GET /health`
- `GET /api/workspaces`
- `GET /api/documents`
- `POST /api/documents` multipart form field `file`
- `DELETE /api/documents/:id`
- `POST /api/chat` JSON `{ "question": "...", "workspaceId": "ws-demo" }`
- `GET /api/analytics`

## Important implementation notes
The starter API uses an in-memory demo repository so it runs without services. It resets document data on API restart. `infra/db/init.sql` provides the PostgreSQL/pgvector schema foundation but is not yet wired into the runtime repository. The retrieval baseline is lexical scoring; provider embeddings are exposed as an integration hook rather than represented as vector search before a durable vector repository is connected.

This is not production-ready multi-tenant software: authentication, authorization, tenant isolation, durable storage, background ingestion queues, rate limits, malware scanning, and full observability remain roadmap work. Use trusted local documents only.

## Roadmap
- Connect repository layer to PostgreSQL + pgvector.
- Add auth, workspace memberships, and tenant isolation.
- Move ingestion to Redis + BullMQ workers.
- Add reranking/evaluation, S3 storage, DOCX support, rate limits, and production observability.

MIT License.
