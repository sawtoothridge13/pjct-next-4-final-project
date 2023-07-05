import './globals.scss';
import styles from './page.module.scss';

export const metadata = {
  title: `TripTracker | Home`,
  description:
    'Home page for TripTracker an all-in one site to view and track travel journeys.',
};

export default function Home() {
  return (
    <main className={styles.contentWrapper}>
      <section className={styles.heroArea}>
        <div>
          <h1 className={styles.h1}>Trip Tracker</h1>
          <br />
          <h3 className={styles.h3}>
            All of your adventures.
            <br /> All of your memories.
            <br /> All in one place.
          </h3>
        </div>
      </section>
      <div className={styles.divider} />
    </main>
  );
}
