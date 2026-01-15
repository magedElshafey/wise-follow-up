import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { CountiesListType } from "../types/ukHierarchy.types";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";

interface UseGetBrandsOptions {
  country_id?: string;
  county_id?: string;
  organization_type_id?: string;
}

const useGetOrgs = ({
  country_id,
  county_id,
  organization_type_id,
}: UseGetBrandsOptions = {}) => {
  return useQuery<CountiesListType[]>({
    queryKey: [
      apiRoutes.organizations,
      { country_id, county_id, organization_type_id },
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (country_id !== undefined)
        params.append("country_id", String(country_id));
      if (county_id !== undefined) params.append("county_id", county_id);
      if (organization_type_id !== undefined)
        params.append("organization_type_id", organization_type_id);

      const queryString = params.toString() ? `?${params.toString()}` : "";
      const { data } = await Axios.get(
        `${apiRoutes.organizations}${queryString}`
      );

      return data?.data as CountiesListType[];
    },
    ...delayOptions,
  });
};

export default useGetOrgs;
