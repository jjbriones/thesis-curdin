import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { parse } from 'path';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await request.json();
  const {
    category,
    location,
    cityLocation,
    barangayLocation,
    area,
    floorCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    carport,
    yard,
    description,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      area: parseInt(area, 10),
      floorCount: parseInt(floorCount, 10),
      locationValue: location.value,
      roomCount: parseInt(roomCount, 10),
      bathroomCount: parseInt(bathroomCount, 10),
      price: parseInt(price, 10),
      cityLocation: cityLocation.value,
      barangayLocation: barangayLocation.value,
      carport: parseInt(carport, 10),
      yard,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
