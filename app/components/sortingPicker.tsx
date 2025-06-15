"use client";
import { ArrowDownWideNarrow, X } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { DEFAULT_SORTING_OPTION, SortingOptions } from "../lib/const";

function SortingPicker() {
  const [sortingOption, setSortingOption] = useState(DEFAULT_SORTING_OPTION);

  return (
    <DropdownMenu>
      <div className="relative w-fit">
        {" "}
        <DropdownMenuTrigger className="flex w-[300px] cursor-pointer items-center justify-between gap-3 rounded-[8px] border-2 border-blue-100 p-3">
          <ArrowDownWideNarrow size={16} className="text-gray-400" />
          <div className="text-gray-400">{sortingOption}</div>
          <div className="w-6" />
        </DropdownMenuTrigger>
        <button
          type="button"
          className="-translate-y-1/2 absolute top-1/2 right-3"
          onClick={() => {
            setSortingOption(DEFAULT_SORTING_OPTION);
          }}
        >
          <X />
        </button>
      </div>
      <DropdownMenuContent>
        {Object.values(SortingOptions).map((option) => (
          <DropdownMenuItem
            onClick={() => {
              setSortingOption(option);
            }}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortingPicker;
