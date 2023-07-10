import Link from 'next/link';
import { getTrips } from '../../database/trips';
import DropDownMenu from '../components/DropDownMenu';
import styles from '../components/DropDownMenu.module.scss';

export const metadata = {
  title: 'Trips page',
  description: 'My Trips',
};

export default async function TripsPage() {
  const trips = await getTrips();
  const options = trips.map((trip) => ({
    value: trip.id.toString(),
    label: trip.name,
  }));
  return (
    <main>
      <section className={styles.section}></section>
    </main>
  );
}
