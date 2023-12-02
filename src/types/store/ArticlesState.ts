import { ArticlesActionTypes } from 'store/articles/actionTypes';
import {
  AccountInfo,
  GraphResponseType,
  PartialRecord,
  RequestStatus,
  Pagination,
  UploadFileStatus,
} from 'types';

export interface ArticleUpload {
  [key: string]: {
    id: string;
    status: RequestStatus;
    fileName: string;
    size: number;
    percentUpload: number;
    idArticle?: number;
  };
}

export interface ArticlesState {
  articlesAll: Article[];
  myArticles: Article[];
  uploadArticles: Article[];
  article?: Article,
  total: number;
  pagination?: Pagination;
  ui: PartialRecord<ArticlesActionTypes, RequestStatus>;
  upload: ArticleUpload;
}

export type ArticleOwner = {
  id: number;
  username: null | string;
  fullName: null | string;
};

export type ArticleAccess = {
  id: number;
  article: Article;
  requester?: AccountInfo;
  approve: boolean;
  isOwnerViewed?: boolean;
  isRequesterViewed?: boolean;
};

export type Article = {
  id: number;
  createdAt: string;
  updatedAt: string;
  owner: ArticleOwner;
  title: string;
  field: string;
  articleUrl: string;
  graph: GraphResponseType[];
  graphDraft: GraphResponseType[];
  isGraphUpdated: boolean;
  buyers: string[];
  additionalData: {};
  isPublic: boolean;
  downloads: number;
  uploadStatus: UploadFileStatus;
  uploadProgress: number;
  requests: ArticleAccess[];
  status?: string;
  topCoreEntities?: string;
  isGraphDifferent?: boolean;
  usersAmount?: number;
  usersPendingAccess?: number;
  fileSize?: number;
};

export enum SocketUploadArticleEvent {
  GET_UPLOAD_STATUS = 'uploadStatusUpdate',
  SERVER_ERROR = 'ServerError',
}

export type EmitedSocketUploadEvent = {
  event: SocketUploadArticleEvent;
  articleId: number;
  uploadProgress: number;
};
