import styles from './AboutPage.module.scss';

export const metadata = {
  title: `TripTracker | About`,
  description: 'User trips dashboard',
};
export default function AboutPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>About Trip Tracker</h1>
      <h2 className={styles.h2}>
        {' '}
        Trip Tracker is a convenient web app that allows users to effortlessly
        view and organize all their trips, journals, maps, and photos in one
        place. With a user-friendly interface, it's easy to navigate through
        past trips, search by date or location, and relive cherished memories.
        Users can also create personal travel diaries with the journal feature
        and visualize their routes with integrated mapping services.
        Additionally, Trip Tracker serves as a virtual photo album, where users
        can upload, organize, and share their travel photos. It's the perfect
        tool for travel enthusiasts to keep their memories organized and inspire
        future adventures.
      </h2>
    </main>
  );
}
