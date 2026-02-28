---
name: prompts
description: How to create and register MCP prompt templates with validated arguments.
version: 1.0.0
license: MIT
compatibility:
  - Claude Code
  - Cursor
  - Codex
allowed-tools: Read Write Bash(npm:*)
---

# Prompts

## What is a Prompt?

A prompt is a reusable template that the MCP server exposes. Clients can list available prompts, fill in arguments, and receive pre-built message arrays ready for LLM consumption.

## How to Create a Prompt

1. Create a file in `src/prompts/` that exports a `registerXPrompt(server: McpServer): void` function.
2. Use `server.registerPrompt(name, config, handler)` from `@modelcontextprotocol/sdk`.
3. Define `argsSchema` using `zod` schemas with `.describe()` on each field. Use `.optional()` for non-required arguments.
4. Return `{ messages: [{ role, content: { type: "text", text } }] }` from the handler.
5. Register the function in `src/prompts/index.ts` inside `registerPrompts()`.

## Example

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerTranslatePrompt(server: McpServer): void {
  server.registerPrompt(
    "translate",
    {
      description: "Ask for a translation of a given text",
      argsSchema: {
        text: z.string().describe("Text to translate"),
        language: z.string().describe("Target language"),
      },
    },
    async ({ text, language }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Translate the following text to ${language}: "${text}"`,
          },
        },
      ],
    }),
  );
}
```

## Existing Prompts

- `summarize` — generates a summary request for a given topic with an optional tone (formal, casual, technical).
