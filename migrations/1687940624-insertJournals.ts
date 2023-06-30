import { Sql } from 'postgres';

export const journals = [
  {
    id: 1,
    tripId: 1,
    title: 'My Vietnam Journal',
    date: 1688113656,
    entry: 'Today, we ate breakfast and walked around Saigon.',
  },
  {
    id: 2,
    tripId: 2,
    title: 'My Schwyz Journal',
    date: 1688113656,
    entry: 'In Schwyz today to eat chocolate.',
  },
  {
    id: 3,
    tripId: 3,
    title: 'My Vienna Journal',
    date: 1688113656,
    entry: 'Schnitzel was the theme of today.',
  },
];

export async function up(sql: Sql) {
  for (const journal of journals) {
    await sql`
    INSERT INTO journals
      (trip_id, title, date, entry)
    VALUES
      (${journal.tripId}, ${journal.title}, ${journal.date}, ${journal.entry})
  `;
  }
}
export async function down(sql: Sql) {
  for (const journal of journals) {
    await sql`
      DELETE FROM journals WHERE id = ${journal.id}
  `;
  }
}
