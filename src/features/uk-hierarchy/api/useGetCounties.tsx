import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { CountiesListType } from "../types/ukHierarchy.types";
interface UseGetCountiesOptions {
  featured?: boolean;
  delay?: Partial<UseQueryOptions<CountiesListType[]>>;
  country?: string;
}

const useGetCounties = ({
  featured,
  delay,
  country,
}: UseGetCountiesOptions = {}) => {
  return useQuery<CountiesListType[]>({
    queryKey: [apiRoutes.counties, { featured, country }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (featured !== undefined) params.append("featured", String(featured));
      if (country !== undefined) params.append("country_id", country);

      const queryString = params.toString() ? `?${params.toString()}` : "";
      const { data } = await Axios.get(`${apiRoutes.counties}${queryString}`);

      return data?.data as CountiesListType[];
    },
    ...delay,
  });
};

export default useGetCounties;
