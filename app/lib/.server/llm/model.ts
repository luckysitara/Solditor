import { createAnthropic } from "@ai-sdk/anthropic"
import { createOpenAI } from "@ai-sdk/openai"

export function getAnthropicModel(apiKey: string) {
  const anthropic = createAnthropic({
    apiKey,
  })

  return anthropic("claude-3-5-sonnet-20240620")
}

export function getOpenAIModel(apiKey: string) {
  const openai = createOpenAI({
    apiKey,
  })

  return openai("gpt-4o")
}

export function getModel(provider: "openai" | "anthropic", apiKeys: { openai: string; anthropic: string }) {
  if (provider === "anthropic" && apiKeys.anthropic) {
    return getAnthropicModel(apiKeys.anthropic)
  } else {
    // Default to OpenAI
    return getOpenAIModel(apiKeys.openai)
  }
}
