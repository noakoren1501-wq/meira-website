import { Container } from "@/components/shared/Container";
import { Skeleton } from "@/components/shared/Skeleton";

export default function ProductLoading() {
  return (
    <Container className="py-16 sm:py-24">
      <Skeleton className="mb-8 h-4 w-64" />
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Skeleton className="aspect-square w-full rounded-2xl sm:aspect-[4/5]" />
        <div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-3 h-9 w-3/4" />
          <Skeleton className="mt-4 h-7 w-32" />
          <Skeleton className="mt-8 h-16 w-full" />
          <Skeleton className="mt-8 h-24 w-full" />
          <Skeleton className="mt-10 h-14 w-full max-w-xs rounded-full" />
        </div>
      </div>
    </Container>
  );
}
