export const QUERY_KEYS = {
  SEARCH_ROOMS: "SEARCH_ROOMS",
  CREATE_BOOKING: "CREATE_BOOKING",
} as const;

export type QUERY_KEYS = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
