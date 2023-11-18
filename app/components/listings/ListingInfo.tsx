'use client';

import { SafeUser } from '@/app/types';
import { IconType } from 'react-icons';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

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
  yard: boolean;
  estimatedPrice?: number;
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
}) => {
  const [predictedPrice, setPredictedPrice] = useState({
    value: estimatedPrice?.toFixed(2) ?? 0,
    discount: 0.0,
  });

  useEffect(() => {
    if (estimatedPrice === undefined) return;

    if (category?.label.includes('Elegant')) {
      setPredictedPrice({
        value: (estimatedPrice * 0.8).toFixed(2),
        discount: 20,
      });
    } else if (category?.label.includes('Standard')) {
      setPredictedPrice({
        value: (estimatedPrice * 0.7).toFixed(2),
        discount: 35,
      });
    } else {
      setPredictedPrice({
        value: estimatedPrice.toFixed(2),
        discount: 0,
      });
    }
  }, [category?.label]);
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold flex flex-row items-center gap-2">
            Property of {user?.name} | ₱ {price}
          </div>
          <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
            <div>{area} SQM</div>
            <div>{roomCount} Bedrooms</div>
            <div>{bathroomCount} Bathrooms</div>
            <div>{carport} Cars</div>
            <div>{yard ? 'Has' : 'No'} Yard</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-lg">Estimated Price</p>
          <p className="font-light text-neutral-500">
            ₱ {predictedPrice.value} million
          </p>
        </div>
      </div>

      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
          estimatedPrice={estimatedPrice}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={[0, 0]} />
    </div>
  );
};

export default ListingInfo;
