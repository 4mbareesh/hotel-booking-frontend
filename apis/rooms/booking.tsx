import { useMutation } from "@tanstack/react-query";
import { Api } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/api/query-keys";
import { API_ROUTES } from "@/lib/api/routes";
import type { iBOOKING_REQUEST, iBOOKING_RESPONSE } from "@/types/room";

const createBookingFn = async (
  data: iBOOKING_REQUEST,
): Promise<iBOOKING_RESPONSE> => {
  const response = await Api.post<iBOOKING_RESPONSE>(
    API_ROUTES.CREATE_BOOKING,
    data,
  );
  return response;
};

export const useCreateBooking = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.CREATE_BOOKING],
    mutationFn: createBookingFn,
  });
};
