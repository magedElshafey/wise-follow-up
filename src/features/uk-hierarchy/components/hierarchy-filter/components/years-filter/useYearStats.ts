import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";

export interface YearStat {
    year: number;
    count: number;
}

interface Response {
    from: number;
    to: number;
    data: YearStat[];
}

export const useYearStats = (from: number, to: number) =>
    useQuery({
        queryKey: [apiRoutes.years, from, to],
        queryFn: async () => {
            const { data } = await axios.get<Response>(apiRoutes.years, {
                params: { from, to },
            });
            return data.data;
        },
        staleTime: 5 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
