import type { State, MetamaskState } from 'types';

export const metamaskSelectors = {
  getProp: <T extends keyof MetamaskState>(propKey: T) => (state: State) =>
    state.metamask[propKey],
  getState: (state: State) => state.metamask,
  getStatus: <T extends keyof State['metamask']['ui']>(propKey: T) => (state: State) => state.metamask.ui[propKey],
  getStatusSwitchNetwork: <T extends keyof State['metamask']['statusSwitchNetwork']>(propKey: T) => (state: State) => state.metamask.statusSwitchNetwork[propKey],
};
