import prisma from '@/app/libs/prismadb';
import { list } from 'postcss';

export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        const features = listings.map((listing) => ({
            AreaSQM: listing.area,
            Floors: listing.floorCount,
            Bedrooms: listing.roomCount,
            Bathrooms: listing.bathroomCount,
            Carport: listing.carport,
            Yard: listing.yard
        }));

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model: 'Ridge', features: features }),
        };

        // const estimatedPrice = await fetch('http://127.0.0.1:8080/api/estimate', options);

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}
