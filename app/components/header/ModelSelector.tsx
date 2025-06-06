"use client"

import { useEffect, useState } from "react"
import { IconButton } from "~/components/ui/IconButton"
import { Slider, type SliderOptions } from "~/components/ui/Slider"

type ModelProvider = "openai" | "anthropic"

const providerOptions: SliderOptions<ModelProvider> = {
  left: {
    value: "openai",
    text: "OpenAI",
  },
  right: {
    value: "anthropic",
    text: "Claude",
  },
}

export function ModelSelector() {
  const [provider, setProvider] = useState<ModelProvider>("openai")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Fetch the current provider on component mount
    fetch("/api/model-provider")
      .then((res) => res.json())
      .then((data) => {
        if (data.provider) {
          setProvider(data.provider)
        }
      })
      .catch((err) => console.error("Failed to fetch model provider:", err))
  }, [])

  const handleProviderChange = async (newProvider: ModelProvider) => {
    setProvider(newProvider)

    try {
      await fetch("/api/model-provider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ provider: newProvider }),
      })
    } catch (err) {
      console.error("Failed to update model provider:", err)
    }
  }

  return (
    <div className="relative">
      <IconButton
        icon={provider === "openai" ? "i-ph:brain-duotone" : "i-ph:robot-duotone"}
        title="Select AI Model"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 p-3 bg-solditor-elements-background-depth-2 border border-solditor-elements-borderColor rounded-md shadow-sm dropdown-animation">
          <div className="text-sm font-medium mb-2 text-solditor-elements-textPrimary">Select AI Model</div>
          <Slider selected={provider} options={providerOptions} setSelected={handleProviderChange} />
        </div>
      )}
    </div>
  )
}
