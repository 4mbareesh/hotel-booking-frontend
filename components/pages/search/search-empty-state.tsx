import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PAGES } from "@/lib/constants";

type Props = {
  searchParams: {
    guests: string | null;
    checkIn: string | null;
    checkOut: string | null;
  };
};

function SearchEmptyState({ searchParams }: Props) {
  const { guests, checkIn, checkOut } = searchParams;

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <div className="space-y-6">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <SearchIcon className="h-10 w-10 text-muted-foreground" />
        </div>

        {/* Title and Description */}
        <div className="space-y-3">
          <h2 className="font-semibold text-2xl">No Rooms Available</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>
              Sorry, we couldn't find any available rooms matching your search
              criteria.
            </p>
            {guests && checkIn && checkOut && (
              <p className="text-sm">
                Search: {guests} guest{guests === "1" ? "" : "s"} • {checkIn} to{" "}
                {checkOut}
              </p>
            )}
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-4">
          <div className="space-y-2 text-muted-foreground text-sm">
            <p className="font-medium">Try adjusting your search:</p>
            <ul className="space-y-1">
              <li>• Change your check-in or check-out dates</li>
              <li>• Reduce the number of guests</li>
              <li>• Look for rooms at a different time</li>
            </ul>
          </div>

          {/* Back to Home Button */}
          <Link href={PAGES.HOME}>
            <Button size="lg" className="w-full">
              Search Again
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchEmptyState;
