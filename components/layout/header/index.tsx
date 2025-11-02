import { cn } from "@/lib/utils";
import { ToggleTheme } from "./toggle-theme";

function Header({ className }: { className?: string }) {
  return (
    <header className={cn("container mx-auto bg-background", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-lg">Hotel Booking System</h1>
        </div>
        <ToggleTheme />
      </div>
    </header>
  );
}

export default Header;
