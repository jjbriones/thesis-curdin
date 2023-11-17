import prisma from '@/app/libs/prismadb';

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

    const features = listings.map((listing) => ({
      AreaSQM: listing.area,
      Floors: listing.floorCount,
      Bedrooms: listing.roomCount,
      Bathrooms: listing.bathroomCount,
      Carport: listing.carport,
      Yard: listing.yard,
    }));

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: 'Ridge', features: features }),
    };

    // TODO: to be fixed, DO NOT UNCOMMENT
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
