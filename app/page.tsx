import PageLayout from "@/components/common/page-layout";
import FeaturesSection from "@/components/pages/home/features-section";
import LandingSection from "@/components/pages/home/landing-section";

export default function Home() {
  return (
    <PageLayout className="h-full p-0">
      <LandingSection />
      <FeaturesSection />
    </PageLayout>
  );
}
