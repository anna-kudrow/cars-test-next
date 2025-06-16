"use client";
import { ArrowDownWideNarrow, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { DEFAULT_SORTING_OPTION, SortingOptions } from "../../lib/const";

import { useRouter, useSearchParams } from "next/navigation";

function SortingPicker() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort");

  const sortingOption =
    currentSort === "asc"
      ? SortingOptions.ASC
      : currentSort === "desc"
        ? SortingOptions.DESC
        : DEFAULT_SORTING_OPTION;

  const handleSelect = (option: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (option === SortingOptions.ASC) {
      newParams.set("sort", "asc");
    } else if (option === SortingOptions.DESC) {
      newParams.set("sort", "desc");
    }
    newParams.set("page", "1");

    router.push(`?${newParams.toString()}`);
  };

  const handleReset = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("sort");
    newParams.set("page", "1");
    router.push(`?${newParams.toString()}`);
  };

  return (
    <DropdownMenu>
      <div className="relative w-fit">
        {" "}
        <DropdownMenuTrigger className="flex w-[300px] cursor-pointer items-center justify-between gap-3 rounded-[8px] border-2 border-blue-100 p-3">
          <ArrowDownWideNarrow size={16} className="text-gray-400" />
          <div className="text-gray-400">{sortingOption}</div>
          <div className="w-6" />
        </DropdownMenuTrigger>
        {currentSort && (
          <button
            type="button"
            className="-translate-y-1/2 absolute top-1/2 right-3"
            onClick={handleReset}
          >
            <X />
          </button>
        )}
      </div>
      <DropdownMenuContent>
        {Object.values(SortingOptions).map((option) => (
          <DropdownMenuItem key={option} onClick={() => handleSelect(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortingPicker;
