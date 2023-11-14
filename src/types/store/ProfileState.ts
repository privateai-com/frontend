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
}

export interface NotificationInfo {
  approve: boolean;
  article: {
    id: number;
    owner: ArticleOwner;
  };
  id: number;
  isOwnerViewed: boolean;
  isRequesterViewed: boolean;
  requester: {
    id: number;
  }
}

export interface ProfileState {
  accountInfo: AccountInfo,
  requester: AccountInfo,
  notifications: NotificationInfo[],
  ui: PartialRecord<ProfileActionTypes, RequestStatus>;
}
