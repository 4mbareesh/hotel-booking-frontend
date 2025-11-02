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

export type iBOOKING_FORM_DATA = {
  customerName: string;
  customerPhone: string;
};

export type iBOOKING_REQUEST = {
  roomTypeId: string;
  customerName: string;
  customerPhone: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
};

export interface iBOOKING_RESPONSE extends iDEFAULT_API_RESPONSE {
  data: {
    booking: {
      roomTypeId: string;
      roomTypeName: string;
      customerName: string;
      customerPhone: string;
      checkInDate: string;
      checkOutDate: string;
      numberOfGuests: number;
      pricePerNight: number;
      totalPrice: number;
      bookingDate: string;
      status: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    roomType: {
      name: string;
      description: string;
      maxOccupancy: number;
    };
    summary: {
      bookingId: string;
      customerName: string;
      customerPhone: string;
      roomType: string;
      checkIn: string;
      checkOut: string;
      nights: number;
      guests: number;
      pricePerNight: number;
      totalPrice: number;
      status: string;
    };
  };
}
