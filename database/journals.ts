import { cache } from 'react';
import { Journal } from '../migrations/1687939503-createJournalsTable';
import { sql } from './connect';

// functions to query database tables

export const getJournals = cache(async () => {
  const journals = await sql<Journal[]>`
    SELECT * FROM journals
 `;

  return journals;
});

export const createJournal = cache(
  async (tripId: number, title: string, date: number, entry: string) => {
    const [journal] = await sql<Journal[]>`
      INSERT INTO journals
        (trip_id, title, date, entry)
      VALUES
        (${tripId}, ${title}, ${date}, ${entry})
      RETURNING *
    `;

    return journal;
  },
);

export const getJournalById = cache(async (id: number) => {
  const [journal] = await sql<Journal[]>`
    SELECT
      *
    FROM
      journals
    WHERE
      id = ${id}
  `;
  return journal;
});

export const updateJournalById = cache(
  async (
    id: number,
    tripId: number,
    title: string,
    date: number,
    entry: string,
  ) => {
    const [journal] = await sql<Journal[]>`
      UPDATE journals
      SET
        trip_id = ${tripId},
        title = ${title},
        date = ${date},
        entry = ${entry}
      WHERE
        id = ${id}
        RETURNING *
    `;

    return journal;
  },
);

export const updateJournalEntryById = cache(
  async (id: number, tripId: number, entry: string) => {
    const [journal] = await sql<Journal[]>`
      UPDATE journals
      SET
        trip_id = ${tripId},
        entry = ${entry}
      WHERE
        id = ${id}
        RETURNING *
    `;

    return journal;
  },
);
