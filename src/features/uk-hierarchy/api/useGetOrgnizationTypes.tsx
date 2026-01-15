import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { CountiesListType } from "../types/ukHierarchy.types";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
const useGetOrgnizationTypes = () => {
  return useQuery({
    queryKey: [apiRoutes?.orgTypes],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.orgTypes);
      return data?.data as CountiesListType[];
    },
    ...delayOptions,
  });
};

export default useGetOrgnizationTypes;
