import { notFound } from 'next/navigation';
import { getJournalById } from '../../../database/journals';
import { getMapById } from '../../../database/maps';
import { getMediaFileById } from '../../../database/mediaFiles';
import { getTripById } from '../../../database/trips';
import DropDownMenu from '../../components/DropDownMenu';
import MapComponent from '../../components/MapComponent';
import styles from './styles.module.scss';

export const metadata = {
  title: 'Trip Page',
  description: 'My Trip',
};

type Props = {
  params: {
    tripId: number;
    journalId: number;
    title: string;
    date: number;
    entry: string;
  };
};

export default async function TripPage(props: Props) {
  const singleTrip = await getTripById(Number(props.params.tripId));
  const singleJournal = await getJournalById(Number(props.params.tripId));
  const singleMap = await getMapById(Number(props.params.tripId));
  const singleMediaFile = await getMediaFileById(Number(props.params.tripId));

  if (!singleTrip || !singleJournal || !singleMap || !singleMediaFile) {
    notFound();
  }
  console.log(singleJournal);
  return (
    <main className={styles.main}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.tripName}>{singleTrip.name}</h1>

        <section className={styles.section}>
          <div className={styles.journalContainer}>
            <form className={styles.form}>
              <h2 className={styles.journalTitle}>{singleJournal.title}</h2>
              <textarea className={styles.textarea}>
                {singleJournal.entry}
              </textarea>
              <div>
                <button className={styles.button}>update</button>
              </div>
            </form>
          </div>
          <img
            className={`${styles.imageContainer} ${styles.singleImage}`}
            src={singleMediaFile.url}
            alt="Media File"
          />
        </section>
        <div className={styles.map}>
          <MapComponent />
        </div>
      </div>
    </main>
  );
}
