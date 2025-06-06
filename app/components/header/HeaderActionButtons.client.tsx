"use client"

import { useStore } from "@nanostores/react"
import { chatStore } from "~/lib/stores/chat"
import { workbenchStore } from "~/lib/stores/workbench"
import { classNames } from "~/utils/classNames"
import { ModelSelector } from "./ModelSelector"

type HeaderActionButtonsProps = {}

export function HeaderActionButtons({}: HeaderActionButtonsProps) {
  const showWorkbench = useStore(workbenchStore.showWorkbench)
  const { showChat } = useStore(chatStore)

  const canHideChat = showWorkbench || !showChat

  return (
    <div className="flex gap-2">
      <ModelSelector />
      <div className="flex border border-solditor-elements-borderColor rounded-md overflow-hidden">
        <Button
          active={showChat}
          disabled={!canHideChat}
          onClick={() => {
            if (canHideChat) {
              chatStore.setKey("showChat", !showChat)
            }
          }}
        >
          <div className="i-solditor:chat text-sm" />
        </Button>
        <div className="w-[1px] bg-solditor-elements-borderColor" />
        <Button
          active={showWorkbench}
          onClick={() => {
            if (showWorkbench && !showChat) {
              chatStore.setKey("showChat", true)
            }

            workbenchStore.showWorkbench.set(!showWorkbench)
          }}
        >
          <div className="i-ph:code-bold" />
        </Button>
      </div>
    </div>
  )
}

interface ButtonProps {
  active?: boolean
  disabled?: boolean
  children?: any
  onClick?: () => void
}

function Button({ active = false, disabled = false, children, onClick }: ButtonProps) {
  return (
    <button
      className={classNames("flex items-center p-1.5", {
        "bg-solditor-elements-item-backgroundDefault hover:bg-solditor-elements-item-backgroundActive text-solditor-elements-textTertiary hover:text-solditor-elements-textPrimary":
          !active,
        "bg-solditor-elements-item-backgroundAccent text-solditor-elements-item-contentAccent": active && !disabled,
        "bg-solditor-elements-item-backgroundDefault text-alpha-gray-20 dark:text-alpha-white-20 cursor-not-allowed":
          disabled,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
