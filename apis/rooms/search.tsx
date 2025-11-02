import { useQuery } from "@tanstack/react-query";
import { Api } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/api/query-keys";
import { API_ROUTES } from "@/lib/api/routes";
import type { iROOM_SEARCH_PARAMS, iROOM_SEARCH_RESPONSE } from "@/types/room";

const searchRoomsFn = async (
  params?: iROOM_SEARCH_PARAMS,
): Promise<iROOM_SEARCH_RESPONSE> => {
  const response = await Api.get<iROOM_SEARCH_RESPONSE>(
    API_ROUTES.SEARCH_ROOMS(params),
  );
  return response;
};

export const useSearchRooms = (params?: iROOM_SEARCH_PARAMS) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_ROOMS, ...Object.values(params || {})],
    queryFn: () => searchRoomsFn(params),
    enabled: !!params?.guests && !!params?.checkIn && !!params?.checkOut,
  });
};
