import { BedIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { iROOM_CARD } from "@/types/room";

type Props = {
  room: iROOM_CARD;
  searchParams: {
    guests: string | null;
    checkIn: string | null;
    checkOut: string | null;
  };
};

function RoomCard({ room, searchParams }: Props) {
  const handleBookNow = () => {
    // TODO: Navigate to booking form with room and search params
    console.log("Book room:", room._id, "with params:", searchParams);
  };

  return (
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
  );
}

export default RoomCard;
