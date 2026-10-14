import { useCallback, useEffect, useState } from "react";
import type { City, WeatherState } from "./types";
import { fetchWeather } from "./weatherApi";

export function useWeather(city: City | null) {
  const [state, setState] = useState<WeatherState>({ status: "idle" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!city) {
      setState({ status: "idle" });
      return;
    }

    // Hủy request cũ khi đổi thành phố → tránh kết quả về trễ ghi đè kết quả mới.
    const controller = new AbortController();
    setState({ status: "loading" });

    fetchWeather(city, controller.signal)
      .then((data) => setState({ status: "success", data }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        const message =
          err instanceof TypeError
            ? "Không kết nối được. Hãy kiểm tra mạng rồi thử lại."
            : err instanceof Error
              ? err.message
              : "Đã có lỗi xảy ra.";
        setState({ status: "error", message });
      });

    return () => controller.abort();
  }, [city, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { state, retry };
}
