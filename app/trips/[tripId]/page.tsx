import Link from 'next/link';
import { getTrips } from '../../../database/trips';

export const metadata = {
  title: 'Trips page',
  description: 'My Trips',
};

export default async function TripsPage() {
  const trips = await getTrips();

  return (
    <main>
      This are my trips
      {trips.map((trip) => {
        return (
          <div key={`trip-div-${trip.id}`}>
            <Link href={`/trips/${trip.id}`}>{trip.name}</Link>
            <br />
          </div>
        );
      })}
    </main>
  );
}
