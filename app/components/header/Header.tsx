import { useStore } from "@nanostores/react"
import { ClientOnly } from "remix-utils/client-only"
import { chatStore } from "~/lib/stores/chat"
import { classNames } from "~/utils/classNames"
import { HeaderActionButtons } from "./HeaderActionButtons.client"
import { ChatDescription } from "~/lib/persistence/ChatDescription.client"

export function Header() {
  const chat = useStore(chatStore)

  return (
    <header
      className={classNames(
        "flex items-center bg-solditor-elements-background-depth-1 p-5 border-b h-[var(--header-height)]",
        {
          "border-transparent": !chat.started,
          "border-solditor-elements-borderColor": chat.started,
        },
      )}
    >
      <div className="flex items-center gap-2 z-logo text-solditor-elements-textPrimary cursor-pointer">
        <div className="i-ph:sidebar-simple-duotone text-xl" />
        <a href="/" className="text-2xl font-semibold text-accent flex items-center">
          <span className="font-bold">Solditor</span>
        </a>
      </div>
      <span className="flex-1 px-4 truncate text-center text-solditor-elements-textPrimary">
        <ClientOnly>{() => <ChatDescription />}</ClientOnly>
      </span>
      {chat.started && (
        <ClientOnly>
          {() => (
            <div className="mr-1">
              <HeaderActionButtons />
            </div>
          )}
        </ClientOnly>
      )}
    </header>
  )
}
