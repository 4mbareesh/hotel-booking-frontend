"use client";

import { AlertCircleIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
  onRetry: () => void;
};

function BookingErrorModal({ isOpen, onClose, errorMessage, onRetry }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircleIcon className="h-8 w-8 text-red-600" />
          </div>
          <DialogTitle className="text-xl">Booking Failed</DialogTitle>
          <DialogDescription>
            We're sorry, but there was an issue processing your booking.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Error Message */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="text-red-800 text-sm">
              <strong>Error:</strong> {errorMessage}
            </div>
          </div>

          {/* Common Issues */}
          <div className="space-y-2">
            <div className="font-medium text-sm">This might be due to:</div>
            <ul className="space-y-1 text-muted-foreground text-sm">
              <li>• The room is no longer available</li>
              <li>• Network connection issues</li>
              <li>• Invalid booking information</li>
              <li>• Server maintenance</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          <Button onClick={onRetry} className="w-full sm:w-auto">
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookingErrorModal;
