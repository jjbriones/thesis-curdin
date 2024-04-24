import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();
	const {
		title,
		description,
		imageSrc,
		category,
		roomCount,
		bathroomCount,
		location,
		price,
	} = body;

	Object.keys(body).forEach((value: any) => {
		if (!body[value]) {
			NextResponse.error();
		}
	});

	const listing = await prisma.listing.create({
		data: {
			title,
			description,
			imageSrc,
			category,
			roomCount,
			bathroomCount,
			locationValue: location.value,
			price: parseInt(price, 10),
			userId: currentUser.id,
			area: 0,
			floorCount: 0,
			cityLocation: '',
			barangayLocation: '',
			carport: 0,
			yard: 0,
		},
	});

	return NextResponse.json(listing);
}
