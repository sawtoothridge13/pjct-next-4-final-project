import { notFound } from 'next/navigation';
import { getJournalById } from '../../../database/journals';
import { getMapById } from '../../../database/maps';
import { getMediaFileById } from '../../../database/mediaFiles';
import { getTripById } from '../../../database/trips';

export const metadata = {
  title: 'Trip Page',
  description: 'My Trip',
};

type Props = {
  params: {
    tripId: number;
    journalId: number;
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
    <main>
      <h1>{singleTrip.name}</h1>
      <h2>{singleJournal.title}</h2>
      <h3>{singleJournal.entry}</h3>
      <h4>
        {singleMap.lat}, {singleMap.long}
      </h4>
      <img src={singleMediaFile.url} alt="Media File" />
    </main>
  );
}
