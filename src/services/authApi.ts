import { User } from "@/types";

const AUTH_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

interface AuthResponse {
  token: string;
  user: User;
}

export async function registerApi(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}

export async function loginApi(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function getMeApi(token: string): Promise<{ user: User }> {
  let response: Response;

  try {
    response = await fetch(`${AUTH_BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    // fetch() itself threw — this means no internet, not a bad token
    const networkError = new Error("Network unreachable");
    networkError.name = "NetworkError";
    throw networkError;
  }

  if (!response.ok) {
    // the server responded, but said the token is invalid/expired
    throw new Error("Not authenticated");
  }

  return response.json();
}