import { Sql } from 'postgres';

export const trips = [
  { id: 1, name: 'Vietnam', userId: 1, isPrivate: null },
  { id: 2, name: 'Schwyz', userId: 2, isPrivate: null },
  { id: 3, name: 'Vienna', userId: 3, isPrivate: null },
  { id: 4, name: 'Wyoming', userId: 4, isPrivate: null },
  { id: 5, name: 'Spain', userId: 5, isPrivate: null },
];

export async function up(sql: Sql) {
  for (const trip of trips) {
    await sql`
    INSERT INTO trips
      (name, user_id, is_private)
    VALUES
      (${trip.name}, ${trip.userId}, ${trip.isPrivate})
  `;
  }
}

export async function down(sql: Sql) {
  for (const trip of trips) {
    await sql`
      DELETE FROM trips WHERE id = ${trip.id}
  `;
  }
}
