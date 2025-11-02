"use client";

import { BedIcon, UsersIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { iBOOKING_RESPONSE, iROOM_CARD } from "@/types/room";
import { BookingErrorModal, BookingModal, BookingSuccessModal } from ".";

type Props = {
  room: iROOM_CARD;
  searchParams: {
    guests: string | null;
    checkIn: string | null;
    checkOut: string | null;
  };
};

function RoomCard({ room, searchParams }: Props) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState<
    iBOOKING_RESPONSE["data"] | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (booking: iBOOKING_RESPONSE["data"]) => {
    setBookingData(booking);
    setIsSuccessModalOpen(true);
  };

  const handleBookingError = (error: string) => {
    setErrorMessage(error);
    setIsErrorModalOpen(true);
  };

  const handleRetryBooking = () => {
    setIsErrorModalOpen(false);
    setIsBookingModalOpen(true);
  };

  const closeAllModals = () => {
    setIsBookingModalOpen(false);
    setIsSuccessModalOpen(false);
    setIsErrorModalOpen(false);
    setBookingData(null);
    setErrorMessage("");
  };

  return (
    <>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        {/* Room Image Placeholder */}
        <div className="flex h-20 items-center justify-center rounded-t-lg bg-muted">
          <BedIcon className="size-10 text-muted-foreground" />
        </div>

        {/* Room Details */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Room Name and Occupancy */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{room.name}</h3>
              <div className="flex items-center text-muted-foreground text-sm">
                <UsersIcon className="mr-1 h-4 w-4" />
                <span>Up to {room.maxOccupancy} guests</span>
              </div>
            </div>

            {/* Description */}
            <p className="line-clamp-2 text-muted-foreground text-sm">
              {room.description}
            </p>

            {/* Availability */}
            <div className="text-green-600 text-sm">
              {room.available !== undefined
                ? `${room.available} room${room.available === 1 ? "" : "s"} available`
                : "Available"}
            </div>

            {/* Price and Book Button */}
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-1">
                <div className="font-semibold text-xl">
                  ₹{room.pricePerNight.toLocaleString()}
                </div>
                <div className="text-muted-foreground text-xs">per night</div>
              </div>

              <Button onClick={handleBookNow} className="shrink-0">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        room={room}
        searchParams={searchParams}
        onSuccess={handleBookingSuccess}
        onError={handleBookingError}
      />

      {/* Success Modal */}
      {bookingData && (
        <BookingSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={closeAllModals}
          booking={bookingData.summary}
        />
      )}

      {/* Error Modal */}
      <BookingErrorModal
        isOpen={isErrorModalOpen}
        onClose={closeAllModals}
        errorMessage={errorMessage}
        onRetry={handleRetryBooking}
      />
    </>
  );
}

export default RoomCard;
