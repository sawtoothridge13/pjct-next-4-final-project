import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createTrip } from '../../../../database/trips';

export type Trip = {
  id: number;
  name: string;
  userId: number;
};

export type Error = {
  error: string;
};

type TripsResponseBodyPost = { trip: Trip } | Error;

const tripSchema = z.object({
  name: z.string(),
  userId: z.number(),
});

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
  return NextResponse.json({
    trip: trip,
  });
}
