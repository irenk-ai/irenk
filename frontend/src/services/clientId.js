const STORAGE_KEY = 'irenk_client_id';

export function getClientId() {
  let clientId = localStorage.getItem(STORAGE_KEY);
  if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, clientId);
  }
  return clientId;
}
