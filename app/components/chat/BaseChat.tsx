"use client"

import type { Message } from "ai"
import React, { type RefCallback } from "react"
import { ClientOnly } from "remix-utils/client-only"
import { Menu } from "~/components/sidebar/Menu.client"
import { IconButton } from "~/components/ui/IconButton"
import { Workbench } from "~/components/workbench/Workbench.client"
import { classNames } from "~/utils/classNames"
import { Messages } from "./Messages.client"
import { SendButton } from "./SendButton.client"

import styles from "./BaseChat.module.scss"

interface BaseChatProps {
  textareaRef?: React.RefObject<HTMLTextAreaElement> | undefined
  messageRef?: RefCallback<HTMLDivElement> | undefined
  scrollRef?: RefCallback<HTMLDivElement> | undefined
  showChat?: boolean
  chatStarted?: boolean
  isStreaming?: boolean
  messages?: Message[]
  enhancingPrompt?: boolean
  promptEnhanced?: boolean
  input?: string
  handleStop?: () => void
  sendMessage?: (event: React.UIEvent, messageInput?: string) => void
  handleInputChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  enhancePrompt?: () => void
}

const EXAMPLE_PROMPTS = [
  { text: "Build a todo app in React using Tailwind" },
  { text: "Create a REST API with Express and MongoDB" },
  { text: "Build a real-time chat application" },
  { text: "Make a portfolio website with animations" },
  { text: "Create a dashboard with charts and data visualization" },
]

const TEXTAREA_MIN_HEIGHT = 76

export const BaseChat = React.forwardRef<HTMLDivElement, BaseChatProps>(
  (
    {
      textareaRef,
      messageRef,
      scrollRef,
      showChat = true,
      chatStarted = false,
      isStreaming = false,
      enhancingPrompt = false,
      promptEnhanced = false,
      messages,
      input = "",
      sendMessage,
      handleInputChange,
      enhancePrompt,
      handleStop,
    },
    ref,
  ) => {
    const TEXTAREA_MAX_HEIGHT = chatStarted ? 400 : 200

    return (
      <div
        ref={ref}
        className={classNames(
          styles.BaseChat,
          "relative flex h-full w-full overflow-hidden bg-solditor-elements-background-depth-1",
        )}
        data-chat-visible={showChat}
      >
        <ClientOnly>{() => <Menu />}</ClientOnly>
        <div ref={scrollRef} className="flex overflow-y-auto w-full h-full">
          <div className={classNames(styles.Chat, "flex flex-col flex-grow min-w-[var(--chat-min-width)] h-full")}>
            {!chatStarted && (
              <div id="intro" className="mt-[26vh] max-w-chat mx-auto">
                <h1 className="text-5xl text-center font-bold text-solditor-elements-textPrimary mb-2">
                  Where ideas become applications
                </h1>
                <p className="mb-4 text-center text-solditor-elements-textSecondary">
                  Build full-stack applications with AI assistance. Code, run, and deploy directly in your browser.
                </p>
              </div>
            )}
            <div
              className={classNames("pt-6 px-6", {
                "h-full flex flex-col": chatStarted,
              })}
            >
              <ClientOnly>
                {() => {
                  return chatStarted ? (
                    <Messages
                      ref={messageRef}
                      className="flex flex-col w-full flex-1 max-w-chat px-4 pb-6 mx-auto z-1"
                      messages={messages}
                      isStreaming={isStreaming}
                    />
                  ) : null
                }}
              </ClientOnly>
              <div
                className={classNames("relative w-full max-w-chat mx-auto z-prompt", {
                  "sticky bottom-0": chatStarted,
                })}
              >
                <div
                  className={classNames(
                    "shadow-sm border border-solditor-elements-borderColor bg-solditor-elements-prompt-background backdrop-filter backdrop-blur-[8px] rounded-lg overflow-hidden",
                  )}
                >
                  <textarea
                    ref={textareaRef}
                    className={`w-full pl-4 pt-4 pr-16 focus:outline-none resize-none text-md text-solditor-elements-textPrimary placeholder-solditor-elements-textTertiary bg-transparent`}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        if (event.shiftKey) {
                          return
                        }

                        event.preventDefault()

                        sendMessage?.(event)
                      }
                    }}
                    value={input}
                    onChange={(event) => {
                      handleInputChange?.(event)
                    }}
                    style={{
                      minHeight: TEXTAREA_MIN_HEIGHT,
                      maxHeight: TEXTAREA_MAX_HEIGHT,
                    }}
                    placeholder="How can Solditor help you today?"
                    translate="no"
                  />
                  <ClientOnly>
                    {() => (
                      <SendButton
                        show={input.length > 0 || isStreaming}
                        isStreaming={isStreaming}
                        onClick={(event) => {
                          if (isStreaming) {
                            handleStop?.()
                            return
                          }

                          sendMessage?.(event)
                        }}
                      />
                    )}
                  </ClientOnly>
                  <div className="flex justify-between text-sm p-4 pt-2">
                    <div className="flex gap-1 items-center">
                      <IconButton
                        title="Enhance prompt"
                        disabled={input.length === 0 || enhancingPrompt}
                        className={classNames({
                          "opacity-100!": enhancingPrompt,
                          "text-solditor-elements-item-contentAccent! pr-1.5 enabled:hover:bg-solditor-elements-item-backgroundAccent!":
                            promptEnhanced,
                        })}
                        onClick={() => enhancePrompt?.()}
                      >
                        {enhancingPrompt ? (
                          <>
                            <div className="i-svg-spinners:90-ring-with-bg text-solditor-elements-loader-progress text-xl"></div>
                            <div className="ml-1.5">Enhancing prompt...</div>
                          </>
                        ) : (
                          <>
                            <div className="i-solditor:stars text-xl"></div>
                            {promptEnhanced && <div className="ml-1.5">Prompt enhanced</div>}
                          </>
                        )}
                      </IconButton>
                    </div>
                    {input.length > 3 ? (
                      <div className="text-xs text-solditor-elements-textTertiary">
                        Use <kbd className="kdb">Shift</kbd> + <kbd className="kdb">Return</kbd> for a new line
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="bg-solditor-elements-background-depth-1 pb-6">{/* Ghost Element */}</div>
              </div>
            </div>
            {!chatStarted && (
              <div id="examples" className="relative w-full max-w-xl mx-auto mt-8 flex justify-center">
                <div className="flex flex-col space-y-2 [mask-image:linear-gradient(to_bottom,black_0%,transparent_180%)] hover:[mask-image:none]">
                  {EXAMPLE_PROMPTS.map((examplePrompt, index) => {
                    return (
                      <button
                        key={index}
                        onClick={(event) => {
                          sendMessage?.(event, examplePrompt.text)
                        }}
                        className="group flex items-center w-full gap-2 justify-center bg-transparent text-solditor-elements-textTertiary hover:text-solditor-elements-textPrimary transition-theme"
                      >
                        {examplePrompt.text}
                        <div className="i-ph:arrow-bend-down-left" />
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
          <ClientOnly>{() => <Workbench chatStarted={chatStarted} isStreaming={isStreaming} />}</ClientOnly>
        </div>
      </div>
    )
  },
)
