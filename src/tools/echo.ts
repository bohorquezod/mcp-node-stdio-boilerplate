import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerEchoTool(server: McpServer): void {
  server.registerTool(
    "echo",
    {
      description:
        "Echo back the provided message — useful for testing connectivity",
      inputSchema: { message: z.string().describe("The message to echo back") },
    },
    async ({ message }) => {
      return {
        content: [{ type: "text", text: message }],
      };
    },
  );
}
