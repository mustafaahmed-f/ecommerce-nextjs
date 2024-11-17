import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";
import userModel from "../_mongodb/models/userModel";
import { refreshAccessToken } from "./refreshAccessToken";

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
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
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
      // Check if token is expired and refresh if necessary
      // if (Date.now() < (token as any).accessTokenExpires) {
      //   return token;
      // }

      // // Refresh token logic
      // try {
      //   const refreshedTokens = await refreshAccessToken(
      //     token.refreshToken as string
      //   );
      //   return {
      //     ...token,
      //     accessToken: refreshedTokens.access_token,
      //     accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      //     refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      //     userId: token.userId,
      //     tokenRefreshed: true, // Indicate token was refreshed
      //   };
      // } catch (error) {
      //   console.error("Error refreshing access token", error);
      //   return { ...token, error: "RefreshAccessTokenError" };
      // }
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
        //// check if user is already logged in using system:
        if (cookies().get("next_ecommerce_token")?.value) return false;

        return true;
      } catch (error) {
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
  debug: true,
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
