'use client';

import Image from 'next/image';

import useCountries from '@/app/hooks/useCountries';
import useRegions from '@/app/hooks/useRegions';
import { SafeUser } from '@/app/types';

import Heading from '../Heading';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
  city?: string;
  barangay?: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
  city,
  barangay,
}) => {
  const { getByValue } = useCountries();
  const { getRegionValue } = useRegions();

  const location = getByValue(locationValue);
  const region = getRegionValue(locationValue);

  return (
    <>
      <Heading title={title} />
      <div className="flex flex-row items-center gap-2 justify-start text-neutral-500 text-center text-lg font-light">
        {`${region?.value}`}
        {city && <span> | </span>}
        {city && <span>{city}</span>}
        {barangay && <span> | </span>}
        {barangay && <span>{barangay}</span>}
      </div>
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
