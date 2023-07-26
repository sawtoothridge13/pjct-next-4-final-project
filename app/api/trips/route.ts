import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getValidSessionByToken } from '../../../database/sessions';
import {
  createTrip,
  getTripsWithLimitAndOffsetBySessionToken,
} from '../../../database/trips';

export type Trip = {
  id: number;
  name: string;
  userId: number;
};

export type Error = {
  error: string;
};

type TripsResponseBodyGet = { trips: Trip[] } | Error;
type TripsResponseBodyPost = { trip: Trip } | Error;

const tripSchema = z.object({
  name: z.string(),
  userId: z.number(),
});

export async function GET(
  request: NextRequest,
): Promise<NextResponse<TripsResponseBodyGet>> {
  const { searchParams } = new URL(request.url);

  // 1. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  console.log('This comes from the API', session);

  if (!session) {
    return NextResponse.json(
      {
        error: 'session token is not valid',
      },
      { status: 401 },
    );
  }

  const limit = Number(searchParams.get('limit'));
  const offset = Number(searchParams.get('offset'));

  if (!limit || !offset) {
    return NextResponse.json(
      {
        error: 'Limit and Offset need to be passed as params',
      },
      { status: 400 },
    );
  }

  // query the database to get all the trips only if a valid session token is passed
  const trips = await getTripsWithLimitAndOffsetBySessionToken(
    limit,
    offset,
    sessionTokenCookie.value,
  );

  return NextResponse.json({ trips: trips });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<TripsResponseBodyPost>> {
  const body = await request.json();
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
  // query the database to get all the trips
  const trip = await createTrip(result.data.name, result.data.userId);

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
  console.log(trip);
  return NextResponse.json({
    trip: trip,
  });
}
