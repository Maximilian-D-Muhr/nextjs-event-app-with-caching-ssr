import { clearToken, getToken } from "./tokenStorage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

const ERROR_HANDLERS = {
  401: () => {
    clearToken();
    if (typeof window !== 'undefined') {
      window.location.href = "/signin";
    }
    return "Session expired. Please sign in again.";
  },
  400: (data) => data?.message || "Invalid request",
  404: (data) => data?.message || "Resource not found",
};

function createError(message, status, data) {
  const err = new Error(message);
  err.status = status;
  err.data = data;
  return err;
}

export async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      headers,
      ...options,
    });
  } catch (networkError) {
    const err = new Error("Network error. Please check your connection.");
    err.status = 0;
    err.isNetworkError = true;
    throw err;
  }

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);

  if (!res.ok) {
    const handler = ERROR_HANDLERS[res.status];
    const message = handler
      ? handler(data)
      : data?.message || `Error: ${res.status}`;
    throw createError(message, res.status, data);
  }

  return data;
}
