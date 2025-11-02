"use client";

import { AlertTriangleIcon } from "lucide-react";
import { toast } from "sonner";
import { useDeleteRoom } from "@/apis/rooms";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import type { iROOM_TYPE } from "@/types/room";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  room: iROOM_TYPE;
};

function DeleteRoomModal({ isOpen, onClose, room }: Props) {
  const { mutate: deleteRoom, isPending } = useDeleteRoom();

  const handleDelete = () => {
    deleteRoom(room._id, {
      onSuccess: () => {
        toast.success(`"${room.name}" has been deleted successfully!`);
        onClose();
      },
      onError: (error: unknown) => {
        const errorMessage = getErrorMessage(error);
        toast.error(`Failed to delete room: ${errorMessage}`);
      },
    });
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangleIcon className="h-8 w-8 text-red-600" />
          </div>
          <DialogTitle className="text-center">Delete Room Type</DialogTitle>
          <DialogDescription className="text-center">
            This action cannot be undone. Are you sure you want to delete this
            room type?
          </DialogDescription>
        </DialogHeader>

        {/* Room Details */}
        <div className="space-y-4">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="space-y-2">
              <div className="font-medium text-red-900">{room.name}</div>
              <div className="text-red-800 text-sm">{room.description}</div>
              <div className="flex justify-between text-red-700 text-sm">
                <span>
                  Occupancy: {room.maxOccupancy} guest
                  {room.maxOccupancy === 1 ? "" : "s"}
                </span>
                <span>Price: ₹{room.pricePerNight.toLocaleString()}/night</span>
              </div>
              <div className="text-red-700 text-sm">
                Total Rooms: {room.totalQuantity}
              </div>
            </div>
          </div>

          <div className="space-y-2 text-muted-foreground text-sm">
            <p className="font-medium">This will permanently delete:</p>
            <ul className="space-y-1 pl-4">
              <li>• The room type configuration</li>
              <li>• All associated data and settings</li>
              <li>• Any future booking availability</li>
            </ul>
            <p className="pt-2 font-medium text-orange-600">
              ⚠️ Existing bookings for this room type will not be affected.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {isPending && <Spinner className="mr-2 h-4 w-4" />}
            {isPending ? "Deleting..." : "Delete Room Type"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteRoomModal;
