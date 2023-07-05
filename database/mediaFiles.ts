import { cache } from 'react';
import { MediaFile } from '../migrations/1687939537-createMediaFiles';
import { sql } from './connect';

// functions to query database tables

export const getMediaFiles = cache(async () => {
  const mediaFiles = await sql<MediaFile[]>`
    SELECT * FROM media_files
 `;

  return mediaFiles;
});

export const createMediaFile = cache(async (journalId: number, url: string) => {
  const [mediaFile] = await sql<MediaFile[]>`
      INSERT INTO media_files
        (journal_id, url)
      VALUES
        (${journalId}, ${url})
      RETURNING *
    `;

  return mediaFile;
});

export const getMediaFileById = cache(async (id: number) => {
  const [mediaFile] = await sql<MediaFile[]>`
    SELECT
      *
    FROM
      media_files
    WHERE
      id = ${id}
  `;
  return mediaFile;
});

export const updateMediaFileById = cache(
  async (id: number, journalId: number, url: string) => {
    const [mediaFile] = await sql<MediaFile[]>`
      UPDATE media_files
      SET
        journal_id = ${journalId},
        url = ${url}
      WHERE
        id = ${id}
        RETURNING *
    `;

    return mediaFile;
  },
);
