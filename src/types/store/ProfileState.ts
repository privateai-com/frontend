import { ProfileActionTypes } from 'store/profile/actionTypes';
import {
  ArticleOwner,
  PartialRecord,
  RequestStatus,
} from 'types';

export enum UserRole {
  User = 'user',
  VIP = 'vip',
  Admin = 'admin',
}

export interface AccountInfo {
  createdAt?: string,
  updatedAt?: string,
  deletedAt?: string | null,
  id?: number,
  walletAddress?: string | null,
  username?: string,
  email?: string,
  phone?: string,
  role?: UserRole,
  fullName?: string,
  country?: string,
  city?: string,
  timeZone?: string,
  socialLink?: string | null,
  organization?: string,
  scientificTitle?: string,
  position?: string,
  researchFields?: string,
  avatarUrl?: string,
  userFilledAllInfo?: boolean,
  bonusCount?: number,
  articlesCount?: number,
}

export enum NotificationType {
  GrantAccess = 'Grant access',
  PendingAccess = 'Pending access',
  YouGrantedAccess = 'You granted access',
  YouRejectedAccess = 'You rejected access',
  AccessWasGranted = 'Access was granted',
  AccessWasRejected = 'Access was rejected',
  UnknownType = 'Unknown type',
}

export interface NotificationArticle {
  id: number;
  title: string;
  owner: ArticleOwner;
}

export interface NotificationInfo {
  approve: boolean;
  article: NotificationArticle;
  id: number;
  createdAt: string;
  isOwnerViewed: boolean;
  isRequesterViewed: boolean;
  requester: {
    id: number;
    fullName: string | null;
    username: string | null;
  }
  type: NotificationType;
}

export interface ProfileState {
  accountInfo: AccountInfo,
  notifications: NotificationInfo[],
  requester: Record<number, AccountInfo>;
  ui: PartialRecord<ProfileActionTypes, RequestStatus>;
  statusRequester: Record<number, RequestStatus>;
  apiKey: string;
}

export enum SocketNotificationEvent {
  NEW_NOTIFICATION = 'newNotification',
  SERVER_ERROR = 'ServerError',
}

export type EmitedSocketNotificationEvent = {
  event: SocketNotificationEvent;
  data: [NotificationInfo[], number];
};
