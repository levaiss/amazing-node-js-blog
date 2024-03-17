export enum Roles {
  ADMIN = 1,
  USER = 2,
  EDITOR = 3,
}

export enum UserPermissions {
  UPDATE = 'updateUser',
  DELETE = 'deleteUser',
  UPDATE_ROLE = 'updateUserRole',
}

export enum PostPermissions {
  CREATE = 'createPost',
  UPDATE = 'updatePost',
  DELETE = 'deletePost',
}

export enum CommentPermissions {
  CREATE = 'createComment',
  UPDATE = 'updateComment',
  DELETE = 'deleteComment',
}

export type RolePermission = UserPermissions | PostPermissions | CommentPermissions;

export const rolesConfig = Object.freeze([
  {
    role: Roles.ADMIN,
    permissions: [
      UserPermissions.UPDATE,
      UserPermissions.UPDATE_ROLE,
      UserPermissions.DELETE,
      PostPermissions.CREATE,
      PostPermissions.UPDATE,
      PostPermissions.DELETE,
      CommentPermissions.CREATE,
      CommentPermissions.UPDATE,
      CommentPermissions.DELETE,
    ],
  },
  {
    role: Roles.USER,
    permissions: [UserPermissions.UPDATE, CommentPermissions.CREATE, CommentPermissions.UPDATE, CommentPermissions.DELETE],
  },
  {
    role: Roles.EDITOR,
    permissions: [
      UserPermissions.UPDATE,
      PostPermissions.CREATE,
      PostPermissions.UPDATE,
      PostPermissions.DELETE,
      CommentPermissions.CREATE,
      CommentPermissions.UPDATE,
      CommentPermissions.DELETE,
    ],
  },
]);

export const ROLES_NAME: Record<Roles, string> = {
  [Roles.ADMIN]: 'admin',
  [Roles.USER]: 'user',
  [Roles.EDITOR]: 'editor',
};

export const isAdmin = (role: Roles): boolean => role === Roles.ADMIN;
