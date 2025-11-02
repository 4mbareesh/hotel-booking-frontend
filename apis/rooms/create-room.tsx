import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/api/query-keys";
import { API_ROUTES } from "@/lib/api/routes";
import type { iROOM_TYPE_REQUEST, iROOM_TYPE_RESPONSE } from "@/types/room";

// Create room
const createRoomFn = async (
  data: iROOM_TYPE_REQUEST
): Promise<iROOM_TYPE_RESPONSE> => {
  const response = await Api.post<iROOM_TYPE_RESPONSE>(
    API_ROUTES.CREATE_ROOM,
    data
  );
  return response;
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.CREATE_ROOM],
    mutationFn: createRoomFn,
    onSuccess: () => {
      // Invalidate and refetch rooms list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ROOMS] });
    },
  });
};
