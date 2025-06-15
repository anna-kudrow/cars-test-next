"use client";
import { useQuery } from "@tanstack/react-query";
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
import type { Product } from "../lib/types";
import { useSearchParams } from 'next/navigation';

async function fetchProducts({
  queryKey,
}: { queryKey: [string, { page?: number; sort?: "asc" | "desc" }] }): Promise<{
  data: Product[];
  meta: any;
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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-blue-50 p-4">
      <div className="w-full rounded-xl bg-white p-4 shadow-md">
        <SortingPicker />
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {data?.data.map((product) => (
          <ProductCard key={product.unique_id} product={product} />
        ))}
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">22</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}
