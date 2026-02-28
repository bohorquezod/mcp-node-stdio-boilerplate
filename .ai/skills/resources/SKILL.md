---
name: resources
description: How to create and register MCP resources that expose read-only data endpoints.
version: 1.0.0
license: MIT
compatibility:
  - Claude Code
  - Cursor
  - Codex
allowed-tools: Read Write Bash(npm:*)
---

# Resources

## What is a Resource?

A resource is a read-only data endpoint exposed by the MCP server. Clients can list and read resources by their URI.

## How to Create a Resource

1. Create a file in `src/resources/` that exports a `registerXResource(server: McpServer): void` function.
2. Use `server.registerResource(name, uri, config, handler)` from `@modelcontextprotocol/sdk`.
3. Provide a fixed URI string (e.g., `mcp://server/config`) and a `mimeType`.
4. Return `{ contents: [{ uri, text }] }` from the handler.
5. Register the function in `src/resources/index.ts` inside `registerResources()`.

## Example

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerConfigResource(server: McpServer): void {
  server.registerResource(
    "config",
    "mcp://server/config",
    {
      description: "Current server configuration",
      mimeType: "application/json",
    },
    async () => ({
      contents: [
        {
          uri: "mcp://server/config",
          text: JSON.stringify({ debug: false, maxRetries: 3 }),
        },
      ],
    }),
  );
}
```

## Existing Resources

- `server-info` — returns server name, version, timestamp, and uptime as JSON.
