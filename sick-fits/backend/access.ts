import { ListAccessArgs } from "./types";

// access control is a yes or no value depending on the user's session
export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}