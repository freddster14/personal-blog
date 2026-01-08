import { apiFetch } from "./client";

export default async function apiBlog(url) {
  const res = await apiFetch(url);
  if(!res) throw new Error("Failed to get blog(s)");
  return res;
}
