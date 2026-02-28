import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerHealthTool } from "@/tools/health";
import { registerEchoTool } from "@/tools/echo";

export function registerTools(server: McpServer): void {
  registerHealthTool(server);
  registerEchoTool(server);
}
