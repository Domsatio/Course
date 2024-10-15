import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { existingUser } from "@/controllers/user.controller";
import { checkPassword } from "@/utils/hashing";
import prisma from "@/libs/prisma/db";

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  // debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      httpOptions: {
        timeout: 60000,
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "USER",
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        name: { label: "name", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await existingUser(email);
        if (user) {
          const passwordConfirm = checkPassword(password, user.password);
          if (passwordConfirm) return user;
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/error-signIn",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
      }
      return { ...token, ...user };
    },
    async session({ session, token }: any) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
