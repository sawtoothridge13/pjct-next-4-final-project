import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  getJournalById,
  getJournalsBySessionToken,
  updateJournalById,
} from '../../../../database/journals';
import { getValidSessionByToken } from '../../../../database/sessions';
import { Journal } from '../../../../migrations/1687939503-createJournalsTable';

export type Error = {
  error: string;
};

type JournalsResponseBodyGet = { journals: Journal[] } | Error;

// const journalSchema = z.object({
//   name: z.string(),
//   userId: z.number(),
// });

export async function GET(): Promise<NextResponse<JournalsResponseBodyGet>> {
  // 1. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) {
    return NextResponse.json(
      {
        error: 'session token is not valid',
      },
      { status: 401 },
    );
  }
  // query the database to get all the journals only if a valid session token is passed
  const journals = await getJournalsBySessionToken(sessionTokenCookie.value);

  return NextResponse.json({ journals });
}

export async function PUT(request: NextRequest): Promise<NextResponse<any>> {
  try {
    // Get the session token from cookies
    const sessionTokenCookie = cookies().get('sessionToken');

    const session =
      sessionTokenCookie &&
      (await getValidSessionByToken(sessionTokenCookie.value));

    if (!session) {
      return NextResponse.json(
        {
          error: 'session token is not valid',
        },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { id, name } = body;
    const journalId = Number(id);

    // Update the journal based on the provided journalId
    await updateJournalById(journalId, name);
    const updatedJournal = await getJournalById(journalId);
    if (!updatedJournal) {
      // If the journal is not found, return an error response
      return NextResponse.json(
        { error: 'Journal information not found' },
        { status: 404 },
      );
    }

    // return a success response with the updated journal data
    return NextResponse.json(
      { journal: updatedJournal, message: 'Journal updated successfully' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating journal' },
      { status: 400 },
    );
  }
}
