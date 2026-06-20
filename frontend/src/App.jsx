import { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import { ChatArea } from './components/ChatArea'
import { ChatInput } from './components/ChatInput'
import { useChat } from './hooks/useChat'
import * as api from './services/api'
import { Menu } from 'lucide-react'
import { Button } from './components/ui/button'
import { IrenkLogo } from './components/IrenkLogo'

function App() {
  const [sessions, setSessions] = useState([])
  const [activeSession, setActiveSession] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const { messages, isLoading, error, sendMessage, bottomRef } = useChat(activeSession)

  useEffect(() => {
    // Add dark class to html to enforce dark mode as requested
    document.documentElement.classList.add('dark')
    loadSessions()
  }, [])

  async function loadSessions() {
    try {
      const data = await api.getSessions()
      setSessions(data)
      setActiveSession(prev => {
        if (!prev && data.length > 0) return data[0];
        return prev;
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleCreateSession = async () => {
    try {
      const newSession = await api.createSession()
      setSessions([newSession, ...sessions])
      setActiveSession(newSession)
      if (window.innerWidth < 768) setIsSidebarOpen(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteSession = async (id) => {
    try {
      await api.deleteSession(id)
      const updated = sessions.filter(s => s._id !== id)
      setSessions(updated)
      if (activeSession?._id === id) {
        setActiveSession(updated[0] || null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSendMessage = async (msg) => {
    let currentSession = activeSession;
    if (!currentSession) {
      // Auto-create session
      try {
        currentSession = await api.createSession()
        setSessions(prev => [currentSession, ...prev])
        setActiveSession(currentSession)
      } catch (err) {
        console.error(err)
        return
      }
    }
    
    const result = await sendMessage(msg, currentSession._id)
    
    // Update session title dynamically without setTimeout
    if (result && result.sessionTitle && result.sessionTitle !== currentSession.title) {
      setSessions(prev => prev.map(s => 
        s._id === currentSession._id ? { ...s, title: result.sessionTitle } : s
      ))
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar 
          sessions={sessions}
          activeSession={activeSession}
          onSelectSession={(s) => {
            setActiveSession(s)
            if (window.innerWidth < 768) setIsSidebarOpen(false)
          }}
          onCreateSession={handleCreateSession}
          onDeleteSession={handleDeleteSession}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center p-4 border-b bg-background/95 backdrop-blur z-30 supports-[backdrop-filter]:bg-background/60">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={20} />
          </Button>
          <div className="flex items-center gap-2 ml-2">
            <div className="w-7 h-7 rounded-full bg-black border border-primary/50 flex items-center justify-center shadow-[0_0_8px_rgba(168,85,247,0.3)] overflow-hidden">
              <IrenkLogo className="w-full h-full text-white" />
            </div>
            <span className="font-bold text-lg">Irenk AI</span>
          </div>
        </div>

        {/* Chat Area */}
        <ChatArea messages={messages} isLoading={isLoading} bottomRef={bottomRef} />
        
        {/* Input Area */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        
      </div>
    </div>
  )
}

export default App
