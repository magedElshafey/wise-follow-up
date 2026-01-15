import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { YearStat } from "./useYearStats";
import { useLeafletsFilters } from "../../providers/LeafletsFiltersProvider";
interface Props {
  min: number;
  max: number;
  data: YearStat[];
}

const YearRangeSlider = ({ min, max, data }: Props) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const {
    filters: { year_from, year_to },
    handleChangeFilters,
  } = useLeafletsFilters();

  const from = Number(year_from) || min;
  const to = Number(year_to) || max;

  const rangeRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);

  const [hover, setHover] = useState<{ x: number; year: number } | null>(null);

  const getCount = (year: number) =>
    data.find((d) => d.year === year)?.count ?? 0;

  useEffect(() => {
    if (!rangeRef.current) return;

    const start = ((from - min) / (max - min)) * 100;
    const end = ((to - min) / (max - min)) * 100;

    if (isRTL) {
      rangeRef.current.style.right = `${start}%`;
      rangeRef.current.style.left = "unset";
    } else {
      rangeRef.current.style.left = `${start}%`;
      rangeRef.current.style.right = "unset";
    }

    rangeRef.current.style.width = `${end - start}%`;
  }, [from, to, min, max, isRTL]);

  return (
    <div
      className="relative"
      onMouseMove={(e) => {
        if (raf.current) return;

        raf.current = requestAnimationFrame(() => {
          const rect = e.currentTarget.getBoundingClientRect();
          const percent = (e.clientX - rect.left) / rect.width;
          const year = Math.round(min + percent * (max - min));

          setHover({ x: e.clientX - rect.left, year });
          raf.current = null;
        });
      }}
      onMouseLeave={() => setHover(null)}
    >
      {/* Tooltip */}
      {hover && (
        <div
          className="absolute -top-9 z-50 text-xs px-2 py-1 rounded bg-text-main text-bg-surface whitespace-nowrap"
          style={{
            left: hover.x,
            transform: isRTL ? "translateX(50%)" : "translateX(-50%)",
          }}
        >
          {hover.year} : {getCount(hover.year)}
        </div>
      )}

      <input
        type="range"
        min={min}
        max={max}
        value={from}
        onChange={(e) =>
          handleChangeFilters(
            "year_from",
            Math.min(+e.target.value, to).toString(),
            true
          )
        }
        className="thumb thumbLeft"
      />

      <input
        type="range"
        min={min}
        max={max}
        value={to}
        onChange={(e) =>
          handleChangeFilters(
            "year_to",
            Math.max(+e.target.value, from).toString(),
            true
          )
        }
        className="thumb thumbRight"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={rangeRef} className="slider__range" />
      </div>
    </div>
  );
};

export default memo(YearRangeSlider);
