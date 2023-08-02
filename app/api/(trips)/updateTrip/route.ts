import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getValidSessionByToken } from '../../../../database/sessions';
import {
  getTripById,
  getTripsBySessionToken,
  updateTripById,
} from '../../../../database/trips';
import { Trip } from '../../../../migrations/1687932835-createTripsTable';

export type Error = {
  error: string;
};

type TripsResponseBodyGet = { trips: Trip[] } | Error;

// const tripSchema = z.object({
//   name: z.string(),
//   userId: z.number(),
// });

export async function GET(): Promise<NextResponse<TripsResponseBodyGet>> {
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
  // query the database to get all the trips only if a valid session token is passed
  const trips = await getTripsBySessionToken(sessionTokenCookie.value);

  return NextResponse.json({ trips });
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
    const tripId = Number(id);

    // Update the trip based on the provided tripId
    await updateTripById(tripId, name);
    const updatedTrip = await getTripById(tripId);
    if (!updatedTrip) {
      // If the trip is not found, return an error response
      return NextResponse.json(
        { error: 'Trip information not found' },
        { status: 404 },
      );
    }

    // return a success response with the updated trip data
    return NextResponse.json(
      { trip: updatedTrip, message: 'Trip updated successfully' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: 'Error updating trip' }, { status: 400 });
  }
}
