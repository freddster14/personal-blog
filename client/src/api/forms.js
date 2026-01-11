import { apiFetch } from "./client";

export async function formSubmit(url, formData) {
  const options = {
    method: "POST",
    body: JSON.stringify(formData)
  };
  const res = await apiFetch(url, options);
  return res;
}