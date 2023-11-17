import EmptyState from '../components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import FavoritesClient from './FavoritesClient';

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <>
        <EmptyState
          title="No liked properties"
          subtitle="You have no liked properties. Try liking some properties"
        />
      </>
    );
  }

  return (
    <div>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </div>
  );
};

export default ListingPage;
