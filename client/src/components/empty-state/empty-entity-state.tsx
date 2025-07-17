import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  message: string;
  action: ReactNode;
  icon: ReactNode;
};

export function EmptyEntityState({
  action,
  icon,
  message,
  title,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 text-muted-foreground space-y-4">
      {icon}
      <p className="text-lg">{title}</p>
      <p className="text-sm">{message}</p>
      {action}
    </div>
  );
}
