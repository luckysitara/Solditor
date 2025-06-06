import { json, type MetaFunction } from "@remix-run/cloudflare"
import { ClientOnly } from "remix-utils/client-only"
import { BaseChat } from "~/components/chat/BaseChat"
import { Chat } from "~/components/chat/Chat.client"
import { Header } from "~/components/header/Header"

export const meta: MetaFunction = () => {
  return [
    { title: "Solditor - AI-Powered Development Environment" },
    {
      name: "description",
      content:
        "Build full-stack applications with AI assistance. Code, run, and deploy directly in your browser with Solditor.",
    },
  ]
}

export const loader = () => json({})

export default function Index() {
  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
    </div>
  )
}
