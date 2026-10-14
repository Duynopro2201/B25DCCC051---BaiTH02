import type { City, DailyForecast, WeatherData } from "./types";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

interface OpenMeteoResponse {
  current?: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export function buildUrl(city: City): string {
  const params = new URLSearchParams({
    latitude: String(city.lat),
    longitude: String(city.lon),
    current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "Asia/Ho_Chi_Minh",
    forecast_days: "7",
  });
  return `${BASE_URL}?${params.toString()}`;
}

export async function fetchWeather(city: City, signal?: AbortSignal): Promise<WeatherData> {
  const res = await fetch(buildUrl(city), { signal });
  if (!res.ok) {
    throw new Error(`Máy chủ trả về lỗi ${res.status}.`);
  }

  const json = (await res.json()) as OpenMeteoResponse;
  const { current, daily } = json;
  if (!current || !daily) {
    throw new Error("Dữ liệu trả về không đầy đủ.");
  }

  // Phần tử thứ i của 4 mảng thuộc cùng một ngày → ghép lại thành từng ngày.
  const days: DailyForecast[] = daily.time.map((date, i) => ({
    date,
    weatherCode: daily.weather_code[i],
    tempMax: daily.temperature_2m_max[i],
    tempMin: daily.temperature_2m_min[i],
  }));

  return {
    current: {
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      weatherCode: current.weather_code,
      time: current.time,
    },
    daily: days,
  };
}
