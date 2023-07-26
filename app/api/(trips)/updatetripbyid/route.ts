import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { updateTripById } from '../../../../database/trips';
import { Error, Trip } from '../createtrip/route';

type TripResponseBodyPut = { trip: Trip } | Error;

const tripSchema = z.object({
  name: z.string(),
  userId: z.number(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<TripResponseBodyPut>> {
  const tripId = Number(params.tripId);
  const body = await request.json();

  if (!tripId) {
    return NextResponse.json(
      {
        error: 'Trip id is not valid',
      },
      { status: 400 },
    );
  }

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
  // query the database to update the trip
  const trip = await updateTripById(
    tripId,
    result.data.name,
    result.data.userId,
  );
  if (!trip) {
    return NextResponse.json(
      {
        error: 'Trip Not Found',
      },
      { status: 404 },
    );
  }
  console.log(trip);
  return NextResponse.json({
    trip: trip,
  });
}
