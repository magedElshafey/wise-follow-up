import { memo } from "react";
import { useYearStats } from "./useYearStats";
import YearHistogram from "./YearHistogram";
import YearRangeSlider from "./YearRangeSlider";
import YearFilterSkeleton from "./YearFilterSkeleton";
import "./double-slider.css";

const START = 1992;
const END = 2026;

const YearFilter = () => {
  const { data = [], isLoading } = useYearStats(START, END);

  if (isLoading) return <YearFilterSkeleton />;

  return (
    <div className="relative">
      <YearHistogram data={data} min={START} max={END} />
      <YearRangeSlider min={START} max={END} data={data} />

      <div className="flex justify-between mt-3 text-xs text-text-muted">
        <span>{START}</span>
        <span>{END}</span>
      </div>
    </div>
  );
};

export default memo(YearFilter);
