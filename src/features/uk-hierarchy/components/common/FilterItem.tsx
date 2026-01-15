import { FC, memo, useCallback } from "react";
import { FaCheck } from "react-icons/fa";

interface FilterItemProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  checkbox?: boolean;
}

const FilterItem: FC<FilterItemProps> = ({
  label,
  selected,
  onToggle,
  checkbox = false,
}) => {
  const handleClick = useCallback(() => {
    onToggle();
  }, [onToggle]);

  return (
    <button
      type="button"
      onClick={handleClick}
      role={checkbox ? "checkbox" : "button"}
      aria-checked={checkbox ? selected : undefined}
      aria-pressed={!checkbox ? selected : undefined}
      className={`
        w-full flex items-center gap-3
        rounded-xl
        px-3 py-2
        text-left
        border
        transition-all
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
        ${
          selected
            ? "border-primary bg-primary-soft text-text-main"
            : "border-transparent hover:bg-bg-page text-text-muted"
        }
      `}
    >
      {checkbox && (
        <span
          className={`
            inline-flex h-4 w-4
            items-center justify-center
            rounded
            border-2
            ${selected ? "bg-primary border-primary" : "border-border-subtle"}
          `}
          aria-hidden
        >
          <FaCheck
            className={`h-2.5 w-2.5 text-white ${
              selected ? "opacity-100" : "opacity-0"
            }`}
          />
        </span>
      )}

      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default memo(FilterItem);
