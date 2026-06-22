import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"

export function ChatInput({ onSendMessage, disabled }) {
  const [input, setInput] = useState('')
  const textareaRef = useRef(null)

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    if (input.trim() && !disabled) {
      onSendMessage(input)
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }
  
  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-3xl mx-auto relative flex items-end bg-muted/50 rounded-2xl border border-muted-foreground/20 p-2 shadow-sm focus-within:ring-1 focus-within:ring-ring transition-all">
        <textarea 
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Tanya Irenk sesuatu..." 
          className="w-full bg-transparent resize-none border-0 focus:ring-0 focus:outline-none px-3 py-2 text-base md:text-sm max-h-[150px] min-h-[44px] scrollbar-thin"
          disabled={disabled}
          rows={1}
        />
        <Button 
          type="submit" 
          size="icon" 
          className="rounded-full w-8 h-8 mb-1 mr-1 shrink-0 shadow-sm"
          disabled={!input.trim() || disabled}
        >
          <Send size={14} />
        </Button>
      </div>
    </form>
  )
}
