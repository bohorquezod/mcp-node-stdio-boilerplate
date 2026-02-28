import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerSummarizePrompt } from "@/prompts/summarize";

export function registerPrompts(server: McpServer): void {
  registerSummarizePrompt(server);
}
