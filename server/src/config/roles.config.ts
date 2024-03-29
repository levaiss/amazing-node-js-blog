export enum Roles {
  ADMIN = 1,
  USER = 2,
  EDITOR = 3,
}

export enum UserPermissions {
  DELETE = 'deleteUser',
  UPDATE_ROLE = 'updateUserRole',
}

export enum PostPermissions {
  CREATE = 'createPost',
  UPDATE = 'updatePost',
  DELETE = 'deletePost',
}

export type RolePermission = UserPermissions | PostPermissions;

export const rolesConfig = Object.freeze([
  {
    role: Roles.ADMIN,
    permissions: [
      UserPermissions.UPDATE_ROLE,
      UserPermissions.DELETE,
      PostPermissions.CREATE,
      PostPermissions.UPDATE,
      PostPermissions.DELETE,
    ],
  },
  {
    role: Roles.USER,
    permissions: [],
  },
  {
    role: Roles.EDITOR,
    permissions: [PostPermissions.CREATE, PostPermissions.UPDATE, PostPermissions.DELETE],
  },
]);

export const ROLES_NAME: Record<Roles, string> = {
  [Roles.ADMIN]: 'admin',
  [Roles.USER]: 'user',
  [Roles.EDITOR]: 'editor',
};

export const isAdmin = (role: Roles): boolean => role === Roles.ADMIN;
