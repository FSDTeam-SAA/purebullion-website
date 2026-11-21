import "next-auth";
import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    role?: string;
    accountStatus?: string;
    emailVerified?: boolean;
    profileImage?: string | null;
    avatarUrl?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      role?: string;
      accountStatus?: string;
      emailVerified?: boolean;
      profileImage?: string | null;
      avatarUrl?: string | null;
      accessToken?: string | null;
      refreshToken?: string | null;
    } & DefaultSession["user"];
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    role?: string;
    accountStatus?: string;
    emailVerified?: boolean;
    profileImage?: string | null;
    avatarUrl?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    error?: string;
  }
}
