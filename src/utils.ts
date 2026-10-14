import type { Unit } from "./types";

/** Quy đổi từ °C sang đơn vị đang chọn rồi làm tròn. Không gọi lại API. */
export function convertTemp(celsius: number, unit: Unit): number {
  const value = unit === "C" ? celsius : (celsius * 9) / 5 + 32;
  return Math.round(value);
}

export function formatTemp(celsius: number, unit: Unit): string {
  return `${convertTemp(celsius, unit)}°`;
}

/** Bỏ dấu tiếng Việt, đưa về chữ thường để tìm kiếm không phân biệt dấu. */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .trim();
}

const WEEKDAYS = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

/** "2026-10-14" → { weekday: "Thứ 4", dayMonth: "14/10" } (không phụ thuộc múi giờ máy). */
export function formatDay(isoDate: string): { weekday: string; dayMonth: string } {
  const [y, m, d] = isoDate.split("-").map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return {
    weekday: WEEKDAYS[dow],
    dayMonth: `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}`,
  };
}

/** "2026-10-14T15:00" → "15:00 · 14/10/2026" */
export function formatUpdateTime(isoLocal: string): string {
  const [date, time = ""] = isoLocal.split("T");
  const [y, m, d] = date.split("-");
  return `${time} ngày ${d}/${m}/${y}`;
}
