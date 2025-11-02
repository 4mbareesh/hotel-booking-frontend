import { useQuery } from "@tanstack/react-query";
import { Api } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/api/query-keys";
import { API_ROUTES } from "@/lib/api/routes";
import type { iROOM_SEARCH_PARAMS } from "@/types/room";

const searchRoomsFn = (params?: iROOM_SEARCH_PARAMS) => {
  const response = Api.get(API_ROUTES.SEARCH_ROOMS(params));
  return response;
};

export const useSearchRooms = (params?: iROOM_SEARCH_PARAMS) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_ROOMS, ...Object.values(params || {})],
    queryFn: () => searchRoomsFn(params),
  });
};
