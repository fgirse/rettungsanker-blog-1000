import User from '../models/user.model';

import { connect } from '../mongodb/mongoose';

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try {
    console.log('🔌 Connecting to MongoDB for user operation...');
    await connect();
    console.log('✅ MongoDB connected');
    
    console.log('💾 Creating/updating user:', {
      clerkId: id,
      username,
      email: email_addresses[0].email_address,
    });
    
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses[0].email_address,
          username,
        },
      },
      { new: true, upsert: true }
    );
    
    console.log('✅ User saved to MongoDB:', {
      mongoId: user._id,
      clerkId: user.clerkId,
      username: user.username,
      isAdmin: user.isAdmin,
    });
    
    return user;
  } catch (error) {
    console.error('❌ Error creating or updating user:', error);
    console.error('Stack trace:', error.stack);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    console.log('🔌 Connecting to MongoDB for user deletion...');
    await connect();
    console.log('✅ MongoDB connected');
    
    console.log('🗑️  Deleting user with clerkId:', id);
    const deletedUser = await User.findOneAndDelete({ clerkId: id });
    
    if (deletedUser) {
      console.log('✅ User deleted from MongoDB:', {
        mongoId: deletedUser._id,
        username: deletedUser.username,
      });
    } else {
      console.log('⚠️  User not found in MongoDB:', id);
    }
    
    return deletedUser;
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    console.error('Stack trace:', error.stack);
    throw error;
  }
};
