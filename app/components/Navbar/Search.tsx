'use client';

import useAddPropertyModal from '@/app/hooks/useAddPropertyModal';
import useSearchModal from '@/app/hooks/useSearchModal';

const Search = () => {
  const addPropertyModal = useAddPropertyModal();
  const searchModal = useSearchModal();

  return (
    <div className="border-[1px] w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer ">
      <div className="flex flex-row items-center justify-between ">
        <div
          className="text-sm font-semibold px-6 border-x-[1px] flex-1 w-full"
          onClick={searchModal.open}
        >
          Buy
        </div>

        <div className="text-sm px-6 flex flex-row items-center gap-3">
          <div
            className="text-sm font-semibold sm:block"
            onClick={addPropertyModal.open}
          >
            Sell
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
