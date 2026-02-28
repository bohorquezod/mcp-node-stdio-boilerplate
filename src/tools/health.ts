import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerHealthTool(server: McpServer): void {
  server.registerTool(
    "health",
    {
      description: "Check if the MCP server is running",
    },
    async () => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              status: "ok",
              timestamp: new Date().toISOString(),
              uptime: process.uptime(),
            }),
          },
        ],
      };
    },
  );
}
