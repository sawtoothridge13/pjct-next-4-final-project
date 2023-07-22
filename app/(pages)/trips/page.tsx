import Link from 'next/link';
import { getTrips } from '../../../database/trips';
import TripsForm from '../../components/TripsForm';

export const metadata = {
  title: 'Trips page',
  description: 'My Trips',
};

export default async function TripsPage() {
  const trips = await getTrips();

  return (
    <main>
      <div>
        <TripsForm trips={trips} />
      </div>
    </main>
  );
}
