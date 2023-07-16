import { cache } from 'react';
import { Map } from '../migrations/1687939518-createMapsTable';
import { sql } from './connect';

// functions to query database tables

export const getMaps = cache(async () => {
  const maps = await sql<Map[]>`
    SELECT * FROM maps
 `;

  return maps;
});

export const createMap = cache(async (journalId: number, url: string) => {
  const [map] = await sql<Map[]>`
      INSERT INTO maps
        (journal_id, url)
      VALUES
        (${journalId}, ${url})
      RETURNING *
    `;

  return map;
});

export const getMapById = cache(async (id: number) => {
  const [map] = await sql<Map[]>`
    SELECT
      *
    FROM
      maps
    WHERE
      id = ${id}
  `;
  return map;
});

export const updateMapById = cache(
  async (id: number, journalId: number, url: string) => {
    const [map] = await sql<Map[]>`
      UPDATE maps
      SET
        journal_id = ${journalId},
        url = ${url}
      WHERE
        id = ${id}
        RETURNING *
    `;

    return map;
  },
);
