import {
  RequestStatus, ArticlesState, SortingDirection, GraphResponseType, 
} from 'types';
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

export const articlesCreate = (payload: {
  file: File;
  callback: () => void;
}) => ({
  type: ArticlesActionTypes.CreateArticle,
  payload,
});

export const articlesPublish = (payload: {
  articleId: number;
  isPublished: boolean;
  callback: () => void;
}) => ({
  type: ArticlesActionTypes.PublishArticle,
  payload,
});

export const articlesUpdate = (payload: {
  articleId: number;
  title: string;
  field: string;
  callback: () => void;
}) => ({
  type: ArticlesActionTypes.UpdateArticle,
  payload,
});

export const articlesChangeAccess = (payload: {
  articleId: number;
  isOpen: boolean;
}) => ({
  type: ArticlesActionTypes.ChangeArticleAccess,
  payload,
});

export const articlesDelete = (payload: { 
  articleId: number,
  callback?: () => void,
}) => ({
  type: ArticlesActionTypes.DeleteArticle,
  payload,
});

export const articlesSaveGraph = (payload: { 
  articleId: number,
  data: GraphResponseType[],
  callback?: () => void,
}) => ({
  type: ArticlesActionTypes.SaveGraph,
  payload,
});

export const articlesGetAll = (
  payload: {
    limit: number;
    offset: number;
    sortingField: string;
    sortingDirection: SortingDirection;
    searchField: string;
  },
) => ({
  type: ArticlesActionTypes.GetArticles,
  payload,
});

export const articlesGetOneArticle = (payload: {
  articleId: number,
}) => ({
  type: ArticlesActionTypes.GetOneArticle,
  payload,
});

export const articlesGetMy = (
  payload: {
    limit: number;
    offset: number;
    sortingField: string;
    sortingDirection: SortingDirection;
  },
) => ({
  type: ArticlesActionTypes.GetMyArticles,
  payload,
});
