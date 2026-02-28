import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SERVER_NAME, SERVER_VERSION } from "@/constants/server";

export function registerServerInfoResource(server: McpServer): void {
  server.registerResource(
    "server-info",
    "mcp://server/info",
    {
      description: "General information about this MCP server",
      mimeType: "application/json",
    },
    async () => ({
      contents: [
        {
          uri: "mcp://server/info",
          text: JSON.stringify({
            name: SERVER_NAME,
            version: SERVER_VERSION,
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
          }),
        },
      ],
    }),
  );
}
