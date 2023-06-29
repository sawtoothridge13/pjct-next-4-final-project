import { Sql } from 'postgres';

export type MapLocation = {
  id: number;
  journalId: number;
  name: string;
  lat: number;
  long: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE map_locations (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      journal_id integer NOT NULL,
      name varchar(80) NULL,
      lat integer NOT NULL,
      long integer NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE map_locations
  `;
}
