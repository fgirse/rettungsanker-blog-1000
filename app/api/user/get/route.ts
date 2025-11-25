import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb/mongoose';
import User from '@/lib/models/user.model';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { message: 'You are not authorized' },
        { status: 401 }
      );
    }

    await connect();
    
    const body = await req.json();
    const { userMongoId, limit = 5, startIndex = 0 } = body;

    // Check if the requesting user is an admin
    const requestingUser = await User.findOne({ clerkId: userId });
    
    if (!requestingUser || !requestingUser.isAdmin) {
      return NextResponse.json(
        { message: 'You are not authorized to view users' },
        { status: 403 }
      );
    }

    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return NextResponse.json(
      {
        users: usersWithoutPassword,
        totalUsers,
        lastMonthUsers,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { message: 'Error fetching users', error: error.message },
      { status: 500 }
    );
  }
}
