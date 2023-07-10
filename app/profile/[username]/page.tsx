import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTrips } from '../../../database/trips';
import { getUserByUsername } from '../../../database/users';
import DropDownMenu from '../../components/DropDownMenu';
import styles from './page.module.scss';

type Props = {
  params: {
    username: string;
    tripId: number;
    journalId: number;
  };
};

export default async function ProfileUsernamePage({ params }: Props) {
  const user = await getUserByUsername(params.username);
  const trips = await getTrips();

  const options = trips.map((trip) => ({
    value: trip.id.toString(),
    label: trip.name,
  }));

  if (!user) {
    notFound();
  }

  return (
    <main className={styles.heroArea}>
      <section className={styles.section}>
        <div>
          <DropDownMenu options={options} />
        </div>
      </section>
      <div>
        These are my trips
        {trips.map((trip) => (
          <div key={`trip-div-${trip.id}`}>
            <Link href={`/trips/${trip.id}`}>{trip.name}</Link>
            <br />
          </div>
        ))}
      </div>
      <section>
        <h2 className={styles.h2}>Journal</h2>
      </section>
      <section>
        <h2 className={styles.h2}>Media Gallery</h2>
      </section>
      <section>
        <h2 className={styles.h2}>Map</h2>
      </section>

      <div>
        <div>id: {user.id} </div>
        <div>username: {user.username}</div>
        <br />
      </div>
    </main>
  );
}
