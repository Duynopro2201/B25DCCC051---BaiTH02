import type { DailyForecast, Unit } from "../types";
import { describeWeather } from "../weatherCodes";
import { formatDay, formatTemp } from "../utils";

interface Props {
  days: DailyForecast[];
  unit: Unit;
}

export default function Forecast({ days, unit }: Props) {
  return (
    <section className="panel forecast" aria-labelledby="forecast-title">
      <h2 id="forecast-title">Dự báo 7 ngày</h2>
      <ul className="forecast-list">
        {days.map((day, i) => {
          const { weekday, dayMonth } = formatDay(day.date);
          const info = describeWeather(day.weatherCode);
          return (
            <li key={day.date} className="forecast-row">
              <div className="forecast-day">
                <span className="forecast-weekday">{i === 0 ? "Hôm nay" : weekday}</span>
                <span className="muted">{dayMonth}</span>
              </div>
              <span className="forecast-icon" role="img" aria-label={info.label} title={info.label}>
                {info.icon}
              </span>
              <div className="forecast-temps">
                <span className="hi" aria-label="Cao nhất">
                  {formatTemp(day.tempMax, unit)}
                </span>
                <span className="lo" aria-label="Thấp nhất">
                  {formatTemp(day.tempMin, unit)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
