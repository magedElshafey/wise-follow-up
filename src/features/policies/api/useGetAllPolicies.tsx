import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import { useQuery } from "@tanstack/react-query";
import { Policies } from "../types/policies.type";
const useGetAllPolicies = () => {
  return useQuery({
    queryKey: [apiRoutes?.policies],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.policies);
      return data?.data as Policies[];
    },
    ...delayOptions,
  });
};

export default useGetAllPolicies;
