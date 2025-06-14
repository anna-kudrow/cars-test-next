"use client";
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { DEFAULT_SORTING_OPTION, SortingOptions } from '../lib/const';
import { ArrowDownWideNarrow, X } from 'lucide-react';

function SortingPicker() {

  const [sortingOption, setSortingOption] = useState(DEFAULT_SORTING_OPTION)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='p-3 border-2 border-blue-100 rounded-[8px] flex items-center gap-3 cursor-pointer justify-between w-[261px]'>
      <ArrowDownWideNarrow size={16} className='text-gray-400' /><div className='text-gray-400'>{sortingOption}</div>
      <X onClick={() => {setSortingOption(DEFAULT_SORTING_OPTION)}} /></DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.values(SortingOptions).map((option) => (  <DropdownMenuItem onClick={() => {setSortingOption(option)}}>{option}</DropdownMenuItem>))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortingPicker;
