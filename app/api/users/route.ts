import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { deleteUserById, updateUserById } from '../../../database/users';
import { User } from '../../../migrations/1687761074-createUsers';

export type Error = {
  error: string;
};

type UserResponseBodyDelete = { user: User } | Error;
type UserResponseBodyPut = { user: User } | Error;

const userSchema = z.object({
  username: z.string(),
});

// ////////////////////////////////////////////
export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyDelete>> {
  const userId = Number(params.userId);

  if (!userId) {
    return NextResponse.json(
      {
        error: 'Invalid User Id',
      },
      { status: 400 },
    );
  }
  // query the database to get all the user
  const user = await deleteUserById(userId);

  if (!user) {
    return NextResponse.json(
      {
        error: 'User Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ user: user });
}

// ////////////////////////////////////////////
export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyPut>> {
  const userId = Number(params.userId);
  const body = await request.json();

  if (!userId) {
    return NextResponse.json(
      {
        error: 'Invalid User Id',
      },
      { status: 400 },
    );
  }

  // zod please verify the body matches my schema
  const result = userSchema.safeParse(body);

  if (!result.success) {
    // zod sends details about the error
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }
  // query the database to update the user
  const user = await updateUserById(userId, result.data.username);

  if (!user) {
    return NextResponse.json(
      {
        error: 'User Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    user: user,
  });
}
