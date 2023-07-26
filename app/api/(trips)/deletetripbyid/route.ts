import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { deleteTripById } from '../../../../database/trips';
import { Error, Trip } from '../createtrip/route';

type TripResponseBodyDelete = { trip: Trip } | Error;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<TripResponseBodyDelete>> {
  const tripId = Number(params.tripId);

  if (!tripId) {
    return NextResponse.json(
      {
        error: 'Trip id is not valid',
      },
      { status: 400 },
    );
  }
  // query the database to get all the trips
  const trip = await deleteTripById(tripId);
  if (!trip) {
    return NextResponse.json(
      {
        error: 'Trip Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ trip: trip });
}
