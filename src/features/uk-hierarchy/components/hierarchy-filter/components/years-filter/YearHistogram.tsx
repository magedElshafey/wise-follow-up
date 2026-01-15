import { memo, useMemo } from "react";
import { YearStat } from "./useYearStats";

const BARS = 48;

interface Props {
  data: YearStat[];
  min: number;
  max: number;
}

const YearHistogram = ({ data, min, max }: Props) => {
  const bars = useMemo(() => {
    const span = Math.ceil((max - min + 1) / BARS);

    const buckets = Array.from({ length: BARS }, (_, i) => {
      const start = min + i * span;
      const end = Math.min(start + span - 1, max);

      let value = 0;
      for (let y = start; y <= end; y++) {
        value += data.find((d) => d.year === y)?.count ?? 0;
      }

      return value;
    });

    const maxValue = Math.max(...buckets, 1);
    return buckets.map((v) => (v / maxValue) * 100);
  }, [data, min, max]);

  return (
    <div className="flex h-8 items-end gap-px mb-2">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 bg-primary/40 rounded-sm transition-transform duration-300 origin-bottom"
          style={{ transform: `scaleY(${h / 100})` }}
        />
      ))}
    </div>
  );
};

export default memo(YearHistogram);
