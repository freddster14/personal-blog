export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`http://localhost:3000${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization:`Bearer ${token}`}),
      ...options.headers,
    },
  });

  if(!res.ok) throw new Error('Request fail');
  return res.json();
}