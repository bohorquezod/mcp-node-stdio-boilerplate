# MCP Node.js Stdio Boilerplate

## Project Overview

This is a TypeScript boilerplate for building **Model Context Protocol (MCP)** servers using stdio transport. It uses the official `@modelcontextprotocol/sdk` and is structured with a layered registration architecture.

## Architecture

- **Entry point**: `src/index.ts` — creates the McpServer and connects the stdio transport.
- **Registration layer**: `src/server/register.ts` orchestrates registration of all features by delegating to domain-specific index files.
- **Domain folders**: `src/tools/`, `src/resources/`, `src/prompts/` — each has an `index.ts` that registers all modules in that domain.
- **Constants**: `src/constants/` — shared constants sourced from `package.json`.
- **Utilities**: `src/utils/` — shared helper functions.

## Tech Stack

- TypeScript (strict mode)
- `@modelcontextprotocol/sdk` for MCP server primitives
- `zod` for schema validation
- `tsup` (esbuild) for bundling, `tsc` for type-checking
- `@/` path aliases via tsconfig paths + tsup alias resolution
- ESLint + Prettier for code quality

## Conventions

- Every tool, resource, or prompt is a standalone file exporting a `registerX(server: McpServer): void` function.
- Domain index files (`tools/index.ts`, etc.) aggregate registrations — the entry point never imports individual features directly.
- Use `@/` aliases for all internal imports. No `.js` extensions.
- Constants that come from `package.json` or environment live in `src/constants/`.
- Prefer explicit types over inference for public function signatures.
- Do not add comments that merely narrate what the code does.
