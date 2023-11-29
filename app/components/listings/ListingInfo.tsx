'use client';

import { SafeUser } from '@/app/types';
import { IconType } from 'react-icons';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';
import { RiMessengerLine } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';

const Map = dynamic(() => import('../Map'), { ssr: false });

interface ListingInfoProps {
  user: SafeUser;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;

  description: string;
  roomCount: number;
  bathroomCount: number;
  locationValue: string;
  price: number;
  area: number;
  carport: number;
  yard: number;
  estimatedPrice?: number;
  floorCount: number;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  bathroomCount,
  locationValue,
  price,
  area,
  carport,
  yard,
  estimatedPrice,
  floorCount,
}) => {
  const [predictedPrice, setPredictedPrice] = useState({
    value: estimatedPrice?.toFixed(2) ?? 0,
    discount: 0.0,
    minRange: 0,
    maxRange: 0,
  });

  useEffect(() => {
    if (estimatedPrice === undefined) return;

    if (category?.label.includes('Elegant')) {
      setPredictedPrice({
        value: (estimatedPrice * 0.8).toFixed(2),
        discount: 20,
        minRange: estimatedPrice * 0.8 * 0.955,
        maxRange: estimatedPrice * 0.8 * 1.045,
      });
    } else if (category?.label.includes('Standard')) {
      setPredictedPrice({
        value: (estimatedPrice * 0.7).toFixed(2),
        discount: 30,
        minRange: estimatedPrice * 0.7 * 0.955,
        maxRange: estimatedPrice * 0.7 * 1.045,
      });
    } else {
      setPredictedPrice({
        value: estimatedPrice.toFixed(2),
        discount: 0,
        minRange: estimatedPrice * 0.955,
        maxRange: estimatedPrice * 1.045,
      });
    }
  }, [category?.label, estimatedPrice]);

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold flex flex-row items-center gap-2">
            Property of {user?.name} | ₱ {price}
          </div>
          <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
            <div>{area} SQM</div>
            <div>{floorCount} floors</div>
            <div>{roomCount} Bedrooms</div>
            <div>{bathroomCount} Bathrooms</div>
            <div>{carport} Cars</div>
            <div>{yard ? 'Has a' : 'No'} Yard</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-lg">Estimated Price</p>
          <p className="font-light text-neutral-500">
            ₱{predictedPrice.minRange.toFixed(2)} million - ₱
            {predictedPrice.maxRange.toFixed(2)} million
          </p>
        </div>
      </div>

      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
          estimatedPrice={predictedPrice}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <div>
        <p className="font-semibold text-lg">Socials</p>
        <div className="mt-8 flex gap-2 items-center">
          <RiMessengerLine size={26} />
          <AiOutlineInstagram size={36} />
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
