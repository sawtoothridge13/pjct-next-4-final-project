import { Sql } from 'postgres';

export type MapLocation = {
  id: number;
  journalId: number;
  lat: string;
  long: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE map_locations (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      journal_id integer NOT NULL,
      lat varchar(30) NOT NULL,
      long varchar(30) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE map_locations
  `;
}
