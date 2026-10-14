import type { Unit } from "../types";

interface Props {
  unit: Unit;
  onChange: (unit: Unit) => void;
}

export default function UnitToggle({ unit, onChange }: Props) {
  return (
    <div className="unit-toggle" role="group" aria-label="Đơn vị nhiệt độ">
      {(["C", "F"] as const).map((u) => (
        <button
          key={u}
          type="button"
          aria-pressed={unit === u}
          className={unit === u ? "is-active" : ""}
          onClick={() => onChange(u)}
        >
          °{u}
        </button>
      ))}
    </div>
  );
}
