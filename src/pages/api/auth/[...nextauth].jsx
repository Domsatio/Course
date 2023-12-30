// import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import db from '@/libs/prisma';
import bcrypt from 'bcrypt';
import { existingUser } from '@/controllers/userController';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  // adapter: PrismaAdapter(db),
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      name: 'Google',
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      // providerAccountId: '107516670871160551260',
      httpOptions: {
        timeout: 60000,
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'user',
        }
      },
      style: { logo: "/google.svg", bg: "#fff", text: "#000" },
    },
    ),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        name: { label: 'name', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await existingUser(credentials.email);
        if (user) {
          const match = await bcrypt.compare(credentials.password, user.password);
          if (match) {
            return user
          } else {
            return null
          }
        }

      },
    }),
  ],
  pages: {
    //  signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // async signIn({ account, profile}) {
    //   if (account.provider === 'google') {
    //     console.log(profile);
    //     console.log(account);
    //     if(!profile?.email){
    //       throw new Error("No profile");
    //     }
    //     await prisma.user.upsert({
    //       where: { email: profile.email },
    //       update: { 
    //         name: profile.name,
    //         image: profile.image,
    //         role: 'user',
    //        },
    //       create: {
    //         email: profile.email,
    //         name: profile.name,
    //         image: profile.image,
    //         role: 'user',
    //       },
    //     })
    //     return true
    //   }

    //   if (account.provider === 'credentials') {
    //     return true
    //   }

    //   return false
    // },
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/admin")) return `${baseUrl}/admin/dashboard`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
}

export default NextAuth(authOptions);

