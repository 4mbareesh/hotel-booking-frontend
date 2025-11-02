"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PAGES } from "@/lib/constants";
import {
  ROOM_CHECKIN_KEY,
  ROOM_CHECKOUT_KEY,
  ROOM_GUESTS_KEY,
} from "@/lib/constants/room";

const formSchema = z.object({
  guests: z.string().min(1, { message: "At least 1 guest is required." }),
  checkIn: z.string().min(1, { message: "Check-in date is required." }),
  checkOut: z.string().min(1, { message: "Check-out date is required." }),
});

function HotelBookingForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guests: "",
      checkIn: "",
      checkOut: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const searchParams = new URLSearchParams({
      [ROOM_GUESTS_KEY.key]: values.guests,
      [ROOM_CHECKIN_KEY.key]: values.checkIn,
      [ROOM_CHECKOUT_KEY.key]: values.checkOut,
    });
    router.push(`${PAGES.SEARCH}?${searchParams.toString()}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Guests</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Number of Guests"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="checkIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check-in Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal"
                    >
                      {field?.value ? field.value : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      className="rounded-lg border"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          // Format date in local timezone to avoid timezone issues
                          const year = date.getFullYear();
                          const month = String(date.getMonth() + 1).padStart(
                            2,
                            "0",
                          );
                          const day = String(date.getDate()).padStart(2, "0");
                          field.onChange(`${year}-${month}-${day}`);
                        } else {
                          field.onChange("");
                        }
                      }}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="checkOut"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check-out Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal"
                    >
                      {field?.value ? field.value : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      className="rounded-lg border"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          // Format date in local timezone to avoid timezone issues
                          const year = date.getFullYear();
                          const month = String(date.getMonth() + 1).padStart(
                            2,
                            "0",
                          );
                          const day = String(date.getDate()).padStart(2, "0");
                          field.onChange(`${year}-${month}-${day}`);
                        } else {
                          field.onChange("");
                        }
                      }}
                      disabled={(date) => {
                        const today = new Date(new Date().setHours(0, 0, 0, 0));
                        const checkInDate = form.getValues("checkIn")
                          ? new Date(form.getValues("checkIn"))
                          : null;

                        // Block past dates
                        if (date < today) return true;

                        // Block dates before check-in date
                        if (checkInDate && date <= checkInDate) return true;

                        return false;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <SearchIcon /> Search
        </Button>
      </form>
    </Form>
  );
}

export default HotelBookingForm;
