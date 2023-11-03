import { State } from 'types/store';

export const requestSelectors = {
  getProp: <PropKey extends keyof State['request']>(propKey: PropKey) => (
    state: State,
  ) => state.request[propKey],
  getStatus: <T extends keyof State['request']['ui']>(propKey: T) => (state: State) => state.request.ui[propKey],
};
