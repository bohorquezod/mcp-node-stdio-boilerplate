import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerSummarizePrompt(server: McpServer): void {
  server.registerPrompt(
    "summarize",
    {
      description: "Generate a prompt that asks for a summary of a given topic",
      argsSchema: {
        topic: z.string().describe("The topic to summarize"),
        tone: z
          .enum(["formal", "casual", "technical"])
          .optional()
          .describe("Desired tone for the summary"),
      },
    },
    async ({ topic, tone }) => {
      const style = tone ? ` Use a ${tone} tone.` : "";
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Provide a concise summary about the following topic: "${topic}".${style}`,
            },
          },
        ],
      };
    },
  );
}
