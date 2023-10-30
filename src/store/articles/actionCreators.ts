import { RequestStatus, ArticlesState } from 'types';
import { ArticlesActionTypes } from './actionTypes';

export const articlesSetState = (payload: Partial<ArticlesState>) => ({
  type: ArticlesActionTypes.SetState,
  payload,
});

export const articlesSetStatus = (payload: {
  type: ArticlesActionTypes;
  status: RequestStatus;
}) => ({
  type: ArticlesActionTypes.SetStatus,
  payload,
});

export const articlesCreateArticle = (payload: {
  file: File;
  callback: () => void;
}) => ({
  type: ArticlesActionTypes.CreateArticle,
  payload,
});

export const articlesChangeArticleAccess = (payload: {
  articleId: number;
  isOpen: boolean;
}) => ({
  type: ArticlesActionTypes.ChangeArticleAccess,
  payload,
});

export const articlesDeleteArticle = (payload: { articleId: number }) => ({
  type: ArticlesActionTypes.DeleteArticle,
  payload,
});
