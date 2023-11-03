import type { State, ProfileState } from 'types';

export const profileSelectors = {
  getProp: <T extends keyof ProfileState>(propKey: T) => (state: State) =>
    state.profile[propKey],
  getState: (state: State) => state.profile,
  getPropAccountInfo: <T extends keyof ProfileState['accountInfo']>(propKey: T) => 
    (state: State) =>
      (state.profile.accountInfo ? state.profile.accountInfo[propKey] : undefined),
  getStatus: <T extends keyof State['profile']['ui']>(propKey: T) => (state: State) => state.profile.ui[propKey],
};
