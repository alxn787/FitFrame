/* eslint-disable */
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";
import db from "@/app/db";

export interface session extends Session {
    user: {
      email: string;
      name: string;
      image: string
      uid: string;
    };
}



export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET || 'secr3t',
  providers: [

    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async session({ session, token }:any) {
      if (session.user && token.uid) {
        session.user.uid = token.uid; 
      }
      return session;
    },

    async jwt({ token, account, user }:any) {
      if (account?.provider === "google") {

        const dbUser = await db.user.findFirst({
          where: {
            sub: account.providerAccountId,
          },
        });

        if (dbUser) {
          token.uid = dbUser.id;
        }
      }

      if (user) {
        token.uid = user.id; 
      }

      return token;
    },

    async signIn({ user, account, profile }:any) {
      console.log("SignIn callback:", { user, account, profile });

      if (account?.provider === "google") {
        const email = user.email;

        // Check if user exists in the database
        const dbUser = await db.user.findFirst({
          where: { email: email },
        });

        if (dbUser) {
          return true; 
        }


        await db.user.create({
          data: {
            email: email,
            name: profile?.name,
            picture: profile?.picture,
            sub: account.providerAccountId,
          },
        });

        return true;
      }

      return true; 
    },
  },
};
