import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import type { LeafletType } from "../types/leaflets.types";
interface UseGetleafletsDetailsParams {
  slug: string;
  enabled?: boolean;
}

const useGetLeafletsDetails = ({ slug, enabled = true }: UseGetleafletsDetailsParams) => {
  return useQuery({
    queryKey: [apiRoutes.leaflets, slug],
    queryFn: async () => {
      const { data } = await Axios.get<Response<LeafletType>>(
        `${apiRoutes.leaflets}/${slug}`
      );
      return data.data;
    },
    enabled: enabled && !!slug,
  });
};

export default useGetLeafletsDetails;

