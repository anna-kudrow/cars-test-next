import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Product, ProductMeta } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchProducts({
  queryKey,
}: { queryKey: [string, { page?: number; sort?: "asc" | "desc" }] }): Promise<{
  data: Product[];
  meta: ProductMeta;
}> {
  const [, { page = 1, sort = undefined } = {}] = queryKey;

  const searchParams = new URLSearchParams();
  searchParams.set("_limit", "12");
  searchParams.set("_page", String(page));

  if (sort) {
    searchParams.set("_sort", "price");
    searchParams.set("_order", sort);
  }

  const res = await fetch(`/api/cars?${searchParams.toString()}`);
  const json = await res.json();
  return { data: json.data, meta: json.meta };
}
