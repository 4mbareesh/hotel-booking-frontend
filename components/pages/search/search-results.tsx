"use client";

import { useSearchParams } from "next/navigation";
import { useSearchRooms } from "@/apis/rooms/search";
import {
  ROOM_CHECKIN_KEY,
  ROOM_CHECKOUT_KEY,
  ROOM_GUESTS_KEY,
} from "@/lib/constants/room";
import type { iROOM_SEARCH_PARAMS } from "@/types/room";
import { RoomCard, SearchEmptyState, SearchError } from ".";
import SearchPageSkeleton from "./skeleton";

function SearchResults() {
  const searchParams = useSearchParams();

  // Extract search parameters using the defined keys
  const guests = searchParams.get(ROOM_GUESTS_KEY.key);
  const checkIn = searchParams.get(ROOM_CHECKIN_KEY.key);
  const checkOut = searchParams.get(ROOM_CHECKOUT_KEY.key);

  // Build the API params object
  const apiParams: iROOM_SEARCH_PARAMS | undefined =
    guests && checkIn && checkOut
      ? {
          [ROOM_GUESTS_KEY.value]: guests,
          [ROOM_CHECKIN_KEY.value]: checkIn,
          [ROOM_CHECKOUT_KEY.value]: checkOut,
        }
      : undefined;

  const { data: rooms, isLoading, error } = useSearchRooms(apiParams);

  // Show error state
  if (error) {
    return <SearchError />;
  }

  // Show loading state (this shouldn't show due to Suspense, but good fallback)
  if (isLoading) {
    return <SearchPageSkeleton />;
  }

  // Show empty state
  if (!rooms || rooms.count === 0) {
    return <SearchEmptyState searchParams={{ guests, checkIn, checkOut }} />;
  }

  return (
    <div className="space-y-6">
      {/* Search Summary */}
      <div className="space-y-2">
        <h1 className="font-semibold text-2xl">Available Rooms</h1>
        <p className="text-muted-foreground">
          {rooms.count} room{rooms.count === 1 ? "" : "s"} available for{" "}
          {guests} guest(s) from {checkIn} to {checkOut}
        </p>
      </div>

      {/* Room Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rooms?.data.map((room) => (
          <RoomCard
            key={room._id}
            room={room}
            searchParams={{ guests, checkIn, checkOut }}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
