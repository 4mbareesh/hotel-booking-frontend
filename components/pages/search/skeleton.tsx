import { Skeleton } from "@/components/ui/skeleton";

function SearchPageSkeleton() {
  const skeletons = Array.from({ length: 6 }, (_, i) => ({
    id: `skeleton-${i}`,
  }));

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skeletons.map((skeleton) => (
          <div key={skeleton.id} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPageSkeleton;
