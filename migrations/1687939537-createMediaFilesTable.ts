import { Sql } from 'postgres';

export type MediaFile = {
  id: number;
  journalId: number;
  url: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE media_files (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      journal_id integer NOT NULL,
      url varchar(200) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE media_files
  `;
}
