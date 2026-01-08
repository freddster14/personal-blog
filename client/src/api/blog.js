import { useEffect } from "react";
import { apiFetch } from "./client";

export async function fetchLatestBlogs() {
  const res = await apiFetch('/b');
  if(!res) throw new Error("Failed to get blogs");
  return res;
}