import {
  RequestStatus, ArticlesState, SortingDirection, GraphResponseType, UploadFileStatus, 
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

export const articlesSetStatusUpload = (payload: {
  id: number;
  fileName?: string;
  size?: number;
  percentUpload?: number;
  status?: RequestStatus;
  idArticle?: number,
  uploadStatus?: UploadFileStatus,
}) => ({
  type: ArticlesActionTypes.SetStatusUpload,
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

export const articlesCancelUpload = (payload: {
  articleId: number;
  isHidden: boolean;
  callback: () => void;
}) => ({
  type: ArticlesActionTypes.CancelUpload,
  payload,
});

export const articlesUpdate = (payload: {
  articleId: number;
  title: string;
  field: string;
  callback?: () => void;
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
    search?: string | string[]; 
  },
) => ({
  type: ArticlesActionTypes.GetArticles,
  payload,
});

export const articlesGetOneArticle = (payload: {
  articleId: number,
  errorCallback?: () => void,
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
    doneStatus?: boolean;
    isHidden?: boolean;
  },
) => ({
  type: ArticlesActionTypes.GetMyArticles,
  payload,
});

export const articlesGetUploadStatus = () => ({
  type: ArticlesActionTypes.GetArticleUploadStatus,
});

export const articlesSearch = (
  payload: {
    limit: number;
    offset: number;
    search?: string | string[]; 
  },
) => ({
  type: ArticlesActionTypes.SearchArticles,
  payload,
});

export const articlesCancelUploadFetch = (
  payload: {
    id: number;
  },
) => ({
  type: ArticlesActionTypes.CancelUploadFetch,
  payload,
});


export const articleSetFetchingStatus = (
  payload: {
    status: boolean
  }
) =>({
  type: ArticlesActionTypes.SetFetchingStatus,
  payload
})
