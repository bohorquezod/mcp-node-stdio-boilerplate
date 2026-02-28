import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerServerInfoResource } from "@/resources/server-info";

export function registerResources(server: McpServer): void {
  registerServerInfoResource(server);
}
