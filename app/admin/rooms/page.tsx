import PageLayout from "@/components/common/page-layout";
import { AdminRoomsContent } from "@/components/pages/admin/rooms";

export default function AdminRoomsPage() {
  return (
    <PageLayout>
      <div className="container mx-auto">
        <AdminRoomsContent />
      </div>
    </PageLayout>
  );
}
