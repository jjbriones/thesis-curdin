import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
    listingId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id,
        },
    });

    return NextResponse.json(listing);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const id = params.listingId

    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        area,
        roomCount,
        bathroomCount,
        carport,
        yard,
        price,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const listing = await prisma.listing.update({
        where: {
            id,
        },
        data: {
            title,
            description,
            imageSrc,
            area,
            roomCount,
            bathroomCount,
            carport,
            yard,
            price: parseInt(price, 10),
        },
    });

    return NextResponse.json(listing);
}
