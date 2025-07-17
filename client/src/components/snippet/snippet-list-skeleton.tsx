import { Skeleton } from "../ui/skeleton";

export function SnippetListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-24 w-1/2" />
        </div>
      ))}
    </div>
  );
}
