import { IrenkLogo } from "./IrenkLogo"

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 p-2 mb-6 w-full max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="w-8 h-8 rounded-full bg-black border-2 border-primary/50 flex shrink-0 items-center justify-center overflow-hidden shadow-[0_0_10px_rgba(168,85,247,0.3)]">
        <IrenkLogo className="w-full h-full text-white" />
      </div>
      <div className="flex gap-1.5 px-5 py-4 bg-card border border-border/50 rounded-2xl rounded-tl-sm shadow-sm">
        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}
