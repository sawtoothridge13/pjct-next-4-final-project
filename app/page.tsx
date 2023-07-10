import './globals.scss';
import styles from './page.module.scss';

export const metadata = {
  title: `TripTracker | Home`,
  description:
    'Home page for TripTracker an all-in one site to view and track travel journeys.',
};

export default function Home() {
  return (
    <main>
      <div className={styles.heroArea}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.h1}>Trip Tracker</h1>
          <br />
          <h2 className={styles.h2}>
            All of your adventures.
            <br /> All of your memories.
            <br /> All in one place.
          </h2>
        </div>
      </div>
    </main>
  );
}
