import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { DepartmentSystem } from "../types/ukHierarchy.types";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
const useGetDepartments = () => {
  return useQuery({
    queryKey: [apiRoutes?.departments],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.departments);
      return data?.data as DepartmentSystem[];
    },
    ...delayOptions,
  });
};

export default useGetDepartments;
