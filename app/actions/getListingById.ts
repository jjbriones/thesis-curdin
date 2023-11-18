import prisma from '@/app/libs/prismadb';
import { Feature } from '../types';
import getEstimatedPrice from './getEstimatedPrice';

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    const features: Feature = {
      AreaSQM: listing.area,
      Floors: listing.floorCount,
      Bedrooms: listing.roomCount,
      Bathrooms: listing.bathroomCount,
      Yard: listing.yard,
      Carport: listing.carport,
    };

    const estimatedPrice = await getEstimatedPrice('Linear', features);

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
      estimatedPrice: estimatedPrice,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
