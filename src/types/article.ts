export enum StatusAccessArticle {
  OpenSource = 'OpenSource',
  AccessGranted = 'AccessGranted',
  PermissionNeeded = 'PermissionNeeded',
  AccessRequestPending = 'AccessRequestPending',
  AccessDenied = 'AccessDenied',
}

export type UserInfo = {
  id: number,
  username: string,
  fullName: string 
};

export type RequestArticle = {
  id: number,
  approve: boolean,
  isOwnerViewed: boolean,
  isRequesterViewed: boolean,
  article: {
    id: number,
    title: string,
    field: string,
    owner: UserInfo,
    topCoreEntities?: string,
  },
  requester: UserInfo,
  createdAt: string,
};
