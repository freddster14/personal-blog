import { apiFetch } from "./client";

export async function login(email, password) {
  const options = {
    method: "POST",
    body: JSON.stringify({email, password})
  };
  const res = await apiFetch('/login', options);
  return res;
}