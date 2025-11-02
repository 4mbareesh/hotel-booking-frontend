"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateRoom, useUpdateRoom } from "@/apis/rooms";
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
import { Textarea } from "@/components/ui/textarea";
import type { iROOM_TYPE } from "@/types/room";

const formSchema = z.object({
  name: z.string().min(1, { message: "Room name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  maxOccupancy: z.number().min(1, { message: "Occupancy must be at least 1." }),
  pricePerNight: z
    .number()
    .min(1, { message: "Price must be greater than 0." }),
  totalQuantity: z.number().min(1, { message: "Quantity must be at least 1." }),
});

type Props = {
  isOpen: boolean;
  onClose: () => void;
  room?: iROOM_TYPE | null;
};

function RoomFormModal({ isOpen, onClose, room }: Props) {
  const isEditing = !!room;
  const { mutate: createRoom, isPending: isCreating } = useCreateRoom();
  const { mutate: updateRoom, isPending: isUpdating } = useUpdateRoom();
  const isPending = isCreating || isUpdating;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      maxOccupancy: 1,
      pricePerNight: 1000,
      totalQuantity: 1,
    },
  });

  // Reset form when modal opens/closes or room changes
  useEffect(() => {
    if (isOpen) {
      if (room) {
        form.reset({
          name: room.name,
          description: room.description,
          maxOccupancy: room.maxOccupancy,
          pricePerNight: room.pricePerNight,
          totalQuantity: room.totalQuantity,
        });
      } else {
        form.reset({
          name: "",
          description: "",
          maxOccupancy: 1,
          pricePerNight: 1000,
          totalQuantity: 1,
        });
      }
    }
  }, [isOpen, room, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isEditing && room) {
      updateRoom(
        { id: room._id, data: values },
        {
          onSuccess: () => {
            toast.success("Room type updated successfully!");
            onClose();
          },
          onError: (error: unknown) => {
            const errorMessage = getErrorMessage(error);
            toast.error(`Failed to update room: ${errorMessage}`);
          },
        },
      );
    } else {
      createRoom(values, {
        onSuccess: () => {
          toast.success("Room type created successfully!");
          onClose();
        },
        onError: (error: unknown) => {
          const errorMessage = getErrorMessage(error);
          toast.error(`Failed to create room: ${errorMessage}`);
        },
      });
    }
  };

  const getErrorMessage = (error: unknown): string => {
    if (error && typeof error === "object" && "response" in error) {
      const response = error.response as { data?: { message?: string } };
      return response?.data?.message || "An error occurred";
    }
    if (error instanceof Error) {
      return error.message;
    }
    return "An unexpected error occurred";
  };

  const handleClose = () => {
    if (!isPending) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Room Type" : "Add New Room Type"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the room type details below."
              : "Fill in the details to create a new room type."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Deluxe Room"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the room features and amenities..."
                      disabled={isPending}
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="maxOccupancy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Occupancy *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="2"
                        disabled={isPending}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 1)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pricePerNight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price/Night (₹) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="3000"
                        disabled={isPending}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 1000)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Rooms *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="10"
                        disabled={isPending}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 1)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                {isPending
                  ? isEditing
                    ? "Updating..."
                    : "Creating..."
                  : isEditing
                    ? "Update Room"
                    : "Create Room"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default RoomFormModal;
