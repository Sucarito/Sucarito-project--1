import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

// Mock database for demonstration
// In a real app, you would use Prisma or another ORM
const mockUsers = [
  {
    id: "user_1",
    name: "John Doe",
    email: "john@example.com",
    password: "hashed_password_here", // In reality, this would be properly hashed
  },
]

export const authOptions: NextAuthOptions = {
  // In a real app with Prisma:
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // In a real app, you would query your database
        // For now, we'll use the mock data
        const user = mockUsers.find((user) => user.email === credentials.email)

        if (!user) {
          return null
        }

        // In a real app, you would verify the password hash
        // For now, we'll just check if the user exists
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
}
