import { Sql } from 'postgres';

export const trips = [
  { id: 1, name: 'Vietnam', userId: 1 },
  { id: 2, name: 'Schwyz', userId: 2 },
  { id: 3, name: 'Vienna', userId: 3 },
  { id: 4, name: 'Wyoming', userId: 4 },
  { id: 5, name: 'Spain', userId: 5 },
];

export async function up(sql: Sql) {
  for (const trip of trips) {
    await sql`
    INSERT INTO trips
      (name, user_id)
    VALUES
      (${trip.name}, ${trip.userId})
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
