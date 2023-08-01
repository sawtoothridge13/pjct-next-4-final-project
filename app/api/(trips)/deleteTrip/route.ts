import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getValidSessionByToken } from '../../../../database/sessions';
import { deleteTripById } from '../../../../database/trips';

export async function DELETE(request: NextRequest): Promise<NextResponse<any>> {
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
    const { id } = body;
    const tripId = Number(id);

    // Delete the trip based on the provided tripId
    await deleteTripById(tripId);
    // return a success response
    return NextResponse.json(
      { message: 'Trip deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting trip' }, { status: 400 });
  }
}
