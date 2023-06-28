import { cache } from 'react';
import { Trip } from '../migrations/1687932835-createTrips';
import { sql } from './connect';

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

    return trip;
  },
);
