import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getValidSessionByToken } from '../../../../database/sessions';
import { createTrip, getTripsBySessionToken } from '../../../../database/trips';

export type Trip = {
  id?: number;
  name: string;
  userId?: number;
};

export type Error = {
  error: string;
};

type TripsResponseBodyGet = { trips: Trip[] } | Error;
type TripsResponseBodyPost = { trip: Trip } | Error;

const tripSchema = z.object({
  name: z.string(),
  // userId: z.number(),
});

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

export async function POST(
  request: NextRequest,
): Promise<NextResponse<TripsResponseBodyPost>> {
  const body = await request.json();
  console.log(body);
  // zod please verify the body matches my schema
  const result = tripSchema.safeParse(body);

  if (!result.success) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }

  // Get the userId from the session object
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

  const userId = session.id;

  // query the database to create the new trip associated with the logged-in user
  const trip = await createTrip(result.data.name, userId);

  if (!trip) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'Error creating the new trip',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    trip: trip,
  });
}
