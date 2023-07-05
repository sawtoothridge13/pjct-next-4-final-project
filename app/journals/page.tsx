import Link from 'next/link';
import { getJournals } from '../../database/journals';

export const metadata = {
  title: 'Journals page',
  description: 'My Journal',
};

export default async function JournalsPage() {
  const journals = await getJournals();
  console.log(journals);

  return (
    <main>
      This are my journals
      {journals.map((journal) => {
        return (
          <div key={`journal-div-${journal.id}`}>
            <Link href={`/journals/${journal.id}`}>{journal.title}</Link>
            <br />
          </div>
        );
      })}
    </main>
  );
}
