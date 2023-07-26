import { NextResponse } from 'next/server';

export function GET(): NextResponse<{ trips: string; trip: string }> {
  return NextResponse.json({ trips: '/api/trips', trip: '/api/trips/:id' });
}
