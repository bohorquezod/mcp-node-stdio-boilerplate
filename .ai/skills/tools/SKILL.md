---
name: tools
description: How to create, register, and test MCP tools in this project.
version: 1.0.0
license: MIT
compatibility:
  - Claude Code
  - Cursor
  - Codex
allowed-tools: Read Write Bash(npm:*)
---

# Tools

## What is a Tool?

A tool is a function that an MCP client (e.g., Claude, Cursor) can invoke. Tools receive validated input and return structured content.

## How to Create a Tool

1. Create a file in `src/tools/` that exports a `registerXTool(server: McpServer): void` function.
2. Use `server.registerTool(name, config, handler)` from `@modelcontextprotocol/sdk`.
3. Define `inputSchema` using `zod` schemas with `.describe()` on each field.
4. Return `{ content: [{ type: "text", text: "..." }] }` from the handler.
5. Register the function in `src/tools/index.ts` inside `registerTools()`.

## Example

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerGreetTool(server: McpServer): void {
  server.registerTool(
    "greet",
    {
      description: "Return a greeting for the given name",
      inputSchema: { name: z.string().describe("Name to greet") },
    },
    async ({ name }) => ({
      content: [{ type: "text", text: `Hello, ${name}!` }],
    }),
  );
}
```

## Existing Tools

- `health` — returns server status, timestamp, and uptime.
- `echo` — echoes back the provided message (useful for connectivity testing).
