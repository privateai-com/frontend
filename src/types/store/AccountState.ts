export enum UserRole {
  User = 'user',
  Admin = 'admin',
  Support = 'support',
}

export interface AccountState {
  avatarUrl: string | null;
  city: string | null;
  country: string | null;
  createdAt: string;
  deletedAt: string | null;
  email: string;
  facebookLink: string;
  fullName: string;
  id: number;
  organization: string | null;
  phone: string | null;
  position: string | null;
  publicKey: string | null;
  researchFields: string | null;
  role: UserRole;
  scientificTitle: string | null;
  timeZone: string | null;
  updatedAt: string;
  username: string | null;
  walletAddress: string | null;
}
