const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getSessions = async () => {
  const res = await fetch(`${API_URL}/sessions`);
  if (!res.ok) throw new Error('Failed to fetch sessions');
  return res.json();
};

export const createSession = async () => {
  const res = await fetch(`${API_URL}/sessions`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to create session');
  return res.json();
};

export const deleteSession = async (id) => {
  const res = await fetch(`${API_URL}/sessions/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete session');
  return res.json();
};

export const getChatHistory = async (sessionId) => {
  const res = await fetch(`${API_URL}/chat/${sessionId}`);
  if (!res.ok) throw new Error('Failed to fetch chat history');
  return res.json();
};

export const sendMessage = async (sessionId, message) => {
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message }),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
};
