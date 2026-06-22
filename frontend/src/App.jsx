import { useState, useEffect, useCallback } from 'react'
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
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('irenk_theme') || 'dark'
  })

  const { messages, isLoading, sendMessage, bottomRef } = useChat(activeSession)

  useEffect(() => {
    // Apply theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('irenk_theme', theme)
  }, [theme])

  // Membungkus handleCreateSession dengan useCallback
  const handleCreateSession = useCallback(async () => {
    try {
      const newSession = await api.createSession()
      setSessions(prev => [newSession, ...prev])
      setActiveSession(newSession)
      if (window.innerWidth < 768) setIsSidebarOpen(false)
    } catch (err) {
      console.error(err)
    }
  }, [])

  // Membungkus loadSessions dengan useCallback
  const loadSessions = useCallback(async () => {
    try {
      const data = await api.getSessions()
      if (data.length > 0) {
        setSessions(data)
        setActiveSession(prev => prev || data[0])
      } else {
        // Auto-generate session if none exists
        handleCreateSession()
      }
    } catch (err) {
      console.error(err)
    }
  }, [handleCreateSession]) // Memasukkan dependency yang dipakai di dalam loadSessions

  // useEffect sekarang aman menggunakan loadSessions sebagai dependency
  useEffect(() => {
    loadSessions()
  }, [loadSessions])

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
          theme={theme}
          onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
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