import { AlertCircleIcon, RefreshCwIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PAGES } from "@/lib/constants";

function SearchError() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <div className="space-y-6">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircleIcon className="h-10 w-10 text-destructive" />
        </div>

        {/* Title and Description */}
        <div className="space-y-3">
          <h2 className="font-semibold text-2xl">Something Went Wrong</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>We're having trouble loading the search results right now.</p>
            <p className="text-sm">
              Please check your internet connection and try again.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={handleRetry}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Try Again
          </Button>

          <Link href={PAGES.HOME}>
            <Button className="w-full sm:w-auto">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchError;
