import { Sql } from 'postgres';

export const mediaFiles = [
  {
    id: 1,
    journalId: 1,
    url: 'https://res.cloudinary.com/djy3fdeij/image/upload/v1688124808/triptracker/Vietnam/IMG_0202_z3hjts.jpg',
  },
  {
    id: 2,
    journalId: 2,
    url: 'https://res.cloudinary.com/djy3fdeij/image/upload/v1688124771/triptracker/Schwyz/15220427-A63D-41FA-8B34-916D68C46798_1_106_c_hddhzf.jpg',
  },
  {
    id: 3,
    journalId: 3,
    url: 'https://res.cloudinary.com/djy3fdeij/image/upload/v1688124808/triptracker/Vietnam/IMG_0202_z3hjts.jpg',
  },
];

export async function up(sql: Sql) {
  for (const mediaFile of mediaFiles) {
    await sql`
    INSERT INTO media_files
      (journal_id, url)
    VALUES
      (${mediaFile.journalId}, ${mediaFile.url})
  `;
  }
}

export async function down(sql: Sql) {
  for (const mediaFile of mediaFiles) {
    await sql`
      DELETE FROM media_files WHERE id = ${mediaFile.id}
  `;
  }
}
