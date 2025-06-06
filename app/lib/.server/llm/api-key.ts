export interface Env {
  OPENAI_API_KEY: string
  ANTHROPIC_API_KEY: string
  SELECTED_PROVIDER: string
}

export function getAPIKey(cloudflareEnv: Env) {
  /**
   * The `cloudflareEnv` is only used when deployed or when previewing locally.
   * In development the environment variables are available through `env`.
   */
  return {
    openai: process.env.OPENAI_API_KEY || cloudflareEnv.OPENAI_API_KEY,
    anthropic: process.env.ANTHROPIC_API_KEY || cloudflareEnv.ANTHROPIC_API_KEY,
  }
}

export function getSelectedProvider(cloudflareEnv: Env): "openai" | "anthropic" {
  // Use OpenAI by default, or use the selected provider if specified
  return (process.env.SELECTED_PROVIDER || cloudflareEnv.SELECTED_PROVIDER || "openai") as "openai" | "anthropic"
}
