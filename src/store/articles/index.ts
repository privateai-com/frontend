import { createReducer } from 'utils';
import { RequestStatus } from 'types';
import { ArticlesState } from 'types/store/ArticlesState';
import { ArticlesActionTypes } from './actionTypes';
import { articlesHandlers } from './handlers';

export const articlesInitialState: Readonly<ArticlesState> = {
  articles: [],
  total: 0,
  ui: {
    [ArticlesActionTypes.GetArticles]: RequestStatus.INIT,
  },
};

export default createReducer(articlesInitialState, articlesHandlers);
