import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTrips } from '../../../database/trips';
import { getUserByUsername } from '../../../database/users';
import styles from './page.module.scss';

type Props = {
  params: {
    username: string;
    tripId: number;
    journalId: number;
  };
  option: { value: string; label: string };
};

export default async function ProfileUsernamePage({ params }: Props) {
  const user = await getUserByUsername(params.username);
  const trips = await getTrips();

  if (!user) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div>
        These are my trips
        {trips.map((trip) => (
          <div key={`trip-div-${trip.id}`}>
            <Link href={`/trips/${trip.id}`}>{trip.name}</Link>
            <br />
          </div>
        ))}
      </div>
    </main>
  );
}
