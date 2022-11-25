import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { client as prisma } from "../../../lib/prismadb";

if (process.env.GOOGLE_CLIENT_ID === undefined || process.env.GOOGLE_CLIENT_SECRET === undefined) {
  throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set");
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      return !!(profile?.email === "mo@mohammad.dev");
    },
    async jwt({ token, account, profile }) {
      if(account && profile) {
        token.accessToken = account.access_token
        // token.id = profile.id
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      if(url.startsWith("/")) return `${baseUrl}${url}`

      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  }
})