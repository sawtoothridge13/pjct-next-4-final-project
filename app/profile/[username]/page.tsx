import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getTrips } from '../../../database/trips';
import { getUserByUsername } from '../../../database/users';
import TripsForm from '../../components/TripsForm';
// import { getValidSessionByToken } from '../../../../database/sessions';
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
  redirect('/trips/1');
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
      <TripsForm trips={trips} />
    </main>
  );
}

// // 1. Check if the sessionToken cookie exit
// const sessionTokenCookie = cookies().get('sessionToken');

// // 2. check if the sessionToken has a valid session

// const session =
//   sessionTokenCookie &&
//   (await getValidSessionByToken(sessionTokenCookie.value));

// // 3. Either redirect or render the login form
// if (!session) redirect('/login?returnTo=/trips-admin');

// const trips = await getTrips();
