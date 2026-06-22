import { ChatBubble } from "./ChatBubble"
import { TypingIndicator } from "./TypingIndicator"
import { IrenkLogo } from "./IrenkLogo"
import { motion } from "framer-motion"
import { BlurText } from "./BlurText"
import { SplitText } from "./SplitText"

export function ChatArea({ messages, isLoading, bottomRef }) {
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground overflow-hidden">
        <motion.div 
          initial={{ y: -50, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="w-24 h-24 rounded-full bg-black border-4 border-primary/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)] overflow-hidden"
        >
          <IrenkLogo className="w-full h-full text-white" />
        </motion.div>
        
        <div className="mb-2">
          <BlurText 
            text="Halo! Aku Irenk." 
            delay={100} 
            className="text-2xl font-bold text-foreground"
          />
        </div>
        
        <div className="max-w-md mt-2">
          <SplitText 
            text="Asisten AI pribadimu yang lucu dan selalu siap membantu. Ketik sesuatu di bawah untuk mulai mengobrol!" 
            delay={20}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
      <div className="max-w-3xl mx-auto flex flex-col">
        {messages.map((msg, index) => (
          <ChatBubble key={msg._id || index} role={msg.role} content={msg.content} createdAt={msg.createdAt} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} className="h-8 md:h-4 pb-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  )
}
