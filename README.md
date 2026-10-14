# Bài TH02 – Ứng dụng thời tiết 8 thành phố Việt Nam

React + TypeScript + Vite. Dữ liệu từ [Open-Meteo](https://open-meteo.com/en/docs) (không cần API key).

## Chạy
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # kiểm tra kiểu + build
```

## Yêu cầu bắt buộc
- YC1: `CityList` – 8 thành phố, thành phố đang chọn nền trắng nổi bật (`aria-current`).
- YC2: `CurrentWeather` – biểu tượng, mô tả, nhiệt độ, độ ẩm, gió, thời điểm cập nhật.
- YC3: `Forecast` – 7 ngày: thứ, ngày, biểu tượng, cao/thấp.
- YC4: `StatusView` – chưa chọn / đang tải / lỗi (nút "Thử lại").
- YC5: API luôn trả °C; `utils.convertTemp` đổi khi hiển thị nên đổi °C/°F không gọi lại API.
- YC6: CSS grid – từ 768px 2 cột, nhỏ hơn xếp dọc.

## Nâng cao đã làm
- Tìm thành phố không phân biệt dấu (`utils.normalize`).
- Thành phố yêu thích lưu `localStorage` (`useFavorites`).
- Màu nền đổi theo thời tiết (`data-theme`).
- Viết bằng TypeScript.
