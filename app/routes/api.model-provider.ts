import { type ActionFunctionArgs, json } from "@remix-run/cloudflare"

export async function action({ request }: ActionFunctionArgs) {
  const { provider } = await request.json<{ provider: "openai" | "anthropic" }>()

  // In a real implementation, you would store this in a database or session
  // For now, we'll just return the selected provider
  return json({ provider })
}

export async function loader() {
  // Return the current provider (in a real implementation, this would come from a database or session)
  return json({ provider: "openai" })
}
