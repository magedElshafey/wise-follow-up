import { memo, useState } from "react";
import * as XLSX from "xlsx";
import { useYearStats } from "./useYearStats";
import YearHistogram from "./YearHistogram";
import YearRangeSlider from "./YearRangeSlider";
import YearFilterSkeleton from "./YearFilterSkeleton";
import "./double-slider.css";

const START = 1927;
const END = 2026;

const YearFilter = () => {
  const { data = [], isLoading } = useYearStats(START, END);
  const [expanded, setExpanded] = useState(true);

  // const exportExcel = () => {
  //   const sheet = XLSX.utils.json_to_sheet(data);
  //   const book = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(book, sheet, "Leaflets by Year");
  //   XLSX.writeFile(book, "leaflets-years.xlsx");
  // };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        {/* <div className="flex gap-3 text-xs">
          <button onClick={() => setExpanded((p) => !p)} className="underline">
            {expanded ? "Collapse" : "Expand"}
          </button>

          <button onClick={exportExcel} className="underline">
            Export Excel
          </button>
        </div> */}
      </div>

      {isLoading ? (
        <YearFilterSkeleton />
      ) : (
        <div
          className={`transition-all duration-300 overflow-hidden ${
            expanded ? "max-h-64" : "max-h-0"
          }`}
        >
          <YearHistogram data={data} min={START} max={END} />
          <YearRangeSlider min={START} max={END} data={data} />

          <div className="flex justify-between mt-4 text-sm text-text-muted">
            <span>{START}</span>
            <span>{END}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(YearFilter);
