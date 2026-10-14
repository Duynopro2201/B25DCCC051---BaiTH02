export interface City {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export type Unit = "C" | "F";

export interface CurrentWeather {
  temperature: number; // °C
  humidity: number; // %
  windSpeed: number; // km/h
  weatherCode: number;
  time: string; // ISO local, vd "2026-10-14T15:00"
}

export interface DailyForecast {
  date: string; // "YYYY-MM-DD"
  weatherCode: number;
  tempMax: number; // °C
  tempMin: number; // °C
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
}

export type WeatherState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: WeatherData }
  | { status: "error"; message: string };

export type Theme = "idle" | "clear" | "cloudy" | "fog" | "rain" | "storm" | "snow";
