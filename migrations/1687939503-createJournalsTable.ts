import { Sql } from 'postgres';

export type Journal = {
  id: number;
  tripId: number;
  title: string;
  date: number | null;
  entry: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE journals (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      trip_id integer NOT NULL,
      title varchar(80) NOT NULL,
      date integer NULL,
      entry text NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE journals
  `;
}
