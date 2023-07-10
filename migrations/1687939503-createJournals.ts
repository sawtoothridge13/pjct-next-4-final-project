import { Sql } from 'postgres';

export type Journal = {
  id: number;
  tripId: number;
  title: string;
  date: number;
  entry: string;
};

export type TripJournals = {
  tripId: number;
  tripName: string;
  tripUserId: number;
  tripIsPrivate: boolean;
  journalId: number;
  journalTripId: number;
  journalTitle: string;
  journalDate: number;
  journalEntry: string;
};

type JsonAgg = {
  id: number;
};

export type TripJournalsInJsonAgg = {
  tripId: number;
  tripName: string;
  tripUserId: number;
  tripIsPrivate: boolean;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE journals (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      trip_id integer NOT NULL,
      title varchar(80) NOT NULL,
      date integer ,
      entry text NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE journals
  `;
}
