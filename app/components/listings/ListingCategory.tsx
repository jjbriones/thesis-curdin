'use client';

import React from 'react';
import {IconType} from 'react-icons';

interface ListingCategoryProps {
    icon: IconType;
    label: string;
    description: string;
    estimatedPrice: {
        value: string | number;
        discount: number;
        minRange: number;
        maxRange: number;
    };
}

const ListingCategory: React.FC<ListingCategoryProps> = ({icon: Icon, label, description, estimatedPrice,}) => {
    return (
        <div className="flex justify-between">
            <div className="flex flex-col gap-6">
                <div className="flex flex-row items-center gap-4">
                    <Icon size={40} className="text-neutral-600"/>
                    <div className="flex flex-col gap-1">
                        <div className="text-xl font-semibold">
                            {label}
                            {estimatedPrice.discount > 0 && (
                                <span className={'ml-1 leading-normal'}>
                                    (
                                    <span className="font-normal text-green-500 dark:text-green-400">
                                        {estimatedPrice.discount}% off
                                    </span>
                                    )
                                </span>
                            )}
                        </div>
                        <div className="text-neutral-500 font-light">{description}</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="font-semibold text-lg">Estimated Price Range</div>
                <div className="flex items-center">
                    <p className="text-neutral-500">
                        ₱{estimatedPrice.minRange.toFixed(2)} million - ₱{estimatedPrice.maxRange.toFixed(2)} million
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ListingCategory;
