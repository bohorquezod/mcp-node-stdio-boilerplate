import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerTools } from "@/tools";
import { registerResources } from "@/resources";
import { registerPrompts } from "@/prompts";

export function registerServerFeatures(server: McpServer): void {
  registerTools(server);
  registerResources(server);
  registerPrompts(server);
}
