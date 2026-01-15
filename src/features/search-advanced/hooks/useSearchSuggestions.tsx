import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";

export type SearchPayload = {
  key?: string;
  value: string | { from: string; to?: string };
};

export function useSearchSuggestions(payload: SearchPayload) {
  const enabled =
    typeof payload.value === "string"
      ? payload.value.trim().length >= 2
      : Boolean(payload.value?.from);

  return useQuery({
    queryKey: [apiRoutes.advancedSearch, payload],
    enabled,

    queryFn: async ({ signal }) => {
      const response = await Axios.post(apiRoutes.advancedSearch, payload, {
        signal,
      });
      return response.data.data;
    },

    staleTime: 30_000,

    // 🔥 مهمين جدًا
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
