import { Container } from "@/components/shared/Container";
import { Skeleton } from "@/components/shared/Skeleton";
import { ProductCardSkeleton } from "@/components/catalog/ProductCardSkeleton";

export default function CategoryLoading() {
  return (
    <Container className="py-16 sm:py-24">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-3 h-9 w-56" />
      <Skeleton className="mt-4 h-4 w-72" />
      <div className="mt-14">
        <Skeleton className="h-12 w-full max-w-xs rounded-full" />
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </Container>
  );
}
