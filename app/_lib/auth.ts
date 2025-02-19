import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import userModel from "../_mongodb/models/userModel";
import { checkUserInDB } from "./checkUserInDB";

// Extend the Session and User types
declare module "next-auth" {
  interface Profile {
    given_name?: string | null;
    family_name?: string | null;
    picture?: any | string | null;
    // other Google profile-specific fields can go here
  }
  interface Session {
    user: {
      userId?: string;
      image: any;
      name: string;
      email: string;
      accessToken?: string;
    };
    provider: string;
  }

  interface User {
    userId?: string;
  }
  interface Account {
    expires_in: number;
  }

  interface JWT {
    provider: string;
    userId?: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
    }),
  ],
  callbacks: {
    authorized({ request, auth }: { request: NextRequest; auth: any }) {
      return !!auth?.user;
    },
    jwt: async ({
      token,
      account,
      profile,
    }: {
      token: any;
      account?: any;
      profile?: any;
    }) => {
      // Add the provider type to the token if available (e.g., "google", "github")

      if (account && profile) {
        token.provider = account.provider; // e.g., "google", "github", etc.
        const user = await userModel.findOne({ email: profile.email });
        if (user) token.userId = user._id.toString();
      }

      // Initial sign in
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = Date.now() + account.expires_in * 1000;
      }
      return token;
    },
    signIn: async ({
      user,
      account,
      profile,
    }: // email,
    // credentials,
    {
      user: any;
      account: any;
      profile?: any;
      email?: any;
      credentials?: any;
    }) => {
      try {
        if (!account || !profile) return false;
        //// check if user is already logged in using system:
        // if (cookies().get("next_ecommerce_token")?.value) return false;
        //// check if user is on the database:
        console.log("Here 1");
        await checkUserInDB(profile);
        console.log("Here 2");
        return true;
      } catch (error) {
        console.log("Error signing in : ", error);
        return false;
      }
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      session.user = {
        ...session.user,
        accessToken: token.accessToken as string,
      };
      // Add the provider information to the session
      session.user.provider = token.provider as string;
      session.user.userId = token.userId as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  // debug: true,
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
