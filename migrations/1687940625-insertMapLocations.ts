import { Sql } from 'postgres';

export const mapLocations = [
  { id: 1, journalId: 1, lat: '10.777197', long: '106.705338' },
  { id: 2, journalId: 2, lat: '47.0258708', long: '8.6086668' },
  { id: 3, journalId: 3, lat: '48.2207959', long: '16.2152542' },
];

export async function up(sql: Sql) {
  for (const mapLocation of mapLocations) {
    await sql`
    INSERT INTO map_locations
      (journal_id, lat, long)
    VALUES
      (${mapLocation.journalId}, ${mapLocation.lat}, ${mapLocation.long})
  `;
  }
}

export async function down(sql: Sql) {
  for (const mapLocation of mapLocations) {
    await sql`
      DELETE FROM map_locations WHERE id = ${mapLocation.id}
  `;
  }
}
