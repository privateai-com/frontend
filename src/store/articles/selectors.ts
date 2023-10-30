import type { State, ArticlesState } from 'types';

export const articlesSelectors = {
  getProp: <T extends keyof ArticlesState>(propKey: T) => (state: State) =>
    state.articles[propKey],
  getState: (state: State) => state.articles,
  getStatus: <T extends keyof State['articles']['ui']>(propKey: T) => (state: State) => state.articles.ui[propKey],
};
