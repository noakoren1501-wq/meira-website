import { Container } from "@/components/shared/Container";
import { Skeleton } from "@/components/shared/Skeleton";
import { CategoryCardSkeleton } from "@/components/catalog/CategoryCardSkeleton";

export default function CategoriesLoading() {
  return (
    <Container className="py-16 sm:py-24">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-3 h-9 w-48" />
      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    </Container>
  );
}
