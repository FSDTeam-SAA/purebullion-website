export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export function validatePassword(v: string): string | undefined {
  if (v.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return "Use letters and numbers";
  return undefined;
}
