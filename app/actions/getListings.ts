import prisma from '@/app/libs/prismadb';
import getEstimatedPrice from './getEstimatedPrice';
import { Feature } from '../types';

export interface IListingsParams {
  userId?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
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

    return listings.map(
      (listing: { createdAt: { toISOString: () => any } }) => ({
        ...listing,
        createdAt: listing.createdAt.toISOString(),
        estimatedPrice: estimatedPrice.shift(),
      })
    );
  } catch (error: any) {
    throw new Error(error);
  }
}
