import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function buildSearchParams(
  baseUrl: string,
  params?: Record<string, unknown>
) {
  if (!params) return baseUrl;

  const searchParams = new URLSearchParams();
  // iterate own props and add only defined values
  Object.entries(params as Record<string, unknown>).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((v) => {
        searchParams.append(key, String(v));
      });
    } else if (typeof value === "object") {
      // for objects, stringify (adjust if you want different handling)
      searchParams.append(key, JSON.stringify(value));
    } else {
      searchParams.append(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
}
