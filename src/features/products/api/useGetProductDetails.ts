import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import { LeafletType } from "@/features/home/components/featured-leaflets/featuredLeaflet.types";

interface UseGetProductDetailsParams {
  slug: string;
  enabled?: boolean;
}

const useGetProductDetails = ({ slug, enabled = true }: UseGetProductDetailsParams) => {
  return useQuery({
    queryKey: [apiRoutes.products, slug],
    queryFn: async () => {
      const { data } = await Axios.get<Response<LeafletType>>(
        `${apiRoutes.products}/${slug}`
      );
      return data.data;
    },
    enabled: enabled && !!slug,
  });
};

export default useGetProductDetails;

