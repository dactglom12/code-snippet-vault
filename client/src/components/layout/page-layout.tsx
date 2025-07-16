import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Action = {
  element: ReactNode;
};

type Meta = {
  title: string;
  description: string;
  actions?: Action[];
};

type PageLayoutProps = {
  className?: string;
  children: React.ReactNode;
} & Meta;

export function PageLayout({
  title,
  description,
  actions,
  className,
  children,
}: PageLayoutProps) {
  return (
    <section className={cn("space-y-6", className)}>
      <header className="space-y-1.5">
        <div className="flex">
          <h1 className="text-2xl font-bold leading-tight tracking-tight">
            {title}
          </h1>
          {actions && (
            <div className="ml-4">
              {actions.map((action) => action.element)}
            </div>
          )}
        </div>

        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </header>
      <div>{children}</div>
    </section>
  );
}
