import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

function PageLayout({ className, children }: Props) {
  return (
    <main className={cn("flex-1 bg-background p-4", className)}>
      {children}
    </main>
  );
}

export default PageLayout;
