'use client';

import React from 'react';
import { IconType } from 'react-icons';

interface ListingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
  estimatedPrice: {
    value: string | number;
    minRange: number;
    maxRange: number;
  };
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon,
  label,
  description,
  estimatedPrice,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-4">
          <Icon size={40} className="text-neutral-600" />
          <div className="flex flex-col gap-1">
            <div className="text-xl font-semibold">{label}</div>
            <div className="text-neutral-500 font-light">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
