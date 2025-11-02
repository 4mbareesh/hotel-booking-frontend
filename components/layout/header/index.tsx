import Link from "next/link";
import { PAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ToggleTheme } from "./toggle-theme";

function Header({ className }: { className?: string }) {
  return (
    <header className={cn("border-b bg-background", className)}>
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Link href={PAGES.HOME} className="font-semibold text-lg">
            Bookmystay
          </Link>
        </div>
        <ToggleTheme />
      </div>
    </header>
  );
}

export default Header;
