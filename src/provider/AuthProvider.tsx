"use client";
import React, { useEffect } from "react";
import { SessionProvider, signOut, useSession } from "next-auth/react";

/**
 * Honours the login form's "Remember me" choice: when it was NOT ticked, the
 * session only lives as long as the browser session (sessionStorage flag).
 */
function RememberGuard() {
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;
    try {
      const remembered = localStorage.getItem("pb_remember") !== "0";
      const active = sessionStorage.getItem("pb_session_active") === "1";
      if (!remembered && !active) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        signOut({ callbackUrl: "/login" });
      }
    } catch {
      /* storage unavailable: keep the session */
    }
  }, [status]);

  return null;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SessionProvider>
        <RememberGuard />
        {children}
      </SessionProvider>
    </div>
  );
};

export default AuthProvider;
