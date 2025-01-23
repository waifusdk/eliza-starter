import readline from "readline";
import { WaifuSDK, type WaifuConfig } from "@waifusdk/sdk";
import "dotenv/config";

import TOKEN_METADATA from "../token_metadata.json";

const user = "user" + Math.random();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("SIGINT", () => {
  rl.close();
  process.exit(0);
});

const waifuConfig: WaifuConfig = {
  agentId: "waifu",
  apiKeys: {
    lunarCrush: process.env.LUNAR_CRUSH_API_KEY,
  },
};

const waifuSDK = new WaifuSDK(waifuConfig);

function getTokenMetadata(token: string) {
  return TOKEN_METADATA[token];
}

function extractTokenName(input: string): string | null {
  const tokenMatch = input.match(/\$([A-Z]+)\b/);
  return tokenMatch ? tokenMatch[1] : null;
}

async function getContextualTokenInput(input) {
  // Get any tokens mentioned in $
  const token = extractTokenName(input);

  const tokenMetadata = getTokenMetadata(token);
  return await waifuSDK.token.get(tokenMetadata);
}

async function getContextualInformation(input) {
  const tokenContext = await getContextualTokenInput(input);
  const usableContext = {
    pair: tokenContext.pairData ? tokenContext.pairData[0] : null,
    market: tokenContext.marketData ? tokenContext.marketData : null,
    social: tokenContext.socialData ? tokenContext.socialData : null,
  };
  const prompt =
    "Context:  " + JSON.stringify(usableContext, null) + ", question: " + input;
  return prompt;
}

async function handleUserInput(input, agentId) {
  if (input.toLowerCase() === "exit") {
    rl.close();
    process.exit(0);
  }

  try {
    const response = await fetch(`http://localhost:3000/${agentId}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: input,
        userId: user,
        userName: user,
      }),
    });
    const data = await response.json();
    data.forEach((message) => console.log(`${"Agent"}: ${message.text}`));
  } catch (error) {
    console.error("Error fetching response:", error);
  }
}

export function startChat(characters) {
  function chat() {
    const agentId = "waifu";
    rl.question("You: ", async (input) => {
      // Look for mention of a $token
      const additionalContext = await getContextualInformation(input);
      await handleUserInput(JSON.stringify(additionalContext), agentId);
      if (input.toLowerCase() !== "exit") {
        chat(); // Loop back to ask another question
      }
    });
  }
  return chat;
}

function main() {
  const chat = startChat([{}]);
  chat();
}

main();
