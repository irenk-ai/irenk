import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IrenkLogo } from "./IrenkLogo";

// Icon Irenk (Karakter Hitam Lucu)
const IrenkAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-black border-2 border-primary/50 flex shrink-0 items-center justify-center overflow-hidden shadow-[0_0_10px_rgba(168,85,247,0.3)]">
    <IrenkLogo className="w-full h-full text-white" />
  </div>
);

export function ChatBubble({ role, content, createdAt }) {
  const isUser = role === 'user';
  
  const timeString = createdAt 
    ? new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    : '';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-3`}>
        
        {!isUser && <IrenkAvatar />}

        <div className="flex flex-col gap-1">
          <div className={`px-5 py-3.5 text-sm md:text-[15px] leading-relaxed shadow-sm ${
            isUser 
              ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-sm shadow-[0_4px_14px_0_rgba(168,85,247,0.39)]' 
              : 'bg-card text-card-foreground rounded-2xl rounded-tl-sm border border-border/50 shadow-md'
          }`}>
            {isUser ? (
              <div className="whitespace-pre-wrap font-medium">{content}</div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-border/50">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </div>
          
          <span className={`text-[10px] text-muted-foreground px-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {timeString}
          </span>
        </div>

      </div>
    </motion.div>
  )
}
