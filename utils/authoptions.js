import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/User';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    //invoked on succsful sign in
    async signIn({ profile }) {
      console.log('This is the profile', profile);
      //1. connect to db
      await connectDB();
      //2. check if user exists
      const userExists = await User.findOne({ email: profile.email });
      if (userExists) return true;
      //3.If not add user to db

      const username = profile.name.slice(0, 20);
      await User.create({
        email: profile.email,
        username,
        image: profile.picture,
      });
      //4. return true to allow sign in
      return true;
    },
    async session({ session }) {
      console.log(session);
      //1.get user from db
      const user = await User.findOne({ email: session.user.email });
      //2. assign user id to the session
      session.user.id = user._id.toString();
      //3.return session
      return session;
    },
  },
};
