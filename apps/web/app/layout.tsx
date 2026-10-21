import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title:"KnowledgePilot AI", description:"Ask questions across your team's knowledge, with source-backed answers." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
