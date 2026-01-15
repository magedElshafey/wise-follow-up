import { FC, memo, ReactNode, useCallback, useState } from "react";

interface FilterSectionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

const FilterSection: FC<FilterSectionProps> = ({
  title,
  children,
  defaultExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggle = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <section
      className="
        bg-bg-alt
        rounded-card
        border border-border-subtle
        p-4
        space-y-3
      "
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={expanded}
        className="
          w-full flex items-center justify-between
          text-left
          focus:outline-none
        "
      >
        <h4 className="text-sm font-medium text-text-main">{title}</h4>

        <span className="text-text-muted text-lg leading-none">
          {expanded ? "−" : "+"}
        </span>
      </button>

      <div
        className={`
          overflow-hidden
          transition-[max-height,opacity]
          duration-300 ease-in-out
          ${expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="pt-2 space-y-1">{children}</div>
      </div>
    </section>
  );
};

export default memo(FilterSection);
