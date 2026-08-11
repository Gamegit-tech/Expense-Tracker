import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@/types";
import { registerApi, loginApi, getMeApi } from "@/services/authApi";

const TOKEN_KEY = "expense-tracker:token";
const USER_CACHE_KEY = "expense-tracker:last-known-user";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    getMeApi(storedToken)
      .then(({ user }) => {
        setUser(user);
        localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
      })
      .catch((err) => {
        if (err instanceof Error && err.name === "NetworkError") {
          // Offline — trust the token was valid before, use last-known user
          const cachedUser = localStorage.getItem(USER_CACHE_KEY);
          if (cachedUser) {
            setUser(JSON.parse(cachedUser));
          }
        } else {
          // Server confirmed the token is genuinely invalid/expired
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_CACHE_KEY);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginApi(email, password);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_CACHE_KEY, JSON.stringify(data.user));
    setUser(data.user);
  };

  const register = async (email: string, password: string) => {
    const data = await registerApi(email, password);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_CACHE_KEY, JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_CACHE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}