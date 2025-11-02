import { Suspense } from "react";
import PageLayout from "@/components/common/page-layout";
import { SearchResults } from "@/components/pages/search";
import SearchPageSkeleton from "@/components/pages/search/skeleton";

export default function SearchPage() {
  return (
    <PageLayout>
      <div className="container mx-auto">
        <Suspense fallback={<SearchPageSkeleton />}>
          <SearchResults />
        </Suspense>
      </div>
    </PageLayout>
  );
}
