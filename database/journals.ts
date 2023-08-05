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

export const createJournal = cache(async (entry: string) => {
  const [journal] = await sql<Journal[]>`
      INSERT INTO journals
        ( entry)
      VALUES
        ( ${entry})
      RETURNING *
    `;

  return journal;
});

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

export const updateJournalById = cache(async (id: number, entry: string) => {
  const [journal] = await sql<Journal[]>`
      UPDATE journals
      SET
        entry = ${entry}
      WHERE
        id = ${id}
        RETURNING *
    `;

  return journal;
});

export const updateJournalEntryById = cache(
  async (id: number, entry: string) => {
    const [journal] = await sql<Journal[]>`
      UPDATE journals
        SET
        entry = ${entry}
      WHERE
        id = ${id}
        RETURNING *
    `;

    return journal;
  },
);

export const getJournalsBySessionToken = cache(async (token: string) => {
  const journals = await sql<
    { id: number; tripId: number; title: string; date: number; entry: string }[]
  >`
      SELECT
        journals.*
      FROM
        journals
      INNER JOIN
        sessions ON (
          sessions.token = ${token} AND
          sessions.expiry_timestamp > now() AND
          sessions.user_id = journals.trip_id
        )

      INNER JOIN
      users ON (
      users.id = journals.trip_id AND
      sessions.user_id = users.id
      )
    `;
  return journals;
});
