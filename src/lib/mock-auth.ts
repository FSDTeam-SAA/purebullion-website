/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Dummy auth layer used until the real backend endpoints are wired up.
 * Every function resolves after a short delay to mimic a network call.
 * Replace the bodies with real `fetch`/`signIn` calls later – the UI only
 * depends on these signatures.
 */

const wait = (ms = 800) => new Promise((r) => setTimeout(r, ms));

export interface MockResult {
  ok: boolean;
  message?: string;
}

export const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "/";

export async function mockLogin(email: string, password: string): Promise<MockResult> {
  await wait();
  if (password.length < 6) return { ok: false, message: "Invalid email or password" };
  return { ok: true };
}

export async function mockRegister(_data: {
  fullName: string;
  email: string;
  password: string;
}): Promise<MockResult> {
  await wait();
  return { ok: true };
}

export async function mockRequestResetCode(_email: string): Promise<MockResult> {
  await wait();
  return { ok: true };
}

export async function mockVerifyCode(code: string): Promise<MockResult> {
  await wait();
  // any 6 digit code is accepted in dummy mode
  return code.length === 6 ? { ok: true } : { ok: false, message: "Enter the 6-digit code" };
}

export async function mockResetPassword(_password: string): Promise<MockResult> {
  await wait();
  return { ok: true };
}
