import { cache } from 'react';
import { Trip } from '../migrations/1687932835-createTripsTable';
import { Journal } from '../migrations/1687939503-createJournalsTable';
import { sql } from './connect';

// functions to query database tables

export const getTrips = cache(async () => {
  const trips = await sql<Trip[]>`
    SELECT * FROM trips
 `;
  return trips;
});

export const getTripsWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    const trips = await sql<Trip[]>`
      SELECT
        *
      FROM
        trips
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return trips;
  },
);

export const getTripsWithLimitAndOffsetBySessionToken = cache(
  async (limit: number, offset: number, token: string) => {
    const trips = await sql<Trip[]>`
      SELECT
        trips.*
      FROM
        trips
      INNER JOIN
        sessions ON (
          sessions.token = ${token} AND
          sessions.expiry_timestamp > now()
          -- sessions.user_id = trips.user_id
        )
      -- This would JOIN the users table that is related to trips
      -- INNER JOIN
      -- users ON (
      -- users.id = trips.user_id AND
      -- sessions.user_id = users.id
      -- )
      LIMIT ${limit}
      OFFSET ${offset}
    `;
    return trips;
  },
);

export const getTripById = cache(async (id: number) => {
  const [trip] = await sql<Trip[]>`
    SELECT
      *
    FROM
      trips
    WHERE
      id = ${id}
  `;
  console.log(trip);
  return trip;
});

export const createTrip = cache(async (name: string, userId: number) => {
  const [trip] = await sql<Trip[]>`
      INSERT INTO trips
        (name, user_id)
      VALUES
        (${name}, ${userId})
      RETURNING *
    `;

  return trip;
});

export const updateTripById = cache(
  async (id: number, name: string, userId: number) => {
    const [trip] = await sql<Trip[]>`
      UPDATE trips
      SET
        name = ${name},
        user_id = ${userId}
      WHERE
        id = ${id}
        RETURNING *
    `;

    return trip;
  },
);

export const deleteTripById = cache(async (id: number) => {
  const [trip] = await sql<Trip[]>`
    DELETE FROM
      trips
    WHERE
      id = ${id}
    RETURNING *
  `;
  return trip;
});

// export const getTripsWithJournals = cache(async (id: number) => {
//   const tripJournals = await sql<Journal[]>`
//    SELECT
//      trips.id AS trip_id,
//      trips.name AS trip_name,
//      trips.user_id AS trip_user_id,
//      journals.id AS journal_id,
//      journals.title AS journal_title,
//      journals.date AS journal_date,
//      journals.entry AS journal_entry
//     FROM
//      trips
//     INNER JOIN
//     journals ON trips.id = journals.trip_id
//     WHERE trips.id = ${id}
//   `;
//   console.log(tripJournals);
//   return tripJournals;
// });

// export const getTripsWithJournalsById = cache(async (id: number) => {
//   const [trip] = await sql<TripsWithJournalsInJsonAgg[]>`
// SELECT
//   trips.id AS trip_id,
//   trips.name AS trip_name,
//   trips.user_id AS trip_user_id,
//   (
//     SELECT
//       json_agg(journals.*)
//     FROM
//       journals
//     INNER JOIN
//       journals ON journals.journal_id = journals.id
//     WHERE
//       journals.trip_id = trips.id

//   ) AS journals
// FROM
//   trips
// WHERE
//   trips.id = ${id}
// GROUP BY
//   trips.name, trips.id;
//   `;
//   return trip;
// });
