import type { City, CurrentWeather as Current, Unit } from "../types";
import { describeWeather } from "../weatherCodes";
import { convertTemp, formatUpdateTime } from "../utils";

interface Props {
  city: City;
  current: Current;
  unit: Unit;
}

export default function CurrentWeather({ city, current, unit }: Props) {
  const info = describeWeather(current.weatherCode);

  return (
    <section className="panel current" aria-labelledby="current-title">
      <h2 id="current-title">{city.name}</h2>

      <div className="current-main">
        <span className="current-icon" role="img" aria-label={info.label}>
          {info.icon}
        </span>
        <div>
          <p className="current-temp">
            {convertTemp(current.temperature, unit)}
            <span className="current-unit">°{unit}</span>
          </p>
          <p className="current-desc">{info.label}</p>
        </div>
      </div>

      <dl className="metrics">
        <div>
          <dt>Độ ẩm</dt>
          <dd>{current.humidity}%</dd>
        </div>
        <div>
          <dt>Tốc độ gió</dt>
          <dd>{current.windSpeed} km/h</dd>
        </div>
      </dl>

      <p className="muted updated">Cập nhật lúc {formatUpdateTime(current.time)}</p>
    </section>
  );
}
