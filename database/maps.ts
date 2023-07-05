import { cache } from 'react';
import { MapLocation } from '../migrations/1687939518-createMapLocations';
import { sql } from './connect';

// functions to query database tables

export const getMaps = cache(async () => {
  const maps = await sql<MapLocation[]>`
    SELECT * FROM map_locations
 `;

  return maps;
});

export const createMap = cache(
  async (journalId: number, lat: string, long: number) => {
    const [map] = await sql<MapLocation[]>`
      INSERT INTO map_locations
        (journal_id, lat, long)
      VALUES
        (${journalId}, ${lat}, ${long})
      RETURNING *
    `;

    return map;
  },
);

export const getMapById = cache(async (id: number) => {
  const [map] = await sql<MapLocation[]>`
    SELECT
      *
    FROM
      map_locations
    WHERE
      id = ${id}
  `;
  return map;
});

export const updateMapById = cache(
  async (id: number, journalId: number, lat: string, long: string) => {
    const [map] = await sql<MapLocation[]>`
      UPDATE map_locations
      SET
        journal_id = ${journalId},
        lat = ${lat},
        long = ${long}
      WHERE
        id = ${id}
        RETURNING *
    `;

    return map;
  },
);
