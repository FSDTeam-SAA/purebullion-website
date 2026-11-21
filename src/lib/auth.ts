/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "purebullion-secret-key-change-in-prod",

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  cookies: {
    sessionToken: {
      name: "next-auth.session-token-website",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000/api/v1";

        try {
          const res = await fetch(`${backendUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email.trim(),
              password: credentials.password,
            }),
          });

          const response = await res.json().catch(() => null);

          if (!res.ok || response?.success === false) {
            const message =
              response?.error?.message ||
              response?.message ||
              (Array.isArray(response?.errors) ? response.errors.join(", ") : null) ||
              "Invalid email or password";
            throw new Error(message);
          }

          const user = response?.data?.user || response?.data || response?.user;
          const accessToken =
            response?.data?.accessToken ||
            response?.data?.token ||
            response?.accessToken ||
            response?.token ||
            null;
          const refreshToken =
            response?.data?.refreshToken ||
            response?.refreshToken ||
            null;

          return {
            id: String(user?.id || user?._id || "1"),
            name: user?.name || credentials.email.split("@")[0],
            email: user?.email || credentials.email,
            phone: user?.phone || null,
            role: user?.role || "USER",
            accountStatus: user?.accountStatus || "ACTIVE",
            emailVerified: user?.emailVerified ?? false,
            profileImage: user?.avatarUrl || user?.profileImage || null,
            avatarUrl: user?.avatarUrl || null,
            accessToken,
            refreshToken,
          };
        } catch (error) {
          console.error("Authentication error:", error);

          const errorMessage =
            error instanceof Error
              ? error.message
              : "Authentication failed. Please try again.";

          throw new Error(errorMessage);
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.phone = user.phone;
        token.role = user.role;
        token.accountStatus = user.accountStatus;
        token.emailVerified = user.emailVerified;
        token.profileImage = user.profileImage;
        token.avatarUrl = user.avatarUrl;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        phone: token.phone,
        role: token.role,
        accountStatus: token.accountStatus,
        emailVerified: token.emailVerified,
        profileImage: token.profileImage,
        avatarUrl: token.avatarUrl,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
      return session;
    },
  },
};
