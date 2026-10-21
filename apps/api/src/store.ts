import { randomUUID } from "node:crypto";
import type { Chunk, DocumentRecord, Workspace } from "./types.js";
export const workspaces: Workspace[] = [{ id: "ws-demo", name: "Product & Engineering", description: "Product specs, architecture notes, and team handbooks" }];
export const documents: DocumentRecord[] = [
 { id: "doc-seed-1", workspaceId: "ws-demo", filename: "platform-overview.md", mimeType: "text/markdown", size: 2480, status: "ready", chunks: 3, createdAt: new Date(Date.now()-18000000).toISOString() },
 { id: "doc-seed-2", workspaceId: "ws-demo", filename: "support-playbook.txt", mimeType: "text/plain", size: 1840, status: "ready", chunks: 2, createdAt: new Date(Date.now()-7200000).toISOString() }
];
export const chunks: Chunk[] = [
 { id: "chunk-1", documentId: "doc-seed-1", workspaceId: "ws-demo", documentName: "platform-overview.md", index: 0, content: "KnowledgePilot organizes source material into workspaces. Each uploaded document is normalized, split into overlapping chunks, and indexed with document metadata. The chat API retrieves relevant chunks before preparing an answer.", tokensEstimate: 48 },
 { id: "chunk-2", documentId: "doc-seed-1", workspaceId: "ws-demo", documentName: "platform-overview.md", index: 1, content: "Answers should be grounded in retrieved passages. Each citation includes the original filename, chunk number, a short excerpt, and a relevance score so users can verify the answer.", tokensEstimate: 31 },
 { id: "chunk-3", documentId: "doc-seed-1", workspaceId: "ws-demo", documentName: "platform-overview.md", index: 2, content: "The starter runs in demo mode without an API key. For production, connect durable PostgreSQL and pgvector persistence, tenant-aware authentication, background jobs, and storage controls.", tokensEstimate: 26 },
 { id: "chunk-4", documentId: "doc-seed-2", workspaceId: "ws-demo", documentName: "support-playbook.txt", index: 0, content: "For support requests, first identify the customer impact and severity. Capture steps to reproduce, expected behavior, actual behavior, and any relevant request IDs before escalating.", tokensEstimate: 27 },
 { id: "chunk-5", documentId: "doc-seed-2", workspaceId: "ws-demo", documentName: "support-playbook.txt", index: 1, content: "Never place API keys, passwords, private customer details, or other secrets into a knowledge document. Keep operational incident notes factual and link to approved internal records.", tokensEstimate: 24 }
];
export function addDocument(input: Omit<DocumentRecord, "id" | "createdAt">, contents: string[]): DocumentRecord {
 const doc: DocumentRecord = { ...input, id: randomUUID(), createdAt: new Date().toISOString() }; documents.unshift(doc);
 contents.forEach((content,index)=>chunks.push({ id:randomUUID(), documentId:doc.id, workspaceId:doc.workspaceId, documentName:doc.filename, index, content, tokensEstimate:Math.max(1,Math.ceil(content.length/4)) })); return doc;
}
export function removeDocument(id:string):boolean { const index=documents.findIndex((doc)=>doc.id===id); if(index<0)return false; documents.splice(index,1); for(let i=chunks.length-1;i>=0;i--)if(chunks[i].documentId===id)chunks.splice(i,1); return true; }
