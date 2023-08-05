import styles from './ContactPage.module.scss';

export const metadata = {
  title: `TripTracker | Login`,
  description: 'User contact page',
};
export default function ContactPage() {
  return (
    <div className={styles.heroArea}>
      {' '}
      <main className={styles.main}>
        <h1 className={styles.h1}>Contact</h1>
        <h2 className={styles.h2}>tel: 1-800-555-5555</h2>
        <h2 className={styles.h2}>e-mail: office@triptracker.com</h2>
      </main>
    </div>
  );
}
