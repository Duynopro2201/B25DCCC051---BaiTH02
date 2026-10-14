import { useRef, useState } from "react";
import { CITIES } from "./cities";
import type { City, Theme, Unit } from "./types";
import { useWeather } from "./useWeather";
import { useFavorites } from "./useFavorites";
import { describeWeather } from "./weatherCodes";
import CityList from "./components/CityList";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import StatusView from "./components/StatusView";
import UnitToggle from "./components/UnitToggle";

export default function App() {
  const [city, setCity] = useState<City | null>(null);
  const [unit, setUnit] = useState<Unit>("C"); // chỉ đổi cách hiển thị, không gọi lại API
  const { state, retry } = useWeather(city);
  const { favorites, toggle } = useFavorites();
  const detailRef = useRef<HTMLElement>(null);

  const theme: Theme =
    state.status === "success" ? describeWeather(state.data.current.weatherCode).theme : "idle";

  function handleSelect(next: City) {
    setCity(next);
    // Màn hình hẹp: danh sách và chi tiết xếp dọc → cuộn xuống phần chi tiết.
    if (window.matchMedia("(max-width: 767px)").matches) {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="app" data-theme={theme}>
      <header className="header">
        <h1>Thời tiết Việt Nam</h1>
        <UnitToggle unit={unit} onChange={setUnit} />
      </header>

      <main className="layout">
        <CityList
          cities={CITIES}
          selectedId={city?.id ?? null}
          favorites={favorites}
          onSelect={handleSelect}
          onToggleFavorite={toggle}
        />

        <section className="detail" ref={detailRef} aria-live="polite">
          {state.status === "idle" && <StatusView kind="idle" />}
          {state.status === "loading" && <StatusView kind="loading" />}
          {state.status === "error" && <StatusView kind="error" message={state.message} onRetry={retry} />}
          {state.status === "success" && city && (
            <>
              <CurrentWeather city={city} current={state.data.current} unit={unit} />
              <Forecast days={state.data.daily} unit={unit} />
            </>
          )}
        </section>
      </main>

      <footer className="footer">Dữ liệu: Open-Meteo.com</footer>
    </div>
  );
}
