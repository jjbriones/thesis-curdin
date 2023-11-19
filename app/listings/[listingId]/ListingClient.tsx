'use client';

import Container from '@/app/components/Container';
import { categories } from '@/app/components/Navbar/Categories';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import { SafeListing, SafeUser } from '@/app/types';

import { useMemo } from 'react';

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
            key={listing.id}
            city={listing.cityLocation}
            barangay={listing.barangayLocation}
          />
          <div className="grid grid-cols-1 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              price={listing.price}
              area={listing.area}
              carport={listing.carport}
              yard={listing.yard}
              estimatedPrice={listing.estimatedPrice}
              floorCount={listing.floorCount}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
