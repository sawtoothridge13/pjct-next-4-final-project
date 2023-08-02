import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJournalById } from '../../../database/journals';
import { getMapById } from '../../../database/maps';
import { getMediaFileById } from '../../../database/mediaFiles';
import { getTripById, getTrips } from '../../../database/trips';
import DropDownMenu from '../../components/DropDownMenu';
import MapBoxComponent from '../../components/MapBoxComponent';
import styles from './TripStyles.module.scss';

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

export default async function TripPage({ params }: Props) {
  const trips = await getTrips();
  const singleTrip = await getTripById(Number(params.tripId));
  const singleJournal = await getJournalById(Number(params.tripId));
  const singleMap = await getMapById(Number(params.tripId));
  const singleMediaFile = await getMediaFileById(Number(params.tripId));
  const options = trips.map((trip) => ({
    value: trip.id.toString(),
    label: trip.name,
  }));

  if (!singleTrip || !singleJournal || !singleMap || !singleMediaFile) {
    notFound();
  }
  return (
    <main className={styles.main}>
      <div className={styles.contentWrapper}>
        <DropDownMenu options={options} />
        <div>
          <Link className={styles.manageLink} href="/trips">
            manage trips
          </Link>
        </div>
        <br />
        <section className={styles.topSection}>
          <h1 className={styles.tripName}>
            {singleTrip.name}
            <br />
          </h1>
        </section>
        <section className={styles.middleSection}>
          <div className={styles.journalContainer}>
            <form className={styles.form}>
              <h2 className={styles.journalTitle}>{singleJournal.title}</h2>

              <textarea
                className={styles.textarea}
                defaultValue={singleJournal.entry}
              />
              <div>
                <button className={styles.button}>update</button>
              </div>
            </form>
          </div>
          <div className={styles.imageContainer}>
            <h2 className={styles.h2}>Media Gallery</h2>
            <img
              className={styles.singleImage}
              src={singleMediaFile.url}
              alt="Media File"
            />
            <form className={styles.uploadForm} action="/action_page.php">
              <input
                className={styles.button}
                type="file"
                id="myFile"
                name="filename"
              />
              <input type="submit" />
            </form>
          </div>
        </section>
        <div className={styles.map}>
          <MapBoxComponent />
        </div>
      </div>
    </main>
  );
}
