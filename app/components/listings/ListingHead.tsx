'use client';

import Image from 'next/image';

import useCountries from '@/app/hooks/useCountries';
import useRegions from '@/app/hooks/useRegions';
import { SafeUser } from '@/app/types';

import Heading from '../Heading';
import HeartButton from '../HeartButton';
import { Button } from 'flowbite-react';
import { MouseEventHandler, useState } from 'react';

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
    city?: string;
    barangay?: string;
    editButtonOnClick?: MouseEventHandler<HTMLButtonElement>;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser,
    city,
    barangay,
    editButtonOnClick,
}) => {
    const { getByValue } = useCountries();
    const { getRegionValue } = useRegions();

    const location = getByValue(locationValue);
    const region = getRegionValue(locationValue);

    return (
        <>
            <div className="flex justify-between items-center">
                <div>
                    <Heading title={title} />
                    <div className="flex flex-row items-center gap-2 justify-start text-neutral-500 text-center text-lg font-light">
                        {`${region?.value}`}
                        {city && <span> | </span>}
                        {city && <span>{city}</span>}
                        {barangay && <span> | </span>}
                        {barangay && <span>{barangay}</span>}
                    </div>
                </div>
                <div>
                    <Button onClick={editButtonOnClick} color='blue' pill>
                        Edit Property
                    </Button>
                </div>
            </div>
            <div className="w-full h-[60vh] overflow-hidden  rounded-xl relative">
                <Image
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                    alt="Image"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    );

};

export default ListingHead;
