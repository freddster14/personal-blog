import { data } from "react-router";

export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization:`Bearer ${token}`}),
      ...options.headers,
    },
  });
  const info = await res.json();
  if(!res.ok) throw data(`${info.message || 'Something went wrong'}`, { status: res.status, statusText: res.statusText });
  return info;
}