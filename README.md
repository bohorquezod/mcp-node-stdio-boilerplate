# MCP Node.js Stdio Boilerplate

A minimal, production-ready boilerplate for building **Model Context Protocol (MCP)** servers in TypeScript using the **stdio** transport. Runs locally with Node.js or inside a Docker container — no Node installation required on the host.

## Features

- MCP server built with the official `@modelcontextprotocol/sdk`
- Stdio transport for local process-spawned integrations
- Example **tools**, **resources**, and **prompts** to get you started
- Layered registration architecture that scales without bloating the entry point
- `@/` path aliases for clean imports (no `.js` extensions needed)
- TypeScript with strict mode — `tsup` (esbuild) for fast builds, `tsc` for type-checking
- ESLint + Prettier for code quality
- Multi-stage Docker build for lightweight images

## Prerequisites

**With Node.js** (for local development):

- Node.js >= 18
- npm

**Without Node.js** (Docker only):

- Docker

## Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Run in development mode (auto-reload)
npm run dev

# Build for production
npm run build

# Run the production build
npm start
```

### Docker

```bash
# Build the image
docker build -t my-mcp-server .

# Run the container (stdio transport requires interactive mode)
docker run -i --rm my-mcp-server
```

## Project Structure

```
src/
├── index.ts              # Entry point — creates McpServer, delegates registration, connects transport
├── constants/
│   └── server.ts         # Server constants (name, version) sourced from package.json
├── utils/                # Shared utility functions
├── server/
│   └── register.ts       # Central orchestrator — calls registerTools, registerResources, registerPrompts
├── tools/
│   ├── index.ts          # Registers all tools
│   ├── health.ts         # Example tool: returns server health status
│   └── echo.ts           # Example tool: echoes back a message
├── resources/
│   ├── index.ts          # Registers all resources
│   └── server-info.ts    # Example resource: server metadata (JSON)
└── prompts/
    ├── index.ts          # Registers all prompts
    └── summarize.ts      # Example prompt: topic summarization with optional tone
```

## Adding a New Tool

1. Create a new file in `src/tools/`:

```typescript
// src/tools/greet.ts
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

2. Register it in `src/tools/index.ts`:

```typescript
import { registerGreetTool } from "@/tools/greet";

// inside registerTools()
registerGreetTool(server);
```

3. Rebuild and run:

```bash
npm run build && npm start
```

## Adding a New Resource

1. Create a new file in `src/resources/`:

```typescript
// src/resources/config.ts
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

2. Register it in `src/resources/index.ts`:

```typescript
import { registerConfigResource } from "@/resources/config";

// inside registerResources()
registerConfigResource(server);
```

3. Rebuild and run:

```bash
npm run build && npm start
```

## Adding a New Prompt

1. Create a new file in `src/prompts/`:

```typescript
// src/prompts/translate.ts
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

2. Register it in `src/prompts/index.ts`:

```typescript
import { registerTranslatePrompt } from "@/prompts/translate";

// inside registerPrompts()
registerTranslatePrompt(server);
```

3. Rebuild and run:

```bash
npm run build && npm start
```

## Using with an MCP Client

### Cursor / Claude Desktop (local Node.js)

Add this to your MCP client configuration:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/absolute/path/to/dist/index.js"]
    }
  }
}
```

### Cursor / Claude Desktop (Docker)

```json
{
  "mcpServers": {
    "my-server": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "my-mcp-server"]
    }
  }
}
```

## AI Agent Instructions (agentlink)

This project uses [`@borasta/agentlink`](https://www.npmjs.com/package/@borasta/agentlink) to maintain a single `.ai/` folder as the source of truth for AI agent instructions, then sync them to any supported IDE.

```
.ai/
├── AGENTS.md                          # Main project instructions for AI agents
├── skills/
│   ├── tools/SKILL.md                 # How to create MCP tools
│   ├── resources/SKILL.md             # How to create MCP resources
│   └── prompts/SKILL.md               # How to create MCP prompts
├── agents/                            # Custom agent definitions
└── commands/                          # Custom slash commands
```

### Syncing to your IDE

```bash
# Sync to Cursor (creates symlinks in .cursor/)
npm run ai:sync

# Sync to other IDEs
npx agentlink claude
npx agentlink codex

# Check symlink health
npm run ai:doctor
```

## Scripts

| Script                 | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Build, watch & restart on changes       |
| `npm run build`        | Bundle to `dist/` with tsup (esbuild)   |
| `npm start`            | Run the bundled server                  |
| `npm run typecheck`    | Run TypeScript type-checking only       |
| `npm run lint`         | Run ESLint                              |
| `npm run format`       | Format code with Prettier               |
| `npm run format:check` | Check formatting                        |
| `npm run ai:sync`      | Sync `.ai/` to Cursor                  |
| `npm run ai:doctor`    | Validate all agentlink symlinks         |

## License

MIT
