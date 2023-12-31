import { getTrips } from '../../database/trips';
import TripsForm from '../components/TripsForm';
import styles from './Trips.module.scss';

export const metadata = {
  title: 'Trips page',
  description: 'My Trips',
};

export default async function TripsPage() {
  const trips = await getTrips();

  return (
    <main className={styles.main}>
      <div className={styles.div}>
        <TripsForm trips={trips} />
      </div>
    </main>
  );
}
