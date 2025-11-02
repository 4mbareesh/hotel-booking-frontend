import { useQuery } from "@tanstack/react-query";
import { Api } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/api/query-keys";
import { API_ROUTES } from "@/lib/api/routes";
import type { iROOM_TYPE_RESPONSE } from "@/types/room";

// Get all rooms
const getRoomsFn = async (): Promise<iROOM_TYPE_RESPONSE> => {
  const response = await Api.get<iROOM_TYPE_RESPONSE>(API_ROUTES.GET_ROOMS);
  return response;
};

export const useGetRooms = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ROOMS],
    queryFn: getRoomsFn,
  });
};
