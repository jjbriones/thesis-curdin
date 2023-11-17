import { Listing, User } from '@prisma/client';

export type SafeListing = Omit<
    Listing,
    'createdAt' | 'updatedAt' | 'emailVerified'
> & {
    createdAt: string;
    estimatedPrice?: number;
};

export type SafeUser = Omit<
    User,
    'createdAt' | 'updatedAt' | 'emailVerified'
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

export type Feature = {
    AreaSQM: number;
    Floors: number;
    Bedrooms: number;
    Bathrooms: number;
    Yard: number;
    Carport: number;
};

export type ModelType = 'Ridge' | 'Lasso' | 'ElasticNet' | 'Linear';
