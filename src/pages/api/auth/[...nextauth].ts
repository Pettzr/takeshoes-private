import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/src/lib/prisma';
import { verifyHash } from '../../../utils/userHash';

interface UserWithRole {
  id: string;
  email: string;
  role: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) : Promise<UserWithRole | null> {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await verifyHash(password, user.password);

        if (!isPasswordValid) {
          return null;  
        }

        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          role: token.role as string, 
        };
      }
      return session;
    },
    async jwt({ token, user, account }) {

      if (user) {
        const userWithRole = user as UserWithRole;
        token.id = userWithRole.id;
        token.role = userWithRole.role;
      }

      if( account?.provider === 'google' && token.email) {
          let userDB = await prisma.user.findUnique({
              where: {email: token.email as string}
          })

      if(!userDB) {
        userDB = await prisma.user.create({
          data: {
            email: token.email as string,
            password: '',
            role: 'user',
          }
        })
      }

      token.id = userDB.id.toString()
      token.role = userDB.role;
        }
      
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
};

export default NextAuth(authOptions);
