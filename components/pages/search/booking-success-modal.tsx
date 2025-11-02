"use client";

import {
  CalendarIcon,
  CheckCircleIcon,
  CreditCardIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { PAGES } from "@/lib/constants";
import type { iBOOKING_RESPONSE } from "@/types/room";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  booking: iBOOKING_RESPONSE["data"]["summary"];
};

function BookingSuccessModal({ isOpen, onClose, booking }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const nights = Math.ceil(
    (new Date(booking.checkOut).getTime() -
      new Date(booking.checkIn).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <DialogTitle className="text-xl">Booking Confirmed!</DialogTitle>
          <DialogDescription>
            Your booking has been successfully confirmed. Here are your booking
            details:
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Booking Reference */}
          <div className="rounded-lg border bg-muted/50 p-4 text-center">
            <div className="text-muted-foreground text-sm">
              Booking Reference
            </div>
            <div className="font-mono font-semibold text-lg">
              {booking.bookingId.slice(-8).toUpperCase()}
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <CalendarIcon className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium">{booking.roomType}</div>
                <div className="text-muted-foreground text-sm">Room Type</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <UsersIcon className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium">
                  {booking.guests} Guest
                  {booking.guests === 1 ? "" : "s"}
                </div>
                <div className="text-muted-foreground text-sm">
                  For {nights} night{nights === 1 ? "" : "s"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                <CreditCardIcon className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium">
                  ₹{booking.totalPrice.toLocaleString()}
                </div>
                <div className="text-muted-foreground text-sm">
                  Total Amount
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-muted-foreground text-sm">Check-in</div>
              <div className="font-medium">{formatDate(booking.checkIn)}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Check-out</div>
              <div className="font-medium">{formatDate(booking.checkOut)}</div>
            </div>
          </div>

          <Separator />

          {/* Guest Details */}
          <div className="space-y-2">
            <div className="text-muted-foreground text-sm">Guest Details</div>
            <div>
              <div className="font-medium">{booking.customerName}</div>
              <div className="text-muted-foreground text-sm">
                {booking.customerPhone}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="w-full" asChild>
            <Link href={PAGES.HOME} className="w-full sm:w-auto">
              Search More Rooms
            </Link>
          </Button>
          <Button onClick={onClose} className="w-full sm:w-auto">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookingSuccessModal;
