import type { Theme } from "./types";

export interface WeatherInfo {
  label: string;
  icon: string;
  theme: Exclude<Theme, "idle">;
}

const CODES: Record<number, WeatherInfo> = {
  0: { label: "Trời quang", icon: "☀️", theme: "clear" },
  1: { label: "Gần như quang đãng", icon: "🌤️", theme: "clear" },
  2: { label: "Mây rải rác", icon: "⛅", theme: "cloudy" },
  3: { label: "Nhiều mây", icon: "☁️", theme: "cloudy" },
  45: { label: "Sương mù", icon: "🌫️", theme: "fog" },
  48: { label: "Sương mù đóng băng", icon: "🌫️", theme: "fog" },
  51: { label: "Mưa phùn nhẹ", icon: "🌦️", theme: "rain" },
  53: { label: "Mưa phùn", icon: "🌦️", theme: "rain" },
  55: { label: "Mưa phùn dày", icon: "🌦️", theme: "rain" },
  56: { label: "Mưa phùn lạnh nhẹ", icon: "🌧️", theme: "rain" },
  57: { label: "Mưa phùn lạnh dày", icon: "🌧️", theme: "rain" },
  61: { label: "Mưa nhỏ", icon: "🌧️", theme: "rain" },
  63: { label: "Mưa vừa", icon: "🌧️", theme: "rain" },
  65: { label: "Mưa to", icon: "🌧️", theme: "rain" },
  66: { label: "Mưa lạnh nhẹ", icon: "🌧️", theme: "rain" },
  67: { label: "Mưa lạnh to", icon: "🌧️", theme: "rain" },
  71: { label: "Tuyết nhẹ", icon: "🌨️", theme: "snow" },
  73: { label: "Tuyết vừa", icon: "🌨️", theme: "snow" },
  75: { label: "Tuyết dày", icon: "❄️", theme: "snow" },
  77: { label: "Hạt tuyết", icon: "❄️", theme: "snow" },
  80: { label: "Mưa rào nhẹ", icon: "🌦️", theme: "rain" },
  81: { label: "Mưa rào", icon: "🌧️", theme: "rain" },
  82: { label: "Mưa rào rất to", icon: "🌧️", theme: "rain" },
  85: { label: "Tuyết rào nhẹ", icon: "🌨️", theme: "snow" },
  86: { label: "Tuyết rào to", icon: "🌨️", theme: "snow" },
  95: { label: "Dông", icon: "⛈️", theme: "storm" },
  96: { label: "Dông kèm mưa đá nhẹ", icon: "⛈️", theme: "storm" },
  99: { label: "Dông kèm mưa đá to", icon: "⛈️", theme: "storm" },
};

export function describeWeather(code: number): WeatherInfo {
  return CODES[code] ?? { label: "Không xác định", icon: "🌡️", theme: "cloudy" };
}
