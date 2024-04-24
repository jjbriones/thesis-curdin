import getCurrentUser from './actions/getCurrentUser';
import getListings, { IListingsParams } from './actions/getListings';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import ListingCard from './components/listings/ListingCard';
import { SafeListing } from './types';

interface HomeProps {
	searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
	const listings = await getListings(searchParams);
	const currentUser = await getCurrentUser();

	if (listings.length === 0) {
		return (
			<div>
				<EmptyState showReset />
			</div>
		);
	}

	return (
		<Container>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{listings.map((listing: SafeListing) => {
					return (
						<>
							<ListingCard
								currentUser={currentUser}
								key={listing.id}
								data={listing}
							/>
							<div>{listing.title}</div>
						</>
					);
				})}
			</div>
		</Container>
	);
};

export default Home;
