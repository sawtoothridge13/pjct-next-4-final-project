import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteTripById,
  getTripById,
  updateTripById,
} from '../../../../database/trips';
import { Error, Trip } from '../route';

type TripResponseBodyGet = { trip: Trip } | Error;
type TripResponseBodyDelete = { trip: Trip } | Error;
type TripResponseBodyPut = { trip: Trip } | Error;

const tripSchema = z.object({
  name: z.string(),
  userId: z.number(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<TripResponseBodyGet>> {
  const tripId = Number(params.tripId);
  if (!tripId) {
    console.log(tripId);
    return NextResponse.json(
      {
        error: 'Trip id is not valid',
      },
      { status: 400 },
    );
  }
  // query the database to get all the trips
  const trip = await getTripById(tripId);

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

  return NextResponse.json({
    trip: trip,
  });
}
