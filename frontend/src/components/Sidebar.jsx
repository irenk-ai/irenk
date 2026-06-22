import { Button } from "@/components/ui/button"
import { MessageSquare, Plus, Trash2, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { IrenkLogo } from "./IrenkLogo"

const MySwal = withReactContent(Swal)

export function Sidebar({ sessions, activeSession, onSelectSession, onCreateSession, onDeleteSession, theme, onToggleTheme }) {
  const handleDelete = (id, e) => {
    e.stopPropagation();
    MySwal.fire({
      title: 'Hapus Obrolan?',
      text: "Obrolan ini akan dihapus permanen dan tidak bisa dikembalikan.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3b82f6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
      background: 'hsl(var(--card))',
      color: 'hsl(var(--foreground))',
      customClass: {
        popup: 'rounded-2xl border border-border/50 shadow-xl',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteSession(id);
      }
    })
  }

  return (
    <div className="w-64 border-r bg-muted/20 p-4 flex flex-col h-screen">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-black border border-primary/50 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.3)] overflow-hidden">
          <IrenkLogo className="w-full h-full text-white" />
        </div>
        <h1 className="font-bold text-xl">Irenk AI</h1>
      </div>

      <Button onClick={onCreateSession} className="w-full mb-6 gap-2" variant="outline">
        <Plus size={16} /> Chat Baru
      </Button>

      <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-2">
        <AnimatePresence>
          {sessions.map((session, index) => (
            <motion.div 
              key={session._id} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                activeSession?._id === session._id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => onSelectSession(session)}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <MessageSquare size={16} className="shrink-0" />
                <span className="text-sm truncate">{session.title}</span>
              </div>
              <button 
                onClick={(e) => handleDelete(session._id, e)}
                className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-all"
                title="Hapus obrolan"
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {sessions.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center text-sm text-muted-foreground mt-10 px-4"
          >
            Belum ada riwayat obrolan.
          </motion.div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-muted"
          onClick={onToggleTheme}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          <span>{theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}</span>
        </Button>
      </div>
    </div>
  )
}
