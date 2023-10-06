import { cache } from 'react';
import { sql } from './connect';

export type Journal = {
  id: number;
  tripId: number;
  title: string;
  date: number | null;
  entry: string;
};
export const getJournals = cache(async () => {
  const journals = await sql<
    { id: number; tripId: number; title: string; date: number; entry: string }[]
  >`
    SELECT * FROM journals
 `;

  return journals;
});

export const createJournal = cache(async (entry: string) => {
  const [journal] = await sql<
    { id: number; tripId: number; title: string; date: number; entry: string }[]
  >`
      INSERT INTO journals
        ( entry)
      VALUES
        ( ${entry})
      RETURNING *
    `;

  return journal;
});

export const getJournalById = cache(async (id: number) => {
  const [journal] = await sql<
    { id: number; tripId: number; title: string; date: number; entry: string }[]
  >`
    SELECT
      *
    FROM
      journals
    WHERE
      id = ${id}
  `;
  console.log(journal);
  return journal;
});

export const updateJournalById = cache(async (id: number, entry: string) => {
  const [journal] = await sql<
    { id: number; tripId: number; title: string; date: number; entry: string }[]
  >`
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
    const [journal] = await sql<
      {
        id: number;
        tripId: number;
        title: string;
        date: number;
        entry: string;
      }[]
    >`
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
