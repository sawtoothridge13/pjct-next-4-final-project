import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
};

export async function up(sql: Sql) {
  await sql`
CREATE TABLE users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username varchar(80) NOT NULL,
  password_hash varchar (200) NOT NULL
)
  `;
}
export async function down(sql: Sql) {
  await sql`
DROP TABLE users
  `;
}
