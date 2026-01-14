import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useSearchParams } from "react-router-dom";
import { LeafletType } from "@/features/home/components/featured-leaflets/featuredLeaflet.types";

interface UseGetProductsOptions {
  featured?: boolean;
}

const useGetAllProducts = ({ featured }: UseGetProductsOptions = {}) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by");
  const filterParams = Array.from(searchParams.entries()).reduce(
    (current, [key, value]) => {
      if (key.startsWith("filter-")) {
        const filterKey = key.split("-")?.[1] || "";
        const currentValue = current.get(filterKey);
        if (filterKey && currentValue) {
          current.delete(filterKey);
          current.append(`${filterKey}[]`, currentValue);
          current.append(`${filterKey}[]`, value);
        } else if (current.get(`${filterKey}[]`)) {
          current.append(`${filterKey}[]`, value);
        } else current.set(filterKey, value);
      }
      return current;
    },
    new URLSearchParams()
  );
  if (sortBy) filterParams.set("sort", sortBy);

  return useQuery<LeafletType[]>({
    queryKey: [apiRoutes.products, { featured }, filterParams.toString()],
    queryFn: async ({ signal }) => {
      const { data } = await Axios.get(
        `${apiRoutes.products}?${filterParams.toString()}`,
        {
          params: {
            is_featured: featured,
          },
          signal,
        }
      );

      return data?.data as LeafletType[];
    },
  });
};

export default useGetAllProducts;
