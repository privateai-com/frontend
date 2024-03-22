import { type State, type ChatState } from 'types';

export const chatSelectors = {
  getProp: <T extends keyof ChatState>(propKey: T) => (state: State) =>
    state.chat[propKey],
  getState: (state: State) => state.chat,
  getStatus: <T extends keyof State['chat']['ui']>(propKey: T) => (state: State) => state.chat.ui[propKey],
};
