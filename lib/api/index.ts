import axios, { type AxiosRequestConfig } from "axios";

export const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// **HTTP Client Functions**
async function request<T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await AxiosInstance.request<T>({
      method,
      url,
      ...options,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

function handleError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    throw error?.response;
  }
  throw new Error("An unknown error occurred");
}

export async function get<T>(
  url: string,
  params?: Record<string, any>
): Promise<T> {
  return request<T>("get", url, { params });
}

export async function post<T>(
  url: string,
  data?: unknown,
  options?: AxiosRequestConfig
): Promise<T> {
  return request<T>("post", url, { data, ...options });
}

export async function put<T>(url: string, data?: unknown): Promise<T> {
  return request<T>("put", url, { data });
}

export async function patch<T>(url: string, data?: unknown): Promise<T> {
  return request<T>("patch", url, { data });
}

export async function del<T>(url: string): Promise<T> {
  return request<T>("delete", url);
}

// **Api object for convenient access**
export const Api = {
  get,
  post,
  put,
  patch,
  delete: del,
} as const;
