"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import ProductCard from "../components/custom/productCard";
import SortingPicker from "../components/custom/sortingPicker";
import type { Product, ProductMeta } from "../lib/types";

async function fetchProducts({
  queryKey,
}: { queryKey: [string, { page?: number; sort?: "asc" | "desc" }] }): Promise<{
  data: Product[];
  meta: ProductMeta;
}> {
  const [, { page = 1, sort = undefined } = {}] = queryKey;

  const searchParams = new URLSearchParams({
    _limit: "12",
    _page: String(page),
  });

  if (sort) {
    searchParams.append("_sort", "price");
    searchParams.append("_order", sort);
  }

  const res = await fetch(`/api/cars?${searchParams}`);
  const json = await res.json();
  return { data: json.data, meta: json.meta };
}

export default function Home() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const sort = (searchParams.get("sort") as "asc" | "desc") || undefined;

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", { page, sort }],
    queryFn: fetchProducts,
  });

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>{`Sorry, an error ${(error as Error).message} occured...`}</p>
      </div>
    );
  }

  const createPageHref = (targetPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(targetPage));
    if (sort) params.set("sort", sort);
    return `?${params.toString()}`;
  };

  const totalPages = data?.meta.last_page || 1;
  const currentPage = data?.meta.page || 1;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-blue-50 p-4">
      <div className="w-full rounded-xl bg-white p-4 shadow-md">
        <SortingPicker />
      </div>
      {isLoading && (
        <div className="flex min-h-screen items-center justify-center">
          <p>Loading...</p>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        {data?.data.map((product) => (
          <ProductCard key={product.unique_id} product={product} />
        ))}
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={page > 1 ? createPageHref(page - 1) : "#"}
                disabled={page <= 1}
              />
            </PaginationItem>
            {currentPage > 2 && (
              <>
                <PaginationItem>
                  <PaginationLink href={createPageHref(1)}>1</PaginationLink>
                </PaginationItem>
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </>
            )}
            {Array.from({ length: 3 }, (_, i) => {
              const pageNum = currentPage - 1 + i;
              if (pageNum < 1 || pageNum > totalPages) return null;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href={createPageHref(pageNum)}
                    isActive={page === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            {currentPage < totalPages - 1 && (
              <>
                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink href={createPageHref(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                href={page < totalPages ? createPageHref(page + 1) : "#"}
                disabled={page >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}
