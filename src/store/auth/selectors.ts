import type { State, AuthState } from 'types';

export const authSelectors = {
  getProp: <T extends keyof AuthState>(propKey: T) => (state: State) =>
    state.auth[propKey],
  getState: (state: State) => state.auth,
  getStatus: <T extends keyof State['auth']['ui']>(propKey: T) => (state: State) => state.auth.ui[propKey],
};
