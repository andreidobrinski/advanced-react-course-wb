import { permissionsList } from "./schemas/fields";
import { ListAccessArgs } from "./types";

// access control is a yes or no value depending on the user's session
export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

// permissions check
const generatedPermissions = Object.fromEntries(permissionsList.map(permission => [
  permission,
  function({ session }: ListAccessArgs) {
    return !!session?.data.role?.[permission];
  }
]));

export const permissions = {
  ...generatedPermissions,

};