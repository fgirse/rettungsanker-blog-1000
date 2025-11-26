import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

async function connect() {
  const MONGODB_URI = process.env.MONGODB_URI || process.env.NEXT_PUBLIC_MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  // Use a global cached connection to prevent creating multiple connections in development
  const g = global as any;
  if (g.mongoose && g.mongoose.conn) {
    return g.mongoose.conn;
  }

  if (!g.mongoose) {
    g.mongoose = { conn: null, promise: null };
  }

  if (!g.mongoose.promise) {
    const opts = { bufferCommands: false };
    g.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }

  g.mongoose.conn = await g.mongoose.promise;
  return g.mongoose.conn;
}

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
