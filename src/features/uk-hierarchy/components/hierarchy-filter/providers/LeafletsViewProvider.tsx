import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import type { LeafletsViewContext as ILeafletsVViewContext } from "../../../../leaflets/types/leaflets.types";

const LeafletsViewContext = createContext<ILeafletsVViewContext>({
  view: "cards",
  setView: () => null,
});

const LeafletsViewProvider: FC<PropsWithChildren> = ({ children }) => {
  const [view, setView] = useState<ILeafletsVViewContext["view"]>("cards");

  return (
    <LeafletsViewContext.Provider
      value={{
        view,
        setView,
      }}
    >
      {children}
    </LeafletsViewContext.Provider>
  );
};

export const useLeafletsView = () => useContext(LeafletsViewContext);

export default LeafletsViewProvider;
