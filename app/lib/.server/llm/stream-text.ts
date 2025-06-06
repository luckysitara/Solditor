import { streamText as _streamText, convertToCoreMessages } from "ai"
import { getAPIKey, getSelectedProvider } from "~/lib/.server/llm/api-key"
import { getModel } from "~/lib/.server/llm/model"
import { MAX_TOKENS } from "./constants"
import { getSystemPrompt } from "./prompts"

interface ToolResult<Name extends string, Args, Result> {
  toolCallId: string
  toolName: Name
  args: Args
  result: Result
}

interface Message {
  role: "user" | "assistant"
  content: string
  toolInvocations?: ToolResult<string, unknown, unknown>[]
}

export type Messages = Message[]

export type StreamingOptions = Omit<Parameters<typeof _streamText>[0], "model">

export interface Env {
  OPENAI_API_KEY?: string
  ANTHROPIC_API_KEY?: string
  GOOGLE_API_KEY?: string
  [key: string]: string | undefined
}

export function streamText(messages: Messages, env: Env, options?: StreamingOptions) {
  const apiKeys = getAPIKey(env)
  const provider = getSelectedProvider(env)

  // Get the appropriate model based on provider
  const model = getModel(provider, apiKeys)

  // Configure provider-specific options
  const providerOptions: Record<string, any> = {}

  if (provider === "anthropic") {
    providerOptions.headers = {
      "anthropic-beta": "max-tokens-3-5-sonnet-2024-07-15",
    }
  }

  return _streamText({
    model,
    system: getSystemPrompt(),
    maxTokens: MAX_TOKENS,
    ...providerOptions,
    messages: convertToCoreMessages(messages),
    ...options,
  })
}
