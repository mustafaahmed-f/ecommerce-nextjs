// lib/authProviders.ts
export const authProviders = {
  system: "system",
  google: "google",
} as const;

export type AuthProvider = (typeof authProviders)[keyof typeof authProviders];
