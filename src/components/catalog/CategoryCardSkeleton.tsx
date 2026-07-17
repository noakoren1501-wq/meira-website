import { Skeleton } from "@/components/shared/Skeleton";

export function CategoryCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
      <div className="mt-5 flex items-baseline justify-between">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}
