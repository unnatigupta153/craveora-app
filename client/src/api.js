const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:4040').replace(/\/$/, '');

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}

export const apiUrl = API_URL;
