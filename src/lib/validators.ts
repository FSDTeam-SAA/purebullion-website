export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export function validatePassword(v: string): string | undefined {
  if (v.length < 6) return "Password must be at least 6 characters";
  return undefined;
}
