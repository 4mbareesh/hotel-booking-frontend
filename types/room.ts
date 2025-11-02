import type { iDEFAULT_API_RESPONSE } from ".";

export type iROOM_SEARCH_PARAMS = {
  guests: string;
  checkIn: string;
  checkOut: string;
};

export type iROOM_SEARCH_QUERY_PARAMS = {
  g: string; // guests (using ROOM_GUESTS_KEY)
  ci: string; // checkIn (using ROOM_CHECKIN_KEY)
  co: string; // checkOut (using ROOM_CHECKOUT_KEY)
};

export type iROOM_CARD = {
  _id: string;
  name: string;
  description: string;
  maxOccupancy: number;
  pricePerNight: number;
  totalQuantity: number;
  available?: number;
};

export interface iROOM_SEARCH_RESPONSE extends iDEFAULT_API_RESPONSE {
  data: iROOM_CARD[];
  count: number;
  searchCriteria: {
    checkIn: string;
    checkOut: string;
    guests: number;
    nights: number;
  };
}
