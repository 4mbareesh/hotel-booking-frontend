import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";
import { Api } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/api/query-keys";
import { API_ROUTES } from "@/lib/api/routes";

const updateRoomStatusFn = async (roomId: string, isActive: boolean) => {
  const res = Api.post(API_ROUTES.UPDATE_ROOM_AVAILABILITY(roomId), {
    isActive,
  });
  return res;
};

export const useUpdateRoomAvailability = () => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: (res: AxiosResponse["data"]) => {
      // Invalidate and refetch rooms list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ROOMS] });
      toast.success(res?.message || "Room availability updated successfully");
    },
    mutationFn: ({ roomId, isActive }: { roomId: string; isActive: boolean }) =>
      updateRoomStatusFn(roomId, isActive),
  });
};
