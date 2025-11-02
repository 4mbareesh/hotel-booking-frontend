import { cn } from "@/lib/utils";
import ScrollToTop from "./scroll-to-top";

function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("container mx-auto bg-background", className)}>
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm">
          © {new Date().getFullYear()} Hotel Booking System. All rights
          reserved.
        </p>
        <ScrollToTop />
      </div>
    </footer>
  );
}

export default Footer;
