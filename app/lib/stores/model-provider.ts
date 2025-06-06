import { atom } from "nanostores"

export type ModelProvider = "openai" | "anthropic"

export const modelProviderStore = atom<ModelProvider>("openai")

export function setModelProvider(provider: ModelProvider) {
  modelProviderStore.set(provider)

  // Persist the selection to the server
  fetch("/api/model-provider", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ provider }),
  }).catch((err) => console.error("Failed to update model provider:", err))
}
