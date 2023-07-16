import { cache } from 'react';
import { Trip } from '../migrations/1687932835-createTripsTable';
import { sql } from './connect';

// functions to query database tables

export const getTrips = cache(async () => {
  const trips = await sql<Trip[]>`
    SELECT * FROM trips
 `;

  return trips;
});

export const createTrip = cache(
  async (name: string, userId: number, isPrivate: boolean) => {
    const [trip] = await sql<Trip[]>`
      INSERT INTO trips
        (name, user_id, is_private)
      VALUES
        (${name}, ${userId}, ${isPrivate})
      RETURNING *
    `;
    console.log(trip);
    return trip;
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
  return trip;
});

export const updateTripById = cache(
  async (
    id: number,
    name: string,
    userId: number,
    isPrivate: boolean | null,
  ) => {
    const [trip] = await sql<Trip[]>`
      UPDATE trips
      SET
        name = ${name},
        user_id = ${userId},
        is_private = ${isPrivate}
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
//   const tripJournals = await sql<TripJournals[]>`
//    SELECT
//      trips.id AS trip_id,
//      trips.name AS trip_name,
//      trips.user_id AS trip_user_id,
//      trips.is_private AS trip_as_private,
//      journals.id AS journal_id,
//      journals.title AS journal_title,
//      journals.date AS journal_date,
//      journals.entry AS journal_entry
//     FROM
//      trips
//     INNER JOIN
//     trip_journals ON trips.id = trip_journals.trip_id
//     INNER JOIN
//     journals ON journals.id = trip_journals.journal_id
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
//   trips.is_private AS trip_is_private,
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
//   trips.first_name, trips.type, trips.accessory, trips.id;
//   `;
//   return trip;
// });
