import prisma from '@/app/libs/prismadb';
import getEstimatedPrice from './getEstimatedPrice';
import { Feature } from '../types';

export interface IListingsParams {
    userId?: string;
    roomCount?: number;
    bathroomCount?: number;
    area?: number;
    floorCount?: number;
    carport?: number;
    yard?: number;
    category?: string;
    locationValue?: string;
}

export default async function getListings(params: IListingsParams) {
    try {
        const {
            userId,
            roomCount,
            bathroomCount,
            area,
            floorCount,
            carport,
            yard,
            category,
            locationValue,
        } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount,
            };
        }
        if (floorCount) {
            query.floorCount = {
                gte: +floorCount,
            };
        }
        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount,
            };
        }
        if (carport) {
            query.carport = {
                gte: +carport,
            };
        }
        if (yard) {
            query.yard = {
                gte: +yard,
            };
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (area) {
            query.area = {
                gte: +area,
            };
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc',
            },
        });

        const features: Feature[] = listings.map(
            (listing: {
                area: number;
                floorCount: number;
                roomCount: number;
                bathroomCount: number;
                carport: number;
                yard: number;
            }) => ({
                AreaSQM: listing.area,
                Floors: listing.floorCount,
                Bedrooms: listing.roomCount,
                Bathrooms: listing.bathroomCount,
                Yard: listing.yard,
                Carport: listing.carport,
            })
        );

        const estimatedPrice: [] = await getEstimatedPrice('Linear', features);

        return listings.map((listing: { createdAt: { toISOString: () => any } }) => {
            const price = (estimatedPrice instanceof Array) ? estimatedPrice.shift() : estimatedPrice;

            return {
                ...listing,
                createdAt: listing.createdAt.toISOString(),
                estimatedPrice: price,
            };
        });
    } catch (error: any) {
        throw new Error(error);
    }
}
