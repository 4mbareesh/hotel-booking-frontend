import type { iROOM_SEARCH_PARAMS } from "@/types/room";
import { buildSearchParams } from "../utils";

export const API_ROUTES = {
  SEARCH_ROOMS: (params?: iROOM_SEARCH_PARAMS) =>
    buildSearchParams("/search", params),
  CREATE_BOOKING: "/book",

  // Admin Room Management Routes
  GET_ROOMS: "/rooms",
  CREATE_ROOM: "/rooms",
  UPDATE_ROOM: (id: string) => `/rooms/${id}`,
  DELETE_ROOM: (id: string) => `/rooms/${id}`,
};
