import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/api/query-keys";
import { API_ROUTES } from "@/lib/api/routes";

// Delete room
const deleteRoomFn = async (id: string): Promise<void> => {
  await Api.delete(API_ROUTES.DELETE_ROOM(id));
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.DELETE_ROOM],
    mutationFn: deleteRoomFn,
    onSuccess: () => {
      // Invalidate and refetch rooms list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ROOMS] });
    },
  });
};
