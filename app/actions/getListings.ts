import prisma from '@/app/libs/prismadb';
import getEstimatedPrice from './getEstimatedPrice';
import { Feature } from '../types';

export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        const features: Feature[] = listings.map((listing: {
            area: number; floorCount: number; roomCount: number; bathroomCount: number; carport: number; yard: number;
        }) => ({
            'AreaSQM': listing.area,
            'Floors': listing.floorCount,
            'Bedrooms': listing.roomCount,
            'Bathrooms': listing.bathroomCount,
            'Yard': listing.yard,
            'Carport': listing.carport
        }));

        const estimatedPrice: [] = await getEstimatedPrice('Lasso', features);

        return listings.map((listing: { createdAt: { toISOString: () => any; }; }) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            estimatedPrice: estimatedPrice.shift(),
        }));
    } catch (error: any) {
        throw new Error(error);
    }
}
