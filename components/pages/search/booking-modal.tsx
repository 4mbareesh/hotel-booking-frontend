"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateBooking } from "@/apis/rooms/booking";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { iBOOKING_RESPONSE, iROOM_CARD } from "@/types/room";

const formSchema = z.object({
  customerName: z.string().min(1, { message: "Name is required." }),
  customerPhone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^\d+$/, { message: "Phone number must contain only digits." }),
});

type Props = {
  isOpen: boolean;
  onClose: () => void;
  room: iROOM_CARD;
  searchParams: {
    guests: string | null;
    checkIn: string | null;
    checkOut: string | null;
  };
  onSuccess: (booking: iBOOKING_RESPONSE["data"]) => void;
  onError: (error: string) => void;
};

function BookingModal({
  isOpen,
  onClose,
  room,
  searchParams,
  onSuccess,
  onError,
}: Props) {
  const { mutate: createBooking, isPending } = useCreateBooking();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (
      !searchParams.guests ||
      !searchParams.checkIn ||
      !searchParams.checkOut
    ) {
      onError("Missing booking information. Please search again.");
      return;
    }

    const bookingData = {
      roomTypeId: room._id,
      customerName: values.customerName,
      customerPhone: values.customerPhone,
      checkInDate: searchParams.checkIn,
      checkOutDate: searchParams.checkOut,
      numberOfGuests: parseInt(searchParams.guests || "1", 10),
    };

    createBooking(bookingData, {
      onSuccess: (data) => {
        form.reset();
        onClose();
        onSuccess(data.data);
      },
      onError: (error: unknown) => {
        let errorMessage = "Booking failed. Please try again.";

        if (error && typeof error === "object" && "response" in error) {
          const response = error.response as { data?: { message?: string } };
          errorMessage = response?.data?.message || errorMessage;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        onError(errorMessage);
      },
    });
  };

  const handleClose = () => {
    if (!isPending) {
      form.reset();
      onClose();
    }
  };

  // Calculate total nights and price
  const checkIn = searchParams.checkIn ? new Date(searchParams.checkIn) : null;
  const checkOut = searchParams.checkOut
    ? new Date(searchParams.checkOut)
    : null;
  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
        )
      : 0;
  const totalPrice = nights * room.pricePerNight;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book {room.name}</DialogTitle>
          <DialogDescription>
            Please provide your details to complete the booking.
          </DialogDescription>
        </DialogHeader>

        {/* Booking Summary */}
        <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Check-in:</span>
              <span className="font-medium">{searchParams.checkIn}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Check-out:</span>
              <span className="font-medium">{searchParams.checkOut}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Guests:</span>
              <span className="font-medium">{searchParams.guests}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Nights:</span>
              <span className="font-medium">{nights}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Spinner className="mr-2 h-4 w-4" />}
                {isPending ? "Booking..." : "Confirm Booking"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default BookingModal;
