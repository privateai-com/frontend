import { AccountState, State } from 'types';

export const accountSelectors = {
  getProp: <T extends keyof AccountState>(propKey: T) => (
    state: State,
  ) => state.account[propKey],
  getAccount: (state: State) => state.account,
};
