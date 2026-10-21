export interface Workspace { id: string; name: string; description: string; }
export interface DocumentRecord { id: string; workspaceId: string; filename: string; mimeType: string; size: number; status: "processing" | "ready" | "failed"; chunks: number; createdAt: string; }
export interface Chunk { id: string; documentId: string; workspaceId: string; documentName: string; index: number; content: string; tokensEstimate: number; }
export interface Citation { id: string; documentId: string; filename: string; chunkIndex: number; excerpt: string; score: number; }
