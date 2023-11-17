'use client';

import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';

interface ListingCategoryProps {
    icon: IconType;
    label: string;
    description: string;
    estimatedPrice?: number;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
    icon: Icon,
    label,
    description,
    estimatedPrice
}) => {
    const [price, setPrice] = useState({
        value: '',
        discount: 0.0
    });

    useEffect(() => {
        if (estimatedPrice === undefined) return;

        if (label.includes('Luxury')) {
            setPrice({
                value: (estimatedPrice * 0.8).toFixed(2),
                discount: 20
            });
        }
        else if (label.includes('Standard')) {
            setPrice({
                value: (estimatedPrice * 0.75).toFixed(2),
                discount: 35
            });
        }
        else {
            setPrice({
                value: estimatedPrice.toFixed(2),
                discount: 0
            });
        }

    }, [label]);

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
            <div className="flex items-center">
                <p className="text-neutral-500">P{price.value} million</p>
                {price.discount > 0 && (
                    <p className="flex items-center ml-1">
                        (<span className='text-green-500'>-{price.discount}%</span>)
                    </p>
                )}
            </div>
        </div>
    );
};

export default ListingCategory;
