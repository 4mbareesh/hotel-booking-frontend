import { cn } from "@/lib/utils";
import ScrollToTop from "./scroll-to-top";

function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-background", className)}>
      <div className="container mx-auto flex items-center justify-between">
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
