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

// rule-based function. rules can return a bool or a filter based on which products they can CRUD
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    // do they have the permission?
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    // if not, do they own this item?
    return {
      user: {
        id: session.itemId
      }
    };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) {
      return true; // they can read everything
    }

    // they should only see available products based on status
    return {
      status: 'AVAILABLE'
    };
  }
};