import { Sql } from 'postgres';

export type Map = {
  id: number;
  journalId: number;
  url: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE maps (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      journal_id integer NOT NULL,
      url varchar(300) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE maps
  `;
}
