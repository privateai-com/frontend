import type { State, ProfileState } from 'types';

export const profileSelectors = {
  getProp: <T extends keyof ProfileState>(propKey: T) => (state: State) =>
    state.profile[propKey],
  getState: (state: State) => state.profile,
  getStatus: <T extends keyof State['profile']['ui']>(propKey: T) => (state: State) => state.profile.ui[propKey],
};
