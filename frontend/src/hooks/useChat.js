import { useState, useRef, useEffect } from 'react';
import * as api from '../services/api';
import Swal from 'sweetalert2';

export const useChat = (activeSession) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  // Load history when session changes
  useEffect(() => {
    if (!activeSession) {
      setMessages([]);
      return;
    }

    const loadHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const history = await api.getChatHistory(activeSession._id);
        setMessages(history);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Gagal memuat riwayat pesan',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          background: 'hsl(var(--card))',
          color: 'hsl(var(--foreground))',
        });
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, [activeSession]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (content, overrideSessionId = null) => {
    const targetSessionId = overrideSessionId || activeSession?._id;
    if (!content.trim() || !targetSessionId) return;

    // Optimistic UI update
    const userMsg = { _id: Date.now().toString(), role: 'user', content, createdAt: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const { chat, sessionTitle } = await api.sendMessage(targetSessionId, content);
      setMessages(prev => [...prev, chat]);
      return { chat, sessionTitle };
    } catch (err) {
        // Remove optimistic message
        setMessages(prev => prev.filter(m => m._id !== userMsg._id));
        
        Swal.fire({
          icon: 'error',
          title: 'Gagal Terkirim',
          text: err.message || 'Gagal mengirim pesan',
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 4000,
          background: 'hsl(var(--card))',
          color: 'hsl(var(--foreground))',
        });
        console.error(err);
      } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    bottomRef
  };
};
