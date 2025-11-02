import type { iROOM_SEARCH_PARAMS } from "@/types/room";
import { buildSearchParams } from "../utils";

export const API_ROUTES = {
  SEARCH_ROOMS: (params?: iROOM_SEARCH_PARAMS) =>
    buildSearchParams("/search", params),
  CREATE_BOOKING: "/book",
};
