"use client";

import { BedIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useGetRooms } from "@/apis/rooms";
import { useUpdateRoomAvailability } from "@/apis/rooms/update-availability";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import type { iROOM_TYPE } from "@/types/room";
import { DeleteRoomModal, RoomFormModal } from ".";

function AdminRoomsContent() {
  const { data: rooms, isLoading, error } = useGetRooms();
  const { mutate, isPending } = useUpdateRoomAvailability();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<iROOM_TYPE | null>(null);
  const [deletingRoom, setDeletingRoom] = useState<iROOM_TYPE | null>(null);

  const handleAddRoom = () => {
    setEditingRoom(null);
    setIsFormModalOpen(true);
  };

  const handleEditRoom = (room: iROOM_TYPE) => {
    setEditingRoom(room);
    setIsFormModalOpen(true);
  };

  const handleDeleteRoom = (room: iROOM_TYPE) => {
    setDeletingRoom(room);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsFormModalOpen(false);
    setIsDeleteModalOpen(false);
    setEditingRoom(null);
    setDeletingRoom(null);
  };

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 font-semibold text-lg">Error Loading Rooms</h2>
          <p className="text-muted-foreground">
            There was an error loading the room data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-0">
        <div>
          <h1 className="font-semibold text-3xl">Room Management</h1>
          <p className="text-muted-foreground">
            Manage your hotel room types and configurations
          </p>
        </div>
        <Button onClick={handleAddRoom} className="ms-auto">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Room Type
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          <div className="rounded-lg border">
            <div className="border-b px-6 py-4">
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {Array.from({ length: 5 }, (_, i) => ({
                  id: `skeleton-${i}`,
                })).map((skeleton) => (
                  <div
                    key={skeleton.id}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      {!isLoading && rooms && (
        <div className="hidden rounded-lg border md:block">
          <div className="border-b px-6 py-4">
            <h2 className="font-semibold text-lg">
              Room Types ({rooms.count})
            </h2>
          </div>

          {rooms?.data?.length === 0 ? (
            <div className="flex min-h-[200px] items-center justify-center">
              <div className="text-center">
                <BedIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 font-medium">No Room Types</h3>
                <p className="mb-4 text-muted-foreground text-sm">
                  Get started by adding your first room type.
                </p>
                <Button onClick={handleAddRoom}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Room Type
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">
                      Room Type
                    </th>
                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">
                      Description
                    </th>
                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">
                      Occupancy
                    </th>
                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">
                      Price/Night
                    </th>
                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">
                      Quantity
                    </th>
                    <th className="h-12 px-6 text-right align-middle font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rooms?.data.map((room) => (
                    <tr
                      key={room._id}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <td className="h-16 px-6 align-middle">
                        <div className="font-medium">{room.name}</div>
                      </td>
                      <td className="h-16 px-6 align-middle">
                        <div className="max-w-[200px] truncate text-muted-foreground text-sm">
                          {room.description}
                        </div>
                      </td>
                      <td className="h-16 px-6 align-middle">
                        <div className="text-sm">
                          {room.maxOccupancy} guest
                          {room.maxOccupancy === 1 ? "" : "s"}
                        </div>
                      </td>
                      <td className="h-16 px-6 align-middle">
                        <div className="font-medium">
                          ₹{room.pricePerNight.toLocaleString()}
                        </div>
                      </td>
                      <td className="h-16 px-6 align-middle">
                        <div className="text-sm">
                          {room.totalQuantity} room
                          {room.totalQuantity === 1 ? "" : "s"}
                        </div>
                      </td>
                      <td className="h-16 px-6 text-right align-middle">
                        <div className="flex items-center justify-end gap-2">
                          <Switch
                            checked={room.isActive}
                            onCheckedChange={(checked) =>
                              mutate({ roomId: room._id, isActive: !!checked })
                            }
                            disabled={isPending}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditRoom(room)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteRoom(room)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Mobile Card View */}
      {!isLoading && rooms && (
        <div className="space-y-4 md:hidden">
          <h2 className="font-semibold text-lg">Room Types ({rooms?.count})</h2>

          {rooms.count === 0 ? (
            <div className="flex min-h-[200px] items-center justify-center rounded-lg border">
              <div className="text-center">
                <BedIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 font-medium">No Room Types</h3>
                <p className="mb-4 text-muted-foreground text-sm">
                  Get started by adding your first room type.
                </p>
                <Button onClick={handleAddRoom}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Room Type
                </Button>
              </div>
            </div>
          ) : (
            rooms?.data.map((room) => (
              <div key={room._id} className="rounded-lg border bg-card p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{room.name}</h3>
                      <p className="line-clamp-2 text-muted-foreground text-sm">
                        {room.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditRoom(room)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteRoom(room)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Occupancy</div>
                      <div>
                        {room.maxOccupancy} guest
                        {room.maxOccupancy === 1 ? "" : "s"}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Price/Night</div>
                      <div className="font-medium">
                        ₹{room.pricePerNight.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Quantity</div>
                      <div>
                        {room.totalQuantity} room
                        {room.totalQuantity === 1 ? "" : "s"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modals */}
      <RoomFormModal
        isOpen={isFormModalOpen}
        onClose={closeModals}
        room={editingRoom}
      />

      {deletingRoom && (
        <DeleteRoomModal
          isOpen={isDeleteModalOpen}
          onClose={closeModals}
          room={deletingRoom}
        />
      )}
    </div>
  );
}

export default AdminRoomsContent;
