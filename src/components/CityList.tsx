import { useMemo, useState } from "react";
import type { City } from "../types";
import { normalize } from "../utils";

interface Props {
  cities: City[];
  selectedId: string | null;
  favorites: string[];
  onSelect: (city: City) => void;
  onToggleFavorite: (id: string) => void;
}

export default function CityList({ cities, selectedId, favorites, onSelect, onToggleFavorite }: Props) {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = normalize(query);
    const filtered = q ? cities.filter((c) => normalize(c.name).includes(q)) : cities;
    // Yêu thích lên đầu, giữ nguyên thứ tự gốc trong mỗi nhóm.
    return [...filtered].sort(
      (a, b) => Number(favorites.includes(b.id)) - Number(favorites.includes(a.id))
    );
  }, [cities, query, favorites]);

  return (
    <nav className="panel city-panel" aria-label="Danh sách thành phố">
      <input
        className="search"
        type="search"
        placeholder="Tìm thành phố (vd: da lat)"
        aria-label="Tìm thành phố"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {visible.length === 0 ? (
        <p className="muted">Không có thành phố nào khớp “{query}”.</p>
      ) : (
        <ul className="city-list">
          {visible.map((city) => {
            const selected = city.id === selectedId;
            const fav = favorites.includes(city.id);
            return (
              <li key={city.id} className={`city-item${selected ? " is-selected" : ""}`}>
                <button
                  type="button"
                  className="city-btn"
                  aria-current={selected ? "true" : undefined}
                  onClick={() => onSelect(city)}
                >
                  {city.name}
                </button>
                <button
                  type="button"
                  className={`fav-btn${fav ? " is-fav" : ""}`}
                  aria-pressed={fav}
                  aria-label={fav ? `Bỏ ${city.name} khỏi yêu thích` : `Thêm ${city.name} vào yêu thích`}
                  onClick={() => onToggleFavorite(city.id)}
                >
                  {fav ? "★" : "☆"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
