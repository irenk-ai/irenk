import { getClientId } from './clientId';

const API_URL = import.meta.env.VITE_API_URL || 'https://irenk-backend.onrender.com/api';

export const getSessions = async () => {
  const clientId = getClientId();
  const res = await fetch(`${API_URL}/sessions?clientId=${clientId}`);
  if (!res.ok) throw new Error('Failed to fetch sessions');
  return res.json();
};

export const createSession = async () => {
  const clientId = getClientId();
  const res = await fetch(`${API_URL}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId }),
  });
  if (!res.ok) throw new Error('Failed to create session');
  return res.json();
};

export const deleteSession = async (id) => {
  const clientId = getClientId();
  const res = await fetch(`${API_URL}/sessions/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId }),
  });
  if (!res.ok) throw new Error('Failed to delete session');
  return res.json();
};

export const getChatHistory = async (sessionId) => {
  const clientId = getClientId();
  const res = await fetch(`${API_URL}/chat/${sessionId}?clientId=${clientId}`);
  if (!res.ok) throw new Error('Failed to fetch chat history');
  return res.json();
};

export const sendMessage = async (sessionId, message) => {
  const clientId = getClientId();
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message, clientId }),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
};
