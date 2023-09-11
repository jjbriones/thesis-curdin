'use client';

import { BiSearch } from 'react-icons/bi';

const Search = () => {
  return (
    <div className="border-[1px] w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer ">
      <div className="flex flex-row items-center justify-between ">
        <div className="text-sm font-semibold px-6 border-x-[1px] flex-1 w-full">
          Buy
        </div>

        <div className="text-sm px-6 flex flex-row items-center gap-3">
          <div className="text-sm font-semibold sm:block ">Sell</div>
        </div>
      </div>
    </div>
  );
};

export default Search;
