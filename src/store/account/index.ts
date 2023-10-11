import { AccountState, UserRole } from 'types';

import { createReducer } from 'utils';

import { accountHandlers } from './handlers';

export const accountInitialState: Readonly<AccountState> = {
  avatarUrl: null,
  city: null,
  country: null,
  createdAt: '',
  deletedAt: null,
  email: '',
  facebookLink: '',
  fullName: '',
  id: 0,
  organization: null,
  phone: null,
  position: null,
  publicKey: null,
  researchFields: null,
  role: UserRole.User,
  scientificTitle: null,
  timeZone: null,
  updatedAt: '',
  username: null,
  walletAddress: null,
};

export default createReducer(accountInitialState, accountHandlers);
