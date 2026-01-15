import { FC, PropsWithChildren } from "react";
import LeafletsFiltersProvider, {
  useLeafletsFilters,
} from "./LeafletsFiltersProvider";
import LeafletsViewProvider, { useLeafletsView } from "./LeafletsViewProvider";

/**
 * Combined leafletsProvider for backward compatibility
 * This provider wraps both leafletsFiltersProvider and leafletsViewProvider
 *
 * @deprecated Use leafletsFiltersProvider and leafletsViewProvider separately instead
 */
const LeafletsContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <LeafletsFiltersProvider>
      <LeafletsViewProvider>{children}</LeafletsViewProvider>
    </LeafletsFiltersProvider>
  );
};

/**
 * @deprecated Use useleafletsFilters() and useleafletsView() separately instead
 */
export const useLeafletsContext = () => {
  const filtersContext = useLeafletsFilters();
  const viewContext = useLeafletsView();

  return {
    ...filtersContext,
    ...viewContext,
  };
};

export default LeafletsContextProvider;
