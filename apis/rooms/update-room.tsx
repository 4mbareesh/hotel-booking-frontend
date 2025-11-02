import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/api/query-keys";
import { API_ROUTES } from "@/lib/api/routes";
import type { iROOM_TYPE_REQUEST, iROOM_TYPE_RESPONSE } from "@/types/room";

// Update room
const updateRoomFn = async ({
  id,
  data,
}: {
  id: string;
  data: iROOM_TYPE_REQUEST;
}): Promise<iROOM_TYPE_RESPONSE> => {
  const response = await Api.put<iROOM_TYPE_RESPONSE>(
    API_ROUTES.UPDATE_ROOM(id),
    data,
  );
  return response;
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_ROOM],
    mutationFn: updateRoomFn,
    onSuccess: () => {
      // Invalidate and refetch rooms list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ROOMS] });
    },
  });
};
