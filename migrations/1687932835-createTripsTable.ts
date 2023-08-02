import { Sql } from 'postgres';

export type Trip = {
  id?: number;
  name: string;
  userId?: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE trips (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(80) NOT NULL UNIQUE,
      user_id integer NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE trips
  `;
}
