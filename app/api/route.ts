import { NextResponse } from 'next/server';

export function GET(): NextResponse<{ trips: string }> {
  return NextResponse.json({ trips: '/api/createtrip' });
}
