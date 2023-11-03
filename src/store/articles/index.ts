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
    [ArticlesActionTypes.GetOneArticle]: RequestStatus.INIT,
    [ArticlesActionTypes.ChangeArticleAccess]: RequestStatus.INIT,
    [ArticlesActionTypes.PublishArticle]: RequestStatus.INIT,
    [ArticlesActionTypes.SaveGraph]: RequestStatus.INIT,
  },
  upload: {},
};

export default createReducer(articlesInitialState, articlesHandlers);
