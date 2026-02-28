import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerServerFeatures } from "@/server/register";
import { SERVER_NAME, SERVER_VERSION } from "@/constants/server";

const server = new McpServer({ name: SERVER_NAME, version: SERVER_VERSION });

registerServerFeatures(server);

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error starting MCP server:", error);
  process.exit(1);
});
