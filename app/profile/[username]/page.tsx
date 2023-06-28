import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/users';
import styles from './page.module.scss';

type Props = {
  params: { username: string };
};

export default async function ProfileUsernamePage({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <main>
      <section className={styles.heroArea}>
        <h1 className={styles.h1}>My Trips</h1>
        <br />
        <h2 className={styles.h2}>Journal</h2>
        <h2 className={styles.h2}>Media Gallery</h2>
        <h2 className={styles.h2}>Map</h2>
        <div>
          <div>id: {user.id}</div>
          <div>username: {user.username}</div>
          <br />
        </div>
      </section>
    </main>
  );
}
