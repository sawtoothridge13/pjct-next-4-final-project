import { notFound } from 'next/navigation';
import { getJournalById } from '../../../database/journals';

export const metadata = {
  title: `TripTracker | Journal`,
  description: 'Journal for trip',
};
type Props = {
  params: {
    tripId: number;
    journalId: number;
  };
};

export default async function JournalPage(props: Props) {
  const singleJournal = await getJournalById(Number(props.params.journalId));
  if (!singleJournal) {
    notFound();
  }

  return (
    <main>
      <h1>{singleJournal.title}</h1>
      <h2>{singleJournal.entry}</h2>
    </main>
  );
}
