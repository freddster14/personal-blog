import { useState } from "react";
import { apiFetch } from "../api/client";
import { useContext } from "react";
import { createContext } from "react";
import { useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await apiFetch("/me");
        setUser(data);
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      { children }
    </AuthContext.Provider>
  );
};


export function useAuth() {
  return useContext(AuthContext)
}