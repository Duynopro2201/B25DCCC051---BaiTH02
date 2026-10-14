import { useCallback, useEffect, useState } from "react";

const KEY = "weather-favorites";

function load(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(favorites));
    } catch {
      /* localStorage bị chặn: bỏ qua, vẫn dùng được trong phiên */
    }
  }, [favorites]);

  const toggle = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  return { favorites, toggle };
}
